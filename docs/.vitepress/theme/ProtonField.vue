<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const host = ref(null)
let dispose = () => {}

onMounted(async () => {
  if (typeof window === 'undefined' || !host.value) return
  const THREE = await import('three')
  const el = host.value
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const canHover = window.matchMedia?.('(hover: hover)').matches

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.setClearColor(0x000000, 0) // transparent — blends into the page
  const size = () => ({ w: el.clientWidth || 1, h: el.clientHeight || 1 })
  let { w, h } = size()
  renderer.setSize(w, h, false)
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
  camera.position.set(0, 0, 6.4)

  const ORANGE = 0xff8a3d, PURPLE = 0xa855f7, GREEN = 0x34d399

  const world = new THREE.Group(); scene.add(world)
  const atom = new THREE.Group(); world.add(atom)

  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128
    const g = c.getContext('2d')
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    grd.addColorStop(0, 'rgba(150,160,255,0.55)')
    grd.addColorStop(0.45, 'rgba(120,110,255,0.18)')
    grd.addColorStop(1, 'rgba(120,110,255,0)')
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128)
    return new THREE.CanvasTexture(c)
  })()
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.5 }))
  glow.scale.set(2.6, 2.6, 1); atom.add(glow)

  const nucleus = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 1), new THREE.MeshBasicMaterial({ color: 0x9aa6ff }))
  atom.add(nucleus)
  const nucleusWire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.4, 1), new THREE.MeshBasicMaterial({ color: 0x8b95ff, wireframe: true, transparent: true, opacity: 0.35 }))
  atom.add(nucleusWire)

  const ringColors = [ORANGE, PURPLE, GREEN]
  const tilts = [[0.3, 0, 0.5], [-0.6, 0.4, -0.3], [0.2, -0.7, 0.9]]
  const electrons = []
  const rings = []
  ringColors.forEach((col, i) => {
    const ring = new THREE.Group()
    ring.rotation.set(tilts[i][0] * Math.PI, tilts[i][1] * Math.PI, tilts[i][2] * Math.PI)
    const R = 1.5 + i * 0.45
    const torus = new THREE.Mesh(new THREE.TorusGeometry(R, 0.01, 8, 120), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5 }))
    ring.add(torus); rings.push(torus)
    const pivot = new THREE.Group()
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), new THREE.MeshBasicMaterial({ color: col }))
    e.position.set(R, 0, 0)
    const eglow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: col, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.35 }))
    eglow.scale.set(0.55, 0.55, 1); e.add(eglow)
    pivot.add(e); ring.add(pivot); atom.add(ring)
    electrons.push({ pivot, speed: 0.012 + i * 0.006, ring, tumble: (i % 2 ? 1 : -1) * 0.0008, eglow })
  })

  const COUNT = 700
  const arr = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const r = 2.4 + Math.random() * 2.6, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1)
    arr[i * 3] = r * Math.sin(ph) * Math.cos(th); arr[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th); arr[i * 3 + 2] = r * Math.cos(ph)
  }
  const halo = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(arr, 3)),
    new THREE.PointsMaterial({ size: 0.016, transparent: true, depthWrite: false })
  )
  world.add(halo)

  // ---- theme-aware look (additive glow only reads on dark; light mode leans on
  // the solid geometry + denser particles) ----
  let glowBase = 0.5
  const applyTheme = () => {
    const dark = document.documentElement.classList.contains('dark')
    glowBase = dark ? 0.5 : 0.0
    glow.visible = dark
    electrons.forEach((e) => { e.eglow.visible = dark })
    nucleus.material.color.set(dark ? 0x9aa6ff : 0x4f46e5)
    nucleusWire.material.color.set(dark ? 0x8b95ff : 0x6366f1)
    nucleusWire.material.opacity = dark ? 0.35 : 0.5
    rings.forEach((r) => { r.material.opacity = dark ? 0.5 : 0.8 })
    halo.material.color.set(dark ? 0x8b95ff : 0x6366f1)
    halo.material.opacity = dark ? 0.22 : 0.32
  }
  applyTheme()
  const themeObs = new MutationObserver(applyTheme)
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  // ---- cursor "gravity" — the proton leans toward the pointer ----
  let baseX = 0
  const layout = () => { baseX = (w / h > 1.25) ? 1.6 : 0 }
  layout()
  let tx = 0, ty = 0, px = 0, py = 0 // target / eased pointer (-1..1)
  const onPointer = (ev) => { tx = (ev.clientX / window.innerWidth) * 2 - 1; ty = (ev.clientY / window.innerHeight) * 2 - 1 }
  if (canHover && !reduceMotion) window.addEventListener('pointermove', onPointer, { passive: true })

  let raf = 0, t = 0, running = false, onScreen = true
  const render = () => renderer.render(scene, camera)
  const tick = () => {
    if (!running) return
    t += 1
    // ease pointer → gravity tug (lateral pull + parallax tilt)
    px += (tx - px) * 0.045; py += (ty - py) * 0.045
    world.position.x = baseX + px * 0.7
    world.position.y = -py * 0.45
    world.rotation.y = px * 0.28
    world.rotation.x = py * 0.22
    atom.rotation.y += 0.0016
    atom.rotation.x = Math.sin(t * 0.0009) * 0.18
    nucleus.rotation.y += 0.004; nucleusWire.rotation.x -= 0.006
    const PERIOD = 1600 // slow, calm pulse (~1.6s) — relaxed, not anxious
    const flare = Math.pow(1 - (performance.now() % PERIOD) / PERIOD, 5)
    nucleus.scale.setScalar(1 + flare * 0.04)
    glow.scale.set(2.6 * (1 + flare * 0.05), 2.6 * (1 + flare * 0.05), 1)
    glow.material.opacity = glowBase + flare * 0.04
    halo.rotation.y -= 0.0006
    for (const e of electrons) { e.pivot.rotation.z += e.speed; e.ring.rotation.z += e.tumble }
    render()
    raf = requestAnimationFrame(tick)
  }

  const update = () => {
    const go = onScreen && !document.hidden && !reduceMotion
    if (go && !running) { running = true; tick() }
    else if (!go && running) { running = false; cancelAnimationFrame(raf) }
  }
  const onVis = () => update()
  document.addEventListener('visibilitychange', onVis)

  // pause when the hero scrolls out of view
  const io = new IntersectionObserver((es) => { onScreen = es[0]?.isIntersecting ?? true; update() }, { threshold: 0 })
  io.observe(el)

  const ro = new ResizeObserver(() => {
    const s = size(); w = s.w; h = s.h
    camera.aspect = w / h; camera.updateProjectionMatrix()
    renderer.setSize(w, h, false); layout(); render()
  })
  ro.observe(el)

  if (reduceMotion) render(); else update()

  dispose = () => {
    running = false; cancelAnimationFrame(raf)
    document.removeEventListener('visibilitychange', onVis)
    window.removeEventListener('pointermove', onPointer)
    themeObs.disconnect(); io.disconnect(); ro.disconnect()
    scene.traverse((o) => { o.geometry?.dispose?.(); if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.map?.dispose?.(); m.dispose?.() }) } })
    glowTex.dispose(); renderer.dispose()
    el.contains(renderer.domElement) && el.removeChild(renderer.domElement)
  }
})

onBeforeUnmount(() => dispose())
</script>

<template>
  <div ref="host" class="proton-field" aria-hidden="true"></div>
</template>

<style scoped>
.proton-field {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
/* Dissolve the scene into the site background at the edges (no hard cutoff),
   keep the text side legible. Uses var(--vp-c-bg) so it blends in both themes. */
.proton-field::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, var(--vp-c-bg) 0%, transparent 24%),
    linear-gradient(to bottom, var(--vp-c-bg) 0%, transparent 14%),
    linear-gradient(90deg, var(--vp-c-bg) 0%, color-mix(in srgb, var(--vp-c-bg) 45%, transparent) 34%, transparent 70%);
  pointer-events: none;
}
@media (max-width: 768px) {
  .proton-field::after {
    background:
      linear-gradient(to top, var(--vp-c-bg) 0%, transparent 28%),
      linear-gradient(to bottom, var(--vp-c-bg) 0%, transparent 16%);
  }
}
</style>

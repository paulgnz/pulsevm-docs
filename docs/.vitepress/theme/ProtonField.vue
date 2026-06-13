<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const host = ref(null)
let dispose = () => {}

onMounted(async () => {
  if (typeof window === 'undefined' || !host.value) return
  const THREE = await import('three')
  const { EffectComposer } = await import('three/examples/jsm/postprocessing/EffectComposer.js')
  const { RenderPass } = await import('three/examples/jsm/postprocessing/RenderPass.js')
  const { UnrealBloomPass } = await import('three/examples/jsm/postprocessing/UnrealBloomPass.js')
  const el = host.value
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  const size = () => ({ w: el.clientWidth || 1, h: el.clientHeight || 1 })
  let { w, h } = size()
  renderer.setSize(w, h, false)
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
  camera.position.set(0, 0, 6.4)

  // brand palette (PulseVM glyph gradient) + indigo
  const ORANGE = 0xff8a3d, PURPLE = 0xa855f7, GREEN = 0x34d399, CORE = 0xc7d2fe

  const world = new THREE.Group(); scene.add(world)
  const atom = new THREE.Group(); world.add(atom)

  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128
    const g = c.getContext('2d')
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
    grd.addColorStop(0, 'rgba(160,170,255,0.9)')
    grd.addColorStop(0.4, 'rgba(120,110,255,0.35)')
    grd.addColorStop(1, 'rgba(120,110,255,0)')
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128)
    return new THREE.CanvasTexture(c)
  })()
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }))
  glow.scale.set(3.2, 3.2, 1); atom.add(glow)

  const nucleus = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 1), new THREE.MeshBasicMaterial({ color: CORE }))
  atom.add(nucleus)
  const nucleusWire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 1), new THREE.MeshBasicMaterial({ color: 0x8b95ff, wireframe: true, transparent: true, opacity: 0.4 }))
  atom.add(nucleusWire)

  const ringColors = [ORANGE, PURPLE, GREEN]
  const tilts = [[0.3, 0, 0.5], [-0.6, 0.4, -0.3], [0.2, -0.7, 0.9]]
  const electrons = []
  ringColors.forEach((col, i) => {
    const ring = new THREE.Group()
    ring.rotation.set(tilts[i][0] * Math.PI, tilts[i][1] * Math.PI, tilts[i][2] * Math.PI)
    const R = 1.5 + i * 0.45
    ring.add(new THREE.Mesh(new THREE.TorusGeometry(R, 0.012, 8, 120), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.55 })))
    const pivot = new THREE.Group()
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), new THREE.MeshBasicMaterial({ color: col }))
    e.position.set(R, 0, 0)
    const eglow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: col, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.8 }))
    eglow.scale.set(0.7, 0.7, 1); e.add(eglow)
    pivot.add(e); ring.add(pivot); atom.add(ring)
    electrons.push({ pivot, speed: 0.012 + i * 0.006, ring, tumble: (i % 2 ? 1 : -1) * 0.0008 })
  })

  // particle halo spread across the section
  const COUNT = 850
  const pos = new Float32Array(COUNT * 3)
  for (let i = 0; i < COUNT; i++) {
    const r = 2.4 + Math.random() * 2.6, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1)
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th); pos[i * 3 + 2] = r * Math.cos(ph)
  }
  const halo = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pos, 3)),
    new THREE.PointsMaterial({ color: 0x8b95ff, size: 0.022, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })
  )
  world.add(halo)

  // ---- post-processing: subtle bloom ----
  const composer = new EffectComposer(renderer)
  composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  composer.setSize(w, h)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.7, 0.55, 0.2) // strength, radius, threshold
  composer.addPass(bloom)

  // offset proton to the right on wide layouts so it sits clear of the text
  const layout = () => { world.position.x = (w / h > 1.25) ? 1.6 : 0 }
  layout()

  let raf = 0, t = 0, running = true
  const render = () => composer.render()
  const tick = () => {
    if (!running) return
    t += 1
    atom.rotation.y += 0.0016
    atom.rotation.x = Math.sin(t * 0.0009) * 0.18
    nucleus.rotation.y += 0.004; nucleusWire.rotation.x -= 0.006
    // subtle pulse — one gentle beat every 500ms
    const flare = Math.pow(1 - (performance.now() % 500) / 500, 4)
    nucleus.scale.setScalar(1 + flare * 0.12)
    nucleusWire.scale.setScalar(1 + flare * 0.07)
    glow.scale.set(3.2 * (1 + flare * 0.18), 3.2 * (1 + flare * 0.18), 1)
    glow.material.opacity = 0.72 + flare * 0.1
    halo.rotation.y -= 0.0006
    for (const e of electrons) { e.pivot.rotation.z += e.speed; e.ring.rotation.z += e.tumble }
    render()
    raf = requestAnimationFrame(tick)
  }

  const onVis = () => {
    if (document.hidden) { running = false; cancelAnimationFrame(raf) }
    else if (!reduceMotion) { running = true; tick() }
  }
  document.addEventListener('visibilitychange', onVis)

  const ro = new ResizeObserver(() => {
    const s = size(); w = s.w; h = s.h
    camera.aspect = w / h; camera.updateProjectionMatrix()
    renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h)
    layout(); render()
  })
  ro.observe(el)

  if (reduceMotion) render(); else tick()

  dispose = () => {
    running = false; cancelAnimationFrame(raf)
    document.removeEventListener('visibilitychange', onVis); ro.disconnect()
    scene.traverse((o) => { o.geometry?.dispose?.(); if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { m.map?.dispose?.(); m.dispose?.() }) } })
    glowTex.dispose(); composer.dispose?.(); renderer.dispose()
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
/* keep the text side legible: fade the canvas out under the copy */
.proton-field::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--vp-c-bg) 0%, color-mix(in srgb, var(--vp-c-bg) 55%, transparent) 38%, transparent 70%);
  pointer-events: none;
}
@media (max-width: 768px) {
  .proton-field::after {
    background: linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--vp-c-bg) 70%, transparent) 70%, var(--vp-c-bg) 100%);
  }
}
</style>

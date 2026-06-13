<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// A contained 3D scene: N validator nodes in a ring around a shared ledger
// core, with data pulses traveling the links. Decorative + illustrative for
// "a network you own." Defaults to 5 (the minimum consortium).
const props = defineProps({ nodes: { type: Number, default: 5 } })
const host = ref(null)
let dispose = () => {}

onMounted(async () => {
  if (typeof window === 'undefined' || !host.value) return
  if (window.matchMedia?.('(max-width: 768px)').matches) return // skip on mobile
  const THREE = await import('three')
  const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')
  const el = host.value
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
  renderer.setClearColor(0x000000, 0)
  const size = () => ({ w: el.clientWidth || 1, h: el.clientHeight || 1 })
  let { w, h } = size()
  renderer.setSize(w, h, false)
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
  camera.position.set(0, 3.4, 6.0)
  camera.lookAt(0, 0, 0)

  const world = new THREE.Group(); scene.add(world)

  // drag-to-rotate (auto-rotates when idle); zoom/pan off so page scroll works
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enableZoom = false
  controls.enablePan = false
  controls.minPolarAngle = 0.5
  controls.maxPolarAngle = 1.45
  controls.autoRotate = !reduceMotion
  controls.autoRotateSpeed = 0.7
  controls.enableDamping = !reduceMotion
  controls.dampingFactor = 0.08
  controls.update()

  const dark = () => document.documentElement.classList.contains('dark')
  const NODE = 0x4f7cff, LEDGER = 0x8b95ff, LINK = 0x6366f1

  // shared ledger core
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), new THREE.MeshBasicMaterial({ color: LEDGER, transparent: true, opacity: 0.9 }))
  world.add(core)
  const coreWire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 1), new THREE.MeshBasicMaterial({ color: LEDGER, wireframe: true, transparent: true, opacity: 0.3 }))
  world.add(coreWire)

  // validator nodes in a ring
  const N = Math.max(3, Math.min(props.nodes, 9))
  const R = 2.6
  const nodes = []
  const linkGeom = []
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2
    const pos = new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R)
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.26, 24, 24), new THREE.MeshBasicMaterial({ color: NODE }))
    node.position.copy(pos); world.add(node); nodes.push(node)
    // link node -> core
    const g = new THREE.BufferGeometry().setFromPoints([pos, new THREE.Vector3(0, 0, 0)])
    const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color: LINK, transparent: true, opacity: 0.35 }))
    world.add(line); linkGeom.push({ from: pos.clone() })
  }
  // ring connecting neighbours
  const ringPts = nodes.map((n) => n.position.clone()); ringPts.push(nodes[0].position.clone())
  const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ringPts), new THREE.LineBasicMaterial({ color: LINK, transparent: true, opacity: 0.18 }))
  world.add(ring)

  // data pulses traveling node -> core
  const pulseGeo = new THREE.SphereGeometry(0.07, 12, 12)
  const pulses = linkGeom.map((l, i) => {
    const m = new THREE.Mesh(pulseGeo, new THREE.MeshBasicMaterial({ color: 0xa8c0ff }))
    world.add(m); return { m, from: l.from, t: i / N }
  })

  const applyTheme = () => {
    const d = dark()
    core.material.opacity = d ? 0.9 : 1
    nodes.forEach((n) => n.material.color.set(d ? 0x4f7cff : 0x2348c8))
    ;[...world.children].forEach(() => {})
  }
  applyTheme()
  const themeObs = new MutationObserver(applyTheme)
  themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  let raf = 0, t = 0, running = false, onScreen = true
  const render = () => renderer.render(scene, camera)
  const tick = () => {
    if (!running) return
    t += 1
    controls.update()
    core.rotation.y += 0.005; coreWire.rotation.x -= 0.006
    for (const p of pulses) {
      p.t += 0.006; if (p.t > 1) p.t -= 1
      p.m.position.lerpVectors(p.from, new THREE.Vector3(0, 0, 0), p.t)
      p.m.material.opacity = Math.sin(p.t * Math.PI)
    }
    render()
    raf = requestAnimationFrame(tick)
  }
  const update = () => {
    const go = onScreen && !document.hidden && !reduceMotion
    if (go && !running) { running = true; tick() }
    else if (!go && running) { running = false; cancelAnimationFrame(raf) }
  }
  document.addEventListener('visibilitychange', update)
  const io = new IntersectionObserver((es) => { onScreen = es[0]?.isIntersecting ?? true; update() }, { threshold: 0 })
  io.observe(el)
  const ro = new ResizeObserver(() => { const s = size(); w = s.w; h = s.h; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false); render() })
  ro.observe(el)
  if (reduceMotion) { controls.addEventListener('change', render); render() } else update()

  dispose = () => {
    running = false; cancelAnimationFrame(raf)
    document.removeEventListener('visibilitychange', update); themeObs.disconnect(); io.disconnect(); ro.disconnect()
    scene.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.() })
    controls.dispose(); renderer.dispose(); el.contains(renderer.domElement) && el.removeChild(renderer.domElement)
  }
})
onBeforeUnmount(() => dispose())
</script>

<template>
  <figure class="network-scene">
    <div ref="host" class="network-canvas" aria-hidden="true"></div>
    <figcaption>A consortium network you operate: named validator institutions around a shared, instantly-final ledger.</figcaption>
  </figure>
</template>

<style scoped>
.network-scene { margin: 1.5rem 0; }
.network-canvas {
  width: 100%;
  height: 360px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--vp-c-brand-1) 5%, transparent), transparent);
  cursor: grab;
}
.network-canvas:active { cursor: grabbing; }
.network-scene figcaption {
  margin-top: 0.6rem; font-size: 0.85rem; color: var(--vp-c-text-2); text-align: center;
}
@media (max-width: 768px) { .network-canvas { display: none; } }
</style>

/* ============================================================================
   PulseVM proton atom — flagship Three.js hero scene.

   Concept: an orbital chronometer with a heartbeat. A fresnel-lit nucleus
   wrapped in a volumetric glow beats a slow lub-dub and emits spherical light
   wavefronts (fresnel shell + hairline ring). Light in this scene is causal:
   the wavefront flashes each orbit ring and its electron at the exact moment
   it crosses that orbit's radius, and shimmers the ambient particle field as
   it passes through. Each electron illuminates its own orbit line — a soft
   traveling highlight rides the ring underneath it, trailed by a fading comet
   tail. Orbits thread in front of and behind the nucleus with true depth:
   ring segments, trails and glows all attenuate with view distance
   (atmosphere), and the whole atom precesses while the camera parallax-
   follows the pointer. Middle orbit carries the single warm accent and runs
   counter-rotation.

   Everything is single-pass ShaderMaterials — no postprocessing chain.
   ~23 draw calls, zero per-frame allocations, DPR capped at 2, pausable.

   Framework-agnostic: `mountProtonAtom(el, opts)` -> handle.
   Used by docs/.vitepress/theme/ProtonAtom.vue (bundled via Vite) and by
   docs/public/brand/atom-3d-preview.html (import-mapped CDN three). r171.
   ========================================================================== */
import * as THREE from 'three'

const TAU = Math.PI * 2

/* ----------------------------- composition ------------------------------- */
/* ringColor stays in the cool brand field; `color` (electron, trail, traveling
   highlight) is where the middle orbit carries the single warm accent */
const ORBITS = [
  { R: 1.38, tilt: [-0.42, 0.0, -0.28], speed: TAU / 9,   color: 0x6d8cff, ringColor: 0x6d8cff, trailSpan: 1.35 },
  { R: 1.82, tilt: [0.95, 0.35, 0.46],  speed: -TAU / 14, color: 0xf7a356, ringColor: 0x7b8bf5, trailSpan: 1.0 },
  { R: 2.12, tilt: [1.35, -0.4, 1.73],  speed: TAU / 20,  color: 0x8b95ff, ringColor: 0x8b95ff, trailSpan: 0.78 },
]

const THEMES = {
  dark: {
    additive: true,
    ringOpacity: 0.4,
    elecRingGlow: 1.35,       // strength of the electron's traveling highlight
    flashGain: 1.0,           // heartbeat flash on rings as wavefronts cross
    dialOpacity: 0.14,
    partOpacity: 0.6,
    partColor: 0x8b95ff,
    trailOpacity: 1.0,
    glowOpacity: 0.62,        // electron glow sprites
    coreCenter: 0xf2f5ff,
    coreRim: 0x7d97ff,
    glowCol1: 0xe4eaff,       // nucleus volumetric glow, inner
    glowCol2: 0x7a6df0,       // outer (violet falloff)
    glowIntensity: 1.12,      // the atom is the light source of the page
    glowScale: 1.4,           // widens the halo (billboard scale)
    shellAlpha: 0.85,
    waveLineOpacity: 0.72,
    hairlineOpacity: 0.38,
  },
  light: {
    additive: false,
    ringOpacity: 0.55,
    elecRingGlow: 0.8,
    flashGain: 0.7,
    dialOpacity: 0.22,
    partOpacity: 0.55,
    partColor: 0x5b72e8,
    trailOpacity: 0.55,
    glowOpacity: 0.22,
    coreCenter: 0xc9d6ff,
    coreRim: 0x4f7cff,
    glowCol1: 0x7d97ff,
    glowCol2: 0x8b95ff,
    glowIntensity: 0.32,
    glowScale: 1.0,
    shellAlpha: 0.24,
    waveLineOpacity: 0.45,
    hairlineOpacity: 0.45,
  },
}

/* ------------------------------- shaders ---------------------------------- */
const FRESNEL_VERT = /* glsl */ `
  varying vec3 vN; varying vec3 vV;
  void main() {
    vN = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }`

const CORE_FRAG = /* glsl */ `
  uniform vec3 uCenter; uniform vec3 uRim;
  varying vec3 vN; varying vec3 vV;
  void main() {
    float f = pow(1.0 - abs(dot(vN, vV)), 1.7);
    gl_FragColor = vec4(mix(uCenter, uRim, f), 1.0);
  }`

const SHELL_FRAG = /* glsl */ `
  uniform vec3 uColor; uniform float uAlpha;
  varying vec3 vN; varying vec3 vV;
  void main() {
    float f = pow(1.0 - abs(dot(vN, vV)), 2.6);
    gl_FragColor = vec4(uColor, f * uAlpha);
  }`

/* nucleus volumetric glow: layered exponential falloff on a billboard quad —
   banding-free, HDR-ish curve, white-blue core cooling to violet */
const GLOW_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`

const GLOW_FRAG = /* glsl */ `
  uniform vec3 uCol1; uniform vec3 uCol2; uniform float uIntensity;
  varying vec2 vUv;
  void main() {
    float r = length(vUv - 0.5) * 2.0;
    float i = 1.35 * exp(-r * r * 26.0) + 0.5 * exp(-r * r * 7.0) + 0.22 * exp(-r * 2.1);
    i *= smoothstep(1.0, 0.58, r);   /* window to zero well inside the quad edge */
    vec3 col = mix(uCol1, uCol2, smoothstep(0.0, 0.72, r));
    gl_FragColor = vec4(col, clamp(i, 0.0, 1.0) * uIntensity);
  }`

/* orbit ring: hairline lit by its own electron (traveling highlight), flashed
   by the passing heartbeat wavefront, with view-depth atmospheric fade.
   Angle is carried as a direction vector so the loop seam interpolates clean. */
const RING_VERT = /* glsl */ `
  attribute vec2 aDir;
  varying vec2 vDir; varying float vZ;
  void main() {
    vDir = aDir;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vZ = mv.z;
    gl_Position = projectionMatrix * mv;
  }`

const RING_FRAG = /* glsl */ `
  uniform vec3 uColor; uniform vec3 uHot;
  uniform vec2 uElecDir; uniform float uElecGlow;
  uniform float uOpacity; uniform float uFlash;
  varying vec2 vDir; varying float vZ;
  void main() {
    float e = exp((dot(normalize(vDir), uElecDir) - 1.0) * 9.0);   // highlight under electron
    float depth = mix(0.38, 1.0, smoothstep(-9.4, -5.0, vZ));      // atmosphere: far side recedes
    float a = (uOpacity + e * uElecGlow + uFlash * 0.9) * depth;
    vec3 col = mix(uColor, uHot, min(1.0, e * 0.85 + uFlash * 0.5));
    gl_FragColor = vec4(col, min(a, 1.0));
  }`

/* comet trail / ambient particles: size-attenuated round points with soft
   falloff; trails fade along the arc, particles shimmer as wavefronts pass */
const POINTS_VERT = /* glsl */ `
  attribute float aSize; attribute float aAlpha; attribute float aSeed;
  uniform float uScale; uniform float uTime;
  uniform float uW1r, uW1a, uW2r, uW2a;
  varying float vAlpha;
  void main() {
    float twinkle = 0.75 + 0.25 * sin(uTime * (0.5 + fract(aSeed) * 1.3) + aSeed * 37.0);
    float rad = length(position);
    float s1 = uW1a * exp(-pow(rad - uW1r, 2.0) * 26.0);           // wavefront shimmer
    float s2 = uW2a * exp(-pow(rad - uW2r, 2.0) * 26.0);
    float boost = 1.0 + 1.6 * (s1 + s2);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float depth = mix(0.45, 1.0, smoothstep(-10.0, -4.6, mv.z));
    vAlpha = aAlpha * twinkle * boost * depth;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (0.9 + 0.35 * (s1 + s2)) * uScale / -mv.z;
  }`

const POINTS_FRAG = /* glsl */ `
  uniform vec3 uColor; uniform float uOpacity;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = smoothstep(1.0, 0.0, d);
    a *= a;
    gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
  }`

/* ------------------------------- helpers ---------------------------------- */
function glowTexture(stops) {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  for (const [off, col] of stops) grd.addColorStop(off, col)
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function circleLine(radius, segments, color, opacity) {
  const pts = []
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * TAU
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts)
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false })
  return new THREE.LineLoop(geo, mat)
}

function makePoints({ positions, sizes, alphas, seeds, color, opacity, blending }) {
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geo.setAttribute('aAlpha', new THREE.BufferAttribute(alphas, 1))
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
  const mat = new THREE.ShaderMaterial({
    vertexShader: POINTS_VERT,
    fragmentShader: POINTS_FRAG,
    uniforms: {
      uScale: { value: 600 },
      uTime: { value: 0 },
      uW1r: { value: 0 }, uW1a: { value: 0 },
      uW2r: { value: 0 }, uW2a: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
    },
    transparent: true,
    depthWrite: false,
    blending,
  })
  return { points: new THREE.Points(geo, mat), geo, mat }
}

/* -------------------------------- mount ----------------------------------- */
export function mountProtonAtom(el, { dark = true, interactive = true, offsetRight = true } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0x000000, 0)
  let w = el.clientWidth || 1
  let h = el.clientHeight || 1
  renderer.setSize(w, h, false)
  renderer.domElement.style.cssText = 'width:100%;height:100%;display:block'
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 60)
  camera.position.set(0, 0, 7.2)

  const disposables = []
  const track = (o) => (disposables.push(o), o)

  const tightTex = track(glowTexture([[0, 'rgba(255,255,255,1)'], [0.25, 'rgba(255,255,255,0.45)'], [1, 'rgba(255,255,255,0)']]))

  /* hierarchy: worldTilt (parallax) > atom (precession) > orbits/nucleus */
  const worldTilt = new THREE.Group()
  scene.add(worldTilt)
  const atom = new THREE.Group()
  worldTilt.add(atom)

  /* ---- nucleus: fresnel core + volumetric glow billboard ---- */
  const coreMat = track(new THREE.ShaderMaterial({
    vertexShader: FRESNEL_VERT,
    fragmentShader: CORE_FRAG,
    uniforms: { uCenter: { value: new THREE.Color() }, uRim: { value: new THREE.Color() } },
  }))
  const core = new THREE.Mesh(track(new THREE.SphereGeometry(0.3, 48, 32)), coreMat)
  atom.add(core)

  const glowMat = track(new THREE.ShaderMaterial({
    vertexShader: GLOW_VERT,
    fragmentShader: GLOW_FRAG,
    uniforms: {
      uCol1: { value: new THREE.Color() },
      uCol2: { value: new THREE.Color() },
      uIntensity: { value: 0.85 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }))
  /* lives in worldTilt (not atom) so precession never tilts the billboard;
     the atom's origin — the nucleus — is worldTilt's origin */
  const glowQuad = new THREE.Mesh(track(new THREE.PlaneGeometry(3.6, 3.6)), glowMat)
  glowQuad.renderOrder = -1
  worldTilt.add(glowQuad)

  const hairlines = [circleLine(0.52, 96, 0x8b95ff, 0.3), circleLine(0.66, 96, 0x8b95ff, 0.18)]
  hairlines.forEach((l, i) => {
    track(l.geometry); track(l.material)
    l.rotation.set(0.9 + i * 0.6, 0.4 - i, 0)
    atom.add(l)
  })

  /* ---- orbits: lit hairline ring + electron + glow + comet trail ---- */
  const orbits = ORBITS.map((o) => {
    const plane = new THREE.Group()
    plane.rotation.set(o.tilt[0], o.tilt[1], o.tilt[2])
    atom.add(plane)

    /* ring with electron-highlight shader */
    const SEG = 256
    const rPos = new Float32Array(SEG * 3)
    const rDir = new Float32Array(SEG * 2)
    for (let i = 0; i < SEG; i++) {
      const a = (i / SEG) * TAU
      rPos[i * 3] = Math.cos(a) * o.R
      rPos[i * 3 + 1] = Math.sin(a) * o.R
      rDir[i * 2] = Math.cos(a)
      rDir[i * 2 + 1] = Math.sin(a)
    }
    const rGeo = track(new THREE.BufferGeometry())
    rGeo.setAttribute('position', new THREE.BufferAttribute(rPos, 3))
    rGeo.setAttribute('aDir', new THREE.BufferAttribute(rDir, 2))
    const col = new THREE.Color(o.color)
    const rMat = track(new THREE.ShaderMaterial({
      vertexShader: RING_VERT,
      fragmentShader: RING_FRAG,
      uniforms: {
        uColor: { value: new THREE.Color(o.ringColor) },
        uHot: { value: col.clone().lerp(new THREE.Color(0xffffff), 0.6) },
        uElecDir: { value: new THREE.Vector2(1, 0) },
        uElecGlow: { value: 1 },
        uOpacity: { value: 0.34 },
        uFlash: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
    }))
    plane.add(new THREE.LineLoop(rGeo, rMat))

    const pivot = new THREE.Group()
    plane.add(pivot)

    const eMat = track(new THREE.MeshBasicMaterial({ color: col.clone().lerp(new THREE.Color(0xffffff), 0.4) }))
    const electron = new THREE.Mesh(track(new THREE.SphereGeometry(0.05, 20, 14)), eMat)
    electron.position.set(o.R, 0, 0)
    pivot.add(electron)

    const gMat = track(new THREE.SpriteMaterial({ map: tightTex, color: o.color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }))
    const glow = new THREE.Sprite(gMat)
    glow.scale.setScalar(0.55)
    electron.add(glow)

    /* comet trail: fixed arc of points behind the electron, rides the pivot */
    const N = 48
    const dir = Math.sign(o.speed)
    const tPos = new Float32Array(N * 3)
    const tSize = new Float32Array(N)
    const tAlpha = new Float32Array(N)
    const tSeed = new Float32Array(N)
    for (let k = 0; k < N; k++) {
      const f = k / (N - 1)
      const a = -dir * f * o.trailSpan
      tPos[k * 3] = Math.cos(a) * o.R
      tPos[k * 3 + 1] = Math.sin(a) * o.R
      tSize[k] = 0.11 * (1 - f) + 0.02
      tAlpha[k] = Math.pow(1 - f, 1.6)
      tSeed[k] = k * 0.618
    }
    const trail = makePoints({
      positions: tPos, sizes: tSize, alphas: tAlpha, seeds: tSeed,
      color: o.color, opacity: 0.85, blending: THREE.AdditiveBlending,
    })
    track(trail.geo); track(trail.mat)
    pivot.add(trail.points)

    return { ...o, pivot, electron, glow, gMat, rMat, tMat: trail.mat, angle: Math.random() * TAU, flash: 0 }
  })
  orbits.forEach((o) => (o.pivot.rotation.z = o.angle))

  /* ---- heartbeat wavefronts: fresnel shell + hairline ring, lub & dub ---- */
  const shellGeo = track(new THREE.SphereGeometry(1, 48, 32))
  const waves = [0, 1].map(() => {
    const sMat = track(new THREE.ShaderMaterial({
      vertexShader: FRESNEL_VERT,
      fragmentShader: SHELL_FRAG,
      uniforms: { uColor: { value: new THREE.Color(0x7c92ff) }, uAlpha: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }))
    const shell = new THREE.Mesh(shellGeo, sMat)
    shell.visible = false
    atom.add(shell)
    const ring = circleLine(1, 160, 0x7c92ff, 0)
    track(ring.geometry); track(ring.material)
    ring.visible = false
    worldTilt.add(ring)
    return { shell, sMat, ring }
  })

  /* ---- engraved dial + ambient particle field ---- */
  const dial = new THREE.Group()
  const tickGeo = track(new THREE.BufferGeometry())
  {
    const T = 96
    const v = new Float32Array(T * 6)
    for (let i = 0; i < T; i++) {
      const a = (i / T) * TAU
      v[i * 6] = Math.cos(a) * 2.72; v[i * 6 + 1] = Math.sin(a) * 2.72
      v[i * 6 + 3] = Math.cos(a) * 2.78; v[i * 6 + 4] = Math.sin(a) * 2.78
    }
    tickGeo.setAttribute('position', new THREE.BufferAttribute(v, 3))
  }
  const tickMat = track(new THREE.LineBasicMaterial({ color: 0x8b95ff, transparent: true, opacity: 0.12, depthWrite: false }))
  dial.add(new THREE.LineSegments(tickGeo, tickMat))
  const dialRing = circleLine(2.95, 128, 0x8b95ff, 0.06)
  track(dialRing.geometry); track(dialRing.material)
  dial.add(dialRing)
  worldTilt.add(dial)

  const PCOUNT = 520
  const pPos = new Float32Array(PCOUNT * 3)
  const pSize = new Float32Array(PCOUNT)
  const pAlpha = new Float32Array(PCOUNT)
  const pSeed = new Float32Array(PCOUNT)
  for (let i = 0; i < PCOUNT; i++) {
    const r = 1.1 + Math.pow(Math.random(), 0.7) * 4.0
    const th = Math.random() * TAU
    const ph = Math.acos(2 * Math.random() - 1)
    pPos[i * 3] = r * Math.sin(ph) * Math.cos(th)
    pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
    pPos[i * 3 + 2] = r * Math.cos(ph)
    pSize[i] = 0.018 + Math.random() * 0.03
    pAlpha[i] = 0.35 + Math.random() * 0.65
    pSeed[i] = Math.random() * 100
  }
  const field = makePoints({
    positions: pPos, sizes: pSize, alphas: pAlpha, seeds: pSeed,
    color: 0x8b95ff, opacity: 0.5, blending: THREE.AdditiveBlending,
  })
  track(field.geo); track(field.mat)
  worldTilt.add(field.points)

  /* ------------------------------- theming -------------------------------- */
  let theme = THEMES[dark ? 'dark' : 'light']
  function applyTheme(isDark) {
    theme = THEMES[isDark ? 'dark' : 'light']
    const blend = theme.additive ? THREE.AdditiveBlending : THREE.NormalBlending
    coreMat.uniforms.uCenter.value.set(theme.coreCenter)
    coreMat.uniforms.uRim.value.set(theme.coreRim)
    glowMat.uniforms.uCol1.value.set(theme.glowCol1)
    glowMat.uniforms.uCol2.value.set(theme.glowCol2)
    glowMat.blending = blend
    glowMat.needsUpdate = true
    hairlines.forEach((l, i) => (l.material.opacity = theme.hairlineOpacity * (i ? 0.55 : 1)))
    orbits.forEach((o) => {
      o.rMat.uniforms.uOpacity.value = theme.ringOpacity
      o.rMat.uniforms.uElecGlow.value = theme.elecRingGlow
      o.gMat.blending = blend
      o.gMat.needsUpdate = true
      o.tMat.uniforms.uOpacity.value = theme.trailOpacity
      o.tMat.blending = blend
      o.tMat.needsUpdate = true
    })
    waves.forEach((wv) => {
      wv.sMat.blending = blend
      wv.sMat.needsUpdate = true
    })
    tickMat.opacity = theme.dialOpacity
    dialRing.material.opacity = theme.dialOpacity * 0.5
    field.mat.uniforms.uOpacity.value = theme.partOpacity
    field.mat.uniforms.uColor.value.set(theme.partColor)
    field.mat.blending = blend
    field.mat.needsUpdate = true
    glowQuad.scale.setScalar(theme.glowScale)
  }
  applyTheme(dark)

  /* -------------------------------- layout -------------------------------- */
  let baseX = 0
  function layout() {
    baseX = offsetRight && w / h > 1.25 ? 1.55 : 0
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    const fovScale = (renderer.domElement.height || h) / (2 * Math.tan((camera.fov * Math.PI) / 360))
    orbits.forEach((o) => (o.tMat.uniforms.uScale.value = fovScale))
    field.mat.uniforms.uScale.value = fovScale
  }
  layout()
  const ro = new ResizeObserver(() => {
    w = el.clientWidth || 1
    h = el.clientHeight || 1
    renderer.setSize(w, h, false)
    layout()
    if (!running) render()
  })
  ro.observe(el)

  /* -------------------------------- pointer ------------------------------- */
  let tx = 0, ty = 0, px = 0, py = 0
  const onPointer = (ev) => {
    tx = (ev.clientX / window.innerWidth) * 2 - 1
    ty = (ev.clientY / window.innerHeight) * 2 - 1
  }
  const canHover = window.matchMedia?.('(hover: hover)').matches
  if (interactive && canHover) window.addEventListener('pointermove', onPointer, { passive: true })

  /* ------------------------------- heartbeat ------------------------------ */
  const BEAT = 3.4
  const BEATS = [{ at: 0, amp: 1 }, { at: 0.44, amp: 0.55 }]
  const WAVE_SPEED = 2.05
  const WAVE_MAX = 3.6

  /* -------------------------------- animate ------------------------------- */
  let raf = 0
  let running = false
  let t = 0
  let last = 0
  const tmpV = new THREE.Vector3()
  const render = () => renderer.render(scene, camera)
  scene.updateMatrixWorld(true)

  function frame(now) {
    if (!running) return
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
    last = now
    t += dt

    /* parallax + autonomous drift */
    px += (tx - px) * 0.04
    py += (ty - py) * 0.04
    worldTilt.position.x = baseX + px * 0.3
    worldTilt.position.y = -py * 0.18
    worldTilt.rotation.y = px * 0.16 + Math.sin(t * 0.11) * 0.05
    worldTilt.rotation.x = py * 0.12 + Math.cos(t * 0.09) * 0.035

    /* precession */
    atom.rotation.y += dt * 0.055
    atom.rotation.x = Math.sin(t * 0.045) * 0.16
    dial.rotation.z += dt * 0.02
    field.points.rotation.y -= dt * 0.011
    field.mat.uniforms.uTime.value = t

    /* heartbeat: envelope, wavefronts, causal flashes */
    const tb = t % BEAT
    let env = 0
    for (let i = 0; i < BEATS.length; i++) {
      const b = BEATS[i]
      let s = tb - b.at
      if (s < 0) s += BEAT
      env += b.amp * Math.exp(-s * 7) * Math.min(1, s * 40)

      const wv = waves[i]
      const r = 0.34 + s * WAVE_SPEED
      const a = r < WAVE_MAX ? b.amp * Math.exp(-s * 1.5) * Math.min(1, s * 26) : 0
      wv.shell.visible = wv.ring.visible = a > 0.004
      wv.shell.scale.setScalar(r)
      wv.sMat.uniforms.uAlpha.value = a * theme.shellAlpha
      wv.ring.scale.setScalar(r)
      wv.ring.material.opacity = a * theme.waveLineOpacity

      /* particle field shimmers where the wavefront currently is */
      const u = field.mat.uniforms
      if (i === 0) { u.uW1r.value = r; u.uW1a.value = a } else { u.uW2r.value = r; u.uW2a.value = a }

      /* wavefront crosses an orbit radius -> that ring + electron flash */
      for (const o of orbits) {
        const d = Math.abs(r - o.R)
        if (d < 0.22) o.flash = Math.max(o.flash, (1 - d / 0.22) * a)
      }
    }
    core.scale.setScalar(1 + env * 0.05)
    glowMat.uniforms.uIntensity.value = theme.glowIntensity * (1 + env * 0.7)
    glowQuad.scale.setScalar(theme.glowScale * (1 + env * 0.06))

    /* orbits: motion, traveling ring highlight, depth-aware electron glow */
    for (const o of orbits) {
      o.angle += o.speed * dt
      o.pivot.rotation.z = o.angle
      o.rMat.uniforms.uElecDir.value.set(Math.cos(o.angle), Math.sin(o.angle))
      o.flash *= Math.pow(0.02, dt)
      o.rMat.uniforms.uFlash.value = o.flash * theme.flashGain
      /* depth cue: electron glow recedes when it swings behind the nucleus
         (world z from last frame's matrices — 1-frame lag is invisible) */
      tmpV.setFromMatrixPosition(o.electron.matrixWorld)
      const depth = 0.5 + 0.5 * THREE.MathUtils.smoothstep(tmpV.z, -2.3, 2.3)
      const f = o.flash
      o.glow.scale.setScalar(0.55 * (0.8 + 0.4 * depth) * (1 + f * 0.9))
      o.gMat.opacity = theme.glowOpacity * (0.55 + 0.65 * depth) * (1 + f * 1.6)
    }

    render()
    raf = requestAnimationFrame(frame)
  }

  function resume() {
    if (running) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(frame)
  }
  function pause() {
    running = false
    cancelAnimationFrame(raf)
  }
  resume()

  /* -------------------------------- dispose ------------------------------- */
  let onContextLost = null
  const ctxLost = (e) => { e.preventDefault(); pause(); onContextLost?.() }
  renderer.domElement.addEventListener('webglcontextlost', ctxLost)

  function dispose() {
    pause()
    ro.disconnect()
    window.removeEventListener('pointermove', onPointer)
    renderer.domElement.removeEventListener('webglcontextlost', ctxLost)
    disposables.forEach((d) => d.dispose?.())
    renderer.dispose()
    if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
  }

  return {
    pause,
    resume,
    dispose,
    setTheme: applyTheme,
    setPointer(nx, ny) { tx = nx; ty = ny },
    onContextLost(cb) { onContextLost = cb },
    get running() { return running },
  }
}

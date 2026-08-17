<script setup>
/* ============================================================================
   ProtonAtom — flagship WebGL hero visual (replaces ProtonField).

   - Scene lives in ./proton-atom-scene.js (a synced copy in
     docs/public/brand/ powers /brand/atom-3d-preview.html). Three.js + scene
     are lazy-loaded: dynamic import only after the hero is on screen AND the
     browser is idle, so LCP never pays for WebGL.
   - Mobile / prefers-reduced-motion / no-WebGL / context-loss all fall back
     to the animated SVG mark (/brand/proton-atom.svg), which carries its own
     reduced-motion static state — so every visitor gets a hero visual.
   - Follows the VitePress `.dark` toggle live; pauses when the tab is hidden
     or the hero scrolls out of view; DPR capped at 2 inside the scene.
   ========================================================================== */
import { ref, onMounted, onBeforeUnmount } from 'vue'

const host = ref(null)
const mode = ref('') // '' | 'gl' | 'svg'

let cleanups = []
const addCleanup = (fn) => cleanups.push(fn)

onMounted(() => {
  if (typeof window === 'undefined' || !host.value) return
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const small = window.matchMedia?.('(max-width: 768px)').matches
  const webgl = (() => {
    try {
      const c = document.createElement('canvas')
      return !!(c.getContext('webgl2') || c.getContext('webgl'))
    } catch { return false }
  })()
  if (reduce || small || !webgl) { mode.value = 'svg'; return }

  mode.value = 'gl'
  const el = host.value
  let scene = null
  let disposed = false
  let onScreen = true

  const boot = async () => {
    try {
      const { mountProtonAtom } = await import('./proton-atom-scene.js')
      if (disposed) return
      scene = mountProtonAtom(el, {
        dark: document.documentElement.classList.contains('dark'),
        interactive: true,
        offsetRight: true,
      })
      scene.onContextLost(() => {
        scene?.dispose()
        scene = null
        mode.value = 'svg'
      })

      /* live theme sync with the VitePress toggle */
      const themeObs = new MutationObserver(() => {
        scene?.setTheme(document.documentElement.classList.contains('dark'))
      })
      themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
      addCleanup(() => themeObs.disconnect())

      /* pause when hidden or offscreen */
      const update = () => {
        if (!scene) return
        if (onScreen && !document.hidden) scene.resume()
        else scene.pause()
      }
      const onVis = () => update()
      document.addEventListener('visibilitychange', onVis)
      addCleanup(() => document.removeEventListener('visibilitychange', onVis))
      const io2 = new IntersectionObserver((es) => {
        onScreen = es[0]?.isIntersecting ?? true
        update()
      }, { threshold: 0 })
      io2.observe(el)
      addCleanup(() => io2.disconnect())
      update()
    } catch {
      /* three failed to load — graceful degrade */
      if (!disposed) mode.value = 'svg'
    }
  }

  /* lazy boot: wait for the hero to be visible, then for idle */
  const io = new IntersectionObserver((es) => {
    if (!es[0]?.isIntersecting) return
    io.disconnect()
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 180))
    idle(() => { if (!disposed) boot() }, { timeout: 1200 })
  }, { threshold: 0 })
  io.observe(el)
  addCleanup(() => io.disconnect())
  addCleanup(() => { disposed = true; scene?.dispose() })
})

onBeforeUnmount(() => {
  cleanups.forEach((fn) => fn())
  cleanups = []
})
</script>

<template>
  <div ref="host" class="proton-atom" :class="mode" aria-hidden="true">
    <img v-if="mode === 'svg'" class="atom-svg" src="/brand/proton-atom.svg" alt="" />
  </div>
</template>

<style scoped>
/* backdrop for the first viewport: the home-hero-before slot renders as a
   sibling of VPHero, so absolute positioning resolves against the initial
   containing block — pin it to the top screenful deterministically */
.proton-atom {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  max-height: 1080px;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

/* SVG fallback placement: right-of-text on wide screens, behind-text on small */
.atom-svg {
  position: absolute;
  top: 50%;
  right: 4%;
  transform: translateY(-50%);
  width: min(44%, 520px);
  height: auto;
}
@media (max-width: 960px) {
  .atom-svg {
    right: 50%;
    transform: translate(50%, -50%);
    width: min(80vw, 380px);
    opacity: 0.45;
  }
}

/* Dissolve the scene into the page background at the edges; keep the text
   side legible. Uses var(--vp-c-bg) so it blends in both themes. */
.proton-atom::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, var(--vp-c-bg) 0%, transparent 24%),
    linear-gradient(to bottom, var(--vp-c-bg) 0%, transparent 14%),
    linear-gradient(90deg, var(--vp-c-bg) 0%, color-mix(in srgb, var(--vp-c-bg) 45%, transparent) 34%, transparent 70%);
  pointer-events: none;
}
@media (max-width: 960px) {
  .proton-atom::after {
    background:
      linear-gradient(to top, var(--vp-c-bg) 0%, transparent 28%),
      linear-gradient(to bottom, var(--vp-c-bg) 0%, transparent 16%);
  }
}
</style>

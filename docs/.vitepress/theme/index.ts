import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ProtonAtom from './ProtonAtom.vue'
import NetworkScene from './NetworkScene.vue'
import './custom.css'

// Full-bleed Three.js proton animation behind the home hero (text overlaid).
// ProtonAtom lazy-loads WebGL after the hero is visible and falls back to the
// animated SVG mark on mobile / reduced-motion / no-WebGL.
// NetworkScene is registered globally so it can be used in markdown.
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NetworkScene', NetworkScene)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => h(ProtonAtom),
    })
  },
}

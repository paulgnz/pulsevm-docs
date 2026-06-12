import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ProtonField from './ProtonField.vue'

// Mount a procedural Three.js proton/atom animation in the home hero's
// right-hand image slot (client-only; the component guards SSR).
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(ProtonField),
    })
  },
}

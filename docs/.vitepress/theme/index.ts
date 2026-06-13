import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ProtonField from './ProtonField.vue'
import NetworkScene from './NetworkScene.vue'
import ArchStack from './ArchStack.vue'
import './custom.css'

// Full-bleed Three.js proton animation behind the home hero (text overlaid).
// NetworkScene is registered globally so it can be used in markdown.
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NetworkScene', NetworkScene)
    app.component('ArchStack', ArchStack)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => h(ProtonField),
    })
  },
}

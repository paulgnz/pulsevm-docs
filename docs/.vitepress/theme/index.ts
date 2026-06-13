import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ProtonField from './ProtonField.vue'
import './custom.css'

// Full-bleed Three.js proton animation behind the home hero (text overlaid).
// Injected via the home-hero-before slot; the component absolutely-positions
// itself to fill the hero. Client-only + SSR-guarded inside the component.
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-before': () => h(ProtonField),
    })
  },
}

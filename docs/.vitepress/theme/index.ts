import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useRoute } from 'vitepress'

// Adds a "View as Markdown" link (agent/LLM affordance) above each doc page.
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => {
        const route = useRoute()
        const md = route.path.replace(/\/$/, '/index').replace(/(\.html)?$/, '') + '.md'
        return h(
          'div',
          { style: 'text-align:right; margin-bottom:-8px;' },
          h('a', { href: md, style: 'font-size:12px; opacity:.6;', title: 'Raw markdown for humans, agents, and LLMs' }, '📄 view as markdown')
        )
      },
    })
  },
}

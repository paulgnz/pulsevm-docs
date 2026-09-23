import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'PulseVM',
  description:
    'PulseVM is a non-EVM, Antelope-based blockchain for banks and fintechs: tokenized deposits, named accounts, native multisig, instant finality — a permissioned network you own.',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    // apply the remembered sidebar-hidden state before first paint (see theme/SidebarToggle.vue)
    ['script', {}, "try{if(localStorage.getItem('pvm-sidebar-hidden')==='1'){document.documentElement.classList.add('pvm-sidebar-hidden')}}catch(e){}"],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#4F7CFF' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'PulseVM' }],
    ['meta', { property: 'og:image', content: 'https://pulsevm.dev/brand/og.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'PulseVM' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://pulsevm.dev/brand/og.png' }],
    ['meta', { name: 'keywords', content: 'non-EVM blockchain, EVM alternative, tokenized deposits, permissioned blockchain for banks, stablecoin issuance, Antelope blockchain, named accounts, native multisig, instant finality, blockchain for fintech, private blockchain for financial institutions' }],
  ],
  // vitepress-plugin-mermaid puts every diagram type (and KaTeX) into each
  // page's preload list, so every page downloaded ~1 MB of chart code up front.
  // Skip preloading them; pages that render a diagram still load them on demand.
  shouldPreload: (link) =>
    !/(katex|Diagram|diagram-|-definition-|cytoscape|dagre|cose-bilkent|mermaid)/.test(link),
  cleanUrls: true,
  sitemap: { hostname: 'https://pulsevm.dev' },
  transformPageData(pageData, { siteConfig }) {
    const desc = pageData.description || pageData.frontmatter.description || siteConfig.site.description
    const title = pageData.frontmatter.titleTemplate === false && pageData.title ? pageData.title : pageData.title ? `${pageData.title} | PulseVM` : 'PulseVM — tokenized deposits on a network you own'
    const path = pageData.relativePath.replace(/index\.md$/, '').replace(/\.md$/, '')
    const url = `https://pulsevm.dev/${path}`
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: desc }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: desc }],
      ['link', { rel: 'canonical', href: url }],
    )
  },
  themeConfig: {
    logo: '/brand/proton-mark.svg',
    nav: [
      { text: 'Guide', link: '/guide/what-is-pulsevm' },
      { text: 'Wallets', link: '/wallets' },
      {
        text: 'Solutions',
        items: [
          {
            text: 'By institution',
            items: [
              { text: 'Banks and fintechs', link: '/institutions/banks' },
              { text: 'Credit unions and leagues', link: '/institutions/credit-unions' },
              { text: 'Government', link: '/institutions/government' },
              { text: 'Enterprises and consortia', link: '/institutions/enterprises' },
              { text: 'Technical evaluators', link: '/institutions/technical-evaluators' },
              { text: 'Delegated authority with limits', link: '/guide/delegated-authority' },
              { text: 'Run a 90-day pilot', link: '/institutions/pilot' },
              { text: 'Who is behind PulseVM', link: '/institutions/metallicus' },
            ],
          },
          {
            text: 'By industry',
            items: [
              { text: 'Overview', link: '/industries/' },
              { text: 'Insurance', link: '/industries/insurance' },
              { text: 'Title and escrow', link: '/industries/title-escrow' },
              { text: 'Trade finance', link: '/industries/trade-finance' },
              { text: 'Healthcare', link: '/industries/healthcare' },
              { text: 'Capital markets', link: '/industries/capital-markets' },
              { text: 'Loyalty and rewards', link: '/industries/loyalty' },
            ],
          },
        ],
      },
      { text: 'Compare', link: '/compare/' },
      {
        text: 'Developers',
        items: [
          {
            text: 'Start',
            items: [
              { text: 'Get started', link: '/build/get-started' },
              { text: 'Tutorial: a bot key that can only trade', link: '/build/tutorial-bot-key' },
              { text: 'Permissions cookbook', link: '/build/permissions-cookbook' },
              { text: 'Concepts', link: '/concepts/' },
            ],
          },
          {
            text: 'Languages',
            items: [
              { text: 'Rust', link: '/build/quickstart-rust' },
              { text: 'C++', link: '/build/quickstart-cpp' },
              { text: 'TypeScript', link: '/build/quickstart-typescript' },
            ],
          },
          {
            text: 'Reference',
            items: [
              { text: 'Connect a wallet (Web SDK)', link: '/build/connect-wallet' },
              { text: 'System contracts', link: '/build/system-contracts' },
              { text: 'Host functions', link: '/build/intrinsics' },
              { text: 'Command-line tools', link: '/build/cli' },
              { text: 'RPC and REST API', link: '/build/api' },
              { text: 'Repositories', link: '/resources' },
            ],
          },
        ],
      },
      {
        text: 'Network',
        items: [
          { text: 'Endpoints', link: '/network/endpoints' },
          { text: 'Updates', link: '/network/updates' },
          { text: 'The 1:1 demo network', link: '/network/one-to-one-demo' },
          { text: 'Launch your own', link: '/network/launch' },
          { text: 'Run a validator', link: '/network/validator' },
          { text: 'Upgrade to metalgo 1.14 (Granite)', link: '/network/upgrade-metalgo-1-14' },
        ],
      },
      { text: 'Talk to us', link: '/institutions/pilot' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is PulseVM?', link: '/guide/what-is-pulsevm' },
            { text: 'Native by Design', link: '/guide/native-by-design' },
            { text: 'Accounts and permissions', link: '/guide/accounts-permissions' },
            { text: 'Delegated authority (case study)', link: '/guide/delegated-authority' },
            { text: 'Native Multisig', link: '/guide/multisig' },
            { text: 'Resources (CPU/NET/RAM)', link: '/guide/resources' },
            { text: 'Finality & Settlement', link: '/guide/finality' },
            { text: 'Migrating an Antelope Chain', link: '/guide/migrate-antelope-chain' },
            { text: 'Privacy & Confidentiality', link: '/guide/privacy' },
            { text: 'Cross-Chain Messaging', link: '/guide/cross-chain' },
            { text: 'Glossary', link: '/guide/glossary' },
          ],
        },
      ],
      '/concepts/': [
        {
          text: 'Development Concepts',
          items: [
            { text: 'Overview', link: '/concepts/' },
            { text: 'Accounts & Actions', link: '/concepts/accounts-and-actions' },
            { text: 'State & Tables', link: '/concepts/state-and-tables' },
            { text: 'ABIs', link: '/concepts/abi' },
            { text: 'Authorization & Inline Actions', link: '/concepts/authorization' },
          ],
        },
      ],
      '/institutions/': [
        {
          text: 'For Institutions',
          items: [
            { text: 'Banks and fintechs', link: '/institutions/banks' },
            { text: 'Credit unions and leagues', link: '/institutions/credit-unions' },
            { text: 'Government', link: '/institutions/government' },
            { text: 'Enterprises and consortia', link: '/institutions/enterprises' },
            { text: 'Technical evaluators', link: '/institutions/technical-evaluators' },
            { text: 'Objections, answered', link: '/institutions/objections' },
            { text: 'Run a 90-day pilot', link: '/institutions/pilot' },
            { text: "Buyer's checklist", link: '/institutions/checklist' },
            { text: 'Who is behind PulseVM', link: '/institutions/metallicus' },
            { text: 'Delegated authority (case study)', link: '/guide/delegated-authority' },
          ],
        },
      ],
      '/industries/': [
        {
          text: 'Industries',
          items: [
            { text: 'Overview', link: '/industries/' },
            { text: 'Insurance', link: '/industries/insurance' },
            { text: 'Title and escrow', link: '/industries/title-escrow' },
            { text: 'Trade finance and supply chain', link: '/industries/trade-finance' },
            { text: 'Healthcare', link: '/industries/healthcare' },
            { text: 'Capital markets', link: '/industries/capital-markets' },
            { text: 'Loyalty and rewards', link: '/industries/loyalty' },
          ],
        },
      ],
      '/compare/': [
        {
          text: 'Comparisons',
          items: [
            { text: 'Overview', link: '/compare/' },
            { text: 'Accounts vs smart-contract wallets', link: '/compare/smart-contract-wallets' },
            { text: 'vs Ethereum', link: '/compare/ethereum' },
            { text: 'vs permissioned EVM', link: '/compare/permissioned-evm' },
            { text: 'vs an EVM L1 on the same consensus', link: '/compare/avalanche-l1-evm' },
            { text: 'Antelope compatibility', link: '/compare/antelope' },
            { text: 'Antelope chain status', link: '/compare/antelope-chains' },
          ],
        },
      ],
      '/build/': [
        {
          text: 'Build on PulseVM',
          items: [
            { text: 'Get started', link: '/build/get-started' },
            { text: 'Tutorial: a bot key that can only trade', link: '/build/tutorial-bot-key' },
            { text: 'Permissions cookbook', link: '/build/permissions-cookbook' },
            { text: 'Rust quickstart', link: '/build/quickstart-rust' },
            { text: 'C++ quickstart', link: '/build/quickstart-cpp' },
            { text: 'TypeScript quickstart', link: '/build/quickstart-typescript' },
            { text: 'Connect a wallet (Web SDK)', link: '/build/connect-wallet' },
            { text: 'System contracts', link: '/build/system-contracts' },
            { text: 'Host functions', link: '/build/intrinsics' },
            { text: 'Command-line tools', link: '/build/cli' },
            { text: 'RPC and REST API', link: '/build/api' },
          ],
        },
      ],
      '/network/': [
        {
          text: 'Network',
          items: [
            { text: 'Endpoints', link: '/network/endpoints' },
            { text: 'Updates', link: '/network/updates' },
            { text: 'The 1:1 demo network', link: '/network/one-to-one-demo' },
            { text: 'Launch your own network', link: '/network/launch' },
            { text: 'Run a validator', link: '/network/validator' },
            { text: 'Upgrade to metalgo 1.14 (Granite)', link: '/network/upgrade-metalgo-1-14' },
            { text: 'Repositories', link: '/resources' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MetalBlockchain/pulsevm' },
      { icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' }, link: 'https://t.me/+N1mAvoUDbtVmNTBh', ariaLabel: 'Telegram' },
    ],
    footer: {
      message:
        'Based on <a href="https://xprnetwork.org" target="_blank" rel="noopener">XPR Network</a> / Antelope technology · A <a href="https://metallicus.com" target="_blank" rel="noopener">Metallicus</a> technology on <a href="https://metalblockchain.org" target="_blank" rel="noopener">Metal Blockchain</a> · PulseVM is <a href="https://github.com/MetalBlockchain/pulsevm" target="_blank" rel="noopener">open source</a>, created by <a href="https://github.com/MlennGarien" target="_blank" rel="noopener">Glenn Mariën</a>',
      copyright:
        '<a href="/network/updates">Updates</a> · <a href="/network/endpoints">Endpoints</a> · <a href="https://t.me/+N1mAvoUDbtVmNTBh" target="_blank" rel="noopener">Telegram</a> · <a href="/agents">For AI agents</a> · Site by <a href="https://paulgrey.nz" target="_blank" rel="noopener">Paul Grey</a> · <a href="https://github.com/paulgnz/pulsevm-docs" target="_blank" rel="noopener">contribute</a>',
    },
    editLink: {
      pattern: 'https://github.com/paulgnz/pulsevm-docs/blob/main/docs/:path',
      text: 'View or edit this page on GitHub',
    },
    search: { provider: 'local' },
  },
  // vitepress-plugin-mermaid reads `mermaid` from the main config object
  // (a second withMermaid argument is ignored).
  // Brand-ramp diagram theming: periwinkle nodes/edges instead of stock
  // pastels ('base' theme is required for themeVariables to apply).
  mermaid: {
    flowchart: { htmlLabels: true, useMaxWidth: true, curve: 'basis', padding: 14 },
    theme: 'base',
    themeVariables: {
      // explicit system stack: mermaid sizes nodes at render time, and a
      // late-loading webfont (Inter) makes labels taller than the measured
      // boxes → clipped text. System fonts measure == render.
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif',
      fontSize: '15px',
      primaryColor: '#4f7cff',
      primaryTextColor: '#ffffff',
      primaryBorderColor: '#8b95ff',
      lineColor: '#7c92ff',
      secondaryColor: '#eef1ff',
      tertiaryColor: '#f5f6ff',
      clusterBkg: 'rgba(79, 124, 255, 0.06)',
      clusterBorder: '#8b95ff',
      edgeLabelBackground: 'transparent',
    },
  },
} as any))

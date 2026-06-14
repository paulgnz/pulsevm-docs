import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'PulseVM',
  description:
    'PulseVM is a non-EVM, Antelope-based blockchain for banks and fintechs: tokenized deposits, named accounts, native multisig, instant finality — a permissioned network you own.',
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#1d4ed8' }],
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
  cleanUrls: true,
  sitemap: { hostname: 'https://pulsevm.dev' },
  transformPageData(pageData, { siteConfig }) {
    const desc = pageData.description || pageData.frontmatter.description || siteConfig.site.description
    const title = pageData.title ? `${pageData.title} | PulseVM` : 'PulseVM — blockchain for banks & fintechs'
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
    logo: '/brand/metal-glyph-color.svg',
    nav: [
      { text: 'Guide', link: '/guide/what-is-pulsevm' },
      { text: 'Wallets', link: '/wallets' },
      {
        text: 'Solutions',
        items: [
          {
            text: 'By institution',
            items: [
              { text: 'Banks & Fintechs', link: '/institutions/banks' },
              { text: 'Credit Unions & Leagues', link: '/institutions/credit-unions' },
              { text: 'Government & Governance', link: '/institutions/government' },
              { text: 'Enterprises & Consortia', link: '/institutions/enterprises' },
              { text: 'For Technical Evaluators', link: '/institutions/technical-evaluators' },
            ],
          },
          {
            text: 'By industry',
            items: [
              { text: 'Overview', link: '/industries/' },
              { text: 'Insurance', link: '/industries/insurance' },
              { text: 'Title & Escrow', link: '/industries/title-escrow' },
              { text: 'Trade Finance', link: '/industries/trade-finance' },
              { text: 'Healthcare', link: '/industries/healthcare' },
              { text: 'Capital Markets', link: '/industries/capital-markets' },
              { text: 'Loyalty & Rewards', link: '/industries/loyalty' },
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
              { text: 'Getting Started', link: '/build/get-started' },
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
              { text: 'Connect Wallet (Web SDK)', link: '/build/connect-wallet' },
              { text: 'System Contracts', link: '/build/system-contracts' },
              { text: 'Host Functions', link: '/build/intrinsics' },
              { text: 'Command-line Tools', link: '/build/cli' },
              { text: 'RPC & REST API', link: '/build/api' },
              { text: 'Repositories', link: '/resources' },
            ],
          },
          {
            text: 'Tools',
            items: [
              { text: 'GitHub', link: 'https://github.com/MetalBlockchain' },
            ],
          },
        ],
      },
      { text: 'Network', link: '/network/endpoints' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is PulseVM?', link: '/guide/what-is-pulsevm' },
            { text: 'Native by Design', link: '/guide/native-by-design' },
            { text: 'Accounts & Permissions', link: '/guide/accounts-permissions' },
            { text: 'Native Multisig', link: '/guide/multisig' },
            { text: 'Resources (CPU/NET/RAM)', link: '/guide/resources' },
            { text: 'Finality & Settlement', link: '/guide/finality' },
            { text: 'Privacy & Confidentiality', link: '/guide/privacy' },
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
            { text: 'Banks & Fintechs', link: '/institutions/banks' },
            { text: 'Credit Unions & Leagues', link: '/institutions/credit-unions' },
            { text: 'Government & Governance', link: '/institutions/government' },
            { text: 'Enterprises & Consortia', link: '/institutions/enterprises' },
            { text: 'For Technical Evaluators', link: '/institutions/technical-evaluators' },
            { text: 'Objections, Answered', link: '/institutions/objections' },
          ],
        },
      ],
      '/industries/': [
        {
          text: 'Industries',
          items: [
            { text: 'Overview', link: '/industries/' },
            { text: 'Insurance', link: '/industries/insurance' },
            { text: 'Title & Escrow', link: '/industries/title-escrow' },
            { text: 'Trade Finance & Supply Chain', link: '/industries/trade-finance' },
            { text: 'Healthcare', link: '/industries/healthcare' },
            { text: 'Capital Markets', link: '/industries/capital-markets' },
            { text: 'Loyalty & Rewards', link: '/industries/loyalty' },
          ],
        },
      ],
      '/compare/': [
        {
          text: 'Comparisons',
          items: [
            { text: 'Overview', link: '/compare/' },
            { text: 'vs Ethereum', link: '/compare/ethereum' },
            { text: 'vs Permissioned EVM', link: '/compare/permissioned-evm' },
          ],
        },
      ],
      '/build/': [
        {
          text: 'Build on PulseVM',
          items: [
            { text: 'Getting Started', link: '/build/get-started' },
            { text: 'Rust Quickstart', link: '/build/quickstart-rust' },
            { text: 'C++ Quickstart', link: '/build/quickstart-cpp' },
            { text: 'TypeScript Quickstart', link: '/build/quickstart-typescript' },
            { text: 'Connect Wallet (Web SDK)', link: '/build/connect-wallet' },
            { text: 'System Contracts', link: '/build/system-contracts' },
            { text: 'Host Functions (Intrinsics)', link: '/build/intrinsics' },
            { text: 'Command-line Tools', link: '/build/cli' },
            { text: 'RPC & REST API', link: '/build/api' },
          ],
        },
      ],
      '/network/': [
        {
          text: 'Network',
          items: [
            { text: 'Endpoints', link: '/network/endpoints' },
            { text: 'Launch Your Own Network', link: '/network/launch' },
            { text: 'Run a Validator', link: '/network/validator' },
            { text: 'Repos & Resources', link: '/resources' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MetalBlockchain/pulsevm' },
    ],
    footer: {
      message:
        'A <a href="https://metallicus.com" target="_blank" rel="noopener">Metallicus</a> technology on <a href="https://metalblockchain.org" target="_blank" rel="noopener">Metal Blockchain</a> · PulseVM is <a href="https://github.com/MetalBlockchain/pulsevm" target="_blank" rel="noopener">open source</a>, created by <a href="https://github.com/MlennGarien" target="_blank" rel="noopener">Glenn Mariën</a>',
      copyright:
        '<a href="/agents">For AI agents</a> · Site by <a href="https://paulgrey.nz" target="_blank" rel="noopener">Paul Grey</a> · <a href="https://github.com/paulgnz/pulsevm-docs" target="_blank" rel="noopener">contribute</a>',
    },
    editLink: {
      pattern: 'https://github.com/paulgnz/pulsevm-docs/blob/main/docs/:path',
      text: 'View or edit this page on GitHub',
    },
    search: { provider: 'local' },
  },
}), {
  mermaid: {
    flowchart: { htmlLabels: true, useMaxWidth: true, curve: 'basis', padding: 14 },
    themeVariables: { fontFamily: 'inherit', fontSize: '15px' },
  },
})

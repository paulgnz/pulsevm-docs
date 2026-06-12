import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'PulseVM',
  description:
    'The Antelope-lineage execution environment for Metal Blockchain subnets — named accounts, native permissions and multisig, instant finality.',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/what-is-pulsevm' },
      { text: 'For Institutions', link: '/institutions/banks' },
      { text: 'Compare', link: '/compare/ethereum' },
      { text: 'Build', link: '/build/quickstart-typescript' },
      { text: 'Network', link: '/network/endpoints' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is PulseVM?', link: '/guide/what-is-pulsevm' },
            { text: 'Accounts & Permissions', link: '/guide/accounts-permissions' },
            { text: 'Native Multisig', link: '/guide/multisig' },
            { text: 'Resources (CPU/NET/RAM)', link: '/guide/resources' },
            { text: 'Finality & Settlement', link: '/guide/finality' },
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
            { text: 'Objections, Answered', link: '/institutions/objections' },
          ],
        },
      ],
      '/compare/': [
        {
          text: 'Comparisons',
          items: [
            { text: 'vs Ethereum', link: '/compare/ethereum' },
            { text: 'vs Permissioned EVM', link: '/compare/permissioned-evm' },
          ],
        },
      ],
      '/build/': [
        {
          text: 'Build on PulseVM',
          items: [
            { text: 'TypeScript Quickstart', link: '/build/quickstart-typescript' },
            { text: 'Rust Quickstart', link: '/build/quickstart-rust' },
            { text: 'CLI (pulse-cli-ts)', link: '/build/cli' },
            { text: 'RPC & REST API', link: '/build/api' },
          ],
        },
      ],
      '/network/': [
        {
          text: 'Network',
          items: [
            { text: 'Endpoints', link: '/network/endpoints' },
            { text: 'Run a Validator', link: '/network/validator' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MetalBlockchain/pulsevm' },
    ],
    footer: {
      message: 'PulseVM is open source. This site: paulgnz/pulsevm-docs.',
    },
    search: { provider: 'local' },
  },
})

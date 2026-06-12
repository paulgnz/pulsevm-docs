import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'PulseVM',
  description:
    'The Antelope-lineage execution environment for Metal Blockchain subnets — named accounts, native permissions and multisig, instant finality.',
  lastUpdated: true,
  cleanUrls: true,
  sitemap: { hostname: 'https://pulsevm.dev' },
  themeConfig: {
    logo: '/brand/metal-glyph-color.svg',
    nav: [
      { text: 'Guide', link: '/guide/what-is-pulsevm' },
      { text: 'For Institutions', link: '/institutions/banks' },
      { text: 'Compare', link: '/compare/ethereum' },
      { text: 'Build', link: '/build/get-started' },
      { text: 'Network', link: '/network/endpoints' },
      { text: 'Repositories', link: '/resources' },
      { text: 'Agents', link: '/agents' },
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
            { text: 'Enterprises & Consortia', link: '/institutions/enterprises' },
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
            { text: 'Getting Started', link: '/build/get-started' },
            { text: 'Rust Quickstart', link: '/build/quickstart-rust' },
            { text: 'C++ Quickstart', link: '/build/quickstart-cpp' },
            { text: 'TypeScript Quickstart', link: '/build/quickstart-typescript' },
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
        'A <a href="https://metallicus.com" target="_blank" rel="noopener">Metallicus</a> technology on <a href="https://metalblockchain.org" target="_blank" rel="noopener">Metal Blockchain</a> · PulseVM is <a href="https://github.com/MetalBlockchain/pulsevm" target="_blank" rel="noopener">open source</a>',
      copyright:
        'Site by <a href="https://paulgrey.nz" target="_blank" rel="noopener">Paul Grey</a> · <a href="https://github.com/paulgnz/pulsevm-docs" target="_blank" rel="noopener">contribute</a>',
    },
    search: { provider: 'local' },
  },
})

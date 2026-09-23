---
layout: home
head:
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            "name": "PulseVM",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Linux",
            "url": "https://pulsevm.dev/",
            "description": "PulseVM runs the Antelope account and contract model on Metal Blockchain: named accounts, permission trees, keys bound to one contract action, native multisig, staked resources instead of gas, and finality in about a second, on a network the institution owns.",
                "codeRepository": "https://github.com/MetalBlockchain/pulsevm",
            "creator": {
              "@id": "https://metallicus.com/#org"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "description": "Open source"
            }
          },
          {
            "@type": "Organization",
            "@id": "https://metallicus.com/#org",
            "name": "Metallicus",
            "url": "https://metallicus.com",
            "foundingDate": "2015",
            "founder": [
              {
                "@type": "Person",
                "name": "Marshall Hayner"
              },
              {
                "@type": "Person",
                "name": "Glenn Mariën"
              }
            ]
          },
          {
            "@type": "WebSite",
            "name": "PulseVM",
            "url": "https://pulsevm.dev/"
          }
        ]
      }
title: PulseVM — tokenized deposits on a network you own
titleTemplate: false

hero:
  name: PulseVM
  text: Tokenized deposits on a network your institution owns.
  tagline: Named accounts, maker-checker approval and settlement that is final in about a second are built into the ledger. On Ethereum and other EVM chains, your team would build them as contracts and audit them for as long as they run.
  actions:
    - theme: brand
      text: Talk to us about a pilot
      link: /institutions/pilot
    - theme: alt
      text: For banks and credit unions
      link: /institutions/banks
    - theme: alt
      text: Start building
      link: /build/get-started

description: "Tokenized deposits on a network your institution owns. Named accounts, maker-checker approval, keys limited to one action and settlement final in about a second, built into the ledger instead of built and audited on Ethereum or an EVM chain."
---

<HomeFeatures />

<HomeVsEthereum />

<p class="home-industries">Also used for <a href="/industries/insurance">insurance</a>, <a href="/industries/trade-finance">trade finance</a>, <a href="/industries/capital-markets">capital markets</a>, <a href="/industries/title-escrow">title and escrow</a>, <a href="/industries/healthcare">healthcare</a> and <a href="/industries/loyalty">loyalty</a>. <a href="/industries/">All industries</a>.</p>

<HomeTrust />

<HomeCta />

<p class="brand-strip-eyebrow">The account model has run in production on XPR Network for years. PulseVM runs it on Metal Blockchain, from Metallicus.</p>
<div class="brand-strip">
  <a href="https://xprnetwork.org" target="_blank" rel="noopener">
    <img class="light-only" src="/brand/xpr-network-black.svg" alt="XPR Network" height="30" />
    <img class="dark-only" src="/brand/xpr-network-white.svg" alt="XPR Network" height="30" />
  </a>
  <a href="https://metalblockchain.org" target="_blank" rel="noopener">
    <img class="light-only" src="/brand/metal-blockchain-black.svg" alt="Metal Blockchain" height="34" />
    <img class="dark-only" src="/brand/metal-blockchain-white.svg" alt="Metal Blockchain" height="34" />
  </a>
  <a href="https://metallicus.com" target="_blank" rel="noopener">
    <img class="light-only" src="/brand/metallicus-black.svg" alt="Metallicus" height="26" />
    <img class="dark-only" src="/brand/metallicus-white.svg" alt="Metallicus" height="26" />
  </a>
</div>

<style>
/* strip styling lives in .vitepress/theme/custom.css; only the theme-swap
   helpers stay here */
.dark-only { display:none; }
.dark .dark-only { display:inline; }
.dark .light-only { display:none; }
</style>

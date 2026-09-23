---
layout: home

hero:
  name: PulseVM
  text: Financial infrastructure you own.
  tagline: Named accounts, native multisig and settlement that is final in under a second, on a network your institution runs. The open-source execution layer behind A-Chain and the future of XPR Network.
  actions:
    - theme: brand
      text: For banks and credit unions
      link: /institutions/banks
    - theme: alt
      text: Start building
      link: /build/get-started

description: "Non-EVM, Antelope-based blockchain for banks and fintechs — tokenized deposits, named accounts, native multisig, instant finality. A permissioned network you own."
---

<HomeFeatures />

<div class="usecases">
  <h2 class="usecases-title">Built for regulated finance</h2>
  <div class="usecases-grid">
    <a class="uc" href="/institutions/banks"><strong>Banking &amp; Credit Unions</strong><span>Issue tokenized deposits; keep deposits and the customer at home.</span><em>Explore →</em></a>
    <a class="uc" href="/industries/insurance"><strong>Insurance</strong><span>Claims, reinsurance, and parametric payouts on a shared, final ledger.</span><em>Explore →</em></a>
    <a class="uc" href="/industries/trade-finance"><strong>Trade Finance &amp; Supply Chain</strong><span>Consortium ledgers and provenance without exposing competitors.</span><em>Explore →</em></a>
    <a class="uc" href="/industries/capital-markets"><strong>Capital Markets</strong><span>Tokenized instruments with native controls and atomic settlement.</span><em>Explore →</em></a>
    <a class="uc" href="/industries/healthcare"><strong>Healthcare</strong><span>Payer-provider settlement with confidentiality and oversight.</span><em>Explore →</em></a>
    <a class="uc" href="/institutions/government"><strong>Government &amp; Governance</strong><span>Registries, disbursement, and settlement on sovereign infrastructure.</span><em>Explore →</em></a>
  </div>
</div>

<p class="brand-strip-eyebrow">Built on proven foundations</p>
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

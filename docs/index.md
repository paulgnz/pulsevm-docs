---
layout: home

hero:
  name: PulseVM
  text: Financial infrastructure your institution can run on its own terms.
  tagline: Financial-grade primitives, finality you can settle on. Named accounts, native permissions & multisig, instant irreversible finality — open-source Antelope (ex-EOSIO) execution on Avalanche Snowman consensus, and the base for A-Chain, the future of XPR Network.
  actions:
    - theme: brand
      text: Why PulseVM
      link: /guide/what-is-pulsevm
    - theme: alt
      text: For Banks & Credit Unions
      link: /institutions/banks
    - theme: alt
      text: Start Building
      link: /build/get-started

features:
  - title: Accounts that match how institutions work
    details: Human-readable named accounts, hierarchical permissions, key rotation, and weighted multisig — your authorization matrix is a configuration, not a wallet platform you build and audit.
  - title: Settlement you can put in an SLA
    details: Sub-second blocks with instant, irreversible finality. No reorgs by construction, no confirmation-count policies — a transfer is rejected immediately or settled permanently.
  - title: No gas for your customers
    details: The institution stakes compute and bandwidth and provisions storage. Users see an app, never a token purchase. Costs are capacity planning, not per-transaction tolls.
  - title: Your network, your rules
    details: PulseVM is a plugin for metalgo — any institution or consortium deploys its own chain with its own validators, and the chain's rules are system contracts you own and can change.
  - title: Keep deposits at home
    details: With institution-issued tokenized dollars on Metal Dollar rails, customers get instant programmable money while deposits stay on your balance sheet — your float, your margin, your relationship.
  - title: Build in Rust, C++, or TypeScript
    details: PulseVM and its system contracts are written in Rust (pulse-cdt-rust is the canonical CDT); C++ carries the full Antelope heritage; TypeScript/AssemblyScript is a popular option for teams who prefer it.
---

<div class="brand-strip">
  <a href="https://metalblockchain.org" target="_blank" rel="noopener">
    <img class="light-only" src="/brand/metal-blockchain-black.svg" alt="Metal Blockchain" height="34" />
    <img class="dark-only" src="/brand/metal-blockchain-white.svg" alt="Metal Blockchain" height="34" />
  </a>
  <a href="https://metallicus.com" target="_blank" rel="noopener">
    <img class="light-only" src="/brand/metallicus-black.svg" alt="Metallicus" height="30" />
    <img class="dark-only" src="/brand/metallicus-white.svg" alt="Metallicus" height="30" />
  </a>
</div>

<style>
.brand-strip { display:flex; gap:48px; align-items:center; justify-content:center; margin:56px 0 16px; opacity:.85; }
.brand-strip img { height:32px; width:auto; }
.dark-only { display:none; }
.dark .dark-only { display:inline; }
.dark .light-only { display:none; }
</style>

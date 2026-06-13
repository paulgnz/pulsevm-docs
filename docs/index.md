---
layout: home

hero:
  name: PulseVM
  text: Financial infrastructure your institution can run on its own terms.
  tagline: Named accounts, native multisig, and instant, irreversible finality — on a private network you own, not one you join. The open-source execution layer behind A-Chain, the future of XPR Network.
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
  - icon: { src: /icons/accounts.svg, width: 28, height: 28 }
    title: Accounts that match how institutions work
    details: Human-readable named accounts, hierarchical permissions, key rotation, and weighted multisig — your authorization matrix is a configuration, not a wallet platform you build and audit.
    link: /guide/accounts-permissions
    linkText: Accounts & permissions
  - icon: { src: /icons/settlement.svg, width: 28, height: 28 }
    title: Settlement you can put in an SLA
    details: Sub-second blocks with instant finality. Finalized blocks don't reorganize and there are no confirmation-count policies — a transfer is rejected immediately or finalized.
    link: /guide/finality
    linkText: Finality & settlement
  - icon: { src: /icons/nogas.svg, width: 28, height: 28 }
    title: No gas for your customers
    details: The institution stakes compute and bandwidth and provisions storage. Users see an app, never a token purchase. Costs are capacity planning, not per-transaction tolls.
    link: /guide/resources
    linkText: Resource model
  - icon: { src: /icons/network.svg, width: 28, height: 28 }
    title: Your network, your rules
    details: PulseVM is a plugin for metalgo — any institution or consortium deploys its own chain with its own validators, and the chain's rules are system contracts you own and can change.
    link: /network/launch
    linkText: Launch your own network
  - icon: { src: /icons/deposits.svg, width: 28, height: 28 }
    title: Keep deposits at home
    details: With institution-issued tokenized dollars on Metal Dollar rails, customers get instant programmable money while deposits stay on your balance sheet — your float, your margin, your relationship.
    link: /institutions/banks
    linkText: For banks & fintechs
  - icon: { src: /icons/native.svg, width: 28, height: 28 }
    title: Native, not bolted on
    details: Account abstraction, multisig, batched payments, fee sponsorship, passkey keys — what other chains retrofit onto Ethereum, PulseVM has had from day one.
    link: /guide/native-by-design
    linkText: See what's built in
  - icon: { src: /icons/build.svg, width: 28, height: 28 }
    title: Build in Rust, C++, or TypeScript
    details: PulseVM and its system contracts are written in Rust (pulse-cdt-rust is the canonical CDT); C++ carries the full Antelope heritage; TypeScript/AssemblyScript is a popular option for teams who prefer it.
    link: /build/get-started
    linkText: Start building
  - icon: { src: /icons/compliance.svg, width: 28, height: 28 }
    title: Compliance and identity built in
    details: KYC-ready named accounts and asset-level controls — allow-listing, freeze and clawback under legal order — expressed as policy you set, not per-app code. Pairs with Metal Identity for on-chain identity verification.
    link: https://identity.metallicus.com
    linkText: Metal Identity
description: "Non-EVM, Antelope-based blockchain for banks and fintechs — tokenized deposits, named accounts, native multisig, instant finality. A permissioned network you own."
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

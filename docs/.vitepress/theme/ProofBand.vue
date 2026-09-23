<script setup>
// Homepage evidence band (rendered in the home-features-before slot).
// Every figure here is already published on the site with its source; keep
// them in sync with /network/updates and /guide/migrate-antelope-chain.
const items = [
  {
    figure: '401,005,383',
    text: 'XPR Network mainnet blocks replayed on PulseVM, genesis to tip, before the migration path was merged.',
    source: 'Pull request #61',
    href: 'https://github.com/MetalBlockchain/pulsevm/pull/61',
  },
  {
    figure: '822,887',
    text: 'table rows imported from one XPR snapshot by two independent implementations, with identical hashes.',
    source: 'Import cross-check',
    href: '/guide/migrate-antelope-chain',
  },
  {
    figure: '0.75 s',
    text: 'to move live traffic from nodeos to PulseVM behind the same URL. Reads stayed 99.8% available across 22 rehearsals.',
    source: 'Cutover write-up',
    href: '/guide/migrate-antelope-chain',
  },
  {
    figure: '1:1',
    text: 'A public network running an exact import of XPR testnet state. Existing keys sign and existing contracts run.',
    source: 'Demo network',
    href: '/network/one-to-one-demo',
  },
]
</script>

<template>
  <section class="proof" aria-labelledby="proof-title">
    <div class="proof-inner">
      <div class="proof-head">
        <h2 id="proof-title">Proof you can check</h2>
        <p>Each number links to where it was measured.</p>
      </div>
      <ul class="proof-list">
        <li v-for="i in items" :key="i.figure">
          <span class="proof-figure">{{ i.figure }}</span>
          <span class="proof-text">{{ i.text }}</span>
          <a class="proof-source" :href="i.href" :target="i.href.startsWith('http') ? '_blank' : undefined" :rel="i.href.startsWith('http') ? 'noopener' : undefined">{{ i.source }}</a>
        </li>
      </ul>
    </div>
  </section>
</template>

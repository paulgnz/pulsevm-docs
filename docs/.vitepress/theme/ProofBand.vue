<script setup>
// Evidence band: figures, each linked to where it was measured.
// Used at the top of /guide/migrate-antelope-chain (XPR / Antelope audience).
defineProps({
  title: { type: String, default: 'Proof you can check' },
  lede: { type: String, default: 'Each number links to where it was measured.' },
  items: { type: Array, required: true },   // [{ figure, text, source, href }]
})
</script>

<template>
  <section class="proof proof-inline" :aria-label="title">
    <div class="proof-head">
      <h2 class="proof-title">{{ title }}</h2>
      <p>{{ lede }}</p>
    </div>
    <ul class="proof-list">
      <li v-for="i in items" :key="i.figure">
        <span class="proof-figure">{{ i.figure }}</span>
        <span class="proof-text">{{ i.text }}</span>
        <a class="proof-source" :href="i.href" :target="i.href.startsWith('http') ? '_blank' : undefined" :rel="i.href.startsWith('http') ? 'noopener' : undefined">{{ i.source }}</a>
      </li>
    </ul>
  </section>
</template>

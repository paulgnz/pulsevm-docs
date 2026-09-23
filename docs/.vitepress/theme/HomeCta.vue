<script setup>
// Homepage close: the three things an institution does next, plus the
// developer path.
const steps = [
  { title: 'Run a 90-day pilot', text: 'A small validator network, a tokenized test deposit and real intra-member settlement. Scoped, measured, with an exit.', href: '/institutions/pilot', label: 'See the pilot plan' },
  { title: 'Check it against your requirements', text: 'Custody, key ceremony, dual control, data residency, recovery, upgrades and audit access, answered plainly.', href: '/institutions/checklist', label: "Open the buyer's checklist" },
  { title: 'Talk to Metallicus', text: 'The team behind PulseVM and XPR Network runs pilots with institutions and consortia.', href: 'https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=home', label: 'Start a conversation', external: true },
]
</script>

<template>
  <section class="cta" aria-labelledby="cta-title">
    <h2 id="cta-title">Start with a pilot, not a platform build</h2>
    <div class="cta-grid">
      <a v-for="s in steps" :key="s.title" class="cta-card" :href="s.href" :target="s.external ? '_blank' : undefined" :rel="s.external ? 'noopener' : undefined">
        <strong>{{ s.title }}</strong>
        <span>{{ s.text }}</span>
        <em>{{ s.label }}</em>
      </a>
    </div>
    <p class="cta-dev">Building it yourself? <a href="/build/get-started">Deploy a contract and give a key one job in fifteen minutes.</a></p>
  </section>
</template>

<style scoped>
.cta { margin: 96px 0 0; }
.cta h2 {
  font-family: var(--pvm-font-display); font-size: 1.9rem; line-height: 1.2; font-weight: 650;
  letter-spacing: -0.02em; color: var(--vp-c-text-1); margin: 0 0 28px; padding: 0; border: 0;
}
.cta-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.cta-card {
  display: flex; flex-direction: column; gap: 10px; padding: 24px;
  border: 1px solid var(--vp-c-divider); border-radius: 16px; background: var(--vp-c-bg-soft);
  text-decoration: none !important; transition: border-color .2s;
}
.cta-card:first-child { border-color: color-mix(in srgb, var(--vp-c-brand-1) 55%, var(--vp-c-divider)); background: color-mix(in srgb, var(--vp-c-brand-1) 7%, var(--vp-c-bg-soft)); }
.cta-card:hover { border-color: var(--vp-c-brand-1); }
.cta-card:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.cta-card strong { font-family: var(--pvm-font-display); font-size: 1.1rem; font-weight: 600; color: var(--vp-c-text-1); }
.cta-card span { color: var(--vp-c-text-2); font-size: 0.93rem; line-height: 1.55; }
.cta-card em { margin-top: auto; padding-top: 6px; font-style: normal; font-weight: 600; font-size: 0.92rem; color: var(--vp-c-brand-1); }
.cta-dev { margin: 22px 0 0; color: var(--vp-c-text-2); font-size: 0.95rem; }
.cta-dev a { font-weight: 600; }
@media (max-width: 860px) { .cta-grid { grid-template-columns: 1fr; } .cta h2 { font-size: 1.5rem; } }
</style>

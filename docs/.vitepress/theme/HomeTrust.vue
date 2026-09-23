<script setup>
// Homepage: the company behind PulseVM already operates in regulated finance.
// Every item is public and sourced on /institutions/metallicus.
const facts = [
  { figure: 'FedNow', text: 'Metallicus is live on the Federal Reserve’s instant payment service, certified to send, receive and request payments.' },
  { figure: '600+', text: 'credit unions in the Cornerstone League can run the Metallicus stablecoin pilot as a member benefit.' },
  { figure: 'SOC 2', text: 'compliance audit completed with an independent third-party auditor.' },
]
</script>

<template>
  <section class="trust" aria-labelledby="trust-title">
    <h2 id="trust-title">Built by a team already inside the US payment system</h2>
    <p class="trust-lede">PulseVM comes from Metallicus, the team behind XPR Network and Metal Blockchain, founded in 2015.</p>
    <ul class="trust-list">
      <li v-for="f in facts" :key="f.figure">
        <strong>{{ f.figure }}</strong>
        <span>{{ f.text }}</span>
      </li>
    </ul>
    <p class="trust-foot"><a href="/institutions/metallicus">Who is behind PulseVM, with sources</a></p>
  </section>
</template>

<style scoped>
.trust { margin: 96px 0 0; }
.trust h2 {
  font-family: var(--pvm-font-display); font-size: 1.9rem; line-height: 1.2; font-weight: 650;
  letter-spacing: -0.02em; color: var(--vp-c-text-1); margin: 0 0 12px; padding: 0; border: 0; max-width: 26ch; text-wrap: balance;
}
.trust-lede { color: var(--vp-c-text-2); font-size: 1.05rem; margin: 0 0 28px; }
.trust-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.trust-list li { margin: 0; padding: 22px 22px 24px; border-top: 2px solid var(--vp-c-brand-3); background: var(--vp-c-bg-soft); border-radius: 0 0 14px 14px; display: flex; flex-direction: column; gap: 8px; }
.trust-list strong { font-family: var(--pvm-font-display); font-size: 1.8rem; font-weight: 600; letter-spacing: -0.02em; color: var(--vp-c-text-1); }
.trust-list span { color: var(--vp-c-text-2); font-size: 0.93rem; line-height: 1.55; }
.trust-foot { margin: 18px 0 0; font-size: 0.95rem; }
.trust-foot a { font-weight: 600; }
@media (max-width: 760px) { .trust-list { grid-template-columns: 1fr; } .trust h2 { font-size: 1.5rem; } }
</style>

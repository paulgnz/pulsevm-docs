<script setup>
// Bespoke, brand-styled architecture diagram (pure CSS — crisp, theme-aware,
// never clips, screenshots cleanly). Replaces the generic Mermaid stack.
</script>

<template>
  <figure class="arch">
    <div class="arch-row">
      <div class="arch-apps">
        <span class="arch-kicker">You build</span>
        <strong>Your contracts &amp; apps</strong>
        <small>Rust · C++ · TypeScript</small>
      </div>
      <div class="arch-arrow" aria-hidden="true"></div>

      <div class="arch-node">
        <span class="arch-label">metalgo node — Metal Blockchain</span>
        <div class="arch-consensus">
          <strong>Avalanche Snowman consensus</strong>
          <small>instant, irreversible finality</small>
        </div>
        <div class="arch-plugin">
          <span class="arch-label arch-label--brand">PulseVM plugin</span>
          <div class="arch-exec">
            <strong>Antelope execution</strong>
            <small>WASM · your contracts run here</small>
          </div>
          <div class="arch-sys">
            <strong>System contracts</strong>
            <small>token · system · msig · bios</small>
          </div>
        </div>
      </div>
    </div>
    <figcaption>PulseVM is a VM plugin inside a metalgo node: Antelope execution under Avalanche finality, with the chain's rules as auditable system contracts.</figcaption>
  </figure>
</template>

<style scoped>
.arch { margin: 1.75rem 0; }
.arch-row {
  display: flex; align-items: center; gap: 0; flex-wrap: nowrap;
}
.arch-kicker, .arch-label {
  display: block; font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--vp-c-text-3); font-weight: 600; margin-bottom: 0.5rem;
}
.arch-label--brand { color: var(--vp-c-brand-1); }
.arch strong { display: block; font-size: 0.95rem; color: var(--vp-c-text-1); }
.arch small { display: block; font-size: 0.8rem; color: var(--vp-c-text-2); margin-top: 0.2rem; }

.arch-apps {
  flex: 0 0 auto; width: 180px; padding: 1rem 1.1rem;
  border: 1px solid var(--vp-c-divider); border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.arch-arrow {
  flex: 0 0 44px; height: 2px; position: relative; margin: 0 -1px;
  background: linear-gradient(90deg, transparent, var(--vp-c-brand-2));
}
.arch-arrow::after {
  content: ''; position: absolute; right: -1px; top: -4px;
  border: 5px solid transparent; border-left-color: var(--vp-c-brand-2);
}

.arch-node {
  flex: 1 1 auto; min-width: 0; padding: 1.6rem 1.25rem 1.25rem;
  border: 1px solid var(--vp-c-divider); border-radius: 16px;
  background:
    radial-gradient(120% 80% at 80% 0%, var(--vp-c-brand-softer), transparent 60%),
    var(--vp-c-bg-soft);
  position: relative;
}
.arch-node > .arch-label { position: absolute; top: 0.7rem; left: 1.25rem; }

.arch-consensus {
  padding: 0.9rem 1.1rem; border-radius: 11px; margin-bottom: 0.9rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-divider));
  background: var(--vp-c-brand-soft);
}

.arch-plugin {
  padding: 1.5rem 1rem 1rem; border-radius: 13px; position: relative;
  border: 1.5px solid color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
  background: var(--vp-c-bg);
}
.arch-plugin > .arch-label { position: absolute; top: 0.55rem; left: 1rem; }

.arch-exec, .arch-sys {
  padding: 0.85rem 1rem; border-radius: 10px;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft);
}
.arch-exec { margin-bottom: 0.7rem; position: relative; }
.arch-exec::after {
  content: '↓'; position: absolute; left: 50%; bottom: -1.05rem; transform: translateX(-50%);
  color: var(--vp-c-brand-2); font-size: 0.9rem;
}

.arch figcaption {
  margin-top: 0.9rem; font-size: 0.85rem; color: var(--vp-c-text-2); text-align: center;
}

@media (max-width: 720px) {
  .arch-row { flex-direction: column; align-items: stretch; gap: 0.5rem; }
  .arch-apps { width: auto; }
  .arch-arrow { width: 2px; height: 28px; align-self: center;
    background: linear-gradient(180deg, transparent, var(--vp-c-brand-2)); }
  .arch-arrow::after { right: auto; left: -4px; top: auto; bottom: -1px;
    border-left-color: transparent; border-top-color: var(--vp-c-brand-2); }
}
</style>

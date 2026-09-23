<script setup>
// Two chains, one payment, a shared time axis. PulseVM's lane ends in a
// final block before the one-second mark; a confirmation-count chain keeps
// adding blocks for minutes before the payment is only "probably final".
// Plays once when scrolled into view; without JS or with reduced motion it
// renders the finished state.
import { ref, onMounted, onBeforeUnmount } from 'vue'

const root = ref(null)
const state = ref('done') // 'done' | 'ready' | 'play'
let io = null

const confirmations = 6

onMounted(() => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  // a hidden tab never reports intersection: keep the finished state there
  if (reduce || document.hidden || !('IntersectionObserver' in window) || !root.value) return
  state.value = 'ready'
  io = new IntersectionObserver((es) => {
    if (!es[0]?.isIntersecting) return
    io.disconnect()
    requestAnimationFrame(() => { state.value = 'play' })
  }, { threshold: 0.55 })
  io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())

const replay = () => {
  state.value = 'ready'
  requestAnimationFrame(() => requestAnimationFrame(() => { state.value = 'play' }))
}
</script>

<template>
  <div ref="root" class="ft" :class="'ft-' + state">
    <div class="ft-lane ft-pulse">
      <div class="ft-name">PulseVM</div>
      <div class="ft-track">
        <span class="ft-tx" title="Your payment"></span>
        <span class="ft-block ft-final" style="--i: 0"><span class="ft-block-label">Block</span></span>
        <span class="ft-mark ft-mark-final">Final. It cannot be reversed.</span>
      </div>
    </div>

    <div class="ft-lane ft-other">
      <div class="ft-name">Chains that count confirmations</div>
      <div class="ft-track">
        <span class="ft-tx" title="Your payment"></span>
        <span v-for="n in confirmations" :key="n" class="ft-block" :style="{ '--i': n - 1, '--x': (6 + (n - 1) * 13.5) + '%' }"></span>
        <span class="ft-mark ft-mark-maybe">Probably final. Before this it could still be reorganized.</span>
      </div>
    </div>

    <div class="ft-axis" aria-hidden="true">
      <span class="ft-tick" style="left: 0">0 s</span>
      <span class="ft-tick" style="left: 20%">1 s</span>
      <span class="ft-break" style="left: 26%"></span>
      <span class="ft-tick ft-tick-end">minutes</span>
    </div>

    <p class="ft-legend"><span class="ft-legend-dot"></span>Your payment is sent at 0 s. Each square is a block.</p>

    <button v-if="state === 'play'" class="ft-replay" type="button" @click="replay">Replay</button>
  </div>
</template>

<style scoped>
.ft { position: relative; display: grid; gap: 26px; padding-bottom: 4px; }
.ft-name { font-size: 0.9rem; font-weight: 600; color: var(--vp-c-text-1); margin-bottom: 10px; }
.ft-other .ft-name { color: var(--vp-c-text-2); }

/* the track spans the axis; positions are percentages of it */
.ft-track { position: relative; height: 34px; }
.ft-track::before {
  content: ''; position: absolute; left: 0; right: 0; top: 50%;
  border-top: 1px dashed var(--vp-c-divider);
}
.ft-tx {
  position: absolute; left: 0; top: 50%; width: 12px; height: 12px; margin-top: -6px;
  border-radius: 50%; background: var(--vp-c-text-1);
  box-shadow: 0 0 0 4px var(--vp-c-bg-soft);
}
.ft-block {
  position: absolute; top: 3px; width: 28px; height: 28px; border-radius: 7px;
  left: var(--x, 6%);
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-text-3);
}
.ft-final {
  left: 7%;
  background: var(--vp-c-brand-3); border-color: var(--vp-c-brand-3);
  box-shadow: 0 0 0 5px var(--vp-c-brand-soft);
}
.ft-block-label {
  position: absolute; top: 34px; left: 50%; transform: translateX(-50%);
  font-size: 0.72rem; color: var(--vp-c-text-3); white-space: nowrap;
}
.ft-mark {
  position: absolute; top: 50%; transform: translateY(-50%);
  font-size: 0.9rem; line-height: 1.3; font-weight: 600;
}
.ft-mark-final { left: calc(7% + 44px); color: var(--vp-c-text-1); }
.ft-mark-final::before {
  content: ''; display: inline-block; width: 7px; height: 12px; margin-right: 8px;
  border: solid var(--vp-c-green-1); border-width: 0 2px 2px 0; transform: rotate(45deg) translateY(-2px);
}
.ft-mark-maybe {
  right: 0; top: calc(100% + 16px); transform: none; max-width: 240px; text-align: right;
  color: var(--vp-c-text-2); font-weight: 500; font-size: 0.85rem;
}
.ft-other .ft-track { margin-bottom: 38px; }
.ft-pulse .ft-track { margin-bottom: 20px; }
.ft-legend { margin: -8px 0 0; font-size: 0.8rem; color: var(--vp-c-text-3); display: flex; align-items: center; gap: 8px; }
.ft-legend-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--vp-c-text-1); flex: none; }

/* shared axis */
.ft-axis { position: relative; height: 22px; border-top: 1px solid var(--vp-c-divider); margin-top: 2px; }
.ft-tick { position: absolute; top: 6px; font-size: 0.75rem; color: var(--vp-c-text-3); transform: translateX(-2px); }
.ft-tick::before { content: ''; position: absolute; left: 2px; top: -10px; height: 6px; border-left: 1px solid var(--vp-c-divider); }
.ft-tick-end { right: 0; }
.ft-tick-end::before { left: auto; right: 2px; }
.ft-break {
  position: absolute; top: -6px; width: 10px; height: 11px;
  border-left: 2px solid var(--vp-c-bg-soft); border-right: 2px solid var(--vp-c-bg-soft);
  background: var(--vp-c-bg-soft);
}
.ft-break::before, .ft-break::after {
  content: ''; position: absolute; top: 0; height: 11px; border-left: 1px solid var(--vp-c-text-3); transform: skewX(-20deg);
}
.ft-break::before { left: 0; } .ft-break::after { right: 0; }

.ft-replay {
  position: absolute; right: 0; top: -4px;
  font-size: 0.78rem; color: var(--vp-c-text-2); padding: 2px 8px; border-radius: 6px;
  border: 1px solid var(--vp-c-divider); background: transparent; cursor: pointer;
}
.ft-replay:hover { color: var(--vp-c-text-1); border-color: var(--vp-c-text-3); }
.ft-replay:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }

/* ---- the one play-through ---- */
.ft-ready .ft-block, .ft-ready .ft-mark { opacity: 0; transform-origin: center; }
.ft-ready .ft-block { transform: scale(0.6); }
.ft-ready .ft-mark-final { transform: translateY(-50%) translateX(-6px); }
.ft-play .ft-block {
  animation: ft-pop 0.35s cubic-bezier(.2,.9,.3,1.25) both;
  animation-delay: calc(0.25s + var(--i) * 0.42s);
}
.ft-play .ft-final { animation-delay: 0.25s; }
.ft-play .ft-mark-final { animation: ft-in-x 0.4s ease-out 0.62s both; }
.ft-play .ft-mark-maybe { animation: ft-in 0.5s ease-out calc(0.25s + 6 * 0.42s) both; }
@keyframes ft-pop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
@keyframes ft-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes ft-in-x { from { opacity: 0; transform: translateY(-50%) translateX(-6px); } to { opacity: 1; transform: translateY(-50%) translateX(0); } }

@media (max-width: 560px) {
  .ft-block { width: 22px; height: 22px; top: 6px; }
  .ft-mark-final { font-size: 0.84rem; left: calc(7% + 34px); }
}
</style>

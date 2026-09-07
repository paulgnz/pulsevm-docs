<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSidebar } from 'vitepress/theme'

// Desktop-only toggle for the left sidebar. State lives on <html> as the
// `pvm-sidebar-hidden` class (custom.css collapses --vp-sidebar-width) and is
// remembered per browser in localStorage; config.mts applies it before first
// paint so there is no layout flash.
const KEY = 'pvm-sidebar-hidden'
const { hasSidebar } = useSidebar()
const hidden = ref(false)

onMounted(() => {
  try { hidden.value = localStorage.getItem(KEY) === '1' } catch {}
  document.documentElement.classList.toggle('pvm-sidebar-hidden', hidden.value)
})

function toggle() {
  hidden.value = !hidden.value
  document.documentElement.classList.toggle('pvm-sidebar-hidden', hidden.value)
  try { localStorage.setItem(KEY, hidden.value ? '1' : '0') } catch {}
}
</script>

<template>
  <button
    v-if="hasSidebar"
    class="pvm-sidebar-toggle"
    type="button"
    :title="hidden ? 'Show sidebar' : 'Hide sidebar'"
    :aria-label="hidden ? 'Show sidebar' : 'Hide sidebar'"
    :aria-pressed="hidden"
    @click="toggle"
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="2" y="3.5" width="16" height="13" rx="3" />
      <path d="M7.5 3.5v13" />
    </svg>
  </button>
</template>

<style scoped>
.pvm-sidebar-toggle { display: none; }
@media (min-width: 960px) {
  .pvm-sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    color: var(--vp-c-text-2);
    transition: color 0.25s, background-color 0.25s;
  }
  .pvm-sidebar-toggle:hover { color: var(--vp-c-text-1); background-color: var(--vp-c-default-soft); }
  .pvm-sidebar-toggle[aria-pressed="true"] { color: var(--vp-c-brand-1); }
}
</style>

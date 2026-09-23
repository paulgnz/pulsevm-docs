<script setup>
// Plain-text twin for .md mirrors and llms-full.txt: docs/.vitepress/agent-text/BanksLead.md (keep in sync)
// Lead block for /institutions/banks: the page's argument in one picture,
// plus the two actions a bank reader takes.
</script>

<template>
  <div class="bl">
    <p class="bl-lede">Issue tokenized deposits your customers can move instantly, while the dollars behind them stay on your balance sheet.</p>
    <figure class="bl-flow" aria-label="Where a customer's dollar goes: third-party stablecoin compared with an institution-issued tokenized deposit">
      <div class="bl-lane bl-away">
        <span class="bl-lane-name">Third-party stablecoin</span>
        <div class="bl-steps">
          <span class="bl-step">Your customer's dollar</span>
          <span class="bl-arrow" aria-hidden="true"></span>
          <span class="bl-step">Outside issuer</span>
        </div>
        <span class="bl-result">The float, the margin and the relationship leave with it.</span>
      </div>
      <div class="bl-lane bl-home">
        <span class="bl-lane-name">Tokenized deposit on PulseVM</span>
        <div class="bl-steps">
          <span class="bl-step">Your customer's dollar</span>
          <span class="bl-arrow" aria-hidden="true"></span>
          <span class="bl-step bl-strong">Your balance sheet</span>
        </div>
        <span class="bl-result">You issue the token. The deposit, the margin and the customer stay with you.</span>
      </div>
    </figure>
    <div class="bl-actions">
      <a class="bl-btn bl-primary" href="https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs" target="_blank" rel="noopener">Contact Metallicus</a>
      <a class="bl-btn" href="#for-your-engineering-team">Brief your engineering team</a>
    </div>
  </div>
</template>

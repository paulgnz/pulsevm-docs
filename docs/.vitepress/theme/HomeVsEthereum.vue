<script setup>
// Plain-text twin for .md mirrors and llms-full.txt: docs/.vitepress/agent-text/HomeVsEthereum.md (keep in sync)
// Homepage: the decision a bank is actually making. Left column is what the
// team would build and audit on Ethereum; right is how PulseVM accounts work.
const rows = [
  { need: 'Know who is on the other side of a payment', eth: 'Map hex addresses to customers in your own systems', pvm: 'Accounts carry names: acme.treas, branch.14, payroll' },
  { need: 'Require two officers to approve large payments', eth: 'Deploy a multisig wallet contract, then audit and maintain it', pvm: 'Set 2 of 3 on the account. The ledger enforces it' },
  { need: 'Let a processor or a bot do one thing only', eth: 'Add a session-key module and a guard contract, and audit both', pvm: 'Grant one permitted action. The ledger refuses that key for anything else' },
  { need: "Revoke a departed officer's authority", eth: 'Move assets to a new wallet, or build a recovery module', pvm: 'Replace the key in one approved change. Nothing moves' },
  { need: 'Spare customers any network fees', eth: 'Run a paymaster and relayer service, and keep it funded', pvm: 'The institution provisions capacity. Customers hold nothing' },
  { need: 'Audit how authority works', eth: 'Every wallet, module and paymaster is a separate audit', pvm: 'One account model, the same for every application' },
  { need: 'Know when a payment is final', eth: 'Mainnet: about 13 minutes. Private EVM: depends on the consensus you choose', pvm: 'About a second, never reorganized, nothing to configure' },
  { need: 'Keep transactions out of public view', eth: 'Mainnet: public forever. Private EVM: yes, on your own network', pvm: 'Your network, your members, your boundary' },
]
</script>

<template>
  <section class="vs" aria-labelledby="vs-title">
    <h2 id="vs-title">Everything a bank needs is built in. On Ethereum or any EVM chain, you would build it.</h2>
    <p class="vs-lede">That holds for public Ethereum and for private EVM networks alike. Each row in the middle is code your team writes, audits and defends for as long as it runs. Each row on the right is how PulseVM accounts already work.</p>
    <div class="vs-table" role="table" aria-label="PulseVM compared with Ethereum for a bank">
      <div class="vs-row vs-head" role="row">
        <span role="columnheader">You need to</span>
        <span role="columnheader">On Ethereum or an EVM chain</span>
        <span role="columnheader" class="vs-pvm">On PulseVM</span>
      </div>
      <div v-for="r in rows" :key="r.need" class="vs-row" role="row">
        <span role="cell" class="vs-need">{{ r.need }}</span>
        <span role="cell" class="vs-eth">{{ r.eth }}</span>
        <span role="cell" class="vs-pvm">{{ r.pvm }}</span>
      </div>
    </div>
    <p class="vs-foot">
      Details: <a href="/compare/permissioned-evm">vs a permissioned EVM</a>, <a href="/compare/ethereum">vs Ethereum</a>, and <a href="/compare/smart-contract-wallets">accounts vs smart-contract wallets</a>.
    </p>
  </section>
</template>

<style scoped>
.vs { margin: 96px 0 0; }
.vs h2 {
  font-family: var(--pvm-font-display); font-size: 1.9rem; line-height: 1.2; font-weight: 650;
  letter-spacing: -0.02em; color: var(--vp-c-text-1); margin: 0 0 14px; padding: 0; border: 0;
  max-width: 24ch; text-wrap: balance;
}
.vs-lede { color: var(--vp-c-text-2); font-size: 1.05rem; line-height: 1.6; max-width: 60ch; margin: 0 0 32px; }
.vs-table { border: 1px solid var(--vp-c-divider); border-radius: 18px; overflow: hidden; }
.vs-row {
  display: grid; grid-template-columns: 1.1fr 1.4fr 1.4fr;
  border-top: 1px solid var(--vp-c-divider);
}
.vs-row:first-child { border-top: 0; }
.vs-row > span { padding: 16px 20px; font-size: 0.95rem; line-height: 1.5; }
.vs-head > span { font-size: 0.82rem; font-weight: 600; color: var(--vp-c-text-2); padding-top: 14px; padding-bottom: 14px; }
.vs-need { font-weight: 600; color: var(--vp-c-text-1); }
.vs-eth { color: var(--vp-c-text-2); }
.vs-pvm {
  color: var(--vp-c-text-1); font-weight: 500;
  background: color-mix(in srgb, var(--vp-c-brand-1) 8%, transparent);
  box-shadow: inset 2px 0 0 color-mix(in srgb, var(--vp-c-brand-1) 55%, transparent);
}
.vs-head .vs-pvm { color: var(--vp-c-brand-1); }
.vs-foot { color: var(--vp-c-text-2); font-size: 0.9rem; margin: 18px 0 0; }
.vs-foot a { font-weight: 600; }
@media (max-width: 760px) {
  .vs h2 { font-size: 1.5rem; }
  .vs-head { display: none; }
  .vs-row { grid-template-columns: 1fr; padding: 14px 0; }
  .vs-row > span { padding: 4px 18px; }
  .vs-eth::before { content: 'On an EVM chain: '; font-weight: 600; color: var(--vp-c-text-3); }
  .vs-pvm { box-shadow: none; background: none; }
  .vs-pvm::before { content: 'On PulseVM: '; font-weight: 600; color: var(--vp-c-brand-1); }
}
</style>

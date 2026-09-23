<script setup>
import FinalityTimeline from './FinalityTimeline.vue'
// Homepage capability rows: four primary capabilities, each shown as the
// thing itself (a permission tree, a settlement timeline, a customer receipt,
// a validator ring), then a compact list of the rest.
const validators = ['Your bank', 'Credit union', 'Regional bank', 'Payments firm', 'Clearing partner']
const ring = validators.map((name, i) => {
  const a = (-90 + i * 72) * Math.PI / 180
  return { name, x: 160 + 112 * Math.cos(a), y: 150 + 112 * Math.sin(a) }
})
const more = [
  { title: 'Keep deposits at home', text: 'Issue tokenized dollars on Metal Dollar rails while the deposits stay on your balance sheet.', link: '/institutions/banks', label: 'For banks and fintechs' },
  { title: 'Native, not bolted on', text: 'Account abstraction, batched payments, fee sponsorship, and passkey (WebAuthn) and secure-enclave (R1) keys are part of the account model.', link: '/guide/native-by-design', label: 'What is built in' },
  { title: 'Build in Rust, C++ or TypeScript', text: 'Rust is the canonical contract kit. C++ carries the Antelope heritage. TypeScript suits teams who prefer it.', link: '/build/get-started', label: 'Start building' },
  { title: 'Compliance and identity', text: 'Allow-lists, freeze and clawback under legal order are controls you implement in contracts you own, operated under dual control. Pairs with Metal Identity.', link: 'https://identity.metallicus.com', label: 'Metal Identity' },
]
</script>

<template>
  <section class="hf" aria-label="What PulseVM gives an institution">
    <!-- accounts -->
    <div class="hf-row">
      <div class="hf-copy">
        <h2>Give a key one job</h2>
        <p>Every account is a readable name with its own approval structure: 3 of 5 treasury officers, 2 of 3 for operations, and a service key that can perform exactly one action. It is configuration, and the ledger enforces it on every transaction. On EVM chains the same controls are a contract wallet and a key module your team deploys and audits.</p>
        <div class="hf-links"><a href="/guide/accounts-permissions">Accounts and permissions</a><a href="/guide/delegated-authority">See it in production</a></div>
      </div>
      <figure class="hf-art" aria-label="Example permission tree for a treasury account">
        <div class="tree">
          <div class="tree-node tree-root"><strong>treasury.bank</strong></div>
          <ul>
            <li><div class="tree-node"><strong>owner</strong><span>Treasury officers, 3 of 5</span></div>
              <ul>
                <li><div class="tree-node"><strong>active</strong><span>Operations, 2 of 3 keys</span></div>
                  <ul>
                    <li><div class="tree-node tree-leaf"><strong>payments</strong><span>Linked to token::transfer only. 1 key.</span></div></li>
                    <li><div class="tree-node tree-leaf"><strong>trader</strong><span>Linked to vault::trade only. Bot key.</span></div></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </figure>
    </div>

    <a class="hf-proof" href="/guide/delegated-authority">
      <span class="hf-proof-figure">31 of 31</span>
      <span class="hf-proof-text">attempts to move funds or take over the account were refused by the ledger, using a live service's real key. That key was permitted exactly one action. The service runs in production on XPR Network; the attack exercise ran on its test network.</span>
      <span class="hf-proof-link">Read the case study</span>
    </a>

    <!-- finality -->
    <div class="hf-row hf-flip">
      <div class="hf-copy">
        <h2>Settlement you can put in an SLA</h2>
        <p>Sub-second blocks with instant finality. A transfer is rejected immediately or it is final. There is no confirmation count to wait out and no reorganization afterwards.</p>
        <a href="/guide/finality">Finality and settlement</a>
      </div>
      <figure class="hf-art" aria-label="One payment on two chains: final on PulseVM in under a second, only probably final on a confirmation-count chain after minutes">
        <FinalityTimeline />
      </figure>
    </div>

    <!-- no gas -->
    <div class="hf-row">
      <div class="hf-copy">
        <h2>No gas for your customers</h2>
        <p>The institution stakes compute and bandwidth once and provisions storage. Customers see your app, never a token purchase. Costs become capacity planning, not per-transaction tolls.</p>
        <a href="/guide/resources">Resource model</a>
      </div>
      <figure class="hf-art hf-pair" aria-label="What the customer sees compared with what the institution manages">
        <div class="receipt">
          <span class="pane-label">Your customer sees</span>
          <div class="receipt-amount">$50.00</div>
          <div class="receipt-line"><span>To</span><span>alex.cu</span></div>
          <div class="receipt-line"><span>Network fee</span><span>None</span></div>
          <div class="receipt-status">Sent and settled</div>
        </div>
        <div class="ops">
          <span class="pane-label">Your institution manages</span>
          <ul>
            <li>Stake CPU and bandwidth once</li>
            <li>Provision storage for accounts</li>
            <li>Plan capacity like any other system</li>
          </ul>
        </div>
      </figure>
    </div>

    <!-- your network -->
    <div class="hf-row hf-flip">
      <div class="hf-copy">
        <h2>Your network, your rules</h2>
        <p>PulseVM runs as a plugin for metalgo. An institution or a consortium deploys its own chain with its own validators, and the chain's rules are system contracts it owns and can change.</p>
        <a href="/network/launch">Launch your own network</a>
      </div>
      <figure class="hf-art" aria-label="Five named institutions validating one shared ledger">
        <svg class="ring" viewBox="0 0 320 300" role="img">
          <line v-for="v in ring" :key="'l' + v.name" x1="160" y1="150" :x2="v.x" :y2="v.y" class="ring-link" />
          <circle cx="160" cy="150" r="112" class="ring-orbit" />
          <circle cx="160" cy="150" r="34" class="ring-core" />
          <text x="160" y="155" class="ring-core-label" text-anchor="middle">Ledger</text>
          <g v-for="v in ring" :key="v.name">
            <circle :cx="v.x" :cy="v.y" r="9" class="ring-node" />
            <text :x="v.x" :y="v.y + (v.y > 150 ? 26 : -16)" text-anchor="middle" class="ring-label">{{ v.name }}</text>
          </g>
        </svg>
      </figure>
    </div>

    <div class="hf-more">
      <h2>Also built in</h2>
      <div class="hf-more-grid">
        <div v-for="m in more" :key="m.title" class="hf-more-item">
          <h3>{{ m.title }}</h3>
          <p>{{ m.text }}</p>
          <a :href="m.link" :target="m.link.startsWith('http') ? '_blank' : undefined" :rel="m.link.startsWith('http') ? 'noopener' : undefined">{{ m.label }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

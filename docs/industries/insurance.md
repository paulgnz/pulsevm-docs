# Insurance

Claims settlement, reinsurance treaties, and parametric products are multi-party processes that today run on reconciliation between separate systems of record. PulseVM gives every party one authoritative ledger with instant, final settlement.

## Why the primitives fit

- **Named accounts** for insurers, reinsurers, brokers, MGAs, and TPAs — identity is legible, not a hex address.
- **[Multisig](/guide/multisig)** for claims approval and treaty execution: an adjuster proposes, supervisors approve, the payout executes only at threshold — every step on an immutable audit trail.
- **[Instant finality](/guide/finality)** turns "when does the claim pay?" into a one-word answer; parametric triggers (with an [oracle](/build/api)) can settle automatically the moment conditions are met.
- **[Private networks](/guide/privacy)** keep treaty terms and claims data among the participating carriers, never on a public chain.

## Deployment shape

A carrier consortium or a single insurer-plus-partners network: named participants, claims and treaty logic in system/contract code the consortium controls, regulator read-access on demand.

**[Talk to us — Contact Metallicus →](https://metallicus.com/contact-us)**

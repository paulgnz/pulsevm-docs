# Objections, Answered

We steel-man these because credibility is the product.

## "Enforce permissions sounds like control"

Other way around — they are permissions **the account holder sets on their own account**: which of *your* keys can do what. Nothing protocol-level decides who transacts. And the rule-sets themselves are forkable: anyone can deploy their own network with their own validators. Opt-in rule-sets have no central authority to abuse.

## "Small validator sets can collude"

In a public-chain context, a real critique. In a consortium of legally-bound, named institutions, the validator set **is** the governance body — the same parties who would govern any shared financial infrastructure, now with cryptographic enforcement and replaceability.

## "Single implementation / vendor risk"

True today, and normal for institutional software (banks run on FIS, Temenos, Fiserv). Mitigations are contractual (support, SLAs, escrow) plus open repositories and a reference implementation (Antelope/Leap) that anchors the semantics independently of any one codebase.

## "Where's the privacy?"

Confidentiality between competing participants is unsolved on *every* current chain, permissioned EVM included. Honest answers today: per-consortium network boundaries, application-layer encryption, and selective-disclosure work on the roadmap. We name this rather than hand-wave it.

## "How mature is this, really?"

Two honest parts.

**The semantics are a decade old and run in production.** PulseVM implements the Antelope execution model (Leap 5.0.3) that XPR Network runs today, and carries core components — the chainbase state database, the libfc crypto/serialization layer — over directly from the reference implementation. The account model, permissions, and resource economics are not experiments.

**Where PulseVM is new, correctness is measurable, not asserted.** The new surfaces are the Rust execution host and the consensus integration. Because a mature reference implementation exists and runs in production, hardening is mechanical:

- **Differential testing** replays identical action streams through Leap 5.0.3 and PulseVM and diffs the results — every divergence is a found bug with ground truth attached.
- **Ported regression suites** inherit a decade of fixed bugs as executable assertions.

Active engineering items — notably the consensus-integration rework for high-concurrency workloads — are known, scoped, and on the critical path before production deployment, and pilots are sequenced accordingly. Serious counterparties get an **engineering-status register**, not adjectives.

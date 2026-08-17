# Objections, Answered

We steel-man these because credibility is the product.

## "Enforce permissions sounds like control"

Other way around — they are permissions **the account holder sets on their own account**: which of *your* keys can do what. Nothing protocol-level decides who transacts. And the rule-sets themselves are forkable: anyone can deploy their own network with their own validators. Opt-in rule-sets have no central authority to abuse.

## "Small validator sets can collude"

In a public-chain context, a real critique. In a consortium of legally-bound, named institutions, the validator set **is** the governance body — the same parties who would govern any shared financial infrastructure, now with cryptographic enforcement and replaceability.

## "Single implementation / vendor risk"

Normal for institutional software — mission-critical systems are routinely run on vendor relationships with commercial support. Mitigations here are contractual (support, SLAs, escrow) plus open repositories and a reference implementation (Antelope/Leap) that anchors the semantics independently of any one codebase.

## "Where's the privacy?"

The most important privacy lever is one public chains lack: the **network boundary**. On a private subnet the ledger exists only among the member institutions — no public mempool, no public explorer, nothing on the public internet. Finer-grained confidentiality between members is an architecture choice (per-relationship subnets, application-layer encryption). See [Privacy & Confidentiality](/guide/privacy).

## "How mature is this, really?"

Two honest parts.

**The semantics are a decade old and run in production.** PulseVM implements the Antelope execution model (Leap 5.0.3) that [XPR Network](https://xprnetwork.org) runs today, and carries core components — the chainbase state database, the libfc crypto/serialization layer — over directly from the reference implementation. The account model, permissions, and resource economics are not experiments.

**Where PulseVM is new, correctness is measurable, not asserted.** The new surfaces are the Rust execution host and the consensus integration. Because a mature reference implementation exists and runs in production, hardening is mechanical:

- **Differential testing** replays identical action streams through Leap 5.0.3 and PulseVM and diffs the results — every divergence is a found bug with ground truth attached.
- **Ported regression suites** inherit a decade of fixed bugs as executable assertions.

Engineering is tracked openly and rigorously — serious counterparties get an **engineering-status register**, not adjectives. The combination of a decade-old execution model and differential testing against a production reference is what lets an institution move from evaluation to deployment with confidence.

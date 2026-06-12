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

The execution semantics are a decade old and run XPR Network in production today; core components (state database, crypto layers) are carried over directly. Where PulseVM is new (the Rust execution host, the consensus integration), hardening is **measurable, not aspirational**: differential testing against the reference implementation, ported regression suites, and an AI-accelerated find-fix-verify loop that has repeatedly turned multi-day diagnostic problems into same-week deployed fixes. Engineering-status detail is available to serious counterparties.

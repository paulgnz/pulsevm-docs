# For Banks & Fintechs

## The economic argument first: keep deposits — and the technology — at home

Every dollar a customer moves into a third-party stablecoin or fintech app is a deposit that **leaves your balance sheet**. The float, the net interest margin, and increasingly the customer relationship accrue to the issuer or the app — while the institution that did the KYC and bears the regulatory burden becomes a funding source for someone else's business model.

PulseVM plus the **Metal Dollar** network inverts that flow:

- **Your institution issues the tokenized dollars.** Customers get instant, programmable, 24/7 money — and the deposits backing it **stay on your balance sheet**, earning your margin.
- **You own the customer relationship and the data.** The wallet is your app; the account is your named account; the permissions are your policy.
- **You own the rails.** The institution (or consortium) operates the network — technology competency compounds inside the institution instead of being rented.
- **Interoperate on your terms.** Metal Dollar provides a common settlement asset across the ecosystem — instant institution-to-institution transfer — while each network's rules remain its own.

**One line: the same product that stops deposit flight makes you the technology provider instead of the disintermediated party.**

## The primitives already match how you work

| Banking concept | PulseVM primitive |
|---|---|
| Named, KYC'd entities | Named accounts (`acmecu.treas`) |
| Authorization matrix | Hierarchical permissions — native |
| Dual control / maker-checker | [Weighted multisig](/guide/multisig) on any permission |
| Key rotation & recovery | Native `updateauth`; assets never move |
| HSM / enclave custody | secp256r1 (R1) keys natively |
| Customer pays no gas | Institution stakes resources; users see an app |
| "When is it settled?" | Instant, irreversible — [no reorgs by construction](/guide/finality) |
| Audit trail | Full indexed history, human-readable actions |

Each of these is solvable on EVM — by *additional* infrastructure, frameworks, and audit surface. Here they are the floor.

## Permissioned is the design point, not a compromise

Your validators are named institutions under legal agreements. Block producers are elected and replaceable. The network's rules — account policy, fee models, asset-level controls, freeze/clawback under court order — live in **system contracts your organization owns and can modify**, on an execution model with a decade of customization precedent (WAX, Telos, FIO, XPR Network).

## Not bare infrastructure

A deployment starts with working products, not a toolkit: the **WebAuth wallet** (passkey-grade custody with named accounts), **Metal X** (a running order-book exchange), a **loan protocol**, and the indexers, explorers, and SDKs that come from operating these networks in production.

## Talk to us

The pilot shape we recommend: a consortium runs a small validator network, issues a tokenized test-deposit asset, and moves intra-member settlement on it for 90 days — small, sovereign, measurable.

**[Contact Metallicus →](https://metallicus.com/contact-us)**

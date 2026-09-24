---
description: "The hard questions institutions ask about PulseVM, answered straight: central control, collusion, vendor risk, Avalanche dependency, account abstraction on public chains, privacy, maturity and what is left before production."
---

# Objections, answered

The hard questions institutions ask, with straight answers.

## "Permissions sound like central control"

The other way around. Permissions are set **by the account holder on their own account**: which of their keys can do what, with whose countersignature. Nothing at the protocol level decides who may transact. And the rule-sets are forkable: anyone can run their own network with their own validators.

## "Small validator sets can collude"

On a public chain, a real critique. In a consortium of named, legally bound institutions, the validator set **is** the governance body: the same parties who would govern any shared financial infrastructure, now with cryptographic enforcement. Validators are admitted by the members and can be removed by them.

## "Why not a public chain with account abstraction?"

Account abstraction rebuilds, in contracts, what PulseVM has in the protocol: a smart-contract wallet per user, a module for multisig, another for session keys, a paymaster for fees, a bundler to submit it all. Each piece is code you deploy, audit and keep upgrading, and each wallet vendor does it slightly differently.

| Need | Public chain with account abstraction | PulseVM |
|---|---|---|
| Readable identity | Name service mapped to hex addresses | Named accounts |
| Dual control | Multisig wallet contract | Weighted multisig on any permission |
| A key for one job | Session-key module, per wallet vendor | `linkauth`, enforced before contract code runs |
| No fee token for users | Paymaster and bundler | The institution stakes resources |
| Settlement | Probabilistic, then finalized after a delay | Final in about a second, no reorganizations |
| Who sets the rules | The public chain's governance | Your network's system contracts |

And the data is public by default. See [PulseVM vs smart-contract wallets](/compare/smart-contract-wallets).

## "What if Metallicus disappears?"

Your network keeps running. It belongs to its operators: your validators, your system contracts, your data.

- **The code is open to you.** The VM's source is public for review, and the contract development kits and system contracts are open source. Put continuity terms, such as source-code escrow, in your commercial agreement with Metallicus.
- **The model is not one team's.** The Antelope execution model has been maintained by more than one organization, runs on several independent public networks and has a deep pool of engineers and operators who know it.
- **Contracts are portable.** Contracts written for the Antelope model run on PulseVM, so your business logic is written to a model with more than one runtime, not to one vendor's platform.

Mission-critical software already runs on vendor relationships with commercial support. This one comes with its source in view and a contract model that is not tied to a single runtime.

## "Is Avalanche, or Metal, a dependency?"

Metal Blockchain (Avalanche lineage) provides the consensus engine: PulseVM runs as a VM plugin inside metalgo nodes and uses Snowman for block acceptance. What that does not mean: your network does not run on someone else's validators, and its transactions do not pay someone else's fees or wait on someone else's governance. The one external link is validator registration on the Metal Blockchain P-Chain, which carries a small validator fee. The network runs on your validators, under rules in contracts you own. The metalgo software is itself open source, and upgrades are coordinated events your validators choose to take.

## "Single implementation risk"

PulseVM is one implementation of a model with others, and its behaviour is checked against the production reference rather than asserted. The mitigations are contractual (support, SLAs, escrow) plus open repositories and that reference model, which anchors the semantics independently of any one codebase.

## "Where's the privacy?"

The most important privacy lever is one public chains lack: the **network boundary**. On a private network the ledger exists only among the members: no public mempool, no public explorer, nothing on the public internet. Finer-grained confidentiality between members is an architecture choice (per-relationship networks, application-layer encryption). See [Privacy and confidentiality](/guide/privacy).

## "How mature is this, really?"

The semantics are a decade old and run in production; the implementation is new. PulseVM implements the Antelope execution model that [XPR Network](https://xprnetwork.org) runs today, in a Rust VM, and the full XPR Network mainnet history has been replayed on it. See [Migrating an Antelope chain](/guide/migrate-antelope-chain). Where PulseVM is new (the Rust execution host and the consensus integration), correctness is measured by replaying the same inputs through the reference and PulseVM and comparing state.

The account model itself is proven in production: see [Delegated authority with hard limits](/guide/delegated-authority).

## "What's left before production?"

Honestly: PulseVM is at test-network stage.

- **Releases.** Recent work is on the main branch ahead of the latest tagged release (v0.7.1). Production networks should run tagged releases.
- **Surface still in development.** A set of newer cryptographic host functions. A `/v1/chain` API inside the node and support for metalgo 1.14.2 are merged and ship in the next release.
- **Pilots first.** The path to production is a pilot run with Metallicus engineering, with exit criteria agreed up front. See [Run a 90-day pilot](/institutions/pilot) and the [technical status table](/institutions/technical-evaluators#status-what-is-shipped-and-what-is-not).

## "Who uses it today?"

No bank or credit union runs PulseVM in production yet; it is at test-network stage, and institutions start with a [pilot](/institutions/pilot). The account model it runs is in production on XPR Network, and the team behind it already works inside regulated finance: Metallicus is live on the Federal Reserve's FedNow Service, and credit unions work with it through the Cornerstone League stablecoin pilot and the Metal Blockchain Banking Innovation Program. See [Who is behind PulseVM](/institutions/metallicus).

## Next step

Take these questions, and the ones we have not answered, into a conversation. The [buyer's checklist](/institutions/checklist) is a good agenda.

**[Contact Metallicus →](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs)**

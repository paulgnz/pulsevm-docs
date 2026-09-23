---
description: "A buyer's checklist for PulseVM: RFP-style questions with straight answers on custody and key types, key ceremony, dual control, delegated authority, data residency, privacy, disaster recovery, upgrades, audit access, compliance controls, status and security disclosure."
---

# Buyer's checklist

The questions risk, security and procurement ask, with straight answers. Copy them into your RFP. Where something is in development, we say so.

## Custody and key types

| Question | Answer |
|---|---|
| Which signature types does the chain verify? | K1 (secp256k1), R1 (P-256, the curve HSMs and secure enclaves use) and WebAuthn (passkeys). All three are verified by the chain itself. |
| Can signing keys live in an HSM? | Yes. The chain only ever sees public keys and signatures. An R1 key generated in an HSM or a secure enclave signs there and never leaves it. |
| Can customers use passkeys? | Yes. A WebAuthn key on a phone or laptop can be a permission on the customer's account, with no seed phrase. |
| Can different permissions use different key types? | Yes. Each permission has its own keys and threshold, so a board key can sit in an HSM while an operator uses a passkey. |

## Key ceremony

| Question | Answer |
|---|---|
| What needs a ceremony? | The keys for each institution account's `owner` and `active` permissions, and each validator's staking keys. |
| Does the ceremony depend on Metallicus? | No. You generate keys on your own devices and register only public keys when the account is created. Metallicus can help design the ceremony. |
| How are validator keys protected? | They are generated on the validator host and backed up out of band under your procedures. Losing them loses that validator's identity, not the chain. |

## Dual control and authorization

| Question | Answer |
|---|---|
| Is maker-checker enforced by the protocol? | Yes. Any permission can require a weighted threshold of keys or other accounts, for example 2 of 3 officers. See [Multisig](/guide/multisig). |
| Can we mirror our authorization matrix? | Yes. Each account has a tree of permissions (owner, active and any custom ones such as `treasury` or `mint`), each with its own keys and threshold. See [Accounts and permissions](/guide/accounts-permissions). |
| How do we rotate a key when an officer leaves? | One `updateauth` on the permission. Balances and history do not move. |
| Who can recover a permission? | Its parent. `owner` can reset anything below it. |

## Delegated authority limits

| Question | Answer |
|---|---|
| Can a service key be limited to one job? | Yes. `linkauth` binds a permission to one contract action. Used for anything else, it is refused by the protocol before contract code runs. |
| Can we cap what a delegated key does within that action? | Yes, in the contract: per-transaction caps, daily budgets, price bands, cooldowns. |
| Is this proven? | The same account model runs a delegated trading service on XPR Network mainnet, where the operator's key cannot withdraw. See [Delegated authority with hard limits](/guide/delegated-authority). |

## Data residency and privacy

| Question | Answer |
|---|---|
| Where does the data live? | On your validators and history nodes, wherever you host them. There is no shared public network holding a copy. |
| Who can see transactions? | The network's participants and whoever you grant read access, such as auditors or regulators. Not the public internet. |
| Can members of one network be shielded from each other? | By network (one per relationship or trade lane) or by encrypting sensitive payloads at the application layer. See [Privacy and confidentiality](/guide/privacy). |
| Are amounts hidden from the validators? | No. On-chain data is plaintext to the validator set, so the confidentiality boundary is the set of validators you admit. |

## Disaster recovery

| Question | Answer |
|---|---|
| What happens if a validator is lost? | The network continues while a quorum remains. The lost node is rebuilt and rejoins. |
| How is a node rebuilt? | Execution is deterministic, so a node rebuilds its state by replaying the chain from its peers. Recovery is resumption, not reconstruction. |
| What happens if quorum is lost? | The network stops accepting blocks and resumes when quorum returns. It does not fork, so there is nothing to reconcile afterwards. |
| What is the RTO? | Set by your topology and hosting; measure it in the [pilot](/institutions/pilot) with a rebuild drill. |

## Upgrade governance

| Question | Answer |
|---|---|
| Who decides on software upgrades? | Your validators. Consensus-affecting upgrades roll out in coordinated windows the network's operators agree. |
| Who can change the network's rules? | Whoever controls the system contracts, normally the members under multisig. Every change is an on-chain action on the audit trail. |
| Can a vendor push a change to our network? | No. Nothing changes until your operators install it or your members approve it. |

## Audit access

| Question | Answer |
|---|---|
| Can an auditor get read-only access? | Yes. Reads are free and need no signing key; access is a grant you control at the API layer. |
| How much history is available? | All of it. Hyperion indexes every action by named account into queryable, human-readable history. |
| Can we prove who approved a transaction? | Yes. Every signature and multisig approval is part of the record. |

## Compliance controls

| Question | Answer |
|---|---|
| Can we freeze, claw back or restrict an account? | Yes, as policy you write into the token and system contracts you own, executed under multisig by named officers. The account model makes it possible; the reference contracts do not ship these controls today. |
| Is KYC built in? | No. Your onboarding creates the named account after your KYC, so every account on the network is one you admitted. |

## Status and roadmap

| Question | Answer |
|---|---|
| Is PulseVM in production? | No. PulseVM is at test-network stage. The account model it implements runs in production on XPR Network. |
| What is in development? | A `/v1/chain` API inside the node (a gateway serves it today), newer cryptographic host functions, and support for the latest metalgo release. See the [status table](/institutions/technical-evaluators#status-what-is-shipped-and-what-is-not). |
| Which version should we run? | Tagged releases. The latest is v0.7.1; newer work is on the main branch. |
| How do we get to production? | A [90-day pilot](/institutions/pilot) with Metallicus, then a scoped production plan. |

## Security disclosure and support

| Question | Answer |
|---|---|
| How do we report a vulnerability? | Privately, to [Metallicus](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs). |
| Is the code reviewable? | Yes. The VM, the contract development kits and the system contracts are open source. |
| Is commercial support available? | Yes, from Metallicus, including deployment engineering. |

## Next step

Send us your own questions alongside these.

**[Contact Metallicus →](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs)**

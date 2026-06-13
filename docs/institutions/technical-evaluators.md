---
description: "PulseVM for technical evaluators — architecture, integration, operations, security posture and the failure model for a sovereign institutional blockchain."
---

# For Technical Evaluators

CTO-to-CTO. The value proposition is elsewhere on this site; this page answers the question a technical decision-maker actually asks: *can I operate this, integrate it, and stand behind it?*

## Where it sits in your architecture

PulseVM is a settlement and record layer, not a replacement for your systems of record — it sits alongside them.

- **Integration surface**: a native JSON-RPC API plus an Antelope-compatible REST layer, so standard tooling (eosjs, @proton/js, indexers) works against it. See the [API reference](/build/api).
- **System-of-record bridge**: [Hyperion](https://github.com/MetalBlockchain/pulsevm-hyperion) provides full, queryable history — the natural integration point for reconciliation, reporting, and feeding your existing ledger/GL. Reads are free, so analytics and audit impose no cost or rate pressure.
- **Contracts as your business logic**: rules live in [Rust](/build/quickstart-rust), C++, or [TypeScript](/build/quickstart-typescript) contracts you write and own — versioned, reviewed, and deployed on your schedule.

## Operating a network

A network is a set of validator nodes (metalgo + the PulseVM plugin) and the system contracts that define its rules. See [Launch Your Own Network](/network/launch).

- **Nodes** run on standard Linux hosts under a service manager; a consortium starts with a small, named validator set.
- **Observability**: each node reports head and last-irreversible block and standard node metrics — health is a simple, continuous signal.
- **Upgrades**: consensus-affecting plugin upgrades roll out across the validator set in coordinated windows — standard BFT-network practice, and a governance event the consortium controls.
- **Backup & recovery**: staking keys are backed up out of band; chain state is deterministically reproducible — a node can rebuild its state by replaying the chain, so recovery is resumption, not reconstruction.

## Failure model

Finality is a **safety guarantee**: the network never produces two conflicting final states. If the validator set could not reach quorum, the protocol favors safety over liveness — it waits for quorum and resumes rather than forking. For a settlement system this is the correct trade: there is never a reconciliation problem to clean up, only resumption. There are no reorgs to handle and no probabilistic-finality windows to design around.

## Security & correctness posture

- **Open source.** The VM ([pulsevm](https://github.com/MetalBlockchain/pulsevm)) and CDTs are public and reviewable — no closed-box trust required.
- **Proven execution model.** PulseVM implements the Antelope model (formerly EOSIO) running XPR Network, WAX, and Telos in production, and carries core components — the chainbase state database and the libfc crypto/serialization layer — directly from the reference implementation. The semantics are not new.
- **Differential testing against a production reference.** Because a mature reference implementation exists, correctness is *measured*: identical action streams are replayed through the reference and through PulseVM and the results diffed — every divergence is a concrete bug with ground truth attached, rather than a judgment call. The system is hardened through real-world operation, not adjectives.
- **Responsible disclosure.** Security concerns can be raised privately — [contact Metallicus](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs).

## Continuity & support

PulseVM is built and maintained by **Metallicus**, with commercial support, SLAs, and deployment engineering available — the vendor relationship model institutions already run their core systems on. Because the stack is open source and anchored to a public reference implementation (Antelope/Leap), it is not locked to a single codebase or a single team: the semantics survive independently of any one vendor.

## A sensible evaluation path

1. **Read** the [architecture](/guide/what-is-pulsevm) and [security model](/guide/accounts-permissions).
2. **Prototype** against the [public test network](/network/endpoints) — deploy a contract, exercise the permission and multisig model, integrate a read path via Hyperion.
3. **Pilot** a small sovereign network: a handful of validators, a tokenized test asset, real settlement flow for a defined period — small, isolated, measurable.
4. **Engineering-status register** and deployment runbooks are available to counterparties under NDA.

**[Talk to us — Contact Metallicus →](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs)**

---
description: "PulseVM development and network updates — releases, testnet milestones, and ecosystem changes, newest first. The quickest way to see that PulseVM ships weekly."
---

# Updates

Development moves fast — new [releases](https://github.com/MetalBlockchain/pulsevm/releases) land weekly. Newest first; current testnet endpoints always live at [Network Endpoints](/network/endpoints).

## September 2026

**2026-09-03 — Consensus and denial-of-service hardening batch merged.** Nine pull requests from a security review of the VM landed on `main` in one day: authorization is now verified on every block-application path, not only at admission ([#70](https://github.com/MetalBlockchain/pulsevm/pull/70)); `memory.copy`/`memory.fill` are metered per byte, linear-memory and table ceilings are enforced at instantiation, and ABI array decoding is bounded (#70); K1 signatures must be canonical on the consensus recovery path ([#72](https://github.com/MetalBlockchain/pulsevm/pull/72)); duplicate recovered keys are rejected ([#73](https://github.com/MetalBlockchain/pulsevm/pull/73)) and a transaction may carry at most 256 signatures ([#74](https://github.com/MetalBlockchain/pulsevm/pull/74)); `linkauth` to a missing target and `deleteauth` of a linked permission are refused ([#75](https://github.com/MetalBlockchain/pulsevm/pull/75)); packed `bytes` fields are sized by their real varint prefix, matching Antelope's wire format ([#78](https://github.com/MetalBlockchain/pulsevm/pull/78)); expired-transaction cleanup walks an index instead of scanning every recent id per block ([#80](https://github.com/MetalBlockchain/pulsevm/pull/80)). Several of these change block ids, so they take effect on chains started from a fresh genesis; no release is tagged yet (v0.7.1 remains the latest). The community exercised the batch on disposable copies of XPR Network testnet and mainnet state before merge — the signature-cap, duplicate-key and link-validity checks all behave as specified on real state.

**2026-09-02 — Demo network re-imported on the post-#69 build; R1 and WebAuthn signing proven on real XPR state.** The [1:1 demo network](/network/one-to-one-demo) now runs a fresh import of XPR Network testnet at head **403,625,033** (snapshot 2026-09-02 00:00 UTC) on a node built from upstream main plus the community import path. Every imported authority key is carried — 64,193 K1, 6 R1 and 1,020 WebAuthn — and a transfer signed only with an R1 key and an action signed only with a WebAuthn assertion both executed on-chain (txs `f180d672…`, `a8cc08b6…`), with wrong-key, tampered-challenge and wrong-origin controls rejected. The two independent import pipelines were re-compared at the current [#61](https://github.com/MetalBlockchain/pulsevm/pull/61) tip: with R1/WebAuthn keys carried, the `permission` table is now row-identical too (65,768 rows, zero differences). A load run on a disposable copy held 400 transactions per one-second block with zero rejections until the single sender account exhausted its staked CPU allowance — Antelope's per-account limit, not the chain, was the ceiling.

**2026-09-01 — R1 and WebAuthn authority keys merged upstream.** [PR #69](https://github.com/MetalBlockchain/pulsevm/pull/69) adds secp256r1 (R1) and WebAuthn signature verification to authority checking, so accounts secured with passkeys and hardware-backed keys — the default for WebAuth.com wallet users on XPR Network — sign on PulseVM with their existing keys. This closes the last key-type gap for a 1:1 Antelope import; the migration guide's open-items list is updated accordingly.

**2026-09-01 — Import correctness cross-verified by two independent implementations.** The core team's state-import pipeline ([PR #61](https://github.com/MetalBlockchain/pulsevm/pull/61) — Chainbase/SHiP conversion) and the community's portable-snapshot importer were run against the same XPR testnet snapshot and produced **byte-identical Arena state — including row order — on every table both carry** (32,496 accounts, 633 contracts, 822,887 contract rows, 1.13M index rows; identical SHA-256s, measured with the upstream fingerprint tooling — [results](https://github.com/MetalBlockchain/pulsevm/pull/61#issuecomment-5485633926)). Also in review upstream this week: a [configurable system account](https://github.com/MetalBlockchain/pulsevm/pull/63), [XPR-compatible host functions](https://github.com/MetalBlockchain/pulsevm/pull/66), and [SHiP log-range reporting](https://github.com/MetalBlockchain/pulsevm/pull/67).

## August 2026

**2026-08-28 — In-place protocol upgrades, and cross-chain messaging in review.** Two notable landings: **protocol upgrade scheduling with activation safeguards** ([#51](https://github.com/MetalBlockchain/pulsevm/pull/51)) gives PulseVM a proper feature-activation framework — consensus-affecting changes can be scheduled and activated on a running chain rather than requiring a fresh genesis — and **block timestamp ordering / clock-drift validation** ([#65](https://github.com/MetalBlockchain/pulsevm/pull/65)). In review: **native Avalanche Interchain Messaging (warp)** ([#64](https://github.com/MetalBlockchain/pulsevm/pull/64)) — real BLS12-381 signing and stake-weighted aggregation, wire-compatible with AvalancheGo so PulseVM chains can exchange verifiable messages with the wider Metal/Avalanche ecosystem using existing relayers — and an [upstream state-import and multi-node boot path](https://github.com/MetalBlockchain/pulsevm/pull/61) from the core team.

**2026-08-21 — Cutover ceremony: three operator modes, live-testnet numbers.** The ceremony agent now covers the three roles a migration actually involves — block producer (freeze + snapshot at exactly the declared height + produce the new chain), API provider (/v1 continuity), and history provider (/v2 continuity via a federating router) — each with a recorded, journaled run against the full live state of XPR Network testnet (32,513 accounts). Externally measured: **99.8% read availability through 22 consecutive ceremonies, a 0.75 s traffic flip** (smaller than same-trace internet jitter), and a public `/v2/history` URL that answered a post-cut transaction directly above thousands of pre-cut archive rows minutes after the cut — the endpoint keeps its memory. Details and honest anatomy (93% of the freeze-to-live gap is the source chain's own finality wait): [Migrating an Antelope Chain to PulseVM](/guide/migrate-antelope-chain).

**2026-08-21 — Cutover ceremony rehearsed end-to-end.** A live Leap 5.0.3 source chain with real traffic was cut over to PulseVM by an unattended agent: writes frozen at the API edge, snapshot cut and pinned to an exact block id, state verified by dual independent import (19-table fingerprints), new chain ignited on the source chain_id — **15-second write gap, zero read downtime**, with the same keys signing on both sides of the cut. Failed-ignition runs rolled back automatically: the source chain resumed and traffic was never misrouted. Full write-up: [Migrating an Antelope Chain to PulseVM](/guide/migrate-antelope-chain).

**2026-08-20 — Native Antelope snapshot import merged upstream.** PulseVM can now boot a chain directly from an Antelope portable chainstate snapshot — the `pulsevm_snapshot` reader ([PR #53](https://github.com/MetalBlockchain/pulsevm/pull/53)) turns a nodeos `.bin` snapshot into genesis state in seconds: accounts, permissions, contract code, and tables imported byte-exact. Proven at production scale on the [XPR 1:1 demo network](/network/one-to-one-demo), a community-operated chain running a full import of XPR Network testnet state (snapshot at block 400,588,707) with existing keys signing and existing contracts executing unchanged.

**2026-08-20 — v0.7.1 + Alpine relaunch.** Producer-schedule serialization fix ([#56](https://github.com/MetalBlockchain/pulsevm/pull/56)) and optimized mempool admission and contention ([#52](https://github.com/MetalBlockchain/pulsevm/pull/52)). Alpine relaunched on the v0.7.x era with a fresh genesis — current blockchain/chain IDs at [endpoints](/network/endpoints); core token is SYS. In review: protocol-upgrade scheduling with activation safeguards ([#51](https://github.com/MetalBlockchain/pulsevm/pull/51)).

**2026-08-19 — v0.7.0: PulseVM is now pure Rust.** The C++ chainbase state database (inherited from the EOSIO lineage) is fully replaced by a native Rust store — ~2.7M lines of vendored C++/Boost removed, validated by replaying the full testnet history byte-for-byte against the original implementation ([PR #50](https://github.com/MetalBlockchain/pulsevm/pull/50)). Build times drop from ~30 minutes to ~2.

**2026-08-17 — v0.6.3.** Producer-schedule propagation fix for `onblock`.

**2026-08-12 — v0.6.2.** A major merge wave: functional producer-election loop (contracts can now read and update the active producer schedule — the on-chain half of vote-driven validation), Leap-style subjective execution deadlines, per-intrinsic CPU metering fairness, RAM-limit validation, gossip-transaction validation, block-id parity enforcement, and `eosio_exit` semantics.

**2026-08-05 — Alpine testnet upgraded.** Relaunched on the v0.6.x era with a fresh genesis (since superseded by the 2026-08-20 relaunch — current IDs at [endpoints](/network/endpoints)).

**2026-08-04 — v0.6.0.** Native Rust "arena" state store lands (differentially validated against chainbase), executed-state reuse across build/verify/accept, warm WASM store pooling, end-to-end test suite, NET limit enforcement, `pulse::onblock`, producer-schedule block signing, and WASM determinism hardening (NaN canonicalization, pinned feature set).

## July 2026

**2026-07-28 — v0.5.2 + hyperion-rs.** Leap-aligned authority checking (multi-signer fix + re-entrant permission semantics) — and [hyperion-rs](https://github.com/MetalBlockchain/hyperion-rs), a native Rust rewrite of the Hyperion full-history indexer.

**2026-07-27 — Alpine testnet relaunched.** Expanded validator fleet; first demo dapps live within a day.

**2026-07-22 — v0.5.0 / v0.5.1: the Antelope-compatibility milestone.** The full classic Antelope host-function surface: every secondary-index type, the standard crypto suite, transaction/TAPoS introspection, context-free actions, permission checks, and int128/float128 builtins — plus deterministic CPU billing and nodeos-exact assert semantics. The vast majority of XPR Network, EOS, and WAX contracts run unchanged from this release onward. See [Host Functions](/build/intrinsics).

## Earlier

**2026-06 — Determinism hardening.** Consensus-determinism fixes (signature ordering, CPU billing) proven under 1,000-agent load testing; groundwork for the v0.5.x compatibility push.

**2026-05 and before** — Core VM development: Antelope execution on Avalanche Snowman consensus as a metalgo plugin, account/permission model, resource system, system contracts. See the [repository history](https://github.com/MetalBlockchain/pulsevm/commits/main) for the full record.

---

*This page tracks notable public milestones — for every commit, watch [MetalBlockchain/pulsevm](https://github.com/MetalBlockchain/pulsevm).*

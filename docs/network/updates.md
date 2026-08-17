---
description: "PulseVM development and network updates — releases, Alpine testnet resets, and ecosystem changes, newest first. The quickest way to see that PulseVM ships weekly."
---

# Updates

Development moves fast — new [releases](https://github.com/MetalBlockchain/pulsevm/releases) land weekly. Newest first; current testnet endpoints always live at [Network Endpoints](/network/endpoints).

## August 2026

**2026-08-18 — Pure-Rust database cutover in review.** [PR #50](https://github.com/MetalBlockchain/pulsevm/pull/50) replaces the C++ chainbase state database (inherited from the EOSIO lineage) with a native Rust store — removing ~2.7M lines of vendored C++/Boost, validated by replaying the full testnet history byte-for-byte against the original implementation. Build times drop from ~30 minutes to ~2.

**2026-08-17 — v0.6.3.** Producer-schedule propagation fix for `onblock`.

**2026-08-12 — v0.6.2.** A major merge wave: functional producer-election loop (contracts can now read and update the active producer schedule — the on-chain half of vote-driven validation), Leap-style subjective execution deadlines, per-intrinsic CPU metering fairness, RAM-limit validation, gossip-transaction validation, block-id parity enforcement, and `eosio_exit` semantics.

**2026-08-05 — Alpine testnet upgraded (current chain).** Relaunched on the v0.6.x era with a fresh genesis — new blockchain/chain IDs at [endpoints](/network/endpoints). Core token is XPR.

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

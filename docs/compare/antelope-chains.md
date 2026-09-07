---
description: "Where each Antelope mainnet stands today — node software, Savanna finality, activated protocol features — and what that means for importing its state onto PulseVM. Measured from public API nodes, date-stamped."
aside: false
---

# Antelope Chain Status

What each Antelope mainnet is running today, measured from its own public API nodes, and what that means for the [state-import migration path](/guide/migrate-antelope-chain). This is a compatibility reference, not a roadmap of who is migrating.

**Surveyed 2026-09-07** with `get_info` and `get_activated_protocol_features` against several public nodes per chain (57 nodes answered across eight chains). A single node reports itself, not the network, so every row is a multi-node reading.

## Status at a glance

| Chain | Nodes | Node software | Finality (head − LIB) | Features | PulseVM import path |
|---|---|---|---|---|---|
| **XPR Network** | 11 | Leap 5.0.3 (7), mixed older | DPoS, ~330 | 19 | **Demonstrated** |
| **WAX** | 13 | Leap 5.0.x (10), Spring 1.3.x (3) | DPoS, ~135 | 19 | **Same path as XPR** |
| **Libre** | 5 | Leap 5.0.x (4), one 3.2.3 | DPoS, ~330 | 14 | **Same path as XPR** |
| **EOS / Vaulta** | 7 | Spring 1.0.5 → 1.2.2 | Savanna, 2 | 23 | **Same path, roadmap items** |
| **Telos** | 8 | Spring 1.0.3 → 1.2.2 | Savanna, 2 | 23 | **Same path, roadmap items** |
| **Ultra** | 4 | own fork, v6.2.2 | Savanna, 2 | 26 | Not assessed |
| **FIO** | 9 | own lineage, v3.5.1 | DPoS, ~330 | 0 | Not assessed |
| **UX Network** | 0 | not reached | — | — | Not reached |

## What the labels mean

- **Demonstrated** — a real snapshot of that chain's state has been imported onto a PulseVM node and transacted against with the chain's existing keys. The [1:1 demo network](/network/one-to-one-demo) is a byte-exact import of XPR testnet state.
- **Same path as XPR** — the chain writes the same snapshot format (chainstate version 6, from any Leap 5.0.x node) and activates the same, or a subset of the same, protocol features as XPR. The demonstrated import applies without new reader or host-function work. Nobody has yet run the ceremony against that chain's state.
- **Same path, roadmap items** — the contract state imports the same way, but the source runs Spring with Savanna, which adds three tracked items: reading chainstate snapshot version 8, serving the `bls_*` host functions of `BLS_PRIMITIVES2`, and accepting the system contract's `set_finalizers` / `set_proposed_producers_ex` calls as recorded no-ops, since they have no consensus meaning on Snowman. Savanna chains already have deferred transactions disabled, which removes an import step rather than adding one.
- **Not assessed** — the chain runs a fork that diverges from the Leap/Spring line in ways this survey cannot classify from the outside.

## Per-chain notes

**XPR Network.** Seven of eleven nodes run Leap 5.0.3; the rest report 5.0.0, 5.0.2, 3.1.2 and one Spring-based build serving without Savanna. The 19 activated features are the reference set PulseVM's import carries.

**WAX.** All nodes run WAX's `wax01` builds. Ten are Leap-based (5.0.3 on six, plus 5.0.0, 5.0.1 and 4.0.5) and three are Spring-based 1.3.x, with Savanna not activated. The feature set is identical to XPR's, and any Leap 5.0.x node can write a version-6 snapshot today.

**Libre.** Leap 5.0.x on four of five nodes. Fourteen activated features, a subset of XPR's. Libre's custom system contracts would need review before a rehearsal.

**EOS / Vaulta and Telos.** Every node runs Spring, from 1.0.5 (EOS) or 1.0.3 (Telos) up to 1.2.2, with a few main-branch builds reporting 1.3.0 that correspond to no tagged release. Savanna is active on both, so the last-irreversible block trails head by two. Both activate the same 23 features: XPR's 19 plus `SAVANNA`, `BLS_PRIMITIVES2` and the two `DISABLE_DEFERRED_TRXS` stages. No Leap nodes remain, so a snapshot from these chains is version 8.

**Ultra.** Ultra's own fork at `v6.2.2-3.0.0` with Savanna active and 26 features, the EOS set plus Ultra-specific ones. The Savanna items apply, and the fork-specific features need their own assessment.

**FIO.** FIO's own lineage at `v3.5.1`, predating the protocol-feature framework, reporting zero activated features. A diverged fork that would need its own snapshot reader and feature audit.

**UX Network.** None of fourteen candidate public endpoints answered in this survey.

## Why the source's consensus does not matter

The migration imports chain **state**: accounts, permissions, contract code, tables, balances. Consensus state is discarded, because finality on PulseVM comes from the Avalanche Snowman engine, where a block is final on acceptance and last-irreversible always equals head. Whether a chain has activated Savanna changes the snapshot format and a handful of host functions, not the outcome: a chain arrives with finality of about a second and no reversible window either way. See the FAQ on the [migration guide](/guide/migrate-antelope-chain#faq).

## Reading the numbers

- **Finality** is head minus last-irreversible block as reported by the nodes. Around 330 blocks is classic DPoS finality, about 165 s at 0.5 s blocks; 2 blocks is Savanna.
- **Features** is the count from `get_activated_protocol_features`. Two of XPR's, `CRYPTO_PRIMITIVES` and `GET_BLOCK_NUM`, are activated on XPR and WAX but not yet served as host functions by PulseVM; an audit of every contract deployed on XPR testnet found none that import them, and serving them is tracked work.
- **Node software** mixes are normal on a live network. A chain can run Spring-based nodes without activating Savanna, as WAX does today.

## Related

- [Migrating an Antelope Chain to PulseVM](/guide/migrate-antelope-chain) — the path, the rehearsed ceremony, and the FAQ
- [Antelope Compatibility](/compare/antelope) — host-function and tooling surface
- [The 1:1 Demo Network](/network/one-to-one-demo) — the demonstrated import, live

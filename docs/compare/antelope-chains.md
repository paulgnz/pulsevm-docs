---
description: "Where each Antelope mainnet stands today — node software, Savanna finality, activated protocol features — and what that means for importing its state onto PulseVM. Measured from public API nodes, date-stamped."
---

# Antelope Chain Status

What each Antelope mainnet is running today, measured from its own public API nodes, and what that means for the [state-import migration path](/guide/migrate-antelope-chain). This is a compatibility reference, not a roadmap of who is migrating.

**Surveyed 2026-09-07** with `get_info` and `get_activated_protocol_features` against several public nodes per chain (57 nodes answered across eight chains). A single node reports itself, not the network, so every row below is a multi-node reading; the node counts are in the table.

## Status at a glance

| Chain | Node software observed | Finality today | Protocol features | Snapshot a node can write | PulseVM import path |
|---|---|---|---|---|---|
| **XPR Network** | Leap **5.0.3** on 7 of 11 nodes; 5.0.0, 5.0.2, 3.1.2 and one Spring-based build also serving | DPoS, LIB ≈ 330 blocks behind head | 19 | chainstate v6 (Leap 5.0) | **Demonstrated** — the [1:1 demo network](/network/one-to-one-demo) is a byte-exact import of XPR testnet state |
| **WAX** | Mixed `wax01` builds: Leap 5.0.3 on 6 of 13, 5.0.0/5.0.1/4.0.5, and Spring-based 1.3.x on 3 | DPoS, LIB ≈ 135 blocks behind | 19 — the **same set as XPR** | v6 from any Leap 5.0.x node | **Same path as XPR** — identical feature set and snapshot format; not yet rehearsed |
| **Libre** | Leap 5.0.0/5.0.1/5.0.3, one 3.2.3 (5 nodes) | DPoS, LIB ≈ 330 behind | 14 (a subset of XPR's) | v6 | **Same path as XPR** — feature subset; custom system contracts to review; not yet rehearsed |
| **EOS / Vaulta** | Spring 1.0.5 → 1.2.2, plus main-branch builds (7 nodes) | **Savanna**, LIB = head − 2 | 23 = XPR's 19 + `SAVANNA`, `BLS_PRIMITIVES2`, `DISABLE_DEFERRED_TRXS` 1/2 | chainstate **v8** (Spring) | **Same path, roadmap items** — Spring snapshot reader, `bls_*` host functions, finalizer calls as no-ops |
| **Telos** | Spring 1.0.3 → 1.2.2, plus main-branch builds (8 nodes) | **Savanna**, LIB = head − 2 | 23, same as EOS | v8 | **Same as EOS** |
| **Ultra** | Ultra's own fork, `v6.2.2-3.0.0` (4 nodes) | **Savanna**, LIB = head − 2 | 26 — the EOS set plus Ultra-specific features | v8 or Ultra-specific | **Not assessed** — Savanna items above plus Ultra's fork-specific features |
| **FIO** | FIO's own lineage, `v3.5.1` (9 nodes) | DPoS, LIB ≈ 330 behind | reports **0** activated features | pre-Leap format | **Not assessed** — diverged fork; would need its own reader and feature audit |
| **UX Network** | — | — | — | — | **Not reached** — no public API node answered in this survey |

## What the labels mean

- **Demonstrated** — a real snapshot of that chain's state has been imported onto a PulseVM node and transacted against with the chain's existing keys.
- **Same path as XPR** — the chain writes the same snapshot format and activates the same (or a subset of the same) protocol features as XPR, so the demonstrated import applies without new reader or host-function work. "Not yet rehearsed" means exactly that: nobody has run the ceremony against that chain's state.
- **Same path, roadmap items** — the contract state imports the same way, but the source runs Spring with Savanna, which adds three tracked items: reading chainstate snapshot version 8, serving the `bls_*` host functions of `BLS_PRIMITIVES2`, and accepting the system contract's `set_finalizers` / `set_proposed_producers_ex` calls as recorded no-ops (they have no consensus meaning on Snowman). Savanna chains have deferred transactions disabled already, which removes one import step rather than adding one.
- **Not assessed** — the chain runs a fork that diverges from the Leap/Spring line in ways this survey cannot classify from the outside.

## Why the source's consensus does not matter

The migration imports chain **state**: accounts, permissions, contract code, tables, balances. Consensus state is discarded, because finality on PulseVM comes from the Avalanche Snowman engine, where a block is final on acceptance and last-irreversible always equals head. So whether a chain has activated Savanna changes the snapshot format and a handful of host functions, not the outcome: a chain arrives with finality of about a second and no reversible window either way. See the FAQ on the [migration guide](/guide/migrate-antelope-chain#faq).

## Reading the numbers

- **Finality today** is head minus last-irreversible block as reported by the nodes. Around 330 blocks is classic DPoS finality (about 165 s at 0.5 s blocks); 2 blocks is Savanna.
- **Protocol features** is the count from `get_activated_protocol_features`. XPR's 19 are the reference set PulseVM's import carries. Two of them, `CRYPTO_PRIMITIVES` and `GET_BLOCK_NUM`, are activated on XPR and WAX but not yet served as host functions by PulseVM; an audit of every contract deployed on XPR testnet found none that import them, and serving them is tracked work.
- **Node software** mixes are normal on a live network. Note that a chain can run Spring-based nodes without activating Savanna, as WAX does today, and that "1.3.0" on EOS and Telos nodes is a build from Spring's main branch, not a tagged release.

## Related

- [Migrating an Antelope Chain to PulseVM](/guide/migrate-antelope-chain) — the path, the rehearsed ceremony, and the FAQ
- [Antelope Compatibility](/compare/antelope) — host-function and tooling surface
- [The 1:1 Demo Network](/network/one-to-one-demo) — the demonstrated import, live

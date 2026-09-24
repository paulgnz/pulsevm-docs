---
description: "PulseVM ↔ Antelope/EOSIO compatibility — which host functions, contract features and tooling are supported, so XPR Network, EOS and WAX contracts run on PulseVM with little or no change."
---

# Antelope compatibility

PulseVM executes **Antelope/EOSIO smart contracts natively.** Contracts are the same WebAssembly modules, with the same ABIs, the same named accounts and permission model, and the same multisig — so the large majority of XPR Network, EOS and WAX contracts run on PulseVM **unchanged or with minimal changes.** The exception is contracts that call the Spring-era `bls_*` and `set_finalizers` functions, which includes the current EOS and Telos system contracts.

This page is a **capability snapshot**: what's supported today, what's in progress, and what doesn't apply. It's maintained as the host-function surface evolves.

<small>Snapshot: **September 2026.** Compatibility is actively expanding — check the [repositories](/resources) for the current state.</small>

## What "compatible" means here

If you have shipped on an Antelope chain, these carry over directly:

- **Your contract binaries** — the same `.wasm` built with the standard CDT (Rust or C++). No re-architecting.
- **Your ABIs** — identical ABI format; the same `.abi` files describe your actions and tables.
- **Accounts and permissions** — named accounts, hierarchical `owner`/`active`/custom permissions, `linkauth`, and **native multisig**, enforced by the same rules and refused with the same messages. See [Accounts and permissions](/guide/accounts-permissions).
- **Your tooling** — CDT for builds, and client libraries that follow Antelope conventions. The node speaks JSON-RPC today; a nodeos-style `/v1/chain` API inside the node is merged and ships in the next release, and today a small gateway serves `/v1/chain` for eosjs and @proton/js, as on the demo network. See [Host Functions](/build/intrinsics) and [RPC & REST API](/build/api).
- **Your chain state** — PulseVM boots directly from an Antelope **portable chainstate snapshot** (the nodeos `.bin` format), importing accounts, permissions, contract code, and tables byte-exact. Running on the [XPR 1:1 demo network](/network/one-to-one-demo), and proven at full scale: PulseVM has replayed all 401,005,383 XPR Network mainnet blocks.

## Host-function surface

Antelope contracts call the chain through host functions (intrinsics). PulseVM implements the full **classic surface** that production contracts rely on:

| Category | Status | Notes |
|:---|:---:|:---|
| **Database — primary index** (`db_*_i64`) | <span class="ck y" role="img" aria-label="supported"></span> | store / update / remove / get / find / bounds / iterate |
| **Database — secondary indexes** | <span class="ck y" role="img" aria-label="supported"></span><span class="q">all key types</span> | `idx64`, `idx128`, `idx256`, `idx_double`, `idx_long_double` — full operation set each |
| **Cryptography (standard)** | <span class="ck y" role="img" aria-label="supported"></span> | `sha1` / `sha256` / `sha512` / `ripemd160` (+ asserts), `recover_key` / `assert_recover_key` |
| **Transaction & TAPoS introspection** | <span class="ck y" role="img" aria-label="supported"></span> | `read_transaction`, `transaction_size`, `expiration`, `tapos_block_num` / `_prefix`, `get_action` |
| **Permissions & accounts** | <span class="ck y" role="img" aria-label="supported"></span> | `check_transaction_authorization`, `check_permission_authorization`, `get_permission_last_used`, `get_account_creation_time` |
| **Actions & inline dispatch** | <span class="ck y" role="img" aria-label="supported"></span> | read action data, current receiver, require_auth/recipient, inline actions |
| **Context-free actions** | <span class="ck y" role="img" aria-label="supported"></span> | CFA execution + `get_context_free_data` |
| **Console / printing** | <span class="ck y" role="img" aria-label="supported"></span> | `prints*`, `printi*`, `printui*`, name/hex |
| **Math builtins** | <span class="ck y" role="img" aria-label="supported"></span> | full int128 (`__*ti*`) and float128 (`__*tf*`) compiler-rt surface |
| **Authority key types** | <span class="ck y" role="img" aria-label="supported"></span> | K1 (secp256k1), R1 (secp256r1) and WebAuthn, all verified by the chain |
| **Resource limits** | <span class="ck y" role="img" aria-label="supported"></span> | `get_resource_limits` / `set_resource_limits` |
| **Chain parameters** | <span class="ck y" role="img" aria-label="supported"></span> | `set_blockchain_parameters_packed` and read |
| **Advanced crypto primitives** | <span class="ck p" role="img" aria-label="in progress"></span><span class="q">in progress</span> | `alt_bn128_*`, `mod_exp`, `blake2_f`, `sha3`, `k1_recover` — zk / EVM-bridge use cases. Also not yet served: `bls_*` and `set_finalizers` (Spring/Savanna) |
| **Protocol-feature framework** | <span class="ck y" role="img" aria-label="supported"></span> | `is_feature_activated` / `preactivate_feature`, served in PulseVM main |
| **Key-value database** (`kv_*`) | <span class="ck n" role="img" aria-label="not applicable"></span><span class="q">n/a</span> | never activated on EOS / XPR — not part of the standard contract surface |
| **Deferred transactions** | <span class="ck y" role="img" aria-label="supported"></span> | `send_deferred` / `cancel_deferred` served; deprecated in Antelope — prefer inline actions in new code |

<small><span class="ck y" role="img" aria-label="supported"></span> supported &nbsp;·&nbsp; <span class="ck p" role="img" aria-label="in progress"></span> in progress &nbsp;·&nbsp; <span class="ck n" role="img" aria-label="not applicable"></span> not applicable</small>

## Will my contract run?

For the overwhelming majority of XPR Network, EOS and WAX contracts — **token contracts, marketplaces, DeFi, DAOs, system-style governance contracts** — the answer is **yes**, because they use only the classic host-function surface above.

A contract needs review before it will run if it imports one of the **in-progress** primitives — i.e. it uses **zk / pairing crypto** (`alt_bn128`, `mod_exp`, `blake2_f`, `sha3`, `k1_recover`). Those are uncommon outside EVM-bridge and specialized cryptographic contracts; an audit of every contract deployed on XPR Network testnet found none that import them.

The fastest way to know: build with the standard CDT and deploy to the testnet ([endpoints](/network/endpoints)). If it instantiates, the host-function surface is satisfied.

## Beyond contract parity

Antelope compatibility is the **execution layer**. PulseVM adds what a standalone Antelope chain doesn't give you:

- **A network you own** — your validators, your rules, your economics, rather than a seat on a shared public chain. See [Native by Design](/guide/native-by-design).
- **Avalanche-grade consensus** — sub-second, irreversible [finality](/guide/finality) under Snowman.
- **Privacy at the network boundary** — see [Privacy & Confidentiality](/guide/privacy).

So a migrated contract keeps its code, its accounts and its users' keys, and gains a network its owners run, finality in about a second, and privacy on top.

## Next step

- Try it: build with the standard CDT and deploy to the [testnet](/network/endpoints), or start at [Getting started](/build/get-started).
- Moving a whole chain? Read [Migrating an Antelope chain](/guide/migrate-antelope-chain).

## Related

- [Host functions reference](/build/intrinsics)
- [Accounts and permissions](/guide/accounts-permissions) · [Native multisig](/guide/multisig)
- [Antelope chain status](/compare/antelope-chains)
- [Getting started](/build/get-started) · [Repositories](/resources)

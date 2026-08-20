---
description: "PulseVM ↔ Antelope/EOSIO compatibility — which host functions, contract features and tooling are supported, so XPR Network, EOS and WAX contracts run on PulseVM with little or no change."
---

# Antelope Compatibility

PulseVM executes **Antelope/EOSIO smart contracts natively.** Contracts are the same WebAssembly modules, with the same ABIs, the same named accounts and permission model, and the same multisig — so the large majority of XPR Network, EOS and WAX contracts run on PulseVM **unchanged or with minimal changes.**

This page is a **capability snapshot**: what's supported today, what's in progress, and what doesn't apply. It's maintained as the host-function surface evolves.

<small>Snapshot: **August 2026.** Compatibility is actively expanding — check the [repositories](/resources) for the current state.</small>

## What "compatible" means here

If you've shipped on an Antelope chain, these carry over directly:

- **Your contract binaries** — the same `.wasm` built with the standard CDT (Rust or C++). No re-architecting.
- **Your ABIs** — identical ABI format; the same `.abi` files describe your actions and tables.
- **Accounts & permissions** — named accounts, hierarchical `owner`/`active`/custom permissions, linkauth, and **native multisig**. See [Accounts & Permissions](/guide/accounts-permissions).
- **Your tooling** — CDT for builds; RPC and client libraries follow the Antelope conventions developers already know. See [Host Functions](/build/intrinsics) and [RPC & REST API](/build/api).
- **Your chain state** — PulseVM boots directly from an Antelope **portable chainstate snapshot** (the nodeos `.bin` format), importing accounts, permissions, contract code, and tables byte-exact. Demonstrated at production scale on the [XPR 1:1 demo network](/network/one-to-one-demo).

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
| **Resource limits** | <span class="ck y" role="img" aria-label="supported"></span> | `get_resource_limits` / `set_resource_limits` |
| **Chain parameters** | <span class="ck y" role="img" aria-label="supported"></span> | `set_blockchain_parameters_packed` and read |
| **Advanced crypto primitives** | <span class="ck p" role="img" aria-label="in progress"></span><span class="q">in progress</span> | `alt_bn128_*`, `mod_exp`, `blake2_f`, `sha3`, `k1_recover` — zk / EVM-bridge use cases |
| **Protocol-feature framework** | <span class="ck p" role="img" aria-label="in progress"></span><span class="q">in progress</span> | `is_feature_activated` / `preactivate_feature` |
| **Key-value database** (`kv_*`) | <span class="ck n" role="img" aria-label="not applicable"></span><span class="q">n/a</span> | never activated on EOS / XPR — not part of the standard contract surface |
| **Deferred transactions** | <span class="ck n" role="img" aria-label="not applicable"></span><span class="q">deprecated</span> | deprecated in Antelope; not used by modern contracts |

<small><span class="ck y" role="img" aria-label="supported"></span> supported &nbsp;·&nbsp; <span class="ck p" role="img" aria-label="in progress"></span> in progress &nbsp;·&nbsp; <span class="ck n" role="img" aria-label="not applicable"></span> not applicable</small>

## Will my contract run?

For the overwhelming majority of XPR Network, EOS and WAX contracts — **token contracts, marketplaces, DeFi, DAOs, system-style governance contracts** — the answer is **yes**, because they use only the classic host-function surface above.

A contract needs review before it will run if it imports one of the **in-progress** primitives — i.e. it uses **zk / pairing crypto** (`alt_bn128`, `mod_exp`, `blake2_f`) or gates behavior on `is_feature_activated`. Those are uncommon outside EVM-bridge and specialized cryptographic contracts.

The fastest way to know: build with the standard CDT and deploy to the testnet ([endpoints](/network/endpoints)). If it instantiates, the host-function surface is satisfied.

## Beyond contract parity

Antelope compatibility is the **execution layer**. PulseVM adds what a standalone Antelope chain doesn't give you:

- **A network you own** — your validators, your rules, your economics, rather than a seat on a shared public chain. See [Native by Design](/guide/native-by-design).
- **Avalanche-grade consensus** — sub-second, irreversible [finality](/guide/finality) under Snowman.
- **Privacy at the network boundary** — see [Privacy & Confidentiality](/guide/privacy).

So a migrated contract keeps its code and its accounts, and gains sovereignty, finality, and privacy on top.

## Related

- [Host Functions reference](/build/intrinsics)
- [Accounts & Permissions](/guide/accounts-permissions) · [Native Multisig](/guide/multisig)
- [Getting Started](/build/get-started) · [Repositories](/resources)

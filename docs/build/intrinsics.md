---
description: "PulseVM host functions (intrinsics) reference: about 180 Antelope host functions on main, what the latest release serves, and the families not yet served (CRYPTO_PRIMITIVES, bls_*, set_finalizers)."
---

# Host Functions (Intrinsics)

Intrinsics are the functions the VM exposes to a contract's WebAssembly — how a contract reads its input, touches state, checks authorization, does crypto, and emits actions. PulseVM implements the **Antelope** intrinsic set; for the precise semantics of each function, the [Antelope C++ CDT reference](https://docs.antelope.io) is the canonical source.

This page lists what PulseVM serves **today** and the few families still landing, so you know before you build. The CDTs ([Rust](https://github.com/MetalBlockchain/pulse-cdt-rust), C++, [TypeScript/AS](https://github.com/paulgnz/pulse-tsc)) wrap these — you rarely call them directly, but if a contract imports one that isn't served, it won't load, so the supported set is what matters.

::: tip About 180 host functions on `main`
The latest tagged release is **v0.7.1** (2026-08-20). `main` has moved on: it serves about 180 host functions, including everything listed as "now served" below, but a node running v0.7.1 does not have those additions yet. Not served on either: the CRYPTO_PRIMITIVES set, `bls_*` and `set_finalizers`.
:::

::: details History: expanded in v0.5.0, hardened in v0.5.1
As of **v0.5.0** (tagged 2026-07-22), PulseVM serves the full classic Antelope host-function surface — all secondary-index key types, the standard crypto suite, transaction/TAPoS introspection, permission checks, context-free actions, and the int128/float128 compiler builtins. The vast majority of XPR Network, EOS and WAX contracts run unchanged. **v0.5.1** further aligns semantics with the Antelope reference: `eosio_assert`/`pulse_assert` now fail only on `condition == 0` (any non-zero value is truthy, matching nodeos), CPU billing is fully deterministic across producers and verifiers, and asset (de)serialization matches nodeos bounds. See [Antelope Compatibility](/compare/antelope) for the migration view.
:::

## Supported today

**Action & context** — read the current action and execution context.
`read_action_data` · `action_data_size` · `current_receiver` · `current_time` · `set_action_return_value` · `get_action`

**Authorization & permissions** — enforce and query permissions.
`require_auth` · `require_auth2` · `require_recipient` · `has_auth` · `is_account` · `check_transaction_authorization` · `check_permission_authorization` · `get_permission_last_used` · `get_account_creation_time`

**Inline & context-free actions** — a contract sending further actions.
`send_inline` · `send_context_free_inline` · context-free action execution · `get_context_free_data`

**Transaction & TAPoS introspection**
`read_transaction` · `transaction_size` · `expiration` · `tapos_block_num` · `tapos_block_prefix`

**Database — primary index (i64)**
`db_store_i64` · `db_update_i64` · `db_remove_i64` · `db_get_i64` · `db_find_i64` · `db_lowerbound_i64` · `db_upperbound_i64` · `db_next_i64` · `db_previous_i64` · `db_end_i64`

**Database — secondary indexes** (all key types)
`db_idx64_*` · `db_idx128_*` · `db_idx256_*` · `db_idx_double_*` · `db_idx_long_double_*` — each with the full set: `store` · `update` · `remove` · `find_primary` · `find_secondary` · `lowerbound` · `upperbound` · `next` · `previous` · `end`

**Cryptography**
`sha1` · `sha224` · `sha256` · `sha512` · `ripemd160` · `recover_key` — and the asserting variants `assert_sha1` · `assert_sha224` · `assert_sha256` · `assert_sha512` · `assert_ripemd160` · `assert_recover_key`

**Asserts & control flow**
`pulse_assert` · `pulse_assert_message` · `pulse_assert_code` · `eosio_assert` · `eosio_assert_message` · `eosio_assert_code` · `pulse_exit` · `eosio_exit` · `abort`

**Console / debug output**
`prints` · `prints_l` · `printi` · `printui` · `printi128` · `printui128` · `printsf` · `printdf` · `printqf` · `printn` · `printhex`

**Memory**
`memcpy` · `memmove` · `memset` · `memcmp`

**Privileged, resources & chain params** (system contracts)
`is_privileged` · `set_privileged` · `get_resource_limits` · `set_resource_limits` · `get_blockchain_parameters_packed` · `set_blockchain_parameters_packed`

**Producers and schedule** (Antelope-compatible producer records and schedules for system contracts, since v0.6.x; separate from validator admission)
`get_active_producers` · `set_proposed_producers`

**Math builtins** (compiler support)
Full **int128** (`__*ti3` shifts, `__multi3`, `__divti3`, `__modti3`, `__udivti3`, `__umodti3`, conversions) and **float128 / `long double`** (`__addtf3`, `__subtf3`, `__multf3`, `__divtf3`, comparisons, conversions) surface.

## Still landing

Two families aren't served yet. They're uncommon outside zk / EVM-bridge and specialized cryptographic contracts — a contract that imports one won't load until it's added:

| Family | Functions | Note |
|---|---|---|
| **Advanced crypto primitives** | `alt_bn128_add` · `alt_bn128_mul` · `alt_bn128_pair` · `mod_exp` · `blake2_f` · `sha3` · `k1_recover` | pairing / zk / EVM-bridge use cases |
| **Spring / Savanna** | `bls_*` · `set_finalizers` | used by the current EOS and Telos system contracts; not needed by XPR Network contracts |

Now served on `main`, not yet in a tagged release (moved out of this table in September 2026): the context accessors `get_sender`, nodeos-exact `get_code_hash`, `get_block_num` and `publication_time`; `is_feature_activated` / `preactivate_feature`; and `send_deferred` / `cancel_deferred` — the last three families are recent additions. Deferred transactions remain deprecated in Antelope; prefer inline actions in new code.

If your design depends on something here, [get in touch](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs) — intrinsic coverage is actively expanding.

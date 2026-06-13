---
description: "PulseVM host functions (intrinsics) reference — the Antelope intrinsic set supported today (action, database, crypto, console, memory, inline actions) and what's landing next."
---

# Host Functions (Intrinsics)

Intrinsics are the functions the VM exposes to a contract's WebAssembly — how a contract reads its input, touches state, checks authorization, does crypto, and emits actions. PulseVM implements the **Antelope** intrinsic set; for the precise semantics of each function, the [Antelope C++ CDT reference](https://docs.antelope.io) is the canonical source.

This page lists what PulseVM serves **today** and what's **not yet available**, so you know before you build. The CDTs ([Rust](https://github.com/MetalBlockchain/pulse-cdt-rust), C++, [TypeScript/AS](https://github.com/paulgnz/pulse-tsc)) wrap these — you rarely call them directly, but if a contract imports one that isn't served, it won't load, so the supported set is what matters.

::: tip The set is expanding
The list below reflects the current build. Additional intrinsics (see "Not yet available") are being added; toolchains like pulse-tsc flag an unsupported import at **compile time**, not at deploy time.
:::

## Supported today

**Action & context** — read the current action and execution context.
`read_action_data` · `action_data_size` · `current_receiver` · `current_time` · `set_action_return_value`

**Authorization** — enforce and query permissions.
`require_auth` · `require_auth2` · `require_recipient` · `has_auth` · `is_account` · `check_transaction_authorization`

**Inline actions** — a contract sending further actions.
`send_inline`

**Database — primary index (i64)**
`db_store_i64` · `db_update_i64` · `db_remove_i64` · `db_get_i64` · `db_find_i64` · `db_lowerbound_i64` · `db_upperbound_i64` · `db_next_i64` · `db_previous_i64` · `db_end_i64`

**Database — secondary indexes** (64-bit and 128-bit)
`db_idx64_*` and `db_idx128_*` — full set: `store` · `update` · `remove` · `find_primary` · `find_secondary` · `lowerbound` · `upperbound` · `next` · `previous` · `end`

**Cryptographic hashing**
`sha224` · `sha256` · `sha512` (and the asserting variants `assert_sha224` · `assert_sha256` · `assert_sha512`)

**Asserts & control flow**
`pulse_assert` · `pulse_assert_message` · `pulse_assert_code` · `eosio_assert` · `eosio_assert_message` · `eosio_assert_code` · `pulse_exit` · `eosio_exit` · `abort`

**Console / debug output**
`prints` · `prints_l` · `printi` · `printui` · `printi128` · `printui128` · `printsf` · `printdf` · `printn` · `printhex`

**Memory**
`memcpy` · `memmove` · `memset` · `memcmp`

**Privileged & resources** (system contracts)
`is_privileged` · `set_privileged` · `get_resource_limits` · `set_resource_limits`

**128-bit math builtins** (compiler support)
`__ashlti3` · `__ashrti3` · `__divti3` · `__floatuntidf` · `__lshlti3` · `__lshrti3` · `__modti3` · `__multi3` · `__udivti3` · `__umodti3`

## Not yet available

These Antelope intrinsics are not served by the current build. A contract that needs them won't load yet:

| Family | Functions | Note |
|---|---|---|
| **Key recovery & extra hashes** | `recover_key`, `assert_recover_key`, `sha1`, `assert_sha1`, `ripemd160`, `assert_ripemd160` | needed for on-chain signature verification |
| **Float & 256-bit secondary indexes** | `db_idx256_*`, `db_idx_double_*`, `db_idx_long_double_*` | `idx64`/`idx128` are available today |
| **Transaction introspection** | `read_transaction`, `transaction_size`, `expiration`, `tapos_block_num`, `tapos_block_prefix`, `get_action`, `get_context_free_data`, `publication_time` | |
| **Misc** | `get_sender`, `printqf` | |
| **Deferred transactions** | `send_deferred`, `cancel_deferred` | deprecated in Antelope 5.x — use inline actions |

If your design depends on something here, [get in touch](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs) — intrinsic coverage is actively expanding.

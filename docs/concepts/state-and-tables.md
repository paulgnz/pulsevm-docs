---
description: "PulseVM contract state — multi-index tables, scopes, primary and secondary indexes, and free reads."
---

# State & Tables

Contracts store state in **tables** — typed, multi-index collections, not arbitrary key/value blobs.

## Multi-index tables

A table holds rows of a defined struct, identified by a **primary key**, and may have **secondary indexes** for lookups on other fields. PulseVM serves all Antelope secondary-index key types (`db_idx64_*`, `db_idx128_*`, `db_idx256_*`, `db_idx_double_*`, `db_idx_long_double_*`); see [host functions](/build/intrinsics).

```rust
#[derive(Read, Write, NumBytes, Clone)]
#[table(primary_key = row.account.value)]
pub struct Greeting { pub account: Name, pub text: String }

const GREETINGS: MultiIndexDefinition<Greeting> = MultiIndexDefinition::new(name!("greetings"));
```

## Scope

Every table is addressed by **(code, scope, table)** — the contract account, a scope (often an account or symbol), and the table name. Scope lets a contract partition data (e.g. balances scoped per account, token stats scoped per symbol). It's how `pulse.token` keeps each holder's balance separate.

## RAM

Table rows consume **RAM**, paid by an explicit payer at write time. Provisioning RAM is a [resource](/guide/resources) decision; the institution or app, not the end user, pays.

## Reads are free

Reading tables costs nothing — over the [RPC](/build/api) (`getTableRows`) or via an indexer. Auditors and regulators can be given complete, real-time read access at no cost. See [Finality & Settlement](/guide/finality#reads-are-free-for-anyone).

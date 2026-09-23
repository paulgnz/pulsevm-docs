---
description: "PulseVM authorization — require_auth, permission checks, and inline actions where a contract acts under its own authority."
---

# Authorization and inline actions

## Permission checks

Every action carries one or more authorizations — `actor@permission` pairs. A contract enforces them with `require_auth(account)`, and the chain validates the full [permission tree](/guide/accounts-permissions) (keys, weights, thresholds, delegation, multisig) before the action runs. `require_recipient`, `has_auth`, and `is_account` round out the checks. See [host functions](/build/intrinsics#supported-today).

This is the heart of [Native by Design](/guide/native-by-design): authorization is a protocol primitive, so dual-control, role keys, and multisig are *configuration*, not contract code you write and audit.

## Binding a permission to one action (`linkauth`)

By default every action of every contract requires the account's `active` permission. `linkauth` changes that for one contract action: it names the permission that is enough to authorize it.

```json
{ "account": "myacct", "code": "vault", "type": "trade", "requirement": "trader" }
```

The chain resolves the minimum permission for each action before your contract runs. A signature from `myacct@trader` satisfies `vault::trade`. The same signature on any other action, such as a token `transfer`, is refused by the protocol:

```
action declares irrelevant authority 'myacct@trader'; minimum authority is myacct@active
```

Your contract never sees the refused action, so the key cannot reach any other action. What it can do through the linked action is still up to your code, especially if your contract holds a `pulse.code` grant to act for the account. Links are also how an account gives a bot, an auditor or an agent a narrow mandate; see [Delegated authority with hard limits](/guide/delegated-authority). The commands are in [Accounts and permissions](/guide/accounts-permissions#recipes).

## Inline actions

A contract can send further actions as part of the same transaction — **inline actions** (`send_inline`). They execute atomically with the originating action: if any fails, the whole transaction rolls back. This is how contracts compose (a DEX settling a trade, a contract emitting a log action, a token notifying recipients via `require_recipient`).

## `pulse.code` — a contract acting as itself

For a contract to send an inline action under its *own* account's authority, that account's permission must include a `pulse.code` authority for the contract. It's the native, auditable equivalent of "this contract is allowed to act as this account" — granted with one `updateauth`. The [CLI](/build/cli) exposes this via `update-auth --code`.

## Key rotation and recovery

Because authority is account-level, a compromised or lost key is a **rotation**, not a lost account: `owner` can replace `active`, and a delegated owner permission gives institutional recovery — all without moving any assets.

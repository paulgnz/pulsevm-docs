---
description: "PulseVM accounts and actions — named accounts, deploying a contract to an account, and the actions a contract exposes."
---

# Accounts & Actions

## Everything is an account

On PulseVM there are no separate "wallet" and "contract" address types — there is one primitive: the **account**. An account is a human-readable name (≤12 chars, `a-z`/`1-5`, e.g. `acme.treasury`), it holds [permissions](/concepts/authorization) and balances, and it *may* also hold a contract. The same `acme` account can hold funds, be governed by multisig, and run code.

## A contract lives on an account

You deploy a contract by setting its WASM and [ABI](/concepts/abi) onto an account (`setcode` / `setabi`, via the [`pulse.bios`/`pulse.system`](/build/system-contracts) actions or [pulse-cli](/build/cli)). The account *is* the contract's identity — when the contract acts, it acts as that named account.

## Actions

A contract exposes **actions** — named entry points with typed parameters. A transaction is a list of actions, executed atomically (all succeed or all roll back). For example, a token contract exposes `transfer(from, to, quantity, memo)`; calling it is sending that action to the token account.

```
pulse-ts push-action fdxtoken transfer \
  '{"from":"alice","to":"bob","quantity":"10.0000 SYS","memo":"hi"}' --actor alice
```

Each action carries one or more [authorizations](/concepts/authorization) (`actor@permission`) that the chain enforces. Actions can also trigger further actions — see [inline actions](/concepts/authorization#inline-actions).

## Why this matters

Named accounts + account-resident contracts are why authorization, recovery, and multisig are native rather than bolted on: they're properties of the account, not of a key or a wrapper contract. See [Native by Design](/guide/native-by-design).

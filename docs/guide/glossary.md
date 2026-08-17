---
description: "PulseVM glossary — named accounts, permissions, multisig, CPU/NET/RAM resources, finality (LIB), validators, subnets, system contracts, ABI, intrinsics."
---

# Glossary

**Account** — a named, human-readable on-chain identity (≤12 chars, `a-z`/`1-5`), e.g. `acme.treasury`. Holds permissions, balances, and (optionally) a contract.

**Permission** — a named authority on an account (`owner`, `active`, or custom), defined as a threshold over weighted keys, other accounts, and time-waits. The unit of authorization.

**Authority** — the structure a permission requires: keys, account-permissions, weights, threshold, waits.

**Multisig** — requiring multiple weighted approvals to satisfy a permission. Native here (via `pulse.msig`), not a deployed wallet platform.

**`pulse.code`** — a special permission that lets a contract act under its own account's authority (e.g. to send inline actions).

**Finality / LIB** — when a block is irreversible. On PulseVM finality is instant: the head block is the **last irreversible block (LIB)** — no reorgs to design around.

**CPU / NET / RAM** — the network's resources: CPU (compute) and NET (bandwidth) are **staked**; RAM (state storage) is **provisioned per account**. No gas market; the institution/app provisions and can sponsor users.

**Validator / Block producer** — a node that participates in consensus and produces blocks. In a consortium, named, accountable institutions; elected and replaceable.

**Subnet** — an independent network with its own validator set, running on Metal Blockchain. A PulseVM deployment is a subnet — "a network you own."

**System contract** — a built-in contract defining the chain's rules: `pulse.token`, `pulse.system`, `pulse.msig`, `pulse.bios`. Open source, owner-modifiable. See [System Contracts](/build/system-contracts).

**Action** — a single operation in a transaction (e.g. `transfer`), authorized by one or more permissions.

**Table** — on-chain contract storage (multi-index), scoped by account/symbol; read for free via the RPC.

**ABI** — the interface describing a contract's actions and tables, used to (de)serialize calls.

**Intrinsic / host function** — a function the VM exposes to contracts (crypto, storage, asserts, etc.).

**Snowman** — Avalanche's consensus protocol (metalgo), giving fast metastable, instantly-final agreement.

**Antelope** — the execution model PulseVM implements (formerly EOSIO); the lineage behind [XPR Network](https://xprnetwork.org), WAX, Telos.

**TAPOS** — "transaction-as-proof-of-stake," an Antelope replay-protection mechanism binding a tx to a recent block.

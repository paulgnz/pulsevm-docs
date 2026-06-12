---
description: "What is PulseVM — an open-source, non-EVM, Antelope-based blockchain on Avalanche Snowman consensus: named accounts, native permissions, instant finality."
---

# What is PulseVM?

PulseVM is an execution environment for [Metal Blockchain](https://metalblockchain.org) delivered as a plugin for its node software (metalgo). It implements the **Antelope execution model** — the account, permission, and resource system proven over years of production on XPR Network (Antelope 5.0.3) — and runs it as a subnet with modern consensus: sub-second blocks and instant, irreversible finality.

It is the base layer for **A-Chain**, the future of XPR Network — and equally a kit for any institution or consortium to deploy **its own network** with its own validators and its own rules.

## The mental model

Think of PulseVM as an operating environment, not "a blockchain you join":

- **Accounts** are named (`acme.treasury`, not `0x7f3a…`) and carry hierarchical permission trees.
- **Permissions** express real authorization structures: role keys, weighted multisig thresholds, delegation between accounts, instant key rotation.
- **Contracts** are WebAssembly, written in TypeScript, Rust, or C++, with typed ABIs and human-readable actions.
- **Resources** (CPU, NET, RAM) are staked and provisioned by the operator or institution — end users never buy gas.
- **Finality is instant**: the head block is the last irreversible block. There is no reorg case.
- **The rules are yours**: account creation policy, fee models, asset-level controls — all live in system contracts the deploying organization owns.

## Where it comes from

PulseVM stands on two proven foundations, named plainly:

- **Execution: Antelope (formerly EOSIO).** The account, permission, contract, and resource semantics are a direct lineage from the Antelope protocol — the model behind XPR Network, WAX, Telos, and EOS — including core components (the chainbase state database, the libfc crypto/serialization layer) carried over directly from the reference implementation.
- **Consensus: Avalanche's Snowman protocol**, as implemented by Metal Blockchain (metalgo). Repeated randomized sampling of the validator set yields fast, metastable, instantly-final agreement — equally suited to small accountable consortium sets and larger public ones.

PulseVM is **open source** ([MetalBlockchain/pulsevm](https://github.com/MetalBlockchain/pulsevm)), created by Metallicus CTO **Glenn Mariën** ([@MlennGarien](https://github.com/MlennGarien)).

## Where to go next

- [Accounts & Permissions](/guide/accounts-permissions) — the feature institutions care about most
- [Native Multisig](/guide/multisig) — dual control as infrastructure
- [For Banks & Fintechs](/institutions/banks) — the economic argument
- [TypeScript Quickstart](/build/quickstart-typescript) — contract in minutes

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

The execution semantics are a direct lineage from Antelope (EOSIO) — the model behind XPR Network, WAX, Telos, and EOS — including core components (the chainbase state database, the libfc crypto/serialization layer) carried over directly. The consensus layer is Metal Blockchain's Snowman, giving small, accountable validator sets fast metastable finality.

## Where to go next

- [Accounts & Permissions](/guide/accounts-permissions) — the feature institutions care about most
- [Native Multisig](/guide/multisig) — dual control as infrastructure
- [For Banks & Fintechs](/institutions/banks) — the economic argument
- [TypeScript Quickstart](/build/quickstart-typescript) — contract in minutes

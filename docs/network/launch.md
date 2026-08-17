---
description: "Launch your own blockchain — deploy a sovereign PulseVM network on metalgo with your own validators, genesis and system-contract rules."
---

# Launch Your Own Network

PulseVM is a virtual machine plugin for **metalgo** (Metal Blockchain's node). Standing up your own network — sovereign, with your own validators and your own rules — is a provisioning exercise, not a research project. This is the path that makes PulseVM "your network, your rules" rather than "a chain you join."

> For **local development**, the fastest path is [metal-network-runner](https://github.com/MetalBlockchain/metal-network-runner), which spins up a throwaway multi-node network on your machine. The steps below describe a real, persistent deployment.

<NetworkScene :nodes="5" />

## The pieces

| Component | Role |
|---|---|
| **metalgo** | the node software; runs consensus (Avalanche Snowman) and hosts VMs |
| **PulseVM plugin** | the VM binary, placed in metalgo's `plugins/` directory, keyed by its **VM ID** |
| **Subnet** | the set of validators that runs your chain |
| **Genesis** | initial chain state — core token, the bootstrap account, parameters |
| **System contracts** | the rules of your chain (accounts, resources, token), deployed from [pulse-cdt-rust](https://github.com/MetalBlockchain/pulse-cdt-rust) |

## Shape of a deployment

1. **Provision hosts** — one Linux box per validator (start with a handful for a consortium).
2. **Install metalgo** on each, and place the **PulseVM plugin** binary in the plugins directory under its VM ID. Build the plugin from [MetalBlockchain/pulsevm](https://github.com/MetalBlockchain/pulsevm) or use a release artifact.
3. **Create the subnet** and add each node's NodeID as a validator. The subnet owner controls validator membership — this is your governance boundary.
4. **Define genesis**: the core/system token, the bootstrap (system) account and its keys, and chain parameters. This is where you set the economics and identity of your network.
5. **Bootstrap the chain**: deploy the system contracts (token, system, governance) to the system account, set up the initial permission structure, and activate any protocol features your deployment needs.
6. **Operate**: nodes run under a service manager (e.g. systemd); monitor head and last-irreversible block; coordinate plugin upgrades across the validator set.

## Customizing the rules

Because the chain's behavior lives in **system contracts you control**, this is also where customization happens — account-creation policy (e.g. KYC-gated onboarding), fee models, asset-level controls (freeze/clawback under legal order), resource economics, and settlement parameters. The Antelope lineage has a decade of precedent for forking the system layer into different economies ([XPR Network](https://xprnetwork.org), WAX, Telos, FIO each did exactly this).

## Operating notes

- Coordinate plugin upgrades across the validator set rather than node-by-node — consensus-affecting changes should roll out in a planned window.
- Back up each node's staking keys before any maintenance.
- Detailed runbooks, provisioning scripts, and monitoring exist from operating live networks — [contact Metallicus](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs) for deployment support, or ask in the community channels.

## Why run your own

A network you operate keeps the data, the rules, the validator set, and the upgrade schedule under your control — and, with institution-issued assets on it, keeps the deposits and the customer relationship on your balance sheet. See [For Banks & Fintechs](/institutions/banks).

---
description: "PulseVM repositories and tools: the VM, contract kits, SDKs, CLIs, wallets, indexers and operator tooling."
---

# Repositories and resources

Everything you need to evaluate and build on PulseVM is public. The VM is source-available under the PulseVM Business License (free for evaluation and non-commercial use; commercial use licensed by Metallicus); the contract kits, SDKs and tools listed here are open source. The canonical home is **[github.com/MetalBlockchain](https://github.com/MetalBlockchain)**. The latest tagged PulseVM release is **v0.7.1**; `main` is ahead of it.

## PulseVM core

| Repo | What it is |
|---|---|
| [pulsevm](https://github.com/MetalBlockchain/pulsevm) | The virtual machine itself: Antelope execution in Rust, as a metalgo plugin. Releases ship Linux binaries and the Rust `pulse` CLI |
| [metalgo](https://github.com/MetalBlockchain/metalgo) | The Metal Blockchain node PulseVM plugs into. v1.14.2-tahoe brings the Granite upgrade; see [the upgrade guide](/network/upgrade-metalgo-1-14) |
| [leap](https://github.com/MetalBlockchain/leap) | C++ Antelope reference implementation — the semantic anchor |

## Contract development

| Repo | What it is |
|---|---|
| C++ | The standard Antelope CDT builds PulseVM contracts; see the [C++ quickstart](/build/quickstart-cpp) |
| [pulse-cdt-rust](https://github.com/MetalBlockchain/pulse-cdt-rust) | Rust CDT — and the chain's **open, auditable system contracts** ([`contracts/`](https://github.com/MetalBlockchain/pulse-cdt-rust/tree/master/contracts): system, token, msig, bios) |
| [pulse-tsc](https://github.com/paulgnz/pulse-tsc) | TypeScript/AssemblyScript contracts (community) |

## SDKs and tooling

| Repo | What it is |
|---|---|
| [pulsevm-js](https://github.com/MetalBlockchain/pulsevm-js) | TypeScript SDK — signing, ABIs, transact |
| [pulse-cli-ts](https://github.com/paulgnz/pulse-cli-ts) | `pulse-ts`, the cross-platform CLI for accounts, contracts, actions and permissions (community) |
| [pulse-wallet](https://github.com/paulgnz/pulse-wallet) | The PulseVM desktop wallet for macOS: Secure Enclave and YubiKey keys, decode-before-sign, multisig (community) |
| [pulse-web-sdk](https://github.com/paulgnz/pulse-web-sdk) | Connect a web app to the desktop wallet (community) |
| [hyperion-rs](https://github.com/MetalBlockchain/hyperion-rs) | Full-history API / indexer for PulseVM chains — native Rust rewrite (supersedes pulsevm-hyperion) |
| [metal-network-runner](https://github.com/MetalBlockchain/metal-network-runner) | Run a local Metal network for development |
| [metal-monitoring](https://github.com/MetalBlockchain/metal-monitoring) | Node monitoring tooling |

## Ecosystem

| Repo | What it is |
|---|---|
| [pulse-explorer](https://github.com/paulgnz/pulse-explorer) | Block explorer for PulseVM chains — accounts, contracts, tokens, producers, wallet (community) — live at [testnet.explorer.pulsevm.dev](https://testnet.explorer.pulsevm.dev) |
| [pulse-cutover](https://github.com/paulgnz/pulse-cutover) | Antelope→PulseVM cutover agent — snapshot ceremony, byte-exact verification, API/history endpoint continuity (community) |
| [metal-wallet](https://github.com/MetalBlockchain/metal-wallet) | Web wallet |
| [metal-docs](https://github.com/MetalBlockchain/metal-docs) | Metal Blockchain documentation |

## This site

[paulgnz/pulsevm-docs](https://github.com/paulgnz/pulsevm-docs). Corrections welcome.


## Community

- **Telegram** — [join the PulseVM community group](https://t.me/+N1mAvoUDbtVmNTBh) (member approval enabled)
- **GitHub** — [MetalBlockchain](https://github.com/MetalBlockchain) · [community tooling](https://github.com/paulgnz)

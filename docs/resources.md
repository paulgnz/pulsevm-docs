# Repositories & Resources

The canonical home for PulseVM and the Metal Blockchain stack is **[github.com/MetalBlockchain](https://github.com/MetalBlockchain)**.

## PulseVM core

| Repo | What it is |
|---|---|
| [pulsevm](https://github.com/MetalBlockchain/pulsevm) | The virtual machine itself — "fast virtual machine focused on banking" |
| [metalgo](https://github.com/MetalBlockchain/metalgo) | The Metal Blockchain node PulseVM plugs into |
| [leap](https://github.com/MetalBlockchain/leap) | C++ Antelope reference implementation — the semantic anchor |

## Contract development

| Repo | What it is |
|---|---|
| `pulse-cdt` | C++ Contract Development Kit (repo currently private — the standard Antelope CDT conventions apply) |
| [pulse-cdt-rust](https://github.com/MetalBlockchain/pulse-cdt-rust) | Rust CDT — and the chain's **open, auditable system contracts** ([`contracts/`](https://github.com/MetalBlockchain/pulse-cdt-rust/tree/master/contracts): system, token, msig, bios) |
| [pulse-tsc](https://github.com/paulgnz/pulse-tsc) | TypeScript/AssemblyScript contracts (community) |

## SDKs & tooling

| Repo | What it is |
|---|---|
| [pulsevm-js](https://github.com/MetalBlockchain/pulsevm-js) | TypeScript SDK — signing, ABIs, transact |
| `pulsevm-demo-dapps` | Official demo applications — working end-to-end dapp examples (repo currently private) |
| [pulse-cli-ts](https://github.com/paulgnz/pulse-cli-ts) | Working CLI for accounts, contracts, actions, permissions (community) |
| [hyperion-rs](https://github.com/MetalBlockchain/hyperion-rs) | Full-history API / indexer for PulseVM chains — native Rust rewrite (supersedes pulsevm-hyperion) |
| [metal-network-runner](https://github.com/MetalBlockchain/metal-network-runner) | Run a local Metal network for development |
| [metal-monitoring](https://github.com/MetalBlockchain/metal-monitoring) | Node monitoring tooling |

## Ecosystem

| Repo | What it is |
|---|---|
| [pulse-explorer](https://github.com/paulgnz/pulse-explorer) | Block explorer for PulseVM chains — accounts, contracts, tokens, producers, wallet (community) — live at [testnet.explorer.pulsevm.dev](https://testnet.explorer.pulsevm.dev) |
| [pulse-cutover](https://github.com/paulgnz/pulse-cutover) | Antelope→PulseVM cutover agent — snapshot ceremony, byte-exact verification, API/history endpoint continuity (community) |
| `explorer` | Metal Blockchain explorer (repo currently private) |
| [metal-wallet](https://github.com/MetalBlockchain/metal-wallet) | Web wallet |
| [metal-docs](https://github.com/MetalBlockchain/metal-docs) | Metal Blockchain documentation |

## This site

[paulgnz/pulsevm-docs](https://github.com/paulgnz/pulsevm-docs) — corrections and PRs welcome.

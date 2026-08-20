# Network Endpoints

## A-Chain Alpine (testnet)

::: tip Fast-moving testnet
Alpine upgrades frequently as development ships — most recent genesis **2026-08-20** (v0.7.x era). Endpoints and chain IDs on this page are kept current; if a cached value stops working, re-check here or see [Updates](/network/updates).
:::

| | |
|---|---|
| RPC (native JSON-RPC) | `https://a-chain-alpine.metalblockchain.org/ext/bc/yQUjkpNYeiJZEn1daa7dQJbysxdXLtz1QhTTdu1mwaxoEJwiJ/rpc` |
| History (Hyperion v2) | `https://a-chain-alpine-hyperion.metalblockchain.org` |
| Blockchain ID | `yQUjkpNYeiJZEn1daa7dQJbysxdXLtz1QhTTdu1mwaxoEJwiJ` |
| Chain ID | `8012f12057c8bb99bf99d9aeceb99ad09102ffc6ca07bc98e806d238aeb02c24` |
| Node version | PulseVM `v0.7.x`-series — connect via the public RPC above; validator releases at [GitHub](https://github.com/MetalBlockchain/pulsevm/releases) |
| Indexer | [hyperion-rs](https://github.com/MetalBlockchain/hyperion-rs) — Metallicus's native Rust Hyperion |

::: tip Testnet
Alpine is the public test network for A-Chain. Core/staking token is SYS (4 decimals); an XPR token is issued on `pulse.token` as well.
:::

> Antelope-style `/v1/chain` REST is not currently exposed on Alpine — use the native JSON-RPC above (`pulsevm.getInfo`, `pulsevm.getTableRows`, …) or the Hyperion `/v2` API for history. See [/build/api](/build/api) for the method table. (The [XPR 1:1 demo network](#xpr-1-1-demo-network-community-operated) below does serve `/v1` REST.)

## XPR 1:1 demo network (community-operated)

A live demonstration network running a **byte-exact import of XPR Network testnet state** on current PulseVM — real accounts, contracts, balances, and permissions at production scale, continuing the source chain's block numbering. Full story: [The 1:1 Demo Network](/network/one-to-one-demo).

| | |
|---|---|
| RPC (native JSON-RPC) | `https://xpr-rpc-testnet.pulsevm.dev` (`pulsevm.*` methods) |
| REST (`/v1/chain`) | `https://xpr-rpc-testnet.pulsevm.dev/v1/chain/…` — Antelope-compatible, via gateway on the same host |
| History (Hyperion v2) | `https://xpr-hyperion-testnet.pulsevm.dev` |
| Explorer | [testnet.explorer.pulsevm.dev](https://testnet.explorer.pulsevm.dev) |
| Chain ID | `71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd` (same as XPR testnet — the state is the point) |
| Core token | XPR (4 decimals) |

::: warning Demo, not a service
Community-operated, single validator, and may be re-imported from newer snapshots as tooling evolves. Great for exercising real Antelope state on PulseVM — not a place to keep anything you care about. See [caveats](/network/one-to-one-demo#honest-caveats).
:::

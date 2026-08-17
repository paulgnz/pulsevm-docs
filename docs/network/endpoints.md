# Network Endpoints

## A-Chain Alpine (testnet)

::: tip Fast-moving testnet
Alpine upgrades frequently as development ships — most recent genesis **2026-08-05** (v0.6.x era). Endpoints and chain IDs on this page are kept current; if a cached value stops working, re-check here or see [Updates](/network/updates).
:::

| | |
|---|---|
| RPC (native JSON-RPC) | `https://a-chain-alpine.metalblockchain.org/ext/bc/C6tuBzT2M3TZHyWc5Ro6L3cJyoxRAPy9avJeNh3FPzkBswXgX/rpc` |
| History (Hyperion v2) | `https://a-chain-alpine-hyperion.metalblockchain.org` |
| Blockchain ID | `C6tuBzT2M3TZHyWc5Ro6L3cJyoxRAPy9avJeNh3FPzkBswXgX` |
| Chain ID | `193526980f523c07a567dda80f5f543e2356518ce1475cf3e03d98ca740b3f67` |
| Node version | PulseVM `v0.6.x`-series — connect via the public RPC above; validator releases at [GitHub](https://github.com/MetalBlockchain/pulsevm/releases) |
| Indexer | [hyperion-rs](https://github.com/MetalBlockchain/hyperion-rs) — Metallicus's native Rust Hyperion |

::: tip Testnet
Alpine is the public test network for A-Chain. Core token is XPR (4 decimals).
:::

> Antelope-style `/v1/chain` REST is not currently exposed on the rebooted testnet — use the native JSON-RPC above (`pulsevm.getInfo`, `pulsevm.getTableRows`, …) or the Hyperion `/v2` API for history. See [/build/api](/build/api) for the method table.

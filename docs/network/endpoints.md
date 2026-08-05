# Network Endpoints

## A-Chain Alpine (testnet)

::: warning Testnet resets frequently during hardening
Alpine was most recently relaunched with a fresh genesis on **2026-08-05** (PulseVM v0.6.x era). Each reset changes the blockchain ID and chain ID, and state does not carry over — expect further resets while consensus hardening lands, and re-check this page if a cached endpoint stops responding.
:::

| | |
|---|---|
| RPC (native JSON-RPC) | `https://a-chain-alpine.metalblockchain.org/ext/bc/C6tuBzT2M3TZHyWc5Ro6L3cJyoxRAPy9avJeNh3FPzkBswXgX/rpc` |
| History (Hyperion v2) | `https://a-chain-alpine-hyperion.metalblockchain.org` |
| Blockchain ID | `C6tuBzT2M3TZHyWc5Ro6L3cJyoxRAPy9avJeNh3FPzkBswXgX` |
| Chain ID | `193526980f523c07a567dda80f5f543e2356518ce1475cf3e03d98ca740b3f67` |
| Node version | PulseVM `v0.6.x`-series (third-party node sync is not yet supported on this reset — use the public RPC above, or watch [releases](https://github.com/MetalBlockchain/pulsevm/releases)) |
| Indexer | [hyperion-rs](https://github.com/MetalBlockchain/hyperion-rs) — Metallicus's native Rust Hyperion |

::: tip Testnet
Alpine is the public test network for A-Chain. Core token is XPR (4 decimals).
:::

> Antelope-style `/v1/chain` REST is not currently exposed on the rebooted testnet — use the native JSON-RPC above (`pulsevm.getInfo`, `pulsevm.getTableRows`, …) or the Hyperion `/v2` API for history. See [/build/api](/build/api) for the method table.

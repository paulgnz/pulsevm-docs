# Network Endpoints

## A-Chain Alpine (testnet)

::: warning Network rebooted — July 2026
Alpine was relaunched with a fresh genesis on 2026-07-27 (PulseVM v0.5.1). Endpoints, blockchain ID, and chain ID all changed; state from the previous Alpine did not carry over. Update any saved configuration.
:::

| | |
|---|---|
| RPC (native JSON-RPC) | `https://a-chain-alpine.metalblockchain.org/ext/bc/dbmApAUgd9jbQRmcWLXkg1jxoGbdVsY7gtZGLk59JcoXvbF8S/rpc` |
| History (Hyperion v2) | `https://a-chain-alpine-hyperion.metalblockchain.org` |
| Blockchain ID | `dbmApAUgd9jbQRmcWLXkg1jxoGbdVsY7gtZGLk59JcoXvbF8S` |
| Chain ID | `531a7002b4a4b67987f8706c01b965c76ffc3ad301608ac61a1f738cba6c3a9a` |
| Node version | PulseVM `v0.5.1`-series (validator build not yet published — syncing a node from the `v0.5.1` tag currently fails on early blocks; use the public RPC above, or watch [releases](https://github.com/MetalBlockchain/pulsevm/releases) for the validator binary) |
| Indexer | [hyperion-rs](https://github.com/MetalBlockchain/hyperion-rs) — Metallicus's native Rust Hyperion |

::: tip Testnet
Alpine is the public test network for A-Chain. Core token is SYS (4 decimals).
:::

> Antelope-style `/v1/chain` REST is not currently exposed on the rebooted testnet — use the native JSON-RPC above (`pulsevm.getInfo`, `pulsevm.getTableRows`, …) or the Hyperion `/v2` API for history. See [/build/api](/build/api) for the method table.

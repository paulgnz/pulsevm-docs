---
description: "Public PulseVM endpoints: the A-Chain Alpine testnet with chain IDs and status, and the status of XPR→PulseVM cutover testing."
---

# Network endpoints

<small>Last checked: 2026-10-19.</small>

## Status

| Network | RPC | History | Explorer | Status | Last checked |
|---|---|---|---|---|---|
| [A-Chain Alpine](#a-chain-alpine-testnet) | Public RPC below | `https://a-chain-alpine-hyperion.metalblockchain.org` | None listed | Public RPC not answering | 2026-10-19 |

**XPR→PulseVM cutover:** the cutover is being tested in rehearsals. Public test endpoints will be published here when available. The XPR 1:1 demo network was retired on 2026-10-19.

Running your own node on Tahoe? Granite activated on 2026-09-21. See [Upgrade to metalgo 1.14.2](/network/upgrade-metalgo-1-14).

## A-Chain Alpine (testnet)

::: warning Public RPC not answering (checked 2026-10-19)
Alpine's public RPC below returns `404` and its Hyperion reports an RPC error. This page will be updated when Alpine is back.
:::

Alpine upgrades frequently as development ships. Most recent genesis: **2026-08-20** (v0.7.x era). If a cached value stops working, re-check here or see [Updates](/network/updates).

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

> Antelope-style `/v1/chain` REST is not exposed on Alpine today; a nodeos-style `/v1/chain` API inside the node is merged and ships in the next release. Use the native JSON-RPC above (`pulsevm.getInfo`, `pulsevm.getTableRows`, …) or the Hyperion `/v2` API for history. See [/build/api](/build/api) for the method table.

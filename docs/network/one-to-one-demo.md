---
description: "A live demonstration network running a byte-exact import of XPR Network testnet state on PulseVM — real accounts, contracts, and balances at production scale, booted from an Antelope portable snapshot."
---

# The 1:1 Demo Network

A live, public demonstration network running a **byte-exact import of XPR Network testnet state on PulseVM**. Not a synthetic benchmark — the real thing: every account, permission tree, contract (verified code hashes), table row, balance, and resource position from a production-scale Antelope chain, executing on a PulseVM node.

The import is from an XPR Network testnet snapshot taken **2026-08-15 at head block 400,588,707**. The chain continues the source's block numbering — blocks **400,588,708 and up are PulseVM blocks**, containing transactions signed with the same keys the accounts had on XPR Network testnet.

## Why this matters

The claim behind [Antelope compatibility](/compare/antelope) is that existing contracts and accounts run unchanged. A test suite argues that; a production-scale state import **demonstrates** it:

- **Existing accounts work.** The full account set — permission hierarchies, linked auths, multisig configurations — imported byte-exact and resolves as it did on the source chain.
- **Existing keys sign.** Post-import blocks are transactions signed with pre-existing XPR Network keys. Login, transfer, contract calls — the same key material, no re-registration.
- **Existing contracts execute.** Contract WASM imported with verified, identical code hashes and runs on PulseVM's host-function surface — the compatibility surface exercised against real deployed code, not toy contracts.
- **State at production scale.** Tens of thousands of accounts and the tables of hundreds of deployed contracts — over two million table rows — the import path is measured against a real chain, not a fixture.

This is a technical demonstration of PulseVM's execution-layer compatibility. It is a proving ground, not an announcement about any production network's plans.

## Try it

**Explorer** — [testnet.explorer.pulsevm.dev](https://testnet.explorer.pulsevm.dev). Look up [`protonnz`](https://testnet.explorer.pulsevm.dev/account/protonnz): its history shows pre-import XPR Network actions (federated from the source chain's Hyperion) and post-import PulseVM blocks, seamlessly on one timeline — state migrates, history federates.

**RPC** — `https://xpr-rpc-testnet.pulsevm.dev` serves the native `pulsevm.*` JSON-RPC **and** Antelope `/v1/chain` REST (via a gateway on the same host), so eosjs-style tooling works too.

```bash
# chain info — note the chain id and the continued block numbering
curl -s -X POST https://xpr-rpc-testnet.pulsevm.dev \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getInfo","params":{}}'

# a real imported balance: eosio.token accounts table, scope protonnz
curl -s -X POST https://xpr-rpc-testnet.pulsevm.dev \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getTableRows","params":{
       "json":true,"code":"eosio.token","scope":"protonnz","table":"accounts",
       "limit":10,"key_type":"","index_position":1,
       "lower_bound":"","upper_bound":"","reverse":false,"encode_type":"dec"}}'
```

The same reads work REST-style: `POST /v1/chain/get_info`, `POST /v1/chain/get_table_rows`.

**History** — Hyperion v2 at `https://xpr-hyperion-testnet.pulsevm.dev` (e.g. `/v2/health`, `/v2/history/get_actions?account=protonnz&limit=10`).

| | |
|---|---|
| Chain ID | `71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd` |
| Core token | XPR (4 decimals) |
| Snapshot | XPR Network testnet, 2026-08-15, head block 400,588,707 |

## How it works

PulseVM can boot a chain **directly from an Antelope portable chainstate snapshot** — the same `.bin` snapshots nodeos produces. Point the node's config at the file (`snapshot_path`) and genesis *is* the imported state; the import itself takes seconds. The snapshot reader is upstream PulseVM code ([`pulsevm_snapshot`, PR #53](https://github.com/MetalBlockchain/pulsevm/pull/53)).

History from before the snapshot block isn't on the new chain — it federates: the explorer queries the source chain's Hyperion for pre-import actions and the new chain's [hyperion-rs](https://github.com/MetalBlockchain/hyperion-rs) for everything after, stitched at the snapshot block.

## Honest caveats

::: warning What this is and isn't
- **A community-operated demonstration**, run by [XPR Network block producer protonnz](https://github.com/paulgnz) — not an official XPR Network or Metallicus service.
- **Single validator**, and it may be re-imported from newer snapshots as tooling evolves. The chain id and state persist across restarts, but treat it as a demo, not a service.
- **K1 keys only for signing on this node today.** R1/WebAuthn verification merged upstream on 2026-09-01 ([PR #69](https://github.com/MetalBlockchain/pulsevm/pull/69)); this demo node runs a build from before that merge and will pick it up at its next re-import.
:::

## Related

- [Migrating an Antelope Chain to PulseVM](/guide/migrate-antelope-chain) — the capability this network demonstrates, including the rehearsed cutover ceremony
- [MetalBlockchain/pulsevm](https://github.com/MetalBlockchain/pulsevm) — the VM · [snapshot reader PR #53](https://github.com/MetalBlockchain/pulsevm/pull/53)
- [Network Endpoints](/network/endpoints) — this network and Alpine, side by side
- [Updates](/network/updates) — the development timeline that made this possible
- [Antelope Compatibility](/compare/antelope) — the capability snapshot this network demonstrates

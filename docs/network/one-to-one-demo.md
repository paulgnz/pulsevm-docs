---
description: "A live demonstration network running a byte-exact import of XPR Network testnet state on PulseVM — real accounts, contracts, and balances at production scale, booted from an Antelope portable snapshot."
---

# The 1:1 Demo Network

A live, public demonstration network running a **byte-exact import of XPR Network testnet state on PulseVM**. Not a synthetic benchmark — the real thing: every account, permission tree, contract (verified code hashes), table row, balance, and resource position from a production-scale Antelope chain, executing on a PulseVM node.

The import is from an XPR Network testnet snapshot taken **2026-09-02 at head block 403,625,033** (the network was re-imported on that date onto a build carrying upstream's R1/WebAuthn key support). The chain continues the source's block numbering — blocks **403,625,034 and up are PulseVM blocks**, containing transactions signed with the same keys the accounts had on XPR Network testnet.

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
| Snapshot | XPR Network testnet, 2026-09-02 00:00 UTC, head block 403,625,033 |

## Use it as a developer sandbox

Because the state is real, the demo network is a sandbox with your own data in it.

- **Your XPR testnet account is already here.** Any XPR Network testnet account created before 2026-09-02 exists on this network with the same permissions and the same keys it had at the snapshot. There is nothing to register.
- **Reads are free.** Table queries, account lookups and chain info cost nothing and need no key.
- **Writes use the account's imported resources.** Transactions are billed to the CPU, NET and RAM the account held at the snapshot, just as on the source chain.

Point [pulse-ts](/build/cli) at the RPC and work as you would on XPR testnet:

```bash
pulse-ts endpoint:set https://xpr-rpc-testnet.pulsevm.dev
pulse-ts chain:info
pulse-ts account <your-account>
pulse-ts table eosio.token accounts <your-account>

# import your XPR testnet key, then sign as usual (the token contract here is eosio.token)
pulse-ts key:add
pulse-ts transfer <your-account> <other-account> "1.0000 XPR" "hello from PulseVM" --contract eosio.token
```

Existing eosjs-style code works too, through the `/v1/chain` REST gateway on the same host. Remember this is a demo network: balances here are copies, and changes here never reach XPR Network.

## How it works

PulseVM can boot a chain **directly from an Antelope portable chainstate snapshot**, the same `.bin` snapshots nodeos produces. On this network the node was pointed at the snapshot file, and genesis *is* the imported state. The import itself takes seconds. The snapshot reader is upstream PulseVM code. For a production migration, PulseVM's official path first converts the snapshot into a verified checkpoint and cross-checks it table by table against the source. See [Migrating an Antelope chain](/guide/migrate-antelope-chain).

History from before the snapshot block isn't on the new chain. It federates: the explorer queries the source chain's Hyperion for pre-import actions and the new chain's [hyperion-rs](https://github.com/MetalBlockchain/hyperion-rs) for everything after, stitched together at the snapshot block.

## Honest caveats

::: warning What this is and isn't
- **A community-operated demonstration**, run by [XPR Network block producer protonnz](https://github.com/paulgnz) — not an official XPR Network or Metallicus service.
- **Single validator**, and it may be re-imported from newer snapshots as tooling evolves. The chain id and state persist across restarts, but treat it as a demo, not a service.
- **All three Antelope key types sign here.** The node runs PulseVM's native R1 and WebAuthn verification. The import carries every imported R1 and WebAuthn authority (6 R1 and 1,020 WebAuthn keys in this snapshot), and R1- and WebAuthn-signed transactions have been executed on this network under `protonnz@r1sign` / `protonnz@wasign`.
:::

## Related

- [Migrating an Antelope Chain to PulseVM](/guide/migrate-antelope-chain) — the capability this network demonstrates, including the rehearsed cutover ceremony
- [Launch your own network](/network/launch): the same stack, for your institution
- [Network Endpoints](/network/endpoints) — this network and Alpine, side by side
- [Updates](/network/updates) — the development timeline that made this possible
- [Antelope Compatibility](/compare/antelope) — the capability snapshot this network demonstrates

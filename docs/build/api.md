---
description: "PulseVM RPC reference: the native pulsevm.* JSON-RPC methods, the Antelope /v1/chain REST option, and the differences from nodeos that affect clients."
---

# RPC and REST API

PulseVM nodes expose a native JSON-RPC API. A nodeos-style `/v1/chain` REST API inside the node is in development; until it lands, a small gateway serves `/v1/chain` for eosjs and @proton/js, as on the [1:1 demo network](/network/one-to-one-demo). Full history comes from [Hyperion](https://github.com/MetalBlockchain/hyperion-rs).

::: warning The one difference that trips people up
`issueTx` (and `push_transaction` through the gateway) returns the transaction id once the node accepts it into the pool, not an execution trace. The transaction executes when a block is built. Read the outcome back from Hyperion, or poll for the transaction, before treating it as done.
:::

## Native JSON-RPC

`POST /ext/bc/<blockchainID>/rpc` with JSON-RPC 2.0 on a metalgo node. Some public endpoints serve it at the root instead, such as `https://xpr-rpc-testnet.pulsevm.dev`. Key methods:

| Method | Purpose |
|---|---|
| `pulsevm.getInfo` | chain id, head block, LIB |
| `pulsevm.getAccount` | account, permissions, resources |
| `pulsevm.getABI` | contract ABI |
| `pulsevm.getBlock` | block by number or id |
| `pulsevm.getTableRows` | contract table reads |
| `pulsevm.getCurrencyBalance` / `getCurrencyStats` | token queries |
| `pulsevm.getRequiredKeys` | signing key resolution |
| `pulsevm.getRawBlock` | raw block |
| `pulsevm.getCodeHash` | hash of an account's contract code (not the WASM itself) |
| `pulsevm.getTableByScope` | enumerate a table's scopes |
| `pulsevm.getProducers` | registered producers |
| `pulsevm.getRawABI` | raw ABI bytes |
| `pulsevm.issueTx` | submit a signed transaction |

Example table read:

```bash
curl -s -X POST https://<endpoint>/ext/bc/<chainID>/rpc \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getTableRows","params":{
        "json":true,"code":"pulse.token","scope":"SYS","table":"stat",
        "limit":10,"key_type":"","index_position":1,
        "lower_bound":"","upper_bound":"","reverse":false,"encode_type":"dec"}}'
```

## Antelope REST compatibility

`/v1/chain/get_info`, `get_account`, `get_abi`, `get_block`, `get_table_rows`, `push_transaction`, … — request/response parity targeted at nodeos clients, so [eosjs](https://github.com/EOSIO/eosjs)/@proton/js `transact()` works against PulseVM deployments. Live example: the [XPR 1:1 demo network](/network/one-to-one-demo) serves `/v1/chain` REST alongside the native JSON-RPC (`https://xpr-rpc-testnet.pulsevm.dev/v1/chain/get_info`).

## Differences from nodeos that bite clients

A few Antelope REST behaviors clients sometimes assume are **not** present on a PulseVM node:

- **No `/v1/history/*`** on the node — use the [Hyperion](https://github.com/MetalBlockchain/hyperion-rs) full-history API for history/actions.
- **No `abi_json_to_bin`** — serialize client-side ([pulsevm-js](https://github.com/MetalBlockchain/pulsevm-js) does this).
- **No `get_scheduled_transactions`** — deferred transactions are deprecated in Antelope 5.x.
- **`getTableRows` is strict about parameters** — include `key_type` and string-form bounds for maximum compatibility across node versions.

## SDKs

- **[pulsevm-js](https://github.com/MetalBlockchain/pulsevm-js)** — native TypeScript SDK (signing, ABIs, transact)
- **[eosjs](https://github.com/EOSIO/eosjs) / @proton/js** — work via the REST compatibility layer

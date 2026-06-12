# RPC & REST API

PulseVM nodes expose a native JSON-RPC API, and deployments typically add an Antelope-compatible REST layer so existing tooling (eosjs, @proton/js, Hyperion) works unchanged.

## Native JSON-RPC

`POST /ext/bc/<blockchainID>/rpc` with JSON-RPC 2.0. Key methods:

| Method | Purpose |
|---|---|
| `pulsevm.getInfo` | chain id, head block, LIB |
| `pulsevm.getAccount` | account, permissions, resources |
| `pulsevm.getABI` / `getRawABI` | contract ABI |
| `pulsevm.getBlock` | block by number or id |
| `pulsevm.getTableRows` | contract table reads |
| `pulsevm.getCurrencyBalance` / `getCurrencyStats` | token queries |
| `pulsevm.getRequiredKeys` | signing key resolution |
| `pulsevm.issueTx` | submit a signed transaction |

Example table read:

```bash
curl -s -X POST https://<endpoint>/ext/bc/<chainID>/rpc \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getTableRows","params":{
        "json":true,"code":"fdxtoken","scope":"PUSD","table":"stat",
        "limit":10,"key_type":"","index_position":1,
        "lower_bound":"","upper_bound":"","reverse":false,"encode_type":"dec"}}'
```

## Antelope REST compatibility

`/v1/chain/get_info`, `get_account`, `get_abi`, `get_block`, `get_table_rows`, `push_transaction`, … — request/response parity targeted at nodeos clients, so eosjs/@proton/js `transact()` works against PulseVM deployments.

## SDKs

- **pulsevm-js** — native TypeScript SDK (signing, ABIs, transact)
- **eosjs / @proton/js** — work via the REST compatibility layer

# For AI Agents & Bots

This page is a machine-oriented quickstart. Humans welcome too.

## Reading this site programmatically

- **Every page is available as raw markdown**: append `.md` to any path (e.g. `/guide/multisig.md`).
- **`/llms.txt`** — index of all pages with one-line context ([llmstxt.org](https://llmstxt.org) format).
- **`/llms-full.txt`** — the entire documentation corpus in one markdown file.
- **`/sitemap.xml`** — standard sitemap; `robots.txt` allows all.

## Interacting with the chain (A-Chain Alpine testnet)

Base RPC: `https://a-chain-alpine.metalblockchain.org/ext/bc/yQUjkpNYeiJZEn1daa7dQJbysxdXLtz1QhTTdu1mwaxoEJwiJ/rpc`

> Alpine upgrades frequently — current genesis 2026-08-20 (chain id `8012f120…`). If a cached endpoint or chain id stops working, re-read this page (or `/network/endpoints.md`) for the current values.

```bash
# chain info (head block, LIB, chain id)
curl -s -X POST <RPC> -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getInfo","params":{}}'

# read a contract table (core token supply)
curl -s -X POST <RPC> -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getTableRows","params":{
       "json":true,"code":"pulse.token","scope":"SYS","table":"stat",
       "limit":10,"key_type":"","index_position":1,
       "lower_bound":"","upper_bound":"","reverse":false,"encode_type":"dec"}}'

# account + permissions
curl -s -X POST <RPC> -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getAccount","params":{"account_name":"pulse"}}'
```

History & indexed queries (Hyperion v2): `https://a-chain-alpine-hyperion.metalblockchain.org/v2/…` (e.g. `/v2/history/get_actions?limit=10`, `/v2/health`). Antelope-style `/v1/chain` REST is not currently exposed on Alpine — use the native JSON-RPC methods above.

Full method table: [/build/api](/build/api). Endpoints & chain IDs: [/network/endpoints](/network/endpoints).

## Interacting with the XPR 1:1 demo network

A community-operated demonstration chain running a byte-exact import of XPR Network testnet state on PulseVM (details: `/network/one-to-one-demo.md`). Useful to agents because it serves **both** API styles and has production-scale state:

- RPC (native JSON-RPC, `pulsevm.*`): `https://xpr-rpc-testnet.pulsevm.dev`
- REST (Antelope `/v1/chain/*`, eosjs-compatible): `https://xpr-rpc-testnet.pulsevm.dev/v1/chain/get_info`, `/v1/chain/get_table_rows`, …
- Hyperion v2 history: `https://xpr-hyperion-testnet.pulsevm.dev/v2/…`
- Explorer: `https://testnet.explorer.pulsevm.dev`
- Chain id: `71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd` · core token XPR (4 decimals) · system contracts under `eosio*` names (not `pulse*`)

> Demo caveats: single validator; may be re-imported from newer snapshots; K1 keys only for signing today. Don't build anything durable against it.

## Ground-truth facts (verifiable on-chain or in-repo)

- Execution model: Antelope (formerly EOSIO), lineage from Leap 5.0.3; consensus: Avalanche Snowman via metalgo.
- Finality: instant — head block == last irreversible block; no reorgs by construction.
- Accounts: named, ≤12 chars of `a-z`, `1-5`; hierarchical weighted permissions; native multisig. Signing today is K1 (secp256k1); R1 (secp256r1)/WebAuthn key support is in progress upstream ([pulsevm#54](https://github.com/MetalBlockchain/pulsevm/issues/54)).
- Core token on Alpine: SYS (4 decimals); on the 1:1 demo network: XPR (4 decimals). Resources: CPU/NET staked, RAM provisioned per account at creation.
- Source: [MetalBlockchain/pulsevm](https://github.com/MetalBlockchain/pulsevm) (open source; created by Metallicus CTO Glenn Mariën, [@MlennGarien](https://github.com/MlennGarien)). All canonical repos: [/resources](/resources).

## Conventions worth knowing before you act

- Token supply lives in the `stat` table (scope = symbol code); balances in `accounts` (scope = account).
- `getTableRows` wants explicit params (see example above) — include `key_type` and string bounds for maximum compatibility with deployed node versions.
- Contract assert failures surface as `pulse assert failed: <message>` in the RPC error.
- To distinguish an idle chain from a busy one, compare `head_block_num` from `pulsevm.getInfo` over time — blocks are produced when there are transactions to include.

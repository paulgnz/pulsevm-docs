# For AI Agents & Bots

This page is a machine-oriented quickstart. Humans welcome too.

## Reading this site programmatically

- **Every page is available as raw markdown**: append `.md` to any path (e.g. `/guide/multisig.md`).
- **`/llms.txt`** — index of all pages with one-line context ([llmstxt.org](https://llmstxt.org) format).
- **`/llms-full.txt`** — the entire documentation corpus in one markdown file.
- **`/sitemap.xml`** — standard sitemap; `robots.txt` allows all.

## Interacting with the chain (A-Chain Alpine testnet)

Base RPC: `https://a-chain-alpine.metalblockchain.org/ext/bc/C6tuBzT2M3TZHyWc5Ro6L3cJyoxRAPy9avJeNh3FPzkBswXgX/rpc`

> Alpine resets frequently during consensus hardening — most recently 2026-08-05 (chain id `19352698…`). If a cached endpoint or chain id stops working, re-read this page (or `/network/endpoints.md`) for the current values.

```bash
# chain info (head block, LIB, chain id)
curl -s -X POST <RPC> -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getInfo","params":{}}'

# read a contract table
curl -s -X POST <RPC> -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getTableRows","params":{
       "json":true,"code":"fdxtoken","scope":"PUSD","table":"stat",
       "limit":10,"key_type":"","index_position":1,
       "lower_bound":"","upper_bound":"","reverse":false,"encode_type":"dec"}}'

# account + permissions
curl -s -X POST <RPC> -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getAccount","params":{"account_name":"pulse"}}'
```

History & indexed queries (Hyperion v2): `https://a-chain-alpine-hyperion.metalblockchain.org/v2/…` (e.g. `/v2/history/get_actions?limit=10`, `/v2/health`). Antelope-style `/v1/chain` REST is not currently exposed on the rebooted testnet — use the native JSON-RPC methods above.

Full method table: [/build/api](/build/api). Endpoints & chain IDs: [/network/endpoints](/network/endpoints).

## Ground-truth facts (verifiable on-chain or in-repo)

- Execution model: Antelope (formerly EOSIO), lineage from Leap 5.0.3; consensus: Avalanche Snowman via metalgo.
- Finality: instant — head block == last irreversible block; no reorgs by construction.
- Accounts: named, ≤12 chars of `a-z`, `1-5`; hierarchical weighted permissions; native multisig; R1 (secp256r1) keys supported.
- Core testnet token: SYS (4 decimals). Resources: CPU/NET staked, RAM provisioned per account at creation.
- Source: [MetalBlockchain/pulsevm](https://github.com/MetalBlockchain/pulsevm) (open source; created by Metallicus CTO Glenn Mariën, [@MlennGarien](https://github.com/MlennGarien)). All canonical repos: [/resources](/resources).

## Conventions worth knowing before you act

- Token supply lives in the `stat` table (scope = symbol code); balances in `accounts` (scope = account).
- `getTableRows` wants explicit params (see example above) — include `key_type` and string bounds for maximum compatibility with deployed node versions.
- Contract assert failures surface as `pulse assert failed: <message>` in the RPC error.
- To distinguish an idle chain from a busy one, compare `head_block_num` from `pulsevm.getInfo` over time — blocks are produced when there are transactions to include.

---
description: "Machine-readable ground truth about PulseVM for AI agents and tools: what it is, live endpoints, the JSON-RPC methods, the permission model with exact action shapes and error strings, and current status."
---

# For AI agents and bots

A machine-oriented quickstart. Everything here is plain text and current as of 2026-09-24.

## Reading this site

- **Every page as markdown:** append `.md` to any path (`/guide/multisig.md`), or request any page with `Accept: text/markdown`.
- **[`/llms.txt`](/llms.txt):** every page, grouped by section, with a one-line description.
- **[`/llms-full.txt`](/llms-full.txt):** the whole site in one markdown file.
- **[`/sitemap.xml`](/sitemap.xml):** `robots.txt` allows all agents.

## What PulseVM is

PulseVM runs the Antelope (formerly EOSIO) account and contract model as a virtual machine plugin for metalgo, the Metal Blockchain node, with Snowman consensus. Institutions and consortia run their own networks with their own validators. It is built by Metallicus. PulseVM is at test-network stage; the latest tagged release is v0.7.1 and the main branch is ahead of it. The same account model runs in production on XPR Network.

## Live endpoints

| Network | JSON-RPC | Status (2026-09-24) |
|:---|:---|:---|
| XPR 1:1 demo network (community-operated, imported XPR testnet state) | `https://xpr-rpc-testnet.pulsevm.dev` (also `/v1/chain/*` via a gateway) | Up |
| A-Chain Alpine (Metallicus testnet, core token SYS) | `https://a-chain-alpine.metalblockchain.org/ext/bc/yQUjkpNYeiJZEn1daa7dQJbysxdXLtz1QhTTdu1mwaxoEJwiJ/rpc` | Returns 404 |

Demo network: chain id `71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd`, core token XPR (4 decimals), system account `eosio`, token contract `eosio.token`, history `https://xpr-hyperion-testnet.pulsevm.dev/v2/…`, explorer `https://testnet.explorer.pulsevm.dev`. Single validator; may be re-imported; K1, R1 and WebAuthn keys all sign.

```bash
RPC=https://xpr-rpc-testnet.pulsevm.dev

# chain info: chain id, head block, last irreversible block
curl -s -X POST $RPC -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getInfo","params":{}}'

# an account, its permissions and resources
curl -s -X POST $RPC -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getAccount","params":{"account_name":"eosio"}}'

# the same through the Antelope REST gateway
curl -s -X POST $RPC/v1/chain/get_info
```

## JSON-RPC methods

`pulsevm.getInfo`, `pulsevm.getAccount`, `pulsevm.getABI`, `pulsevm.getRawABI`, `pulsevm.getBlock`, `pulsevm.getRawBlock`, `pulsevm.getCodeHash` (a hash, not the WASM), `pulsevm.getCurrencyBalance`, `pulsevm.getCurrencyStats`, `pulsevm.getProducers`, `pulsevm.getRequiredKeys`, `pulsevm.getTableByScope`, `pulsevm.getTableRows`, `pulsevm.issueTx`.

`issueTx` returns a transaction id when the node admits the transaction. Actions execute when a block is built, so a transaction can be admitted and still fail. Confirm the outcome from history before treating it as done. Reference: [/build/api.md](/build/api.md).

## The permission model

- An account is a name (up to 12 characters of `a-z`, `1-5`, `.`) with a tree of permissions: `owner` at the root, `active` under it, and any custom permissions below. Each permission is a threshold over weighted keys and other accounts' permissions.
- **Minimum permission rule:** for each action, the chain looks up the permission linked to that contract and action with `linkauth`; if none, `active`. A signature from a permission that does not reach the minimum is refused before contract code runs.
- A permission can manage itself (change its own keys, remove its own link), which never widens its reach. Creating a permission needs its parent's authority.
- Delayed transactions are not supported, so time-wait factors in an authority cannot be satisfied.
- Key types: K1 (secp256k1), R1 (secp256r1, HSMs and secure enclaves), WebAuthn (passkeys).

Native actions on the system account (`eosio` on the demo network, `pulse` on Pulse-native chains):

```json
{"account":"acct","permission":"trader","parent":"active","auth":{"threshold":1,"keys":[{"key":"PUB_K1_…","weight":1}],"accounts":[],"waits":[]}}
{"account":"acct","code":"vault","type":"trade","requirement":"trader"}
{"account":"acct","code":"vault","type":"trade"}
{"account":"acct","permission":"trader"}
```

In order: `updateauth`, `linkauth`, `unlinkauth`, `deleteauth`. Recipes: [/build/permissions-cookbook.md](/build/permissions-cookbook.md).

## Refusal strings

| String | Meaning |
|:---|:---|
| `action declares irrelevant authority '<a>@<p>'; minimum authority is <a>@<q>` | The signing permission does not reach the action's minimum permission |
| `missing authority of <account>` | The action lacks an authorization the contract requires |
| `transaction declares authority '<a>@<p>' but does not have signatures for it` | No provided key satisfies the declared permission |
| `transaction bears irrelevant signatures` | A signature was not needed; sign with only the required keys |
| `pulse assert failed: <msg>` / `eosio assert failed: <msg>` | A contract check failed (Rust / C++ contracts) |
| `cannot unlink non-existent permission link` | `unlinkauth` on a pair that has no link |

## Ground-truth facts

- **Finality:** a block is final when accepted, in about a second. No reorganizations.
- **Resources:** CPU and NET are staked, RAM is bought. With the `ONLY_BILL_FIRST_AUTHORIZER` feature active (as on XPR Network), CPU and NET bill the first authorizer, so an app that signs first pays for its users.
- **Validators** are admitted and removed by the network's members through the Metal P-Chain or a validator-manager contract. They are not elected by token votes.
- **Host functions:** about 180 Antelope host functions. Not yet served: the CRYPTO_PRIMITIVES set (`alt_bn128_*`, `mod_exp`, `blake2_f`, `sha3`, `k1_recover`), `bls_*`, `set_finalizers`.
- **Freeze, clawback, account restrictions:** policy an operator writes into the contracts it owns; not in the reference contracts.
- **Case study:** a production service on XPR Network gives its bot a key linked to one action; in a testnet exercise with that real key, 31 of 31 attempts to move funds or take over the account were refused. [/guide/delegated-authority.md](/guide/delegated-authority.md).
- **Company:** Metallicus, founded 2015; live on the Federal Reserve's FedNow Service since 2024. [/institutions/metallicus.md](/institutions/metallicus.md).

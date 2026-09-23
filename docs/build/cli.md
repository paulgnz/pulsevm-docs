---
description: "Command-line tools for PulseVM: pulse-ts, the cross-platform proton-cli-shaped CLI, and the Rust pulse CLI shipped with each release. Install, accounts, keys, contracts, actions and permissions."
---

# Command-line tools

PulseVM has two CLIs: **pulse-ts**, the cross-platform CLI you'll use day to day (shaped like XPR Network's proton-cli), and the **native `pulse` CLI**, which ships with each PulseVM release and follows cleos conventions.

## Install pulse-ts

`pulse-ts` needs Node 18 or newer. It isn't on npm yet, so build it from source:

```bash
git clone https://github.com/paulgnz/pulse-cli-ts
cd pulse-cli-ts
npm install
npx tsc -b
npm link          # puts pulse-ts on your PATH
pulse-ts --help
```

Then point it at a network and import a key:

```bash
pulse-ts chain:set pulse-1to1                              # 1:1 demo network: endpoint and chain ID
pulse-ts chain:info
pulse-ts key:add                                            # stored in an encrypted local keystore
```

## Native CLI: `pulse` + `pulse-keosd`

Built from the [pulsevm repo](https://github.com/MetalBlockchain/pulsevm) (`crates/pulse`) and shipped as release artifacts (`pulse`, `pulse-keosd`). If you know **cleos**, you know this tool — it is a deliberate port of the Antelope CLI conventions:

```bash
# wallet management (pulse-keosd is the wallet daemon, like keosd)
pulse wallet create
pulse wallet open / lock / unlock / lock_all / stop
pulse wallet list            # list wallets
pulse wallet import          # import a private key
pulse wallet create_key      # generate a key inside a wallet
pulse wallet keys            # list keys in a wallet
pulse wallet remove_key

# accounts & keys
pulse create key --to-console
pulse create account <creator> <name> <owner-key> <active-key>

# chain state
pulse get info               # chain id, head, LIB
pulse get account <name>     # account, permissions, resources

# contracts & actions
pulse set url <endpoint>     # point at a node
pulse set code <account> <wasm>
pulse set abi  <account> <abi>
pulse transfer <from> <to> <quantity> <memo>   # defaults to pulse.token
```

> The native CLI currently implements `get info` and `get account` (not block/table reads — use the [RPC API](/build/api) for those, or pulse-cli-ts `table`).

A full flag-by-flag reference is coming as the tool stabilizes; cleos documentation is a reliable guide to the conventions in the meantime.

## pulse-ts reference

[pulse-cli-ts](https://github.com/paulgnz/pulse-cli-ts) (`pulse-ts`) is the working CLI for PulseVM chains. Run `pulse-ts <command> --help` for every flag.

```bash
# keys
pulse-ts create-key                       # generate a keypair

# accounts (creator authority required)
pulse-ts create-account myacct PUB_K1_... PUB_K1_... --creator pulse --ram-bytes 64000 --cpu "1.0000 SYS" --net "1.0000 SYS"

# contracts
pulse-ts set-code myacct ./contract.wasm
pulse-ts set-abi  myacct ./contract.abi

# actions — multi-auth supported
pulse-ts push-action myacct greet '{"account":"myacct","text":"hi"}' --actor myacct
pulse-ts push-action escrow release '{"id":42}' -a 'buyer@active,seller@active'

# endpoint management
pulse-ts endpoint:set https://your-node/ext/bc/<chainID>/rpc   # also check `pulse-ts chain:get` shows your network's chain ID before signing
pulse-ts endpoint:default

# tables
pulse-ts table myacct greetings                 # scope defaults to the contract
pulse-ts table eosio.token accounts myacct      # a token balance, scope = holder
```

### Permissions

`update-auth` sets a permission to one key or one `account@permission`. It creates the permission if it doesn't exist.

```bash
# usage: pulse-ts update-auth <account> <permission> <parent> <key-or-actor@perm> [--sign-permission P] [--code actor@code-perm]

pulse-ts update-auth myacct active owner PUB_K1_NEWKEY...                 # rotate active
pulse-ts update-auth myacct owner root PUB_K1_NEWOWNER...                 # rotate owner ("root" = empty parent)
pulse-ts update-auth myacct bot active PUB_K1_BOTKEY... --sign-permission active   # new child of active
pulse-ts update-auth myacct owner root recovery1@active                   # owner held by another account
pulse-ts update-auth myacct active owner PUB_K1_KEY... --code myacct@pulse.code   # let the contract act as itself
```

`update-auth` replaces the whole authority. For thresholds or several keys, push the native `updateauth` action with the full authority JSON ([example](/build/permissions-cookbook#a-2-of-3-treasury)).

`linkauth`, `unlinkauth` and `deleteauth` are native actions on the system account. Push them directly:

```bash
# bind myacct@bot to one action
pulse-ts push-action pulse linkauth \
  '{"account":"myacct","code":"myacct","type":"trade","requirement":"bot"}' -a myacct@active

# remove the binding (trade falls back to needing active)
pulse-ts push-action pulse unlinkauth \
  '{"account":"myacct","code":"myacct","type":"trade"}' -a myacct@active

# delete the permission (unlink it first)
pulse-ts push-action pulse deleteauth '{"account":"myacct","permission":"bot"}' -a myacct@active
```

The system account is `pulse` on Pulse-native chains such as Alpine and `eosio` on chains migrated from Antelope, such as the [1:1 demo network](/network/one-to-one-demo). There the code permission is `eosio.code` rather than `pulse.code`. Recipes with the exact refusal messages are in the [Permissions cookbook](/build/permissions-cookbook), and the full walk-through is [Tutorial: a bot key that can only trade](/build/tutorial-bot-key).

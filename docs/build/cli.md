# Command-line Tools

PulseVM has two CLIs: the **native `pulse` CLI** (ships with the node, follows cleos conventions) and **pulse-cli-ts** (community TypeScript CLI with conveniences for day-to-day contract work).

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
pulse create key
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

## Community CLI: pulse-cli-ts

[pulse-cli-ts](https://github.com/paulgnz/pulse-cli-ts) (`pulse-ts`) is the working CLI for PulseVM chains.

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
pulse-ts push-action fdxperps process '{"q_size":50}' -a 'keeper@active,fdxperps'

# permissions
pulse-ts update-auth myacct active owner PUB_K1_NEWKEY...
pulse-ts update-auth myacct active owner PUB_K1_KEY... --code myacct@pulse.code

# endpoint management
pulse-ts endpoint:set https://your-node/ext/bc/<chainID>/rpc
pulse-ts endpoint:default
```

Tables are easiest read via the JSON-RPC `pulsevm.getTableRows` (see [API](/build/api)).

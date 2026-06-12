# CLI: pulse-cli-ts

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

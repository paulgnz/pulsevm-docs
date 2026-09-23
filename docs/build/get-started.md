---
description: "Get started on PulseVM: install the CLI, get a named account, deploy a contract in Rust, C++ or TypeScript, then give a second key permission to call exactly one action."
---

# Get started

On PulseVM your account is a readable name, and it carries its own permission tree. In about fifteen minutes you'll deploy a contract to it, then give a second key permission to call exactly one of its actions.

## 1. Pick a network

| Network | Use it for | Accounts | Status |
|:---|:---|:---|:---|
| [1:1 demo network](/network/one-to-one-demo) | Trying real Antelope state on PulseVM | Every XPR Network testnet account that existed on 2026-09-02, with the same keys | Up. Serves JSON-RPC and `/v1/chain` |
| [A-Chain Alpine](/network/endpoints#a-chain-alpine-testnet) | Metallicus' Pulse-native testnet (SYS token) | Created on request | Public RPC not answering as of 2026-09-24 |
| Your own network | Anything you want to control | You hold the creator authority | See [Launch your own network](/network/launch) |

If you already have an XPR Network testnet account, the demo network is the fastest start: your account and keys are already there.

## 2. Install the CLI

`pulse-ts` is the cross-platform CLI, shaped like XPR Network's proton-cli. It needs Node 18 or newer and is not on npm yet, so build it from source:

```bash
git clone https://github.com/paulgnz/pulse-cli-ts
cd pulse-cli-ts
npm install
npx tsc -b
npm link          # puts pulse-ts on your PATH
pulse-ts --help
```

Metallicus also ships a Rust `pulse` CLI with every [pulsevm release](https://github.com/MetalBlockchain/pulsevm/releases) (Linux binaries). See [Command-line tools](/build/cli).

## 3. Keys and an account

```bash
pulse-ts create-key          # prints a PUB_K1_… / PVT_K1_… pair. Save the private key.
pulse-ts key:add             # import the private key into the local, encrypted keystore
```

- **On the demo network**, import the key of an XPR Network testnet account you already own and skip the next step.
- **On Alpine**, account creation is an authorized action. Ask in the [Telegram group](https://t.me/+N1mAvoUDbtVmNTBh) or [contact Metallicus](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs) with your public key. You get back a named account, such as `yourname1`, with `owner` and `active` set to your key and starter resources.
- **On your own network**, you hold the creator authority and create accounts yourself.

## 4. Point the CLI at the network

```bash
pulse-ts chain:set pulse-1to1                                   # 1:1 demo network: endpoint and chain ID
pulse-ts chain:info                                            # prints head block and chain ID
pulse-ts account yourname1                                     # your permissions and resources
```

## 5. Build and deploy

Pick a language and follow its quickstart. Each ends with a deployed contract and an action you pushed:

- **[Rust](/build/quickstart-rust)**: the canonical contract kit. PulseVM and its system contracts are Rust.
- **[C++](/build/quickstart-cpp)**: the full Antelope CDT heritage.
- **[TypeScript](/build/quickstart-typescript)**: AssemblyScript, for teams who prefer it.

## 6. Give a second key one job

This is the step that has no equivalent on most chains. Create a permission for a bot, and bind it to a single action of your contract:

```bash
pulse-ts create-key                                            # the bot's key
pulse-ts update-auth yourname1 bot active PUB_K1_…botkey --sign-permission active
pulse-ts push-action eosio linkauth \
  '{"account":"yourname1","code":"yourname1","type":"greet","requirement":"bot"}' \
  -a yourname1@active
```

Now `yourname1@bot` can call `greet` and no other contract action. Try a token transfer with it and the chain refuses before any contract runs. On Alpine the system account is `pulse` rather than `eosio`. More in [Accounts and permissions](/guide/accounts-permissions#recipes).

## When it fails

| Error | Cause | Fix |
|---|---|---|
| `pulse assert failed: <msg>` or `eosio assert failed: <msg>` | A contract check failed (Rust and C++ contracts word it differently) | Read the message. It names the failing check |
| `action declares irrelevant authority` | You signed with a permission that is not linked to that action | Sign with the linked permission, or with `active` |
| `missing authority of <account>` | The action does not declare an authorization the contract requires | Add that account to `-a`, for example `-a yourname1@active` |
| `transaction declares authority '…' but does not have signatures for it` | No key in your keystore satisfies the permission you named | Check `pulse-ts account <name>` and import the right key with `pulse-ts key:add` |
| Insufficient RAM | The account is too small for the contract | Buy RAM, or ask for more on a testnet |
| Connection error or empty response | Endpoint not set, or the network is down | Run step 4 and check [Network endpoints](/network/endpoints) |

---
description: "Build on PulseVM — deploy smart contracts in Rust, C++, or TypeScript on the A-Chain testnet. Accounts, keys, endpoints and first-deploy guide."
---

# Getting Started on A-Chain Alpine

Before you can deploy a contract you need three things on the testnet: an **account**, its **keys**, and a little **SYS** to stake for resources. Alpine is a permissioned network, so accounts are created by an authority rather than self-minted — here's the path.

## 1. Generate a keypair

```bash
pulse-ts create-key      # prints a PUB_K1_… / PVT_K1_… pair — save the private key
```

## 2. Request a testnet account

Account creation requires a creator authority (the `pulse` system account on Alpine). Request an account + starter resources through the community channel or [contact Metallicus](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs), providing your public key. You'll get back a named account (e.g. `yourname1`) with its `owner`/`active` set to your key and starter CPU/NET/RAM.

> Why not self-serve? On a permissioned chain, account creation is an authorized action — this is a feature (named, accountable identities), not a limitation. For a network you operate yourself, you hold the creator authority and mint accounts freely.

## 3. Point your tooling at Alpine

```bash
pulse-ts endpoint:set https://a-chain-alpine.metalblockchain.org/ext/bc/dbmApAUgd9jbQRmcWLXkg1jxoGbdVsY7gtZGLk59JcoXvbF8S/rpc
```

## 4. Build & deploy

Pick your language and follow the quickstart:

- **[Rust](/build/quickstart-rust)** — the canonical CDT (PulseVM and its system contracts are Rust)
- **[C++](/build/quickstart-cpp)** — full Antelope CDT heritage
- **[TypeScript / AssemblyScript](/build/quickstart-typescript)** — popular option for teams who prefer it

## When it fails

A first deploy commonly trips on one of these:

| Error | Cause | Fix |
|---|---|---|
| `pulse assert failed: <msg>` | a contract precondition failed | read the message — it names the failing check |
| insufficient RAM | account too small for the contract | RAM is sized at account creation; request more |
| missing authority / `transaction declares authority…` | wrong `--actor` or unsatisfied permission | sign with a key on the named account's permission |
| connection / empty response | endpoint not set | run step 3 |

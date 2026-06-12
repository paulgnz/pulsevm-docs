# Native by Design

Account abstraction has been the EVM world's decade-long retrofit project — smart-contract wallets, bundlers, paymasters, signature precompiles, each a layer bolted on to approximate what financial applications need. Newer payments chains are now *enshrining* those same features one by one.

PulseVM didn't retrofit them. They are the base model.

## Built in here, bolted on elsewhere

| Capability | PulseVM | Typical EVM approach |
|---|---|---|
| **Human-readable accounts** | Native named accounts | Hex addresses + off-chain name mapping |
| **Account abstraction** | The account model *is* abstract — keys, weights, thresholds | Smart-contract wallets + ERC-4337 bundlers |
| **Multisig** | Native — a threshold on any permission | A wallet contract you deploy, audit, maintain |
| **Granular authorization** | Native permission tree (role keys, delegation) | Custom contracts / session-key frameworks |
| **Key rotation & recovery** | One `updateauth` — assets never move | Migrate assets, or a recovery framework |
| **Batched atomic operations** | Native — a transaction is many actions, all-or-nothing | `multicall` / 4337 batching |
| **Fee sponsorship** | Native — apps stake resources for their users | Paymaster contracts + relayers |
| **No gas for end users** | Native — staked resources, users hold nothing | Gas required (even when paid in a stablecoin) |
| **Passkey / hardware-key sign-in** | Native R1 (secp256r1) keys | secp256r1 precompile workarounds |
| **Asset-level controls** | Policy at the system-contract layer | Per-token bespoke contract code |

## Why "native" matters beyond elegance

Every "bolted on" cell in that table is **infrastructure your team owns and audits forever** — a wallet platform, a bundler, a paymaster, a relayer, a recovery service. Each one is attack surface, operational burden, and a dependency. When a capability is part of the protocol:

- there is **nothing extra to deploy or audit** — the chain enforces it;
- behavior is **consistent across every application** on the network, not reimplemented per app;
- the **security model is the protocol's**, reviewed once, not re-derived in each contract.

The difference isn't cosmetic. It's the difference between *configuring* your institution's authorization, settlement, and onboarding model — and *building and maintaining a platform* to express it.

## The short version

What other chains are still adding, PulseVM has had from the start. Account abstraction isn't a feature here — it's the foundation.

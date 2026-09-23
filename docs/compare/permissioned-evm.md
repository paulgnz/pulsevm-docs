---
description: "Permissioned EVM alternative: PulseVM vs Besu/Quorum-style chains for banks. Scoped keys, multisig, rotation, R1/WebAuthn keys and sponsored users are protocol on PulseVM, not contracts you deploy and audit."
---

# PulseVM vs permissioned EVM (Besu / Quorum)

This is the closest real-world alternative for an institutional deployment, and the comparison where PulseVM's case is strongest.

A permissioned EVM gives you control of **consensus** and membership. It does not change the **account**: an address is still one key, and everything an institution needs on top of that is a contract. PulseVM gives you the same control of the network, and an account model built for institutions.

| Need | Permissioned EVM | PulseVM |
|:---|:---|:---|
| Institutional identity | Hex addresses plus an off-chain or registry mapping | Named accounts (`acme.treas`) |
| Authorization matrix | A smart-wallet platform you deploy, audit and maintain | A tree of permissions on every account |
| Dual control | A multisig contract wallet per account | A threshold on any permission |
| Scope a key to one action | A session-key module on a smart account, or a guard contract | `linkauth`: the key is refused for every other action before contract code runs |
| Limits on a delegate | A custom module or guard contract | A contract-enforced mandate on a linked permission; see the [case study](/guide/delegated-authority), where 31 of 31 attacks with a real bot key were refused |
| Key rotation | Move assets to a new address, or use a wallet framework | `updateauth`; the account and its assets never move |
| Sponsored users | Zero-gas configuration, or paymasters and relayers | Staked resources; users never hold a fee token |
| HSM and passkey keys | Accounts are secp256k1 key hashes; P-256 only through a precompile or a contract-wallet verifier | R1 and WebAuthn are first-class authority types the chain verifies |
| Asset-level policy (freeze or clawback under legal order) | Per-token contract code | Policy you write into the token and system contracts you own |
| Settlement finality | QBFT and IBFT give immediate finality; Clique and some others do not. It is a configuration choice | Final when accepted, in about a second, with no configuration choice to get wrong |

Each left-column row is code you deploy, audit and own forever. On the right, identity, permissions, key binding, rotation and fee sponsorship are protocol; mandates and freeze or clawback are policy contracts you write on top, and far smaller ones.

## What permissioned EVM keeps

Solidity talent supply and EVM tooling. If your plan is "hire Solidity engineers to assemble wallet, paymaster and multisig infrastructure", that strength is real. If your plan is "express our institution's structure directly on the ledger", it is overhead you carry for every account you onboard.

Maturity is a fair question too. PulseVM itself is at test-network stage; its account model has run in production on Antelope chains such as XPR Network for years, and it has replayed XPR Network's full mainnet history. See [migrating an Antelope chain](/guide/migrate-antelope-chain).

## Next step

- See what the account model enables: [Delegated authority with hard limits](/guide/delegated-authority).
- Evaluating a deployment? [Talk to Metallicus](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs).

## Related

- [vs an EVM L1 on the same consensus](/compare/avalanche-l1-evm): Subnet-EVM on Snowman, the same network model as PulseVM
- [Accounts vs smart-contract wallets](/compare/smart-contract-wallets): the standard-by-standard view
- [Accounts and permissions](/guide/accounts-permissions) · [Multisig](/guide/multisig)

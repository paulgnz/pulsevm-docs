---
description: "PulseVM vs a Subnet-EVM L1 on the same Snowman consensus: both give you an owned network, your own validators and finality in about a second. The difference is the account model: named accounts, permission trees, linkauth, native multisig, key rotation, R1/WebAuthn keys and staked resources instead of gas."
---

# PulseVM vs an EVM L1 on the same consensus

A technical buyer's first question is usually this one: *Metal and Avalanche already let me run my own L1 with Subnet-EVM. Why PulseVM?*

It is a fair question, because on the network layer the two are the same product. Both are virtual machines plugged into the same node software, running on Snowman consensus. Pick either and you get:

- **A network you own**: your L1, your validator set, admitted and removed by you.
- **Finality in about a second**: a block is final when accepted. No reorganizations, no confirmation counts.
- **Private deployment**: the ledger can live only among the members' validators.
- **Owner-set rules**: fee parameters, who may transact and who may deploy are yours to decide.

So the choice is not about consensus or sovereignty. It is about the **execution and account model** your users, operations team and auditors will live inside.

## Where they differ

Subnet-EVM runs the Ethereum account model: an account is a secp256k1 key hash, and everything richer is a contract. PulseVM runs the Antelope account model: an account is a name holding a tree of permissions, and the richer things are protocol.

| You need | PulseVM | Subnet-EVM L1 |
|:---|:---|:---|
| Readable identity | The account name (`acme.treas`) | A hex address, plus a name registry you deploy or run off chain |
| Dual control on an account | A threshold on any permission | A Safe (or similar) multisig contract per account |
| A key that can do one thing | `linkauth` binds a permission to one contract action; everything else is refused before contract code runs | A smart account with a session-key or permission module (ERC-7579 / ERC-6900), or a guard contract |
| Rotate a compromised key | One `updateauth`; the account, balances and history stay put | A smart account that can change owners; a plain EOA key cannot be rotated, so assets move to a new address |
| Recovery | `owner`, or a parent account, rewrites `active` | A recovery module on a smart account |
| HSM and passkey keys | R1 and WebAuthn keys are authority types the chain verifies | A contract verifier for P-256, using a P-256 precompile where your Subnet-EVM version includes one |
| Users who never hold a fee token | The institution stakes resources; users sign, nothing is deducted from them | The sender pays gas in the native token. You can set fees very low with the Fee Manager precompile, but going to zero for the user means ERC-4337 paymasters, EIP-7702 delegation or a relayer |
| Restrict who can transact or deploy | Account creation and contract deployment are system-contract policy you own | Built in: the Transaction Allow List and Contract Deployer Allow List precompiles |
| Cost predictability | Capacity is staked; no per-transaction auction | EIP-1559 base fee on your own chain; low and stable if you tune it, but still a market |
| Readable actions and history | Every action is `contract::action` with ABI-decoded arguments (`token::transfer {from, to, quantity, memo}`), readable in any explorer | Function selectors and logs, decoded when you have the ABI |

Subnet-EVM's precompiles are real and useful. The allow lists give you a permissioned chain in a few lines of genesis, and the Fee Manager and Reward Manager let the owner set and change fee policy. What they do not change is the account: an EVM account is still one key, and scoping, rotation, recovery, multisig and sponsorship are contracts you choose, deploy and audit per account.

## What the account model makes possible

On PulseVM a customer can hand an operator a key that is only allowed to call one action, and the chain enforces it. On XPR Network mainnet, which runs the same account model, trading vaults do exactly this: the customer's wallet owns the vault, the operator's bot key is linked to `trade` only, and the contract enforces the caps. In a testnet exercise with the real bot key, **31 of 31** attempts to move money out or take the account over were refused by the chain.

Read it: [Delegated authority with hard limits](/guide/delegated-authority).

On a Subnet-EVM L1 the same design is possible. It is a smart-account deployment, a session-key module and a guard contract, each audited, and the guarantee is only as strong as those contracts.

## Where the EVM wins

Be clear-eyed about this:

- **Tooling breadth.** Foundry, Hardhat, ethers, viem, wallets, indexers, security scanners and audit firms all assume the EVM.
- **Developer pool.** Far more engineers write Solidity than write Antelope contracts in Rust, C++ or TypeScript.
- **Liquidity and bridges.** EVM assets, DeFi protocols and cross-chain bridges plug into an EVM L1 with little work, including Avalanche-lineage messaging (ICM and its token-transfer contracts) between EVM L1s.
- **Maturity of the VM on this consensus.** Subnet-EVM has run in production on Avalanche L1s for years. PulseVM is at test-network stage; its account model has run in production on Antelope chains such as XPR Network for years, and it has replayed XPR Network's full mainnet history (see [migrating an Antelope chain](/guide/migrate-antelope-chain)).

## Choose

**Choose a Subnet-EVM L1 if:**
- you need to deploy existing Solidity contracts, or plug into EVM liquidity and bridges;
- your team is Solidity-first and your users already have EVM wallets;
- your accounts are mostly simple, one key and one holder, and you are comfortable owning a smart-account stack for the rest.

**Choose PulseVM if:**
- your accounts belong to institutions, desks, customers and bots that need roles, thresholds and scoped keys;
- you want delegated authority, rotation and recovery enforced by the protocol, not by per-account contracts you audit;
- your customers should never hold a fee token or see a gas prompt;
- you want HSM (R1) and passkey (WebAuthn) keys as first-class authorities;
- you want every action on the ledger readable by operations and auditors by name.

Both run on the same consensus, so this is a choice of account model, not of network.

## Next step

- See the account model in practice: [Accounts and permissions](/guide/accounts-permissions) and the [delegated authority case study](/guide/delegated-authority).
- The contract-by-contract view: [Accounts vs smart-contract wallets](/compare/smart-contract-wallets).
- Planning an owned network? [Talk to Metallicus](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs).

## Related

- [vs Permissioned EVM](/compare/permissioned-evm) · [vs Ethereum](/compare/ethereum)
- [Finality and settlement](/guide/finality) · [Resources: CPU, NET, RAM](/guide/resources)

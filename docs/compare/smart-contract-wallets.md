---
description: "PulseVM accounts vs EVM smart-contract wallets: named identity, scoped keys (linkauth vs ERC-7579/ERC-6900 session keys), rotation, recovery, multisig (vs Safe), gas sponsorship (vs ERC-4337 paymasters and EIP-7702) and passkeys (WebAuthn vs the P-256 precompile). What each takes, and what must be audited."
---

# Accounts vs smart-contract wallets

Everything an institution wants from an account, scoped keys, dual control, rotation, recovery, passkeys, sponsored fees, exists on EVM chains today. It works. It is also a stack of standards and contracts you choose, deploy per account, and have audited.

On PulseVM the same capabilities are properties of every account, set with one system action. There is nothing to deploy, and the audit surface is the protocol itself.

## Side by side

| Capability | PulseVM mechanism | EVM route | What must be audited on EVM |
|:---|:---|:---|:---|
| **Named identity** | The account is the name: `acme.treas`. Tokens, contracts and history address it by name. | ENS or a private name registry mapped onto a hex address | The registry contract, and every place that resolves names |
| **A key scoped to one action** | `linkauth` binds a permission to one `contract::action`. Any other action signed with it is refused before contract code runs. | A modular smart account (ERC-7579 or ERC-6900) with a session-key or permission module | The account implementation, the module, and its policy encoding for each target function |
| **Key rotation** | `updateauth` replaces the keys on a permission. The account, balances and history stay put. | A smart account whose owner can be changed. An EOA key cannot be rotated; EIP-7702 adds code to an EOA but the original key keeps full control. | The owner-change path of the account contract |
| **Recovery** | `owner`, or a parent account (`subsidiary@owner` satisfied by `parent@active`), rewrites `active`. | A recovery module (social recovery, guardians, time locks) on the smart account | The module, its guardian set logic and its delays |
| **Multisig** | A weighted threshold on any permission, with the `pulse.msig` system contract (`eosio.msig` on migrated chains) for proposals and approvals. See [Multisig](/guide/multisig). | Safe, deployed per account | Safe itself is battle-tested; your modules, guards and deployment are yours to audit |
| **Gas sponsorship** | The institution stakes CPU, NET and RAM for its users. Users sign; no fee token is ever deducted from them. | ERC-4337 with a paymaster and bundler, EIP-7702 delegation with a sponsor, or a relayer (ERC-2771) | The paymaster contract, its deposit and policy, and the bundler or relayer you operate |
| **Passkeys and HSM keys** | WebAuthn and R1 (secp256r1) keys are authority types the chain verifies natively. | A contract-wallet verifier for P-256, using the P-256 precompile where the chain has one (RIP-7212 on many L2s, EIP-7951 on Ethereum L1) or a Solidity verifier | The verifier, WebAuthn payload parsing, and the account that trusts it |

## The difference that matters

The EVM standards above are good engineering, and many of them are in production. The point is not that they fail. It is where the guarantee lives:

- **On EVM**, a scoped key is safe if the account contract, the module and the policy you wrote are all correct. Each account you onboard carries that stack.
- **On PulseVM**, a key used outside its scope is refused by the protocol: the chain computes the minimum permission for each action and rejects a signature that does not reach it, with the same message on every Antelope chain:

```
action declares irrelevant authority 'vault@keeper'; minimum authority is vault@active
```

Your contracts still enforce your business rules. They are no longer the only thing standing between a leaked key and the treasury.

## Proof

On XPR Network mainnet, which runs the same account model PulseVM runs, trading vaults give an operator's bot a key linked to one action, `trade`, while the customer's wallet owns the account. In a testnet exercise with the real bot key, **31 of 31** attempts to move money out or take the account over were refused by the chain. The transfers were refused by the protocol before the token contract was consulted. No smart-wallet stack and no session-key module: the only contract involved is the vault's own, which holds the business limits.

## Next step

- Set it up: [Accounts and permissions](/guide/accounts-permissions) has the exact commands for a scoped key, rotation and revocation.
- See it in production: [Delegated authority with hard limits](/guide/delegated-authority).

## Related

- [vs an EVM L1 on the same consensus](/compare/avalanche-l1-evm) · [vs Permissioned EVM](/compare/permissioned-evm) · [vs Ethereum](/compare/ethereum)

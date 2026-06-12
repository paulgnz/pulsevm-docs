# Native Multisig

On-chain multisig in PulseVM is not a smart-contract product — it is a protocol citizen, and arguably the most institution-shaped feature in the stack.

## How it works

1. **Configure**: any permission on any account can require weighted approvals — e.g. `treasury@active` = threshold 2 over three named officers' keys.
2. **Propose**: an officer proposes a transaction on-chain. The proposal is visible chain-wide, with the *decoded actions* — approvers review "transfer 1,000,000 XMD to settlement.a", not a calldata blob.
3. **Approve asynchronously**: each approver signs from their own device and key, on their own schedule. Approvals (and revocations) are on-chain actions.
4. **Execute at threshold**: the transaction runs only when the weighted threshold is met. Expiry is automatic.

Every proposal, approval, revocation, and execution lands permanently on the audit trail **with named identities attached**.

## What institutions do with it

- Wire-release requiring 2-of-3 treasury officers
- System-contract upgrades requiring a majority of consortium members
- Parameter changes requiring league/board sign-off
- Board-level governance with time-delayed (wait-weighted) execution

All the same primitive. No separate smart-contract multisig platform to deploy, audit, and maintain — and no calldata-blob signing ceremonies.

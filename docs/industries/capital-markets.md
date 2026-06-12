# Capital Markets

The tokenized-deposit logic extends directly to tokenized instruments: private securities, fund shares, money-market instruments, and the cap-table and fund-admin plumbing around them.

## Why the primitives fit

- **Asset issuance with controls you define** — transfer restrictions, allow-listing, lock-ups, and freeze/clawback under legal order as system-contract policy, not per-token bespoke code.
- **Named accounts** for issuers, transfer agents, custodians, and investors; **[multisig](/guide/multisig)** for corporate actions and treasury.
- **[Instant, irreversible finality](/guide/finality)** removes settlement-window risk; atomic delivery-versus-payment is native when cash and asset are on the same ledger.
- **[Private networks](/guide/privacy)** keep the cap table and holdings among the right parties, with auditor/regulator read-access on demand.

## Deployment shape

An issuer or market-infrastructure operator runs a network; investors and intermediaries are named accounts; tokenized cash (e.g. a Metal Dollar-style settlement asset) enables on-chain DvP.

**[Talk to us — Contact Metallicus →](https://metallicus.com/contact-us)**

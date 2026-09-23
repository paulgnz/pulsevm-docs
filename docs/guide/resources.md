---
description: "PulseVM's resource model: CPU and NET are staked, RAM is bought, and an institution can pay for its users so customers never hold a fee token."
---

# Resources: CPU, NET and RAM

PulseVM has no gas market. Capacity is provisioned, not auctioned.

| Resource | What it meters | How you get it |
|---|---|---|
| **CPU** | execution time | staked (by the institution/app) |
| **NET** | bandwidth | staked |
| **RAM** | state storage | purchased/provisioned per account |

## Why institutions prefer this

- **Users never buy a token to press a button.** The application or institution stakes resources and sponsors its users — customer experience without crypto mechanics.
- **Costs are capacity planning**, not per-transaction tolls that spike with market activity.
- **Reads are free** — auditors, regulators, and analytics query the chain at no cost.

## How an app pays for its users

A transaction's CPU and NET are billed to its **first authorizer**. An application that adds its own account as the first authorizer, alongside the customer's signature, pays for the transaction. The customer signs with a passkey and never holds a fee token.

```mermaid
sequenceDiagram
  participant C as Customer (passkey)
  participant A as Your app account
  participant N as PulseVM network
  C->>A: sign "transfer 50.00 to alex"
  A->>N: submit with app@active first, customer@active second
  N-->>A: CPU and NET billed to the app's stake
  N-->>C: transfer final in about a second
```

Sizing is capacity planning: stake enough CPU and NET for your peak daily volume, and provision RAM for the accounts and table rows you create. Staking can also be delegated, so a treasury account can fund the capacity that an operations account uses.

## Practical notes

- RAM is sized per account; contracts pay for the table rows they create (the RAM payer is explicit in the API).
- Resource configuration (and pricing, where wanted) is system-contract policy — a deploying organization sets its own economics.

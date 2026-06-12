# Resources: CPU, NET, RAM

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

## Practical notes

- RAM is sized per account; contracts pay for the table rows they create (the RAM payer is explicit in the API).
- Resource configuration (and pricing, where wanted) is system-contract policy — a deploying organization sets its own economics.

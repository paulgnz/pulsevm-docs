---
description: "PulseVM development concepts — the Antelope execution model: accounts, actions, state & tables, ABIs, authorization, and inline actions."
---

# Development Concepts

PulseVM uses the **Antelope** execution model (the lineage behind [XPR Network](https://xprnetwork.org), WAX, and Telos). If you've built Antelope/EOSIO contracts, it's the model you know; if you're coming from EVM, these are the ideas that differ most. Each page below is PulseVM-native; for the exhaustive C++ reference, the [Antelope docs](https://docs.antelope.io) are canonical.

- **[Accounts & Actions](/concepts/accounts-and-actions)** — named accounts, contracts, and the actions they expose
- **[State & Tables](/concepts/state-and-tables)** — on-chain storage via multi-index tables
- **[ABIs](/concepts/abi)** — the interface that describes a contract
- **[Authorization & Inline Actions](/concepts/authorization)** — `require_auth`, permission checks, and contracts calling contracts

Ready to write one? See the [Rust](/build/quickstart-rust), [C++](/build/quickstart-cpp), or [TypeScript](/build/quickstart-typescript) quickstarts, and the [host-functions reference](/build/intrinsics).

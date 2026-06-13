---
description: "PulseVM ABIs — the interface describing a contract's actions and tables, used to serialize calls."
---

# ABIs

An **ABI** (Application Binary Interface) is the JSON description of a contract: its action names and parameter types, its table structures, and its custom types. It's how tools and clients serialize a human-readable action into the bytes the chain executes — and deserialize state back.

## What it's for

- **Clients** ([pulse-cli](/build/cli), [pulsevm-js](https://github.com/MetalBlockchain/pulsevm-js)) read the ABI to turn `transfer {...}` into a signed transaction.
- **Explorers & indexers** read it to render actions and tables in human-readable form.
- **Type safety** — the ABI is the contract between off-chain callers and on-chain code.

## How you get one

The CDTs generate the ABI alongside the WASM at build time. You deploy both: `setcode` (the WASM) and `setabi` (the ABI). See the [Rust](/build/quickstart-rust) and [C++](/build/quickstart-cpp) quickstarts.

Fetch a deployed contract's ABI via the [RPC](/build/api): `pulsevm.getABI` (or the REST `/v1/chain/get_abi`).

# How PulseVM Compares

Most chains pitched at finance are **public networks you join** — you rent space on someone else's shared ledger, under their rules, their fees, and their public visibility. PulseVM is a network **you own**: your validators, your rules, your privacy boundary.

The institutional primitives — named accounts, native multisig, instant finality — matter, and several payments chains do them well. Where PulseVM separates is the combination of those primitives with **sovereignty, privacy, and full programmability** in one stack.

## At a glance

| | **PulseVM** | Ethereum | XRP Ledger | Stellar | Public L1 (general) |
|---|:---:|:---:|:---:|:---:|:---:|
| **A network you own & operate** | ✅ | ❌ tenant | ❌ tenant | ❌ tenant | ❌ tenant |
| **Privacy at the network boundary** | ✅ | ❌ public | ❌ public | ❌ public | ❌ public |
| **Named accounts** | ✅ | ❌ hex | ❌ address | ❌ address | mostly ❌ |
| **Native multisig** | ✅ | ⚠️ contract | ✅ | ✅ | varies |
| **Instant, irreversible finality** | ✅ sub-sec | ❌ ~13 min | ✅ ~4 s | ✅ ~5 s | varies |
| **Full smart-contract programmability** | ✅ Rust/C++/TS | ✅ EVM | ⚠️ limited | ✅ Soroban | varies |
| **No gas market for users** | ✅ staked | ❌ | ✅ flat fee | ✅ flat fee | mostly ❌ |
| **Owner-set rules & governance** | ✅ | ❌ neutral | ⚠️ shared UNL | ⚠️ quorum | ❌ |
| **Asset-level controls (freeze/clawback)** | ✅ policy | ⚠️ per-token code | ✅ | ✅ | varies |

<small>✅ native · ⚠️ partial or via add-on · ❌ not available. Comparisons reflect each platform's standard model; all are capable systems — the table shows fit for a sovereign institutional deployment.</small>

## What the table really says

On the rows that decide a **bank or fintech** deployment, the payments-focused public chains (XRPL, Stellar) are genuinely strong on multisig, finality, and asset issuance — credit where due. But they are all **one shared public ledger you participate in.** Three rows are PulseVM's alone in this set:

- **A network you own and operate** — your validator set, your upgrade schedule, your economics.
- **Privacy at the network boundary** — transactions live among your members, not on a public chain.
- **Owner-set rules** — the chain's behavior is system contracts you control, not a neutral protocol you must accept.

Add full Antelope smart-contract programmability on top, and PulseVM is the only option in this set that is simultaneously **sovereign, private, programmable, and institution-shaped.**

## Deeper dives

- **[Native by Design](/guide/native-by-design)** — what other chains retrofit, PulseVM ships built-in

- **[vs Ethereum](/compare/ethereum)** — the public world-computer
- **[vs Permissioned EVM](/compare/permissioned-evm)** — the closest institutional alternative

## The one line

**Everyone else is a chain you join. PulseVM is a chain you own.**

---
description: "Non-EVM blockchain and EVM alternative for financial institutions — how PulseVM compares to Ethereum, XRP and Stellar on accounts, finality, privacy and sovereignty."
---

# How PulseVM Compares

Most chains pitched at finance are **public networks you join** — you rent space on someone else's shared ledger, under their rules, their fees, and their public visibility. PulseVM is a network **you own**: your validators, your rules, your privacy boundary.

The institutional primitives — named accounts, native multisig, instant finality — matter, and several payments chains do them well. Where PulseVM separates is the combination of those primitives with **sovereignty, privacy, and full programmability** in one stack.

## At a glance

| | **PulseVM** | Ethereum | XRP Ledger | Stellar | Public L1 (general) |
|:---|:---|:---|:---|:---|:---|
| **A network you own & operate** | <span class="ck y"></span> | <span class="ck n"></span><span class="q">tenant</span> | <span class="ck n"></span><span class="q">tenant</span> | <span class="ck n"></span><span class="q">tenant</span> | <span class="ck n"></span><span class="q">tenant</span> |
| **Privacy at the network boundary** | <span class="ck y"></span> | <span class="ck n"></span><span class="q">public</span> | <span class="ck n"></span><span class="q">public</span> | <span class="ck n"></span><span class="q">public</span> | <span class="ck n"></span><span class="q">public</span> |
| **Named accounts** | <span class="ck y"></span> | <span class="ck n"></span><span class="q">hex</span> | <span class="ck n"></span><span class="q">address</span> | <span class="ck n"></span><span class="q">address</span> | <span class="ck n"></span><span class="q">mostly</span> |
| **Native multisig** | <span class="ck y"></span> | <span class="ck p"></span><span class="q">contract</span> | <span class="ck y"></span> | <span class="ck y"></span> | <span class="q">varies</span> |
| **Instant, irreversible finality** | <span class="ck y"></span><span class="q">sub-sec</span> | <span class="ck n"></span><span class="q">~13 min</span> | <span class="ck y"></span><span class="q">~4 s</span> | <span class="ck y"></span><span class="q">~5 s</span> | <span class="q">varies</span> |
| **Full smart-contract programmability** | <span class="ck y"></span><span class="q">Rust/C++/TS</span> | <span class="ck y"></span><span class="q">EVM</span> | <span class="ck p"></span><span class="q">limited</span> | <span class="ck y"></span><span class="q">Soroban</span> | <span class="q">varies</span> |
| **No gas market for users** | <span class="ck y"></span><span class="q">staked</span> | <span class="ck n"></span> | <span class="ck y"></span><span class="q">flat fee</span> | <span class="ck y"></span><span class="q">flat fee</span> | <span class="ck n"></span><span class="q">mostly</span> |
| **Owner-set rules & governance** | <span class="ck y"></span> | <span class="ck n"></span><span class="q">neutral</span> | <span class="ck p"></span><span class="q">shared UNL</span> | <span class="ck p"></span><span class="q">quorum</span> | <span class="ck n"></span> |
| **Asset-level controls (freeze/clawback)** | <span class="ck y"></span><span class="q">policy</span> | <span class="ck p"></span><span class="q">per-token code</span> | <span class="ck y"></span> | <span class="ck y"></span> | <span class="q">varies</span> |

<small><span class="ck y"></span> native &nbsp;·&nbsp; <span class="ck p"></span> partial or via add-on &nbsp;·&nbsp; <span class="ck n"></span> not available &nbsp;·&nbsp; *varies* = depends on deployment. All are capable systems; the table shows fit for a sovereign institutional deployment.</small>

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

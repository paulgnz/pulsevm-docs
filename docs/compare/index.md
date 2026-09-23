---
description: "Non-EVM blockchain and EVM alternative for financial institutions — how PulseVM compares to Ethereum, the XRP Ledger and Stellar on accounts, scoped keys, finality, privacy and sovereignty."
---

# How PulseVM Compares

Most chains pitched at finance are **public networks you join** — you rent space on someone else's shared ledger, under their rules, their fees, and their public visibility. PulseVM is a network **you own**: your validators, your rules, your privacy boundary.

The institutional primitives — named accounts, native multisig, instant finality — matter, and several payments chains do them well. Where PulseVM separates is the combination of those primitives with **sovereignty, privacy, and full programmability** in one stack.

## At a glance

| | **PulseVM** | Ethereum mainnet | XRP Ledger | Stellar | Public L1 (general) |
|:---|:---|:---|:---|:---|:---|
| **A network you own & operate** | <span class="ck y" role="img" aria-label="native"></span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">tenant</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">tenant</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">tenant</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">tenant</span> |
| **Privacy at the network boundary** | <span class="ck y" role="img" aria-label="native"></span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">public</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">public</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">public</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">public</span> |
| **Named accounts** | <span class="ck y" role="img" aria-label="native"></span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">hex</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">address</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">address</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">mostly</span> |
| **Native multisig** | <span class="ck y" role="img" aria-label="native"></span> | <span class="ck p" role="img" aria-label="partial or via add-on"></span><span class="q">contract</span> | <span class="ck y" role="img" aria-label="native"></span> | <span class="ck y" role="img" aria-label="native"></span> | <span class="q">varies</span> |
| **Bind a key to one action** | <span class="ck y" role="img" aria-label="native"></span><span class="q">linkauth</span> | <span class="ck p" role="img" aria-label="partial or via add-on"></span><span class="q">session-key module</span> | <span class="ck n" role="img" aria-label="not available"></span> | <span class="ck p" role="img" aria-label="partial or via add-on"></span><span class="q">thresholds by op type</span> | <span class="q">varies</span> |
| **Rotate keys, account stays** | <span class="ck y" role="img" aria-label="native"></span> | <span class="ck p" role="img" aria-label="partial or via add-on"></span><span class="q">smart wallet</span> | <span class="ck y" role="img" aria-label="native"></span><span class="q">regular key</span> | <span class="ck y" role="img" aria-label="native"></span><span class="q">signers</span> | <span class="q">varies</span> |
| **Instant, irreversible finality** | <span class="ck y" role="img" aria-label="native"></span><span class="q">about 1 s</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">~13 min</span> | <span class="ck y" role="img" aria-label="native"></span><span class="q">~4 s</span> | <span class="ck y" role="img" aria-label="native"></span><span class="q">~5 s</span> | <span class="q">varies</span> |
| **Full smart-contract programmability** | <span class="ck y" role="img" aria-label="native"></span><span class="q">Rust/C++/TS</span> | <span class="ck y" role="img" aria-label="native"></span><span class="q">EVM</span> | <span class="ck p" role="img" aria-label="partial or via add-on"></span><span class="q">limited</span> | <span class="ck y" role="img" aria-label="native"></span><span class="q">Soroban</span> | <span class="q">varies</span> |
| **No gas market for users** | <span class="ck y" role="img" aria-label="native"></span><span class="q">staked</span> | <span class="ck n" role="img" aria-label="not available"></span> | <span class="ck y" role="img" aria-label="native"></span><span class="q">low fee, rises under load</span> | <span class="ck y" role="img" aria-label="native"></span><span class="q">low fee, rises under load</span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">mostly</span> |
| **Owner-set rules & governance** | <span class="ck y" role="img" aria-label="native"></span> | <span class="ck n" role="img" aria-label="not available"></span><span class="q">neutral</span> | <span class="ck p" role="img" aria-label="partial or via add-on"></span><span class="q">shared UNL</span> | <span class="ck p" role="img" aria-label="partial or via add-on"></span><span class="q">quorum</span> | <span class="ck n" role="img" aria-label="not available"></span> |
| **Asset-level controls (freeze/clawback)** | <span class="ck p" role="img" aria-label="partial or via add-on"></span><span class="q">policy you write</span> | <span class="ck p" role="img" aria-label="partial or via add-on"></span><span class="q">per-token code</span> | <span class="ck y" role="img" aria-label="native"></span> | <span class="ck y" role="img" aria-label="native"></span> | <span class="q">varies</span> |

<small><span class="ck y" role="img" aria-label="native"></span> native &nbsp;·&nbsp; <span class="ck p" role="img" aria-label="partial or via add-on"></span> partial or via add-on &nbsp;·&nbsp; <span class="ck n" role="img" aria-label="not available"></span> not available &nbsp;·&nbsp; *varies* = depends on deployment. The columns are the public networks institutions are usually offered. Any of these codebases can also be run privately; [vs Permissioned EVM](/compare/permissioned-evm) covers that case. All are capable systems; the table shows fit for a sovereign institutional deployment.</small>

## What the table really says

On the rows that decide a **bank or fintech** deployment, the payments-focused public chains (XRPL, Stellar) are genuinely strong on multisig, finality, and asset issuance — credit where due. But they are all **one shared public ledger you participate in.** Three rows are PulseVM's alone in this set:

- **A network you own and operate** — your validator set, your upgrade schedule, your economics.
- **Privacy at the network boundary** — transactions live among your members, not on a public chain.
- **Owner-set rules** — the chain's behavior is system contracts you control, not a neutral protocol you must accept.

Add full smart-contract programmability and an account model where a key can be limited to one action, and PulseVM is the option in this set that is **sovereign, private, programmable and institution-shaped** at once.

## Deeper dives

- **[Native by Design](/guide/native-by-design)** — what other chains retrofit, PulseVM ships built-in

- **[vs Ethereum](/compare/ethereum)** — the public world-computer
- **[vs Permissioned EVM](/compare/permissioned-evm)** — the closest institutional alternative

## The one line

**Public chains are networks you join. PulseVM is a network you own.**

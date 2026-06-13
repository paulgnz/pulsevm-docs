---
description: "PulseVM system contracts reference — the open-source token, system, multisig, and bios contracts that define the chain's accounts, resources, governance, and assets."
---

# System Contracts

A PulseVM network's behaviour — how accounts are created, how resources are paid for, how assets work, how governance happens — is defined by a small set of **system contracts**, not hard-coded in the VM. They are open-source Rust, written with [pulse-cdt-rust](https://github.com/MetalBlockchain/pulse-cdt-rust), and a deploying organization owns and can modify them. This is what "your network, your rules" means concretely: the rules are auditable source you control.

Source: [`MetalBlockchain/pulse-cdt-rust/contracts`](https://github.com/MetalBlockchain/pulse-cdt-rust/tree/master/contracts)

> These are the **built-in** contracts. Your own application contracts (tokens, DeFi, business logic) are separate — see the [Rust](/build/quickstart-rust), [C++](/build/quickstart-cpp), and [TypeScript](/build/quickstart-typescript) quickstarts.

---

## `pulse.token` — assets

The standard fungible-token contract (the model every Antelope token follows). The core network token and any deploying institution's tokens use it.

| Action | Purpose |
|---|---|
| `create(issuer, max_supply)` | Define a new token symbol and its cap |
| `issue(to, quantity, memo)` | Mint into circulation (issuer only) |
| `retire(quantity, memo)` | Burn from circulation |
| `transfer(from, to, quantity, memo)` | Move tokens; the `memo` carries reconciliation data |
| `open(owner, symbol, ram_payer)` | Create a zero-balance row so an account can receive |
| `close(owner, symbol)` | Remove an empty balance row |

**Tables:** `accounts` (per-account balances, scoped by account) · a per-symbol currency-stats table (supply, max supply, issuer).

---

## `pulse.system` — accounts, resources & governance

The heart of the chain: account creation, the resource economy (CPU/NET/RAM), staking, and producer/validator governance.

**Accounts & code**
| Action | Purpose |
|---|---|
| `newaccount(creator, name, owner, active)` | Create a named account with its initial authorities |
| `setcode(account, vmtype, vmversion, code)` | Deploy a contract's WASM |
| `setabi(account, abi)` | Set a contract's ABI |
| `setpriv(account, is_priv)` | Grant/revoke privileged status |

**Resources**
| Action | Purpose |
|---|---|
| `buyramsys(payer, receiver, quant)` / `buyrambsys(payer, receiver, bytes)` | Provision RAM (by spend or by bytes) |
| `setram(max_ram_size)` | Set the network RAM supply |
| `delegatebw(...)` / `undelegatebw(...)` | Stake / unstake for CPU & NET |
| `refund(owner)` | Claim unstaked funds after the refund delay |

**Governance**
| Action | Purpose |
|---|---|
| `regproducer(...)` / `regproducer2(...)` | Register as a block producer / validator |
| `unregprod(producer)` | Deregister |
| `regproxy(proxy, is_proxy)` | Register a voting proxy |
| `init(version, core)` | One-time chain initialization |
| `onblock(header)` | Per-block bookkeeping callback |

**Tables (selected):** `userres` (per-account resources), `delband` (delegated bandwidth), `refunds`, `producers`/`producers2`, `voters`, `rammarket`, `namebids`, plus REX-style staking-pool tables.

---

## `pulse.msig` — on-chain multisig

Native, on-chain multi-party approval — the contract behind the [native multisig](/guide/multisig) story. Officers propose a transaction; required signers approve asynchronously from their own keys; it executes only when the authority threshold is met.

| Action | Purpose |
|---|---|
| `propose(...)` | Submit a transaction for approval |
| `approve(proposer, proposal_name, level, ...)` | Approve at a given permission level |
| `unapprove(proposer, proposal_name, level)` | Withdraw an approval |
| `cancel(proposer, proposal_name, canceler)` | Cancel a proposal |
| `exec(proposer, proposal_name, executer)` | Execute once the threshold is satisfied |
| `invalidate(account)` | Invalidate an account's prior approvals |

**Tables:** `proposal` (pending transactions), `approvals2` (who has approved), `invals` (invalidations). Every proposal, approval, and execution is permanent, named, and auditable.

---

## `pulse.bios` — account & permission management

The bootstrap/authority contract. Its actions manage the account permission model directly — these are the operations behind [accounts & permissions](/guide/accounts-permissions) and the CLI's `update-auth`.

| Action | Purpose |
|---|---|
| `newaccount(creator, name, owner, active)` | Create an account |
| `updateauth(account, permission, parent, auth)` | Set or replace a permission (keys, accounts, thresholds) |
| `deleteauth(account, permission)` | Remove a permission |
| `linkauth(account, code, message_type, requirement)` | Require a specific permission for a contract action |
| `unlinkauth(account, code, message_type)` | Remove a permission link |
| `setalimits(account, ram_bytes, net_weight, cpu_weight)` | Set account resource limits |
| `setpriv(account, is_priv)` | Grant/revoke privileged status |
| `setcode` / `setabi` / `reqauth` | Deploy code / set ABI / assert an authorization |

These actions express the full [permission model](/guide/accounts-permissions): weighted multisig, key rotation (`updateauth` — assets never move), delegation, and per-action authorization (`linkauth`).

---

## Customizing the rules

Because these are contracts, not protocol internals, a deploying organization can modify them — account-creation policy, fee/resource economics, asset-level controls — or add new system-level contracts (e.g. a [compliance/policy registry](/guide/privacy)). The Antelope lineage has a decade of precedent for forking the system layer. See [Launch Your Own Network](/network/launch).

---
description: "How to run a 90-day PulseVM pilot: scope, a week-by-week plan from key ceremony to evaluation, success metrics, who provides what, and exit criteria for a bank, credit union league, agency or consortium."
---

# Run a 90-day pilot

**Small, sovereign, measurable.** In 90 days a single institution or a consortium runs its own PulseVM network, issues a tokenized test deposit and moves real internal settlement flows on it, with success criteria agreed before the first node starts.

::: info Where PulseVM stands
PulseVM is at test-network stage. A pilot runs on a network you own with test assets, not customer funds, and is run with Metallicus engineering. See the [status table](/institutions/technical-evaluators#status-what-is-shipped-and-what-is-not).
:::

## Scope

| In scope | Out of scope |
|---|---|
| A small validator network, typically 3 to 5 named nodes run by the participants | Customer funds or live customer accounts |
| Named accounts for each participant, with permission trees that mirror your authorization matrix | Replacing the core banking system or ERP |
| A tokenized test deposit, issued under dual control | Connections to other networks |
| Intra-member settlement flows: transfers, shared branching, inter-company invoices | Public or retail access |
| Delegated keys bound to one action with `linkauth` | |
| A history feed from Hyperion into a reconciliation or reporting sandbox | |

## The plan

```mermaid
flowchart LR
  s["Weeks 0–2<br/>Set up"] --> r["Weeks 3–8<br/>Run"] --> e["Weeks 9–12<br/>Evaluate"]
```

| Weeks | Phase | What happens | Output |
|---|---|---|---|
| 0–2 | Set up | Stand up validators on your hosts. Hold the key ceremony: generate owner and active keys, in HSMs or secure enclaves where you use them. Create named accounts and build each permission tree: owner, active, treasury, a mint permission under dual control. Deploy the token contract. | A running network; a documented key ceremony; permission trees signed off by risk |
| 3–8 | Run | Issue the test deposit under dual control. Run daily settlement flows between members. Give a service its own key bound with `linkauth` to one action, then try to misuse it. Rotate an officer's key. Remove and re-add a validator. Feed Hyperion history into a reconciliation sandbox. | Transaction history; reconciliation results; a log of refused actions |
| 9–12 | Evaluate | Measure against the success metrics. Run a recovery drill: rebuild a node by replaying the chain. Review with audit, risk and compliance. Decide on the next step. | An evaluation report and a go, extend or stop decision |

## Success metrics

Agree these before week 0. Typical ones:

| Metric | How it is measured |
|---|---|
| Settlement time | Time from submission to final, per transfer, from node and Hyperion timestamps |
| Reconciliation breaks | Breaks between the chain and the reconciliation sandbox, against today's baseline for the same flows |
| Authorization coverage | Share of your authorization matrix expressed as permissions, thresholds and `linkauth` bindings |
| Misuse refused | Attempts to use a scoped key outside its action, all refused by the protocol |
| Key operations | Key rotation and recovery completed without moving assets |
| Operational recovery | Time to rebuild a validator from replay |
| Audit access | An auditor answers set questions from history alone, through a read grant |

## Who provides what

| Metallicus provides | The institution provides |
|---|---|
| Deployment engineering and the network runbooks | Hosts for the validators, in the environment and jurisdiction you choose |
| Token and system contracts for the pilot, and help adapting them | The authorization matrix and the officers who hold keys |
| Help designing permission trees and the key ceremony | HSMs or secure enclave devices, where used |
| Hyperion setup and the reconciliation feed format | A reconciliation or reporting sandbox and the people who run it |
| Support through the run phase | Risk, compliance and audit reviewers for the evaluation |

## Exit criteria

At week 12 the pilot ends in one of three decisions, agreed in advance:

- **Go.** Metrics met; the next step is a scoped production plan on a tagged release, with the governance agreement for validators.
- **Extend.** Metrics mostly met; a named gap, such as an integration or a missing contract feature, gets a fixed extension.
- **Stop.** Metrics not met. The network is shut down, and your data, keys and history export stay with you.

## Start a pilot

Bring the [buyer's checklist](/institutions/checklist) to the first meeting. It covers the questions risk and procurement will ask.

**[Contact Metallicus →](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs)**

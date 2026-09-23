---
description: "Blockchain for healthcare payments: when a claim is adjudicated it is paid in the same transaction, final in about a second, on a network payers and providers share; patient data stays off chain and auditors get read access without touching operational systems."
head:
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does patient health information go on the ledger?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It should not. The design keeps clinical records and patient identifiers in the systems that already hold them. The ledger carries a claim reference, a fingerprint of the claim file, the allowed amount, the status and who signed each step. That is enough to settle and audit the payment without putting health data on any chain."
            }
          },
          {
            "@type": "Question",
            "name": "How does adjudicate equal pay?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The adjudication action and the payment are one transaction. When the payer's adjudication engine approves a claim, the settlement contract pays the allowed amount from the payer's funded settlement balance to the provider's account in the same step, final in about a second. There is no separate payment run and no remittance file to match to a deposit."
            }
          },
          {
            "@type": "Question",
            "name": "Can an automated adjudication engine pay claims without a person?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Within limits you set. The engine's key sits on a permission linked to the adjudicate action only, and the contract enforces a per-claim cap and a daily budget. Claims above the cap route to a human review permission that needs two reviewers. The engine's key cannot transfer funds or change any permission."
            }
          },
          {
            "@type": "Question",
            "name": "Can we use this with real claims today?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not yet. PulseVM is at the test-network stage, and pilots with synthetic or de-identified claims are run with Metallicus. The account and permission model underneath runs in production on XPR Network."
            }
          }
        ]
      }
---

# Healthcare: adjudicated means paid

A provider's cash waits between the claim decision and the money: adjudication, then a payment run, then clearing, then matching a remittance advice to a deposit, which can take days to weeks. On a PulseVM network shared by payer and provider, adjudication and payment are one transaction, final in about a second, and both sides read the same record.

## Adjudicate, then pay versus adjudicate equals pay

| Step | Typical today | On a shared PulseVM ledger |
| --- | --- | --- |
| Claim submitted | Clearinghouse forwards the claim to the payer | Provider records a claim reference and file fingerprint under `stmary.hosp@billing` |
| Adjudicated | Payer decides; result sits in the payer's system | Payer's engine calls `claims.adj::adjudicate` under `bluepl@adjud` |
| Paid | Next scheduled payment run, then bank clearing: days to weeks from decision | Same transaction as the decision: allowed amount moves to `stmary.hosp`, final in about a second |
| Reconciled | Provider matches a remittance advice to a bank deposit, chases mismatches | Nothing to match: decision, amount and payment are one record |
| Audited | Sampled from each party's systems, weeks later | Read the ledger directly, any time |

## How it works on PulseVM

| Account | Role | Permission that matters |
| --- | --- | --- |
| `bluepl` | Health plan (payer) | `owner` and `active` held by finance officers, 2 of 3; `active` funds the payer's settlement balance |
| `claims.adj` | Settlement contract | Holds each payer's funded balance; checks the claim and pays the allowed amount inline with its `pulse.code` grant |
| `bluepl` `adjud` permission | Adjudication engine's key | Linked to `claims.adj::adjudicate` only; per-claim cap and daily budget in the contract |
| `bluepl` `review` permission | Clinical and finance reviewers | 2 of 3 reviewers, linked to `claims.adj::override` for claims above the cap |
| `stmary.hosp` | Provider | `billing` permission linked to `claims.adj::submit`; can post claims, cannot move money |
| `exam.audit` | Auditor | No keys on anyone's account; read access to the network's history |

The payer [stakes the network resources](/guide/resources) for its providers, so a clinic joins without buying a token.

## Who can see what

A PulseVM network is private to its members; visibility is decided by who is admitted and by what you put on chain ([privacy](/guide/privacy)).

| | Claim reference, fingerprint, amount, status, signer | Clinical record, patient identity |
| --- | --- | --- |
| Payer | Reads the full ledger | In its own systems, as today |
| Provider | Reads the full ledger of its network | In its own systems, as today |
| Auditor | Read access granted by the members | Requested through existing channels |

To keep one provider's volumes away from another, run a network per relationship or encrypt payloads at the application layer. Health data itself stays off chain in every design.

## Delegated authority: the adjudication engine

Auto-adjudication is where most volume is decided, so the engine's key is the one to fence in. It sits on the `adjud` permission, linked to one action. The contract enforces a per-claim cap and a daily budget; above the cap, the claim waits for the `review` permission's two signatures. The engine cannot transfer funds, add a payee or change a permission. It is the same pattern live on XPR Network for trading bots; see the [delegated authority case study](/guide/delegated-authority).

## Frequently asked questions

### Does patient health information go on the ledger?

It should not. The design keeps clinical records and patient identifiers in the systems that already hold them. The ledger carries a claim reference, a fingerprint of the claim file, the allowed amount, the status and who signed each step. That is enough to settle and audit the payment without putting health data on any chain.

### How does adjudicate equal pay?

The adjudication action and the payment are one transaction. When the payer's adjudication engine approves a claim, the settlement contract pays the allowed amount from the payer's funded settlement balance to the provider's account in the same step, final in about a second. There is no separate payment run and no remittance file to match to a deposit.

### Can an automated adjudication engine pay claims without a person?

Within limits you set. The engine's key sits on a permission linked to the `adjudicate` action only, and the contract enforces a per-claim cap and a daily budget. Claims above the cap route to a human review permission that needs two reviewers. The engine's key cannot transfer funds or change any permission.

### Can we use this with real claims today?

Not yet. PulseVM is at the test-network stage, and pilots with synthetic or de-identified claims are run with Metallicus. The account and permission model underneath runs in production on XPR Network.

## Next step

Start with one payer, a few providers and a de-identified claim set, and measure decision-to-cash on a test network. **[Talk to Metallicus →](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs)**

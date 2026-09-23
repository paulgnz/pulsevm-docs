---
description: "Blockchain use cases by industry on PulseVM: parametric insurance payouts, atomic delivery-versus-payment, letters of credit, 2-of-3 escrow release, claims that pay on adjudication, and loyalty points as a readable liability."
---

# Industries

Most multi-party finance runs on copies: each firm keeps its own record, and people are paid to make the copies agree before money moves. PulseVM replaces the copies with one ledger the participants own, and puts the controls where they belong, in the accounts themselves. Every party has a readable named account. Every key can be bound to the one action it exists for. Approvals are weighted multisig that the chain counts. Settlement is final in about a second. Below, each industry's job to be done and the primitive that does it.

| Industry | The job to be done | The primitive that does it |
| --- | --- | --- |
| **[Insurance](/industries/insurance)** | Pay a parametric claim when the index triggers, with the reinsurer co-signing large ones | Index feed and claims bot keys each [linked to one action](/guide/accounts-permissions#give-a-key-one-job); reinsurer co-sign above a threshold |
| **[Capital markets](/industries/capital-markets)** | Deliver the security only if the cash arrives, and the reverse | Both legs in one transaction: they settle together or neither moves |
| **[Trade finance](/industries/trade-finance)** | Move a letter of credit from issue to payment, each step by the right party | Each transition is an action only that party's permission can call |
| **[Title and escrow](/industries/title-escrow)** | Release closing funds only when buyer, seller and agent agree | A `release` permission needing 2 of 3; `refund` linked separately |
| **[Healthcare](/industries/healthcare)** | Pay the provider the moment a claim is adjudicated | Adjudicate and pay in one action, called by an engine key with caps |
| **[Loyalty](/industries/loyalty)** | Know the points liability exactly, and let partners redeem safely | Issue, redeem and expire as actions; partner keys that can only redeem |

Banks and credit unions have their own pages: [banks](/institutions/banks) and [credit unions](/institutions/credit-unions).

## What every industry page shares

- **Your network.** Validators are named institutions the members admit and can remove, and the rules are system contracts you own.
- **No fee token for your customers.** The institution [stakes the resources](/guide/resources); customers sign with passkeys.
- **Keys with one job.** The pattern behind every page is running live on XPR Network: see the [delegated authority case study](/guide/delegated-authority).

PulseVM is at the test-network stage. Industry pilots are run with Metallicus.

Don't see your industry? The same accounts and permissions generalize. **[Talk to Metallicus →](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs)**

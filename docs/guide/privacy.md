# Privacy & Confidentiality

Privacy on PulseVM is achieved through **architecture**, not a single switch — and for institutional deployments the most important lever is the one public chains don't have: the network boundary itself.

## The network boundary is a real confidentiality boundary

A PulseVM network is a subnet with a defined validator set. On a **private (permissioned) subnet**, the ledger exists only among the institutions that run it — there is no public mempool, no public explorer, no third party observing transactions. For a consortium of banks or a credit-union league, "our data is not on a public chain at all" is the single biggest privacy property, and it is the default.

This is fundamentally different from privacy on a public L1, where every transaction is globally visible and confidentiality must be bolted on cryptographically. Here, confidentiality starts at "only the members can see anything."

## Isolation by relationship

Because launching a network is provisioning, not a research project, the topology can match the confidentiality requirement:

- **One network per consortium** — members share a ledger; non-members see nothing.
- **Separate subnets per relationship** — bilateral or small-group settlement on its own chain, fully isolated from other counterparties.
- **Bridge by choice** — networks connect only where the business relationship requires it; isolation is the default, connection is the exception.

## Confidentiality between members on a shared chain

Within a single shared network, members see the shared ledger — by design, since a shared record is the point. Where two members on the same chain need to keep specific data confidential from each other, the patterns are:

- **Application-layer encryption** — sensitive payloads are encrypted to the intended parties; the chain stores and orders ciphertext, members decrypt what's addressed to them.
- **Reference, don't store** — keep sensitive detail off-chain and commit only hashes/proofs on-chain for integrity and audit.
- **Per-relationship subnets** — when two parties need full mutual confidentiality, give them their own network.

## Auditor & regulator access

Confidentiality and auditability are not in tension here. Free reads mean a supervisor can be given a node or an indexer for complete, real-time visibility into the network they oversee — selective transparency to the right party, while the data stays off the public internet entirely.

## In short

For the institutional use cases PulseVM targets, the private-subnet model delivers strong, practical confidentiality today: your transactions live among named members on infrastructure you control, not on a public chain. Finer-grained confidentiality between members is an architecture choice — network isolation, application-layer encryption, or both.

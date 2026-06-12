# Finality & Settlement

PulseVM's most underrated property: **the head block is the last irreversible block.**

- Blocks finalize in well under a second.
- There is **no reorg case** — not "unlikely", structurally absent. A transaction is either rejected immediately or settled permanently.
- No confirmation-count policies, no "wait N blocks" memos for your risk committee, no probabilistic language in your SLA.

"When is this transfer settled?" has a one-word answer: *now*.

## Reads are free, for anyone

Every read is free. An auditor or regulator can be handed a node or an indexer and get complete, real-time visibility into the chain's state — no per-query cost, no privileged access tier. Verifiability is a property of the network, not a paid feature.

## What happens under network partition

Instant finality is a safety guarantee, and safety is chosen over liveness when the network cannot reach quorum: rather than fork into two divergent histories, the chain **halts and waits** until enough of the validator set is reachable to finalize again. For a settlement system this is the correct trade — it never produces two conflicting "final" states. Recovery is resumption, not reconciliation.

## Why this matters more than TPS

Payment and settlement systems are defined by their failure semantics, not their peak throughput. Deterministic, instant finality removes an entire class of operational policy (reorg handling, finality monitoring, double-spend windows) from every integration that touches the chain.

## How it works

Metal Blockchain's Snowman consensus finalizes each block through repeated randomized sampling of the validator set — fast metastable agreement that suits small, accountable validator sets (a consortium's named institutions) as well as larger public sets.

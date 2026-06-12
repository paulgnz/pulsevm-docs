# Finality & Settlement

PulseVM's most underrated property: **the head block is the last irreversible block.**

- Blocks finalize in well under a second.
- There is **no reorg case** — not "unlikely", structurally absent. A transaction is either rejected immediately or settled permanently.
- No confirmation-count policies, no "wait N blocks" memos for your risk committee, no probabilistic language in your SLA.

"When is this transfer settled?" has a one-word answer: *now*.

## Why this matters more than TPS

Payment and settlement systems are defined by their failure semantics, not their peak throughput. Deterministic, instant finality removes an entire class of operational policy (reorg handling, finality monitoring, double-spend windows) from every integration that touches the chain.

## How it works

Metal Blockchain's Snowman consensus finalizes each block through repeated randomized sampling of the validator set — fast metastable agreement that suits small, accountable validator sets (a consortium's named institutions) as well as larger public sets.

# PulseVM vs Permissioned EVM (Besu / Quorum)

The closest real-world alternative for institutional deployments — and the comparison where PulseVM's case is strongest.

With a permissioned EVM you control **consensus**, but you inherit **primitives that fight you**:

| Need | Permissioned EVM | PulseVM |
|---|---|---|
| Institutional identity | Hex addresses + off-chain mapping | Named accounts |
| Authorization matrix | Smart-wallet platform (deploy, audit, maintain) | Native permissions |
| Dual control | Safe-class contracts per account | Threshold on any permission |
| Key rotation | Move assets / wallet framework | `updateauth`, assets never move |
| Sponsored users | Paymasters + relayers | Staked resources, native |
| HSM keys | secp256k1 workarounds | R1 native |
| Asset-level policy (freeze/clawback under court order) | Per-token contract code | System-contract policy |
| Settlement finality | Depends on consensus chosen; tooling assumes probabilistic | Instant & irreversible, assumed everywhere |

Every left-column row is added infrastructure and audit surface that your team owns forever. **PulseVM's floor is permissioned EVM's ceiling for the institutional feature set.**

What permissioned EVM keeps: Solidity talent supply and EVM tooling. If your build plan is "hire Solidity engineers to assemble wallet/paymaster/multisig infrastructure," that strength is real. If your plan is "express our institution's structure directly," it is overhead.

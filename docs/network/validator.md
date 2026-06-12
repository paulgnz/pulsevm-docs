# Run a Validator

A PulseVM network validator is a metalgo node with the PulseVM plugin, registered to the subnet.

## Shape of the work

1. **Provision** a Linux host (amd64), install metalgo, place the PulseVM plugin binary in the plugins directory.
2. **Generate node identity** (NodeID) and back up the staking keys.
3. **Track the subnet** in node config; sync the chain.
4. **Register**: the subnet owner adds your NodeID as a validator (consortium governance decides who validates).
5. **Operate**: run metalgo under a service manager; monitor head and last-irreversible block; roll plugin upgrades across the validator set in coordinated windows.

::: tip Coordinate upgrades
Consensus-affecting plugin upgrades should roll out across the validator set in a planned window rather than node-by-node — standard practice for any BFT network.
:::

Detailed runbooks (provisioning scripts, upgrade/rollback tooling, monitoring) exist from operating the Alpine fleet — ask in the community channels.

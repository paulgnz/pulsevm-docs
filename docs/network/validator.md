# Run a Validator

A PulseVM network validator is a metalgo node with the PulseVM plugin, registered to the subnet.

## Shape of the work

1. **Provision** a Linux host (amd64), install metalgo, place the PulseVM plugin binary in the plugins directory.
2. **Generate node identity** (NodeID) and back up the staking keys.
3. **Track the subnet** in node config; sync the chain.
4. **Register**: the subnet owner adds your NodeID as a validator (consortium governance decides who validates).
5. **Operate**: systemd-managed metalgo, monitored head/LIB and `snowman_blks_processing`, coordinated upgrade windows for plugin releases.

::: warning Coordinate upgrades
PulseVM releases that change transaction-validation logic are consensus-affecting. Upgrade in coordinated windows across the validator set — never piecemeal.
:::

Detailed runbooks (provisioning scripts, upgrade/rollback tooling, monitoring) exist from operating the Alpine fleet — ask in the community channels.

---
description: "Run a PulseVM validator: host requirements, installing metalgo and the PulseVM plugin, node and chain config, validator registration, monitoring head and LIB, coordinated upgrades and staker-key backups."
---

# Run a validator

A PulseVM validator is a metalgo node with the PulseVM plugin, registered as a validator of the network's subnet or L1. This page covers the operator side: what to provision, how to install and configure it, how it gets admitted, and how to keep it healthy through upgrades.

Validators on a PulseVM network are named and admitted by the network's members, and they can be removed. They are not elected by token votes. See [Launch your own network](/network/launch) for how a network is created in the first place.

## Requirements

| | Recommendation |
|---|---|
| **OS** | Linux, x86-64 or ARM64. Release binaries are built against Ubuntu 22.04 (glibc 2.35), so use Ubuntu 22.04 or newer. |
| **CPU and memory** | 8+ cores and 16+ GB RAM for a test network. Size up for imported production-scale state. |
| **Disk** | Fast NVMe SSD. Imported Antelope state and state history grow with the chain. |
| **Network** | A public IP with the staking port (9651) open to peers. Keep the HTTP API (9650) on localhost or behind a proxy. |
| **Software** | metalgo at the network's pinned version, and the matching PulseVM plugin. |

## Install metalgo and the plugin

```bash
# metalgo (Tahoe, Granite)
VER=v1.14.2-tahoe
curl -fsSLO https://github.com/MetalBlockchain/metalgo/releases/download/$VER/metalgo-linux-amd64-$VER.tar.gz
tar -xzf metalgo-linux-amd64-$VER.tar.gz
sudo install -m 0755 metalgo-$VER/metalgo /opt/metalgo/metalgo

# PulseVM plugin, named after the VM ID
VMID=rXcAFxZvio99epp6TzEwYfexCfPAbJuBTMsjUUoiT7PkVykNs
curl -fsSLO https://github.com/MetalBlockchain/pulsevm/releases/download/<pulsevm-version>/pulsevm-linux-amd64.tar.gz
tar -xzf pulsevm-linux-amd64.tar.gz
sudo mkdir -p /opt/pulsevm/plugins
sudo install -m 0755 pulsevm /opt/pulsevm/plugins/$VMID
```

Use the plugin version your network has pinned, and verify every download against a published SHA-256 before you install it. metalgo and the plugin must speak the same rpcchainvm protocol version: metalgo 1.13.5 uses 43, metalgo 1.14.2 uses 45. If they differ, metalgo will not load the chain. See [Upgrade to metalgo 1.14.2](/network/upgrade-metalgo-1-14) for the current status.

## Configure the node

Node config (for example `/etc/metalgo/node.json`, passed with `--config-file`):

```json
{
  "network-id": "tahoe",
  "plugin-dir": "/opt/pulsevm/plugins",
  "track-subnets": "<subnet-id>",
  "chain-config-dir": "/etc/metalgo/chains",
  "data-dir": "/var/lib/metalgo",
  "log-dir": "/var/log/metalgo",
  "http-host": "127.0.0.1",
  "http-port": 9650,
  "staking-port": 9651,
  "public-ip": "<your-public-ip>"
}
```

PulseVM chain config at `/etc/metalgo/chains/<blockchain-id>/config.json`:

```json
{
  "producer_name": "<producer-account>",
  "producer_key": "PVT_K1_..."
}
```

- `producer_name` must be the name the chain's producer schedule expects. Use the name the network's operators give you.
- The file holds a private key. Make it readable only by the user metalgo runs as.
- Scheduled protocol upgrades go in `upgrade.json` in the same directory. See [Upgrades](#upgrades).

Run metalgo under systemd with `Restart=always`, a generous `TimeoutStopSec` (180 s) so the VM can flush state on shutdown, and `LimitNOFILE=32768`. A good practice is an `ExecStartPre` step that checks the plugin's SHA-256, so a reboot can never start the wrong binary.

## Get admitted as a validator

1. Start the node and let it sync. It follows the chain without voting until it is admitted.
2. Read the node's identity (the NodeID and its BLS key and proof of possession):

   ```bash
   curl -s -X POST -H 'content-type: application/json' \
     --data '{"jsonrpc":"2.0","id":1,"method":"info.getNodeID"}' \
     http://127.0.0.1:9650/ext/info
   ```

3. Send it to the network's operators. On a **subnet**, the subnet owner adds your NodeID with a P-Chain validator transaction. On an **ACP-77 L1**, you are registered through the network's validator-manager contract. See the [Metal Blockchain docs](https://docs.metalblockchain.org) for the P-Chain side.
4. Confirm the network lists you: `platform.getCurrentValidators` with the subnet ID.

## Monitor

| Check | How | Healthy |
|---|---|---|
| Node health | `curl -s http://127.0.0.1:9650/ext/health` | `"healthy": true` |
| Bootstrapped | `info.isBootstrapped` with `{"chain":"P"}` and with your blockchain ID | `true` for both |
| Versions | `info.getNodeVersion` | Expected metalgo version and `rpcProtocolVersion` |
| Chain head | `pulsevm.getInfo` on `/ext/bc/<blockchain-id>/rpc` | `head_block_num` advancing when there are transactions |
| Finality | `last_irreversible_block_num` from the same call | Equal to or right behind head |
| Peers | `info.peers` | All other validators connected |

```bash
curl -s -X POST -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"pulsevm.getInfo","params":{}}' \
  http://127.0.0.1:9650/ext/bc/<blockchain-id>/rpc
```

PulseVM only builds a block when there are transactions, so an idle chain has a head that stops moving. That is normal. A problem looks like transactions being accepted by the API while head stays still, or head and LIB separating on one node while the others move on. Compare head across all validators, not just one. metalgo also exports Prometheus metrics at `/ext/metrics`. PulseVM can add per-contract RAM-usage series if you enable `ram_usage_monitor_max_series` in the chain config.

## Upgrades

- **Coordinate every upgrade.** Roll consensus-relevant upgrades across the validator set in a planned window, one node at a time, and wait for each node to be healthy and caught up before you move to the next. Never stop every validator at once.
- **Protocol features activate by height.** A consensus rule change in PulseVM has a protocol version and an activation height. The binary that supports the new version goes out first to every node. Then the same `upgrade.json` schedule goes out to every node. At the activation height, all nodes switch together. `pulsevm.getInfo` reports `supported_protocol_version`, `protocol_upgrade_schedule_hash` and `next_protocol_upgrade`, so you can check that every node is ready and has the same schedule before the height arrives.
- **Never downgrade across an activated feature.** Once a height has been reached under a new version, a binary that can't run that version will stop at that block.
- **metalgo upgrades** follow the Metal network's schedule. The current one is [Upgrade to metalgo 1.14.2 (Granite)](/network/upgrade-metalgo-1-14).

## Backups

::: danger Back up staker keys first
A validator's identity is its staker keys. If you lose them, you lose the NodeID and have to be admitted again. Before you rebuild, reinstall or delete any box, copy the staking directory off the machine and check the copy.
:::

- **Staker keys:** `staker.crt`, `staker.key` and `signer.key` (the BLS key), by default in `~/.metalgo/staking/` or wherever your `staking-*` flags point. Keep two copies, one of them offline or in a password manager.
- **Chain config:** the `config.json` holding `producer_key`, and any `upgrade.json`.
- **Node config and systemd unit**, so you can rebuild the box exactly as it was.

You don't need to back up chain data. A replacement node syncs it from its peers.

## Next step

Starting a network rather than joining one? Read [Launch your own network](/network/launch). Operating validators for a pilot? [Contact Metallicus](https://metallicus.com/contact-us?utm_source=pulsevm.dev&utm_medium=docs).

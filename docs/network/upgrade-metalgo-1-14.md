---
description: "Upgrade Tahoe test-network nodes from metalgo 1.13.5 to 1.14.2 (Granite): who must act, what changes, the PulseVM plugin's RPC protocol v45 requirement, step-by-step upgrade with verification commands, and rollback."
---

# Upgrade to metalgo 1.14.2 (Granite)

<small>Last checked: 2026-09-24.</small>

The Granite network upgrade activated on the **Tahoe** test network on **2026-09-21 at 10:00 UTC**. Every Tahoe node still on metalgo 1.13.5 must move to **metalgo v1.14.2-tahoe**.

## Who must act

| You run | Action |
|---|---|
| A Tahoe node on metalgo 1.13.5 (validator or API node) | Upgrade to v1.14.2-tahoe now |
| A PulseVM chain on Tahoe | Upgrade metalgo **and** move to a PulseVM plugin with RPC protocol v45 support (see [The PulseVM side](#the-pulsevm-side)) |
| A Metal mainnet node | Not affected by this Tahoe release |

## Why

Granite changes the P-Chain rules. A node on 1.13.5 can't validate blocks produced under those rules, so it stops following the P-Chain once post-Granite blocks are produced. It falls out of sync with the validator registry that every subnet and L1 on Tahoe relies on.

## What's in it

metalgo v1.14.2-tahoe (published 2026-09-22, marked pre-release) enables Granite for Tahoe. It carries the upstream 1.14.x line. The Granite upgrade activates these Avalanche Community Proposals:

| Proposal | What it does | Why it matters here |
|---|---|---|
| **ACP-181** P-Chain epoched views | Validator sets are read from fixed P-Chain epochs instead of the latest P-Chain height | The basis for ACP-77 L1 validator management: adding and removing validators of a sovereign L1 through its validator-manager contract |
| **ACP-204** secp256r1 precompile | Adds an R1 signature-verification precompile on EVM chains | EVM side. PulseVM already verifies R1 and WebAuthn keys natively |
| **ACP-226** dynamic minimum block times | Makes the minimum block time on EVM chains configurable | EVM side |

The 1.14.2 release also raises the rpcchainvm **plugin protocol to 45**. It adds benchlist, Simplex (experimental) and disk-space settings, deprecates `consensusParameters` in subnet configs in favour of `snowParameters`, and removes `proposerMinBlockDelay` from subnet configs. If your subnet config sets any of these, review it before you restart. Full notes are in the [metalgo release](https://github.com/MetalBlockchain/metalgo/releases/tag/v1.14.2-tahoe).

## The PulseVM side

metalgo only loads a VM plugin that speaks its rpcchainvm protocol version:

| metalgo | rpcchainvm protocol |
|---|---|
| 1.13.5 | 43 |
| 1.14.0, 1.14.1 | 44 |
| 1.14.2 | 45 |

The latest PulseVM release (v0.7.1) speaks **protocol 43**. Protocol 45 support is merged into PulseVM main (2026-09-24) and ships in the next release. **Run a PulseVM chain on metalgo 1.14.2 only with that release. Watch [Updates](/network/updates).**

For operators of PulseVM validators on Tahoe, this means:

- Upgrade metalgo and the PulseVM plugin **together**, in the same maintenance window, once the PulseVM release with protocol 45 is published.
- Don't put the current plugin under metalgo 1.14.2. metalgo will refuse to start the chain because of the protocol mismatch.
- Nodes that only serve the primary network (no PulseVM chain) can upgrade now.

## Steps

Upgrade one node at a time. Wait for each node to be healthy before you move to the next, so the validator set never loses more than one member at once.

**1. Back up the staker keys.** Always do this first, before you touch any binary.

```bash
sudo tar -czf ~/staking-backup-$(date +%F).tgz -C ~/.metalgo staking
tar -tzf ~/staking-backup-$(date +%F).tgz   # should list staker.crt, staker.key, signer.key
```

Copy the archive off the machine. If your `staking-*` flags point elsewhere, back up that directory instead.

**2. Record the current state**, so you can compare after the upgrade:

```bash
curl -s -X POST -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"info.getNodeVersion"}' \
  http://127.0.0.1:9650/ext/info
```

**3. Download and verify the new binary:**

```bash
VER=v1.14.2-tahoe
ARCH=amd64   # or arm64
curl -fsSLO https://github.com/MetalBlockchain/metalgo/releases/download/$VER/metalgo-linux-$ARCH-$VER.tar.gz
sha256sum metalgo-linux-$ARCH-$VER.tar.gz
tar -xzf metalgo-linux-$ARCH-$VER.tar.gz
```

The amd64 tarball as published on 2026-09-22 has SHA-256 `7732b814168d6c34bca209a4429ae73b3fb22629dd7e2f286e3d85ca35c90b2a`. The tarball contains a single `metalgo` binary.

**4. Stop, replace, start.** Keep the old binary for rollback. The paths below match the layout on [Run a validator](/network/validator). Adjust them to your service.

```bash
sudo systemctl stop metalgo
sudo cp /opt/metalgo/metalgo /opt/metalgo/metalgo-1.13.5
sudo install -m 0755 metalgo-$VER/metalgo /opt/metalgo/metalgo
# PulseVM validators: install the v45 plugin under the VM ID in the same window
sudo systemctl start metalgo
```

**5. Verify.**

```bash
# version: expect "metalgo/1.14.2..." and "rpcProtocolVersion": "45"
curl -s -X POST -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"info.getNodeVersion"}' \
  http://127.0.0.1:9650/ext/info

# P-Chain bootstrapped: expect "isBootstrapped": true
curl -s -X POST -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"info.isBootstrapped","params":{"chain":"P"}}' \
  http://127.0.0.1:9650/ext/info

# overall health: expect "healthy": true
curl -s http://127.0.0.1:9650/ext/health

# PulseVM chain (validators): same call, your blockchain ID
curl -s -X POST -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"info.isBootstrapped","params":{"chain":"<blockchain-id>"}}' \
  http://127.0.0.1:9650/ext/info
```

On a PulseVM validator, also check that `pulsevm.getInfo` returns and that head and LIB match the other validators. See [Monitor](/network/validator#monitor).

## Rollback

Rolling back to 1.13.5 **does not** restore service on Tahoe. Granite is already active, and a 1.13.5 node can't follow the post-Granite P-Chain. Only roll back to recover from a broken install on a node that can afford to be out of sync while you investigate:

```bash
sudo systemctl stop metalgo
sudo install -m 0755 /opt/metalgo/metalgo-1.13.5 /opt/metalgo/metalgo
sudo systemctl start metalgo
```

The better fix is almost always forward: reinstall the 1.14.2 binary, check the config against the release notes (subnet `consensusParameters`, removed flags), and check the plugin's protocol version. Your staker keys don't change during the upgrade, so the node keeps its NodeID either way.

## Next step

See [Run a validator](/network/validator) for monitoring and backup routines, and watch [Updates](/network/updates) for the PulseVM build with v45 support.

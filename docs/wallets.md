# Wallets

Two wallets for PulseVM networks — pick the one that fits your platform and custody needs.

## WebAuth

Metallicus's flagship wallet for [XPR Network](https://xprnetwork.org) / PulseVM — **mobile (iOS/Android) and browser**.
Passkey/WebAuthn custody, in-app swap, staking, and dapp connect. Best for everyday users.

- **Get it:** [webauth.com](https://webauth.com)

## PulseVM Wallet (macOS)

A native **macOS desktop** wallet for institution-grade, **hardware-backed** custody:

- **Secure Enclave** keys (biometric, non-exportable) and **YubiKey (PIV)** hardware keys.
- **Decode-before-sign** — every transaction is shown as real actions before you approve.
- **Multisig**, key & permission management (`updateauth`, link keys), network manager.
- **Dapp connect** over `pulsevm://` with a seamless relay (no second browser tab).

<a href="https://github.com/paulgnz/pulse-wallet/releases/latest" target="_blank" rel="noopener" style="display:inline-block;margin:8px 0;padding:11px 20px;border-radius:12px;font-weight:600;color:#fff;background:linear-gradient(135deg,#4F7CFF,#8B95FF);text-decoration:none;">⬇ Download for macOS (.dmg)</a>

- **Download:** [GitHub Releases](https://github.com/paulgnz/pulse-wallet/releases/latest) — signed + notarized; open the `.dmg`, drag **PulseVM** to Applications.
- **Source:** [github.com/paulgnz/pulse-wallet](https://github.com/paulgnz/pulse-wallet) (open source, MIT).
- **Connect a dapp:** see [Connect Wallet (Web SDK)](/build/connect-wallet) and the live <a href="/demo-pulse/">demo</a>.

> Currently a beta on the A‑Chain testnet.

## Build a dapp that connects to these wallets

See **[Connect Wallet (Pulse Web SDK)](/build/connect-wallet)** for the `ConnectWallet()` API and two SDKs
(lightweight desktop connector + full proton-web-sdk Pulse Edition).

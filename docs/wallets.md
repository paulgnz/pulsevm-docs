---
description: "Wallets for PulseVM: WebAuth for everyday users with passkeys, and the open-source PulseVM desktop wallet for macOS with Secure Enclave and YubiKey custody, decode-before-sign and multisig."
---

# Wallets

Because PulseVM verifies passkey (WebAuthn) and secure-enclave (R1) keys itself, a wallet can hold a key that never leaves the device, with no seed phrase and no bridge key. Two wallets, for two kinds of user.

## WebAuth

Metallicus's flagship wallet for [XPR Network](https://xprnetwork.org), on **mobile (iOS and Android) and in the browser**.
Passkey/WebAuthn custody, in-app swap, staking, and dapp connect. Best for everyday users.

- **Get it:** [webauth.com](https://webauth.com)

## PulseVM Wallet (macOS)

A native **macOS desktop** wallet for institution-grade, **hardware-backed** custody:

- **Secure Enclave** keys (biometric, non-exportable) and **YubiKey (PIV)** hardware keys.
- **Decode-before-sign** — every transaction is shown as real actions before you approve.
- **Multisig**, key & permission management (`updateauth`, link keys), network manager.
- **Dapp connect** over `pulsevm://` with a seamless relay (no second browser tab).

<a href="https://github.com/paulgnz/pulse-wallet/releases/latest" target="_blank" rel="noopener" class="pvm-button">Download for macOS (.dmg)</a>

- **Download:** [GitHub Releases](https://github.com/paulgnz/pulse-wallet/releases/latest) — signed + notarized; open the `.dmg`, drag **PulseVM** to Applications.
- **Source:** [github.com/paulgnz/pulse-wallet](https://github.com/paulgnz/pulse-wallet) (open source, MIT).
- **Connect a dapp:** see [Connect Wallet (Web SDK)](/build/connect-wallet) and the live <a href="/demo-pulse/">demo</a>.

> Beta. It connects to any PulseVM network you add in its network manager.

## Build a dapp that connects to these wallets

See **[Connect Wallet (Pulse Web SDK)](/build/connect-wallet)** for the `ConnectWallet()` API and two SDKs
(lightweight desktop connector + full proton-web-sdk Pulse Edition).

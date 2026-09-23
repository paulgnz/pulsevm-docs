---
description: "Connect a web app to the PulseVM desktop wallet with the Pulse Web SDK: ConnectWallet(), decode-before-sign, callbacks and limits."
---

# Connect Wallet (Pulse Web SDK)

The **Pulse Web SDK** lets a web app connect to the **PulseVM desktop wallet**, request a signature, and broadcast — the same `ConnectWallet()` shape as proton-web-sdk, but the wallet selector shows **Pulse Wallet (Desktop)** instead of Anchor.

Keys never touch the browser. The app hands an unsigned transaction to the wallet over the `pulsevm://` URL scheme; the wallet decodes it, signs with a Secure Enclave / imported key behind Touch ID, and returns the signature.

<a href="/demo/" target="_blank" rel="noopener" class="pvm-button">PulseVM Wallet demo</a>
<a href="/demo-pulse/" target="_blank" rel="noopener" class="pvm-button pvm-button-alt">PulseVM &amp; WebAuth demo</a>

> macOS only for now. The PulseVM Wallet demo needs the **PulseVM desktop wallet** installed and launched once, so macOS registers the `pulsevm://` scheme.

## Two ways to connect

| SDK | Wallets | When to use |
|---|---|---|
| **PulseVM Wallet** (`pulse-web-sdk`) | PulseVM desktop wallet | A tiny, zero-dependency connector — drops into a plain `.html` page. See the [PulseVM Wallet demo](/demo/). |
| **PulseVM & WebAuth** (`proton-web-sdk` [Pulse Edition](https://github.com/paulgnz/proton-web-sdk-pulse)) | WebAuth (mobile/browser) **+** PulseVM desktop | The full wallet selector — WebAuth / Anchor over `achain` **plus** the native PulseVM desktop wallet over `pulsevm://`. See the [PulseVM &amp; WebAuth demo](/demo-pulse/). |

The rest of this page covers the lightweight **PulseVM Wallet** SDK. For the WebAuth-capable edition, see its [README](https://github.com/paulgnz/proton-web-sdk-pulse/blob/master/PULSE-EDITION.md).

## Install

The SDK isn't published to npm yet — build it from source for now:

```bash
git clone https://github.com/paulgnz/pulse-web-sdk
cd pulse-web-sdk && npm install && npm run build
# then import from the built dist/, or `npm link` it into your app
```

> Once published, this becomes `npm install @pulsevm/pulse-web-sdk`. The
> [live demo](/demo/) inlines the same transport, so it needs no install.

## Connect

```ts
import { ConnectWallet } from "@pulsevm/pulse-web-sdk"

const { session } = await ConnectWallet({
  appName: "My PulseVM dapp",
  chainId: "71ee83bcf52142d61019d95f9cc5427ba6a0d7ff8accd9e2088ae2abeaf3d3dd", // your network's chain id (this one: the 1:1 demo network)
  rpcEndpoint: "https://xpr-rpc-testnet.pulsevm.dev", // current values at /network/endpoints
})

console.log(session.actor, session.permission)      // e.g. "protonnz" "active"
```

`ConnectWallet()` restores an existing session if one is saved, otherwise it shows the wallet selector and opens the desktop wallet to authorize.

## Sign and broadcast a transfer

```ts
const result = await session.transact({
  actions: [{
    account: "eosio.token",          // the token contract on the 1:1 demo network
    name: "transfer",
    authorization: [{ actor: session.actor, permission: session.permission }],
    data: { from: session.actor, to: "pulse", quantity: "0.0001 XPR", memo: "hello" },
  }],
})

console.log(result.transactionId)   // broadcast by default; pass { broadcast: false } to get just the signature
```

The wallet renders a **decode-before-sign** view of the real action (amount, recipient, memo) before the user authorizes — nothing is signed blind.

## Handling the callback

If you pass a `callback` URL, the wallet returns to it with the result. On that page, call `handleCallback()` once on load — it stores the result and notifies the opener:

```ts
import { handleCallback } from "@pulsevm/pulse-web-sdk"
handleCallback()
```

## Notes and limits

- This SDK build serializes the `transfer` action. For arbitrary actions, serialize with [pulsevm-js](https://github.com/MetalBlockchain/pulsevm-js) and pass the packed transaction to the wallet.
- Transport is the `pulsevm://` URL scheme, so the desktop wallet must be installed. A browser-extension / mobile transport can be added later behind the same `ConnectWallet()` API.
- Source: [`@pulsevm/pulse-web-sdk`](https://github.com/paulgnz/pulse-web-sdk) · see also the [TypeScript Quickstart](/build/quickstart-typescript) for writing contracts.

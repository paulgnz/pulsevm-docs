## Give a key one job

Every account is a readable name with its own approval structure: 3 of 5 treasury officers, 2 of 3 for operations, and a service key that can perform exactly one action. It is configuration, and the ledger enforces it on every transaction. On EVM chains the same controls are a contract wallet and a key module your team deploys and audits.

Example permission tree for `treasury.bank`:

- `owner`: treasury officers, 3 of 5
  - `active`: operations, 2 of 3
    - `payments`: linked to `token::transfer` only, 1 key
    - `trader`: linked to `vault::trade` only, bot key

More: [Accounts and permissions](/guide/accounts-permissions), [see it in production](/guide/delegated-authority).

**31 of 31** attempts to move funds or take over the account were refused by the ledger, using a live service's real key. That key was permitted exactly one action. The service runs in production on XPR Network; the attack exercise ran on its test network. [Read the case study](/guide/delegated-authority).

## Settlement you can put in an SLA

A payment is final in about a second, as soon as its block is accepted. There is no confirmation count to wait out and no reorganization afterwards. On a chain that counts confirmations, the same payment is only probably final after minutes. [Finality and settlement](/guide/finality).

## No gas for your customers

The institution stakes compute and bandwidth once and provisions storage. Customers see your app, never a token purchase. Your customer sees "$50.00 to alex.cu, network fee: none, sent and settled"; your institution stakes CPU and bandwidth once, provisions storage and plans capacity like any other system. [Resource model](/guide/resources).

## Your network, your rules

PulseVM runs as a plugin for metalgo. An institution or a consortium deploys its own chain with its own validators (for example: your bank, a credit union, a regional bank, a payments firm, a clearing partner around one shared ledger), and the chain's rules are system contracts it owns and can change. [Launch your own network](/network/launch).

## Also built in

- **Keep deposits at home.** Issue tokenized dollars your customers can move instantly, while the deposits stay on your balance sheet. [For banks and fintechs](/institutions/banks)
- **Native, not bolted on.** Account abstraction, batched payments, fee sponsorship, and passkey (WebAuthn) and secure-enclave (R1) keys are part of the account model. [What is built in](/guide/native-by-design)
- **Build in Rust, C++ or TypeScript.** Rust is the canonical contract kit. C++ carries the Antelope heritage. TypeScript suits teams who prefer it. [Start building](/build/get-started)
- **Compliance and identity.** Allow-lists, freeze and clawback under legal order are controls you implement in contracts you own, operated under dual control. Pairs with [Metal Identity](https://identity.metallicus.com).

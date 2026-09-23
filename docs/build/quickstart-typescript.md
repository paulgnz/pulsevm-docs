---
description: "Write a PulseVM smart contract in TypeScript (AssemblyScript) with pulse-tsc, build it to WebAssembly, deploy it and call it."
---

# TypeScript quickstart

TypeScript (AssemblyScript) is an additional way to write PulseVM contracts, convenient for teams who already work in TypeScript. The canonical contract languages are [Rust](/build/quickstart-rust) and [C++](/build/quickstart-cpp). It runs through [pulse-tsc](https://github.com/paulgnz/pulse-tsc), a fork of [XPR Network](https://xprnetwork.org)'s proton-tsc retargeted at PulseVM. The package keeps the `proton-tsc` name for now.

> New here? Do [Get started](/build/get-started) first: CLI, keys, an account and an endpoint.

## 1. Get the toolchain

The toolchain currently needs **Node 16** (an inherited constraint that is on the fork's work plan).

```bash
git clone https://github.com/paulgnz/pulse-tsc
cd pulse-tsc/examples
npm install
```

## 2. Build and deploy the example

```bash
npm run build:hello                                   # writes the .wasm and .abi into ./hello/target/
pulse-ts set-code yourname1 ./hello/target/hello.contract.wasm
pulse-ts set-abi  yourname1 ./hello/target/hello.contract.abi
pulse-ts push-action yourname1 say '{"text":"hello"}' -a yourname1
```

The last command prints a transaction id. The contract's `print` output appears in the transaction trace, which you can read back from [Hyperion](/build/api).

## 3. Write your own

A contract with a table. Save it next to the example and add a matching `build:` script to `package.json`:

```ts
import { Contract, Table, TableStore, Name, check, requireAuth } from "proton-tsc"

@table("greetings")
class Greeting extends Table {
  constructor(public account: Name = new Name(), public text: string = "") { super() }
  @primary get primary(): u64 { return this.account.N }
}

@contract
class GreetContract extends Contract {
  greetings: TableStore<Greeting> = new TableStore<Greeting>(this.receiver)

  @action("greet")
  greet(account: Name, text: string): void {
    requireAuth(account)
    check(text.length <= 256, "greeting too long")
    this.greetings.set(new Greeting(account, text), account)
  }
}
```

After deploying, push an action and read the table back:

```bash
pulse-ts push-action yourname1 greet '{"account":"yourname1","text":"hi"}' -a yourname1
pulse-ts table yourname1 greetings
```

`check(condition, "message")` aborts the transaction with your message. Each row names the account that pays for its RAM, here the caller.

## Next

- [Give a key one job](/build/get-started#_6-give-a-second-key-one-job): bind a second key to `greet` only.
- [pulse-tsc scope](https://github.com/paulgnz/pulse-tsc/blob/main/PULSE-TSC-SCOPE.md): which host functions the toolchain covers, if you need advanced cryptography or transaction introspection.

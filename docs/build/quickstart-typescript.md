# TypeScript Quickstart

TypeScript/AssemblyScript is a popular **additional** way to write PulseVM contracts — convenient for teams who already live in TypeScript. (The canonical contract languages are [Rust](/build/quickstart-rust) and [C++](/build/quickstart-cpp); PulseVM and its system contracts are written in Rust.) It runs via [pulse-tsc](https://github.com/paulgnz/pulse-tsc), a fork of [XPR Network](https://xprnetwork.org)'s proton-tsc retargeted at PulseVM.

> New to the testnet? Do [Getting Started](/build/get-started) first (account + keys + endpoint).

## A minimal contract

```ts
import { Contract, Table, TableStore, Name, primary, check, requireAuth } from "pulse-tsc"

@table("greetings")
class Greeting extends Table {
  constructor(public account: Name = new Name(), public text: string = "") { super() }
  @primary get primary(): u64 { return this.account.N }
}

@contract
class HelloContract extends Contract {
  table: TableStore<Greeting> = new TableStore<Greeting>(this.receiver)

  @action("greet")
  greet(account: Name, text: string): void {
    requireAuth(account)
    check(text.length <= 256, "greeting too long")
    this.table.set(new Greeting(account, text), account)
  }
}
```

## Build & deploy

```bash
npm i
npm run build:hello                       # -> hello.wasm + hello.abi
pulse-ts set-code myacct ./target/hello.wasm
pulse-ts set-abi  myacct ./target/hello.abi
pulse-ts push-action myacct greet '{"account":"myacct","text":"hi"}' --actor myacct
```

`check(cond, "message")` failures abort the transaction with your message; table rows name an explicit RAM payer.

## Good to know

- The toolchain currently runs on **Node 16**.
- The [pulse-tsc scope doc](https://github.com/paulgnz/pulse-tsc/blob/main/PULSE-TSC-SCOPE.md) lists the host-function coverage if you're building something that needs advanced cryptography or transaction introspection — the toolchain flags anything unsupported at compile time, so you'll never get a surprise at runtime.

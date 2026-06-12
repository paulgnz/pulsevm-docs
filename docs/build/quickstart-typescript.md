# TypeScript Quickstart

TypeScript/AssemblyScript is a popular **additional** way to write PulseVM contracts — convenient for teams who already live in TypeScript. (The canonical contract languages are [Rust](/build/quickstart-rust) and [C++](/build/quickstart-cpp); PulseVM and its system contracts are written in Rust.) It runs via [pulse-tsc](https://github.com/paulgnz/pulse-tsc), a fork of XPR Network's proton-tsc retargeted at PulseVM.

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

## Status & limits

pulse-tsc is early — proton-tsc contracts already largely run on PulseVM (the oracle serving Alpine's price feeds is one). Two things to know:

- **Node 16** for the current toolchain (lifting this is on the [work plan](https://github.com/paulgnz/pulse-tsc/blob/main/PULSE-TSC-SCOPE.md)).
- Contracts needing `recover_key`/`sha1`/`ripemd160`, float/256-bit secondary indexes, or transaction introspection depend on intrinsics still landing chain-side — the toolchain flags these at compile time. See the [scope doc](https://github.com/paulgnz/pulse-tsc/blob/main/PULSE-TSC-SCOPE.md) for the full audit.

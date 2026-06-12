# TypeScript Quickstart

Write contracts in the language your team already knows, via [pulse-tsc](https://github.com/paulgnz/pulse-tsc) (fork of XPR Network's proton-tsc, retargeted at PulseVM).

::: warning Status
pulse-tsc is early — proton-tsc contracts already largely run on PulseVM (the oracle serving A-Chain Alpine's price feeds is one), but the toolchain retarget is in progress. See the [scope doc](https://github.com/paulgnz/pulse-tsc/blob/main/PULSE-TSC-SCOPE.md) for the intrinsic gap audit.
:::

## A minimal contract

```ts
import { Contract, TableStore, Name, check, requireAuth } from "pulse-tsc"

@table("greetings")
class Greeting extends Table {
  constructor(
    public account: Name = new Name(),
    public text: string = ""
  ) { super() }
  @primary get primary(): u64 { return this.account.N }
}

@contract
class HelloContract extends Contract {
  greetingsTable: TableStore<Greeting> = new TableStore<Greeting>(this.receiver)

  @action("greet")
  greet(account: Name, text: string): void {
    requireAuth(account)
    check(text.length <= 256, "greeting too long")
    this.greetingsTable.set(new Greeting(account, text), account)
  }
}
```

## Build & deploy

```bash
npm i                      # node 16 (constraint being lifted)
npm run build:hello        # -> hello.wasm + hello.abi

# deploy with pulse-cli-ts
pulse-ts set-code myaccount ./target/hello.wasm
pulse-ts set-abi  myaccount ./target/hello.abi
pulse-ts push-action myaccount greet '{"account":"myaccount","text":"hi"}' --actor myaccount
```

## What to know

- `check(cond, "message")` failures abort the transaction with your message.
- Table rows name an explicit RAM payer.
- Signature-verification intrinsics (`recover_key`, `sha1`, `ripemd160`) are pending chain-side — the toolchain will fail at compile time, not runtime, if you use them.

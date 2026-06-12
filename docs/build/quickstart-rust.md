# Rust Quickstart

Rust is the canonical contract language for PulseVM. The VM itself is written in Rust, and the chain's own **system contracts** (token, system, governance) are built with [pulse-cdt-rust](https://github.com/MetalBlockchain/pulse-cdt-rust) — the same CDT you use for your own contracts.

> New to the testnet? Do [Getting Started](/build/get-started) first (account + keys + endpoint).

## A minimal contract

```rust
#![no_std]
#![no_main]
extern crate alloc;
use alloc::string::String;
use pulse_cdt::{
    contract, action, contracts::require_auth,
    core::{Name, check, MultiIndexDefinition, Table},
    NumBytes, Read, Write, name,
};

#[derive(Read, Write, NumBytes, Clone)]
#[table(primary_key = row.account.value)]
pub struct Greeting {
    pub account: Name,
    pub text: String,
}

const GREETINGS: MultiIndexDefinition<Greeting> =
    MultiIndexDefinition::new(name!("greetings"));

#[derive(Default)]
struct HelloContract;

#[contract]
impl HelloContract {
    #[action]
    fn greet(&self, account: Name, text: String) {
        require_auth(account);
        check(text.len() <= 256, "greeting too long");
        let table = GREETINGS.index(get_self(), get_self().value);
        table.emplace(account, Greeting { account, text });
    }
}
```

## Build configuration

Contracts target `wasm32-unknown-unknown`. The host functions are imported, so the linker must allow undefined symbols — `.cargo/config.toml`:

```toml
[target.wasm32-unknown-unknown]
rustflags = [
    "-C", "link-arg=--import-undefined",
    "-C", "link-arg=--stack-first",
    "-C", "link-arg=-zstack-size=8192",
    "-C", "link-arg=--no-merge-data-segments",
    "-C", "link-arg=--gc-sections",
    "-C", "link-arg=--strip-all",
]
```

## Build & deploy

```bash
cargo build --target wasm32-unknown-unknown --release -p hello
# -> target/wasm32-unknown-unknown/release/hello.wasm

pulse-ts set-code myacct ./target/wasm32-unknown-unknown/release/hello.wasm
pulse-ts set-abi  myacct ./hello.abi
pulse-ts push-action myacct greet '{"account":"myacct","text":"hi"}' --actor myacct
```

## The best reference is the chain itself

`pulse_token` (token semantics, `stat`/`accounts` tables) and `pulse_system` (accounts, resources, permissions) in [pulse-cdt-rust](https://github.com/MetalBlockchain/pulse-cdt-rust) are production system contracts — the most authoritative examples of the CDT in real use.

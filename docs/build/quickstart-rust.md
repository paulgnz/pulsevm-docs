---
description: "Write a PulseVM smart contract in Rust with pulse-cdt-rust, the same kit the chain's system contracts use: project setup, ABI generation, deploy, call and read back."
---

# Rust quickstart

Rust is the canonical contract language for PulseVM. The VM itself is written in Rust, and the chain's own **system contracts** (token, system, governance) are built with [pulse-cdt-rust](https://github.com/MetalBlockchain/pulse-cdt-rust) — the same CDT you use for your own contracts.

> New here? Do [Get started](/build/get-started) first: CLI, keys, an account and an endpoint.

## 1. Start inside the workspace

The simplest setup is a new contract inside the pulse-cdt-rust workspace, next to the system contracts. The token contract's `build.rs` generates the ABI from your source, so copy it:

```bash
git clone https://github.com/MetalBlockchain/pulse-cdt-rust
cd pulse-cdt-rust
rustup target add wasm32-unknown-unknown
mkdir -p contracts/hello/src
cp contracts/pulse_token/build.rs contracts/hello/
```

Add `"contracts/hello"` to `members` in the root `Cargo.toml`, then create `contracts/hello/Cargo.toml`:

```toml
[package]
name = "hello"
version = "0.1.0"
edition = "2024"

[dependencies]
pulse_cdt = { workspace = true }

[build-dependencies]
syn = { version = "1", features = ["full"] }
quote = "1.0"
serde_json = "1.0"

[lib]
crate-type = ["cdylib"]

[features]
default = ["contract-entry"]
contract-entry = []
```

## 2. Write the contract

Save this as `contracts/hello/src/lib.rs`. The `#[contract]` macro provides `get_self()`, and actions are plain functions of their arguments.

```rust
#![no_std]
#![no_main]
extern crate alloc;
use alloc::string::String;

use pulse_cdt::{
    NumBytes, Read, Write, action, contract,
    contracts::require_auth,
    core::{MultiIndexDefinition, Name, Table, check},
    name, table,
};

#[derive(Read, Write, NumBytes, Clone, PartialEq)]
#[table(primary_key = row.account.raw())]
pub struct Greeting {
    pub account: Name,
    pub text: String,
}

const GREETINGS: MultiIndexDefinition<Greeting> = MultiIndexDefinition::new(name!("greetings"));

#[derive(Default)]
struct HelloContract;

#[contract]
impl HelloContract {
    #[action]
    fn greet(account: Name, text: String) {
        require_auth(account);
        check(text.len() <= 256, "greeting too long");
        let greetings = GREETINGS.index(get_self(), get_self().raw());
        greetings.emplace(account, Greeting { account, text });
    }
}
```

## 3. Build configuration

Contracts target `wasm32-unknown-unknown`. The host functions are imported, so the linker must allow undefined symbols. The workspace's `.cargo/config.toml` already sets this; for a contract outside the workspace, use:

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

## 4. Build, deploy and read it back

```bash
cargo build --target wasm32-unknown-unknown --release -p hello
# wasm: target/wasm32-unknown-unknown/release/hello.wasm
# abi:  contracts/hello/abi.json (written by build.rs)

pulse-ts set-code yourname1 ./target/wasm32-unknown-unknown/release/hello.wasm
pulse-ts set-abi  yourname1 ./contracts/hello/abi.json
pulse-ts push-action yourname1 greet '{"account":"yourname1","text":"hi"}' -a yourname1
pulse-ts table yourname1 greetings
```

The last command prints the row you just wrote. Next, [bind a second key to `greet` only](/build/get-started#_6-give-a-second-key-one-job).

## The best reference is the chain itself

`pulse_token` (token semantics, `stat`/`accounts` tables) and `pulse_system` (accounts, resources, permissions) in [pulse-cdt-rust](https://github.com/MetalBlockchain/pulse-cdt-rust) are the reference system contracts — the most authoritative examples of the CDT in real use.

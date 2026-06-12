# Rust Quickstart

Contracts in Rust via [pulse-cdt-rust](https://github.com/MetalBlockchain/pulse-cdt-rust) — the canonical CDT for PulseVM system contracts (the chain's own token and system contracts are written with it).

## A minimal action

```rust
#[contract]
impl HelloContract {
    #[action]
    fn greet(account: Name, text: String) {
        require_auth(account);
        check(text.len() <= 256, "greeting too long");
        // table ops via MultiIndexDefinition — see pulse_token for the full pattern
    }
}
```

## Build

```bash
cargo build --target wasm32-unknown-unknown --release -p my_contract
# requires .cargo/config.toml rustflags including: -C link-arg=--import-undefined
```

Deploy the resulting `.wasm` + ABI with [pulse-cli-ts](/build/cli).

## Reference contracts

The best documentation is the deployed reality: `pulse_token` (token semantics, `stat`/`accounts` tables) and `pulse_system` (accounts, resources, permissions) in the pulse-cdt-rust repo.

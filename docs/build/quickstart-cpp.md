---
description: "Write a PulseVM smart contract in C++ with the public Antelope CDT (cdt 4.x): install, build to WebAssembly with an ABI, deploy, call and read back."
---

# C++ quickstart

If you've written EOSIO or Antelope contracts, you already know how to write for PulseVM: `eosio::contract`, `multi_index`, `check()` and inline actions work the same way. Build with the public Antelope CDT and deploy the output unchanged.

> New to PulseVM? Do [Get started](/build/get-started) first: CLI, keys, an account and an endpoint.

## 1. Install the Antelope CDT

Use CDT 4.x from [AntelopeIO/cdt releases](https://github.com/AntelopeIO/cdt/releases). The release ships an Ubuntu package for x86_64:

```bash
wget https://github.com/AntelopeIO/cdt/releases/download/v4.1.1/cdt_4.1.1-1_amd64.deb
sudo apt install ./cdt_4.1.1-1_amd64.deb
cdt-cpp --version
```

On macOS or an ARM machine, run those commands in an x86_64 Ubuntu container or VM, or build the CDT from source by following the repository's README.

## 2. A minimal contract

Save this as `hello.cpp`:

```cpp
#include <eosio/eosio.hpp>
using namespace eosio;

class [[eosio::contract]] hello : public contract {
public:
   using contract::contract;

   [[eosio::action]]
   void greet(name account, std::string text) {
      require_auth(account);
      check(text.size() <= 256, "greeting too long");
      greetings table(get_self(), get_self().value);
      table.emplace(account, [&](auto& row) {
         row.account = account;
         row.text = text;
      });
   }

private:
   struct [[eosio::table]] greeting {
      name account;
      std::string text;
      uint64_t primary_key() const { return account.value; }
   };
   typedef multi_index<"greetings"_n, greeting> greetings;
};
```

## 3. Build

```bash
cdt-cpp -abigen -contract=hello -o hello.wasm hello.cpp
```

This writes `hello.wasm` and `hello.abi` next to each other.

## 4. Deploy, call and read back

```bash
pulse-ts set-code yourname1 ./hello.wasm
pulse-ts set-abi  yourname1 ./hello.abi
pulse-ts push-action yourname1 greet '{"account":"yourname1","text":"hi"}' -a yourname1
pulse-ts table yourname1 greetings
```

The last command returns the row you wrote:

```json
{ "rows": [ { "account": "yourname1", "text": "hi" } ], "more": false }
```

A failed `check()` with a string literal surfaces as `eosio assert failed: <message>`, for example `eosio assert failed: greeting too long`.

## Compatibility

PulseVM serves about 180 Antelope host functions: tables and secondary indexes, inline actions, `check()` and asserts, permission checks, name, asset and symbol types, and the hash functions. Contracts built by CDT 4.x for Leap-era chains, such as XPR Network, use this surface.

Not yet served: the `CRYPTO_PRIMITIVES` set (`alt_bn128`, `mod_exp`, `blake2_f`, `sha3`, `k1_recover`), the `bls_*` functions and `set_finalizers`. Current EOS and Telos system contracts use some of these. See [Host functions](/build/intrinsics).

`setcode` checks that the module is valid WebAssembly within the chain's limits. It doesn't check host imports. A contract that imports a function PulseVM doesn't serve deploys, then every action on it fails with `failed to create wasm instance …`, and nothing changes. Check the imports before you deploy:

```bash
wasm-objdump -x -j Import hello.wasm      # from the WABT tools
```

Every name under `env.` must be in the [Host functions](/build/intrinsics) list.

## Next

- Give a second key permission to call only `greet`: [Get started, step 6](/build/get-started#_6-give-a-second-key-one-job).
- Build the full pattern in Rust, a bot key with enforced limits: [Tutorial: a bot key that can only trade](/build/tutorial-bot-key).

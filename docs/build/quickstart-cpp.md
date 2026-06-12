# C++ Quickstart

PulseVM fully supports C++ contracts through the Antelope Contract Development Kit ([pulse-cdt](https://github.com/MetalBlockchain/pulse-cdt)). If you've written EOSIO/Antelope contracts, this is the same model — `eosio::contract`, `multi_index`, `check()`, inline actions — and the deepest existing PulseVM contracts (exchanges, DeFi) are C++.

> New to the testnet? Do [Getting Started](/build/get-started) first.

## A minimal contract

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

## Build & deploy

With the Pulse/Antelope CDT toolchain installed:

```bash
cdt-cpp hello.cpp -o hello.wasm        # produces hello.wasm + hello.abi

pulse-ts set-code myacct ./hello.wasm
pulse-ts set-abi  myacct ./hello.abi
pulse-ts push-action myacct greet '{"account":"myacct","text":"hi"}' --actor myacct
```

## Compatibility notes

PulseVM implements the Antelope intrinsic set with ongoing additions. A few host functions (some float/256-bit secondary-index variants, parts of transaction introspection, and some crypto primitives) are still landing — a contract that imports a not-yet-served intrinsic will fail to load. The common cases (tables, inline actions, `check()`, asserts, name/asset/symbol, sha256/512) all work today.

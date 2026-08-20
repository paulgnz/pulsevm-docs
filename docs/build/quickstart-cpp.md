# C++ Quickstart

PulseVM fully supports C++ contracts through the Antelope Contract Development Kit (`pulse-cdt` — repo currently private; any standard Antelope CDT builds compatible WASM). If you've written EOSIO/Antelope contracts, this is the same model — `eosio::contract`, `multi_index`, `check()`, inline actions — and the deepest existing PulseVM contracts (exchanges, DeFi) are C++.

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

## Compatibility

PulseVM implements the Antelope intrinsic set: tables and secondary indexes, inline actions, `check()` and asserts, name/asset/symbol types, and the SHA family all work as you'd expect from Antelope/EOSIO. If a contract needs a host function the VM doesn't yet expose, it's caught at deploy time rather than failing silently.

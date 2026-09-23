## Everything a bank needs is built in. On Ethereum or any EVM chain, you would build it.

That holds for public Ethereum and for private EVM networks alike. The middle column is code your team writes, audits and defends for as long as it runs. The right column is how PulseVM accounts already work.

| You need to | On Ethereum or an EVM chain | On PulseVM |
|:---|:---|:---|
| Know who is on the other side of a payment | Map hex addresses to customers in your own systems | Accounts carry names: acme.treas, branch.14, payroll |
| Require two officers to approve large payments | Deploy a multisig wallet contract, then audit and maintain it | Set 2 of 3 on the account. The ledger enforces it |
| Let a processor or a bot do one thing only | Add a session-key module and a guard contract, and audit both | Grant one permitted action. The ledger refuses that key for anything else |
| Revoke a departed officer's authority | Move assets to a new wallet, or build a recovery module | Replace the key in one approved change. Nothing moves |
| Spare customers any network fees | Run a paymaster and relayer service, and keep it funded | The institution provisions capacity. Customers hold nothing |
| Audit how authority works | Every wallet, module and paymaster is a separate audit | One account model, the same for every application |
| Know when a payment is final | Mainnet: about 13 minutes. Private EVM: depends on the consensus you choose | About a second, never reorganized, nothing to configure |
| Keep transactions out of public view | Mainnet: public forever. Private EVM: yes, on your own network | Your network, your members, your boundary |

Details: [vs a permissioned EVM](/compare/permissioned-evm), [vs Ethereum](/compare/ethereum), [accounts vs smart-contract wallets](/compare/smart-contract-wallets).

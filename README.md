# pulsevm-docs

The documentation & reference site for **[PulseVM](https://github.com/MetalBlockchain/pulsevm)** — the open-source, Antelope-lineage (ex-EOSIO) execution environment for Metal Blockchain subnets, running on Avalanche Snowman consensus. PulseVM is the base for A-Chain, the future of XPR Network.

🌐 **Live: [pulsevm.dev](https://pulsevm.dev)**

## What's here

- **Guide** — accounts & permissions, native multisig, resources, finality
- **For Institutions** — banks & fintechs, credit unions, government, enterprises, objections answered
- **Compare** — vs Ethereum, vs permissioned EVM
- **Build** — getting started, Rust / C++ / TypeScript quickstarts, CLIs, RPC & REST API
- **Network** — endpoints, launching your own network, running a validator
- **Repositories** — the canonical MetalBlockchain stack

The site is markdown-first and agent-friendly: every page is also served as raw markdown (append `.md` to any path), with [`/llms.txt`](https://pulsevm.dev/llms.txt), [`/llms-full.txt`](https://pulsevm.dev/llms-full.txt), and an [`/agents`](https://pulsevm.dev/agents) quickstart.

## Develop

[VitePress](https://vitepress.dev). Content lives in `docs/`.

```bash
npm install
npm run dev      # local preview
npm run build    # static build + llms.txt / markdown mirrors (scripts/postbuild.mjs)
```

Deployed on Vercel; pushes to `main` ship automatically.

## Contributing

Corrections and additions welcome — open a PR. Pages are plain markdown under `docs/`. Keep the tone plain-spoken and the technical claims verifiable.

## Credits

PulseVM is open source, created by Metallicus CTO Glenn Mariën ([@MlennGarien](https://github.com/MlennGarien)). Site by [Paul Grey](https://paulgrey.nz). A [Metallicus](https://metallicus.com) project on [Metal Blockchain](https://metalblockchain.org).

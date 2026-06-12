# Trade Finance & Supply Chain

Letters of credit, invoice factoring, and provenance tracking are classic consortium problems — many parties, shared state, and a hard requirement that competitors on the same network not see each other's books.

## Why the primitives fit

- **[Private, per-relationship networks](/guide/privacy)** solve the confidentiality problem that sank earlier enterprise-blockchain efforts: isolate by trade relationship, or encrypt sensitive payloads at the application layer.
- **Named accounts** for banks, exporters, importers, carriers, and customs — accountable identities, not anonymous addresses.
- **[Multisig](/guide/multisig)** for document approval and conditional release; **[instant finality](/guide/finality)** for settlement the moment terms are met.
- **Provenance** as an append-only, freely auditable record across the chain of custody.

## Deployment shape

A trade consortium (banks + corporates + logistics) runs a network with rules matching the trade agreements; bridges connect to other networks only where the business requires.

**[Talk to us — Contact Metallicus →](https://metallicus.com/contact-us)**

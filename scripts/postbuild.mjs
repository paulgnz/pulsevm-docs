// Agent/LLM affordances: mirror every page as raw markdown into the built
// site (same path + .md), and generate /llms.txt (index) + /llms-full.txt
// (full corpus) per llmstxt.org.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'

const SRC = 'docs'
const DIST = 'docs/.vitepress/dist'
const SITE = 'https://pulsevm.dev'

const pages = []
function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) {
      if (e === '.vitepress' || e === 'public' || e === 'node_modules') continue
      walk(p)
    } else if (e.endsWith('.md')) pages.push(p)
  }
}
walk(SRC)

let full = `# PulseVM — full documentation corpus\n# ${SITE} · source: github.com/paulgnz/pulsevm-docs\n\n`
const index = []
for (const p of pages.sort()) {
  const rel = relative(SRC, p)                       // e.g. guide/multisig.md
  const out = join(DIST, rel)
  mkdirSync(dirname(out), { recursive: true })
  const raw = readFileSync(p, 'utf8')
  writeFileSync(out, raw)
  const title = (raw.match(/^#\s+(.+)$/m) || raw.match(/text:\s*(.+)$/m) || [,'(home)'])[1]
  const url = `${SITE}/${rel}`
  index.push(`- [${title}](${url})`)
  full += `\n\n---\n# SOURCE: ${url}\n\n${raw}`
}

const llms = `# PulseVM

> Antelope-lineage (ex-EOSIO) execution on Avalanche Snowman consensus, as a Metal Blockchain subnet plugin. Named accounts, native permissions & multisig, instant irreversible finality. Open source: https://github.com/MetalBlockchain/pulsevm

Every page on this site is also available as raw markdown at the same path with a .md extension.
Full corpus: ${SITE}/llms-full.txt · Agent quickstart: ${SITE}/agents.md

## Pages

${index.join('\n')}
`
writeFileSync(join(DIST, 'llms.txt'), llms)
writeFileSync(join(DIST, 'llms-full.txt'), full)
console.log(`postbuild: ${pages.length} md mirrors + llms.txt + llms-full.txt`)

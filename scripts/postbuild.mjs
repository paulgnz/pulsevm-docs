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
    } else if (e.endsWith('.md') && e !== '404.md') pages.push(p)
  }
}
walk(SRC)

let full = `# PulseVM — full documentation corpus\n# ${SITE} · source: github.com/paulgnz/pulsevm-docs\n\n`
const entries = []
for (const p of pages.sort()) {
  const rel = relative(SRC, p)                       // e.g. guide/multisig.md
  const out = join(DIST, rel)
  mkdirSync(dirname(out), { recursive: true })
  const raw = readFileSync(p, 'utf8')
  writeFileSync(out, raw)
  const fm = (raw.match(/^---\n([\s\S]*?)\n---/) || [, ''])[1]
  const heroText = (fm.match(/^\s+text:\s*(.+)$/m) || [])[1]
  const title = (raw.match(/^#\s+(.+)$/m) || [, heroText || 'PulseVM'])[1].replace(/^["']|["']$/g, '')
  const desc = ((fm.match(/^description:\s*"?(.*?)"?\s*$/m) || [])[1] || '').replace(/\\"/g, '"')
  const url = `${SITE}/${rel}`
  entries.push({ rel, title, desc, url })
  full += `\n\n---\n# SOURCE: ${url}\n\n${raw}`
}

// llmstxt.org: H2 sections, one line per page with its description; most useful first
const START = ['index.md', 'guide/what-is-pulsevm.md', 'guide/accounts-permissions.md', 'guide/delegated-authority.md', 'build/get-started.md', 'agents.md']
const SECTIONS = [
  ['Start here', (e) => START.includes(e.rel)],
  ['Guide', (e) => e.rel.startsWith('guide/')],
  ['Build', (e) => e.rel.startsWith('build/') || e.rel.startsWith('concepts/')],
  ['Compare', (e) => e.rel.startsWith('compare/')],
  ['Solutions', (e) => e.rel.startsWith('institutions/') || e.rel.startsWith('industries/')],
  ['Network', (e) => e.rel.startsWith('network/')],
  ['Other', () => true],
]
const used = new Set()
let body = ''
for (const [name, match] of SECTIONS) {
  let list = entries.filter((e) => !used.has(e.rel) && match(e))
  if (name === 'Start here') list = START.map((r) => list.find((e) => e.rel === r)).filter(Boolean)
  if (!list.length) continue
  list.forEach((e) => used.add(e.rel))
  body += `\n## ${name}\n\n` + list.map((e) => `- [${e.title}](${e.url})${e.desc ? `: ${e.desc}` : ''}`).join('\n') + '\n'
}

const llms = `# PulseVM

> PulseVM runs the Antelope (formerly EOSIO) account and contract model on Avalanche Snowman consensus, as a Metal Blockchain VM plugin. Readable named accounts with permission trees, keys bound to one contract action (linkauth), native multisig, staked resources instead of gas, finality in about a second, on a network the institution owns. Open source: https://github.com/MetalBlockchain/pulsevm

Every page on this site is also available as raw markdown at the same path with a .md extension.
Full corpus: ${SITE}/llms-full.txt · Agent quickstart: ${SITE}/agents.md
${body}`
writeFileSync(join(DIST, 'llms.txt'), llms)
writeFileSync(join(DIST, 'llms-full.txt'), full)
console.log(`postbuild: ${pages.length} md mirrors + llms.txt + llms-full.txt`)

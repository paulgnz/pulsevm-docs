// Agent/LLM affordances: mirror every page as raw markdown into the built
// site (same path + .md), and generate /llms.txt (index) + /llms-full.txt
// (full corpus) per llmstxt.org.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'

const SRC = 'docs'
const DIST = 'docs/.vitepress/dist'
const SITE = 'https://pulsevm.dev'


// Vue components render to HTML on the site but are bare tags in markdown.
// Replace them with their plain-text versions (docs/.vitepress/agent-text/*.md)
// so the .md mirrors and llms-full.txt carry the same content an HTML reader sees.
const AGENT_TEXT = join(SRC, '.vitepress', 'agent-text')
function agentText(md) {
  md = md.replace(/<ProofBand\s+:items="\[([\s\S]*?)\]"\s*\/>/g, (_, body) => {
    const items = [...body.matchAll(/figure:\s*'([^']*)',\s*text:\s*'([^']*)',\s*source:\s*'([^']*)',\s*href:\s*'([^']*)'/g)]
    return '**Proof you can check**\n\n' + items.map(([, f, t, s, h]) => `- **${f}** ${t} ([${s}](${h}))`).join('\n')
  })
  // home layout: the hero lives in frontmatter; surface it as the page's heading
  const fm = md.match(/^---\n([\s\S]*?)\n---\n/)
  if (fm && /\nhero:/.test('\n' + fm[1])) {
    const pick = (k) => ((fm[1].match(new RegExp('^\\s+' + k + ':\\s*(.+)$', 'm')) || [])[1] || '').replace(/^["']|["']$/g, '')
    const hero = `# ${pick('name')}: ${pick('text')}\n\n${pick('tagline')}\n\n`
    md = md.slice(0, fm[0].length) + '\n' + hero + md.slice(fm[0].length)
  }
  md = md.replace(/<NetworkScene[^>]*\/>\n?/g, '')
  md = md.replace(/<([A-Z][A-Za-z]+)\s*\/>/g, (tag, name) => {
    try { return readFileSync(join(AGENT_TEXT, `${name}.md`), 'utf8').trim() } catch { return tag }
  })
  // brand-strip markup and page-local <style> blocks are presentation only
  md = md.replace(/<div class="brand-strip">[\s\S]*?<\/div>\n?/g, '').replace(/<style>[\s\S]*?<\/style>\n?/g, '')
  return md
}

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
  const raw = agentText(readFileSync(p, 'utf8'))
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

> PulseVM runs the Antelope (formerly EOSIO) account and contract model on Avalanche Snowman consensus, as a Metal Blockchain VM plugin. Readable named accounts with permission trees, keys bound to one contract action (linkauth), native multisig, staked resources instead of gas, finality in about a second, on a network the institution owns. Source (PulseVM Business License: free for evaluation and non-commercial use, commercial use licensed by Metallicus): https://github.com/MetalBlockchain/pulsevm

Every page on this site is also available as raw markdown at the same path with a .md extension.
Full corpus: ${SITE}/llms-full.txt · Agent quickstart: ${SITE}/agents.md
${body}`
writeFileSync(join(DIST, 'llms.txt'), llms)
writeFileSync(join(DIST, 'llms-full.txt'), full)
console.log(`postbuild: ${pages.length} md mirrors + llms.txt + llms-full.txt`)

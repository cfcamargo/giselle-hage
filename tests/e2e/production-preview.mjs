import { cp, mkdtemp, rm, symlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn, spawnSync } from 'node:child_process'

const projectRoot = dirname(dirname(dirname(fileURLToPath(import.meta.url))))
const previewRoot = await mkdtemp(join(tmpdir(), 'giselle-production-preview-'))
const excludedDirectories = new Set([
  '.git',
  '.nuxt',
  '.output',
  '.superpowers',
  'dist',
  'node_modules',
  'playwright-report',
  'test-results'
])

function includeSource(source) {
  const pathFromRoot = relative(projectRoot, source)

  return pathFromRoot === '' || !pathFromRoot.split(sep).some(part => excludedDirectories.has(part))
}

await cp(projectRoot, previewRoot, { recursive: true, filter: includeSource })
await symlink(join(projectRoot, 'node_modules'), join(previewRoot, 'node_modules'), 'dir')

const environment = {
  ...process.env,
  HOST: '127.0.0.1',
  NUXT_PUBLIC_SITE_URL: 'https://www.gisellehage.com.br',
  PORT: '3000'
}
const build = spawnSync('npm', ['run', 'build'], {
  cwd: previewRoot,
  env: environment,
  stdio: 'inherit'
})

if (build.status !== 0) {
  await rm(previewRoot, { recursive: true, force: true })
  process.exit(build.status ?? 1)
}

const preview = spawn('npm', ['run', 'preview'], {
  cwd: previewRoot,
  env: environment,
  stdio: 'inherit'
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => preview.kill(signal))
}

preview.once('exit', async (code) => {
  await rm(previewRoot, { recursive: true, force: true })
  process.exit(code ?? 0)
})

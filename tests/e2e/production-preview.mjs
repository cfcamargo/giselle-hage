import { cp, mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const projectRoot = dirname(dirname(dirname(fileURLToPath(import.meta.url))))
const previewRoot = await mkdtemp(join(tmpdir(), 'giselle-production-preview-'))
const excludedTopLevelPaths = new Set([
  '.git',
  '.nuxt',
  '.output',
  'dist',
  'node_modules',
  'playwright-report',
  'test-results'
])
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
let activeChild
let receivedSignal

function includeSource(source) {
  const pathFromRoot = relative(projectRoot, source)
  const [topLevelPath] = pathFromRoot.split(sep)

  return pathFromRoot === '' || !excludedTopLevelPaths.has(topLevelPath)
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: previewRoot,
      env: environment,
      stdio: 'inherit'
    })
    activeChild = child

    child.once('error', reject)
    child.once('exit', (code, signal) => {
      if (activeChild === child) activeChild = undefined
      if (code === 0) resolve()
      else reject(new Error(`${command} ${args.join(' ')} exited with ${signal ?? code}`))
    })
  })
}

function forwardSignal(signal) {
  receivedSignal = signal
  activeChild?.kill(signal)
}

function throwIfSignaled() {
  if (receivedSignal) throw new Error(`Received ${receivedSignal}`)
}

const signalHandlers = new Map([
  ['SIGINT', () => forwardSignal('SIGINT')],
  ['SIGTERM', () => forwardSignal('SIGTERM')]
])

for (const [signal, handler] of signalHandlers) process.once(signal, handler)

const environment = {
  ...process.env,
  HOST: '127.0.0.1',
  NUXT_PUBLIC_SITE_URL: 'https://preview.example.test',
  PORT: process.env.E2E_PORT ?? '3000'
}

try {
  await cp(projectRoot, previewRoot, { recursive: true, filter: includeSource })
  throwIfSignaled()
  await run(npmCommand, ['ci', '--legacy-peer-deps'])
  throwIfSignaled()
  await run(npmCommand, ['run', 'build'])
  throwIfSignaled()
  await run(npmCommand, ['run', 'preview'])
} catch (error) {
  if (!receivedSignal) console.error(error)
  process.exitCode = 1
} finally {
  for (const [signal, handler] of signalHandlers) process.removeListener(signal, handler)
  activeChild?.kill('SIGTERM')
  await rm(previewRoot, { recursive: true, force: true })
}

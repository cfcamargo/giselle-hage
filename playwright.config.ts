import { defineConfig, devices } from '@playwright/test'

const previewPort = process.env.E2E_PORT ?? '3000'
const previewOrigin = `http://127.0.0.1:${previewPort}`

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: previewOrigin
  },
  webServer: {
    command: 'node tests/e2e/production-preview.mjs',
    gracefulShutdown: { signal: 'SIGTERM', timeout: 30_000 },
    url: previewOrigin,
    reuseExistingServer: false,
    timeout: 120_000
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ]
})

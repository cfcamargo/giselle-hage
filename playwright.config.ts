import { defineConfig, devices } from '@playwright/test'

const previewOrigin = 'http://127.0.0.1:3000'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: previewOrigin
  },
  webServer: {
    command: 'npm run test:e2e:preview',
    url: previewOrigin,
    reuseExistingServer: false,
    timeout: 45_000
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ]
})

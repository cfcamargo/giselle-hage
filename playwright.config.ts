import { defineConfig, devices } from '@playwright/test'

const previewOrigin = 'http://127.0.0.1:3000'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: previewOrigin
  },
  webServer: {
    command: "env NUXT_PUBLIC_SITE_URL=https://www.gisellehage.com.br HOST=127.0.0.1 PORT=3000 sh -c 'npm run build && unlink .output/server/node_modules/vue && npm run preview'",
    url: previewOrigin,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ]
})

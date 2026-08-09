// @vitest-environment node

import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('landing SEO without a configured public origin', async () => {
  await setup({ rootDir: process.cwd(), dev: true })

  it('never renders localhost as the canonical origin', async () => {
    const html = await $fetch<string>('/')

    expect(html).not.toContain('rel="canonical" href="http://localhost')
    expect(html).not.toContain('property="og:url" content="http://localhost')
    expect(html).not.toContain('"url":"http://localhost')
  })
})

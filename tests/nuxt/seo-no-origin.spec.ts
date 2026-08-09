// @vitest-environment node

import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'

describe('landing SEO without a configured public origin', async () => {
  await setup({
    rootDir: process.cwd(),
    dev: true,
    env: {
      NUXT_PUBLIC_SITE_URL: ''
    }
  })

  it('omits every origin-dependent SEO field', async () => {
    const html = await $fetch<string>('/')
    const jsonLdSource = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1]

    expect(html).not.toMatch(/<link[^>]+rel="canonical"/)
    expect(html).not.toMatch(/<meta[^>]+property="og:url"/)
    expect(jsonLdSource).toBeDefined()

    const structuredData = JSON.parse(jsonLdSource!)
    const localBusiness = structuredData['@graph'][0]

    expect(localBusiness).not.toHaveProperty('@id')
    expect(localBusiness).not.toHaveProperty('url')
    expect(localBusiness).not.toHaveProperty('image')
  })
})

// @vitest-environment node

import { describe, expect, it } from 'vitest'
import { $fetch, setup } from '@nuxt/test-utils/e2e'
import { Window } from 'happy-dom'

type JsonLdNode = Record<string, unknown>

const isAbsoluteUrl = (value: unknown): boolean => {
  if (typeof value === 'string') {
    return /^https?:\/\//i.test(value)
  }

  if (Array.isArray(value)) {
    return value.some(isAbsoluteUrl)
  }

  if (value && typeof value === 'object') {
    return Object.values(value).some(isAbsoluteUrl)
  }

  return false
}

const hasBusinessType = (node: JsonLdNode): boolean => {
  const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']]

  return types.some(type => type === 'LocalBusiness' || type === 'Dentist')
}

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
    const document = new Window().document
    document.write(html)

    expect(document.querySelector('link[rel~="canonical"]')).toBeNull()
    expect(document.querySelector('meta[property="og:url"]')).toBeNull()

    const structuredData = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map(script => JSON.parse(script.textContent || 'null'))
      .flatMap(value => Array.isArray(value) ? value : [value])
      .flatMap(value => Array.isArray(value?.['@graph']) ? value['@graph'] : [value])
      .filter((node): node is JsonLdNode => Boolean(node && typeof node === 'object'))
    const businessNodes = structuredData.filter(hasBusinessType)

    expect(businessNodes.length).toBeGreaterThan(0)

    for (const businessNode of businessNodes) {
      expect(businessNode).not.toHaveProperty('@id')
      expect(businessNode).not.toHaveProperty('url')
      expect(isAbsoluteUrl(businessNode.image)).toBe(false)
    }
  })
})

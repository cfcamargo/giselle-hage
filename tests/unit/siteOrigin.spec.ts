import { describe, expect, it } from 'vitest'
import { resolveSiteOrigin } from '../../utils/siteOrigin'

describe('resolveSiteOrigin', () => {
  it.each([
    ['https://example.test', 'https://example.test/'],
    ['https://example.test/path?query=1#section', 'https://example.test/'],
    ['https://example.test:8443/path', 'https://example.test:8443/']
  ])('normalizes a trusted HTTPS URL to its origin', (configured, expected) => {
    expect(resolveSiteOrigin(configured)).toBe(expected)
  })

  it.each([
    undefined,
    '',
    'not a URL',
    'http://example.test',
    'https://user:secret@example.test',
    'javascript:alert(1)'
  ])('rejects an unsafe or missing origin (%s)', (configured) => {
    expect(resolveSiteOrigin(configured)).toBeUndefined()
  })
})

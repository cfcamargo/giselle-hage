import { describe, expect, it } from 'vitest'
import { landingContent } from '../../data/landing'

describe('landingContent', () => {
  it('keeps the three commercial priorities in order', () => {
    expect(landingContent.treatments.map(item => item.slug)).toEqual([
      'botox', 'preenchimento', 'peeling'
    ])
  })
})

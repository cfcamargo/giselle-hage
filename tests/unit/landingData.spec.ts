import { describe, expect, it } from 'vitest'
import { landingContent } from '../../data/landing'

describe('landingContent', () => {
  it('keeps the three commercial priorities in order', () => {
    expect(landingContent.treatments.map(item => item.slug)).toEqual([
      'botox', 'preenchimento', 'peeling'
    ])
  })

  it('keeps a unique anchor for every treatment', () => {
    const slugs = landingContent.treatments.map(treatment => treatment.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('provides complete treatment summaries without guarantee language', () => {
    for (const treatment of landingContent.treatments) {
      expect(treatment.image).toMatch(/^\//)
      expect(treatment.summary.length).toBeGreaterThan(40)
      expect(treatment.summary).not.toMatch(/garantid|definitiv|sem risco/i)
    }
  })

  it('describes every treatment image for assistive technology', () => {
    for (const treatment of landingContent.treatments) {
      expect(treatment.alt.length).toBeGreaterThan(20)
    }
  })

  it('provides descriptive, supported metadata for every clinical result', () => {
    expect(landingContent.results.every(item => item.alt.length >= 20)).toBe(true)
    expect(landingContent.results.every(item => ['botox', 'preenchimento'].includes(item.category))).toBe(true)
  })

  it('keeps the professional profile verifiable and evaluation-led', () => {
    expect(landingContent.profile.registration).toBe('CRO-MS 4589')
    expect(landingContent.profile.evaluation).toMatch(/avaliação individual/i)
  })
})

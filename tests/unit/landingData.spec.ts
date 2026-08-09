import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
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

  it('provides objective montage metadata for every published result asset', () => {
    expect(landingContent.results).toHaveLength(7)
    expect(landingContent.results.every(item => item.alt.length >= 20)).toBe(true)
    expect(landingContent.results.every(item => ['botox', 'preenchimento'].includes(item.category))).toBe(true)
    expect(landingContent.results.every(item => /montagem lado a lado/i.test(item.alt))).toBe(true)
    expect(landingContent.results.every(item => /texto incorporado/i.test(item.alt))).toBe(true)
    expect(landingContent.results.every(item => !/após|avaliação|planejamento|realizad|acompanhamento/i.test(item.alt))).toBe(true)
  })

  it('publishes each result image and binary asset only once', () => {
    const images = landingContent.results.map(item => item.image)
    const hashes = images.map((image) => {
      const asset = readFileSync(join(process.cwd(), 'public', image.replace(/^\//, '')))
      return createHash('sha256').update(asset).digest('hex')
    })

    expect(new Set(images).size).toBe(7)
    expect(new Set(hashes).size).toBe(7)
  })

  it('keeps the professional profile verifiable and evaluation-led', () => {
    expect(landingContent.profile.registration).toBe('CRO-MS 4589')
    expect(landingContent.profile.evaluation).toMatch(/avaliação individual/i)
  })
})

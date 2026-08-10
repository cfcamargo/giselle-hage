import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('deployment configuration', () => {
  it('targets Vercel explicitly when running in the Vercel build environment', () => {
    const source = readFileSync(join(process.cwd(), 'nuxt.config.ts'), 'utf8')

    expect(source).toContain('nitro: {')
    expect(source).toContain('asyncContext: true')
    expect(source).toContain("preset: process.env.VERCEL ? 'vercel' : undefined")
    expect(source).toContain("compatibilityDate: '2026-08-10'")
  })
})

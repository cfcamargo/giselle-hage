import { afterEach, describe, expect, it, vi } from 'vitest'

describe('useReducedMotion', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it('reflects the reduced-motion media query', async () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    })))

    const { useReducedMotion } = await import('../../composables/useReducedMotion')

    expect(useReducedMotion().value).toBe(true)
  })

  it('updates when the reduced-motion preference changes', async () => {
    let listener: ((event: MediaQueryListEvent) => void) | undefined
    const mediaQuery = {
      matches: false,
      addEventListener: (_: string, callback: (event: MediaQueryListEvent) => void) => {
        listener = callback
      },
      removeEventListener: vi.fn()
    } as unknown as MediaQueryList

    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { useReducedMotion } = await import('../../composables/useReducedMotion')
    const reducedMotion = useReducedMotion()

    listener?.({ matches: true } as MediaQueryListEvent)

    expect(reducedMotion.value).toBe(true)
  })
})

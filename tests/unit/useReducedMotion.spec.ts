import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

describe('useReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it('reflects the reduced-motion media query', async () => {
    const addEventListener = vi.fn()
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: true,
      addEventListener,
      removeEventListener: vi.fn()
    })))

    const { useReducedMotion } = await import('../../composables/useReducedMotion')

    expect(useReducedMotion().value).toBe(true)
    expect(addEventListener).not.toHaveBeenCalled()
  })

  it('updates when the reduced-motion preference changes', async () => {
    let listener: ((event: MediaQueryListEvent) => void) | undefined
    const mediaQuery = {
      matches: false,
      addEventListener: (_: string, callback: (event: MediaQueryListEvent) => void) => {
        listener = callback
      },
      removeEventListener: vi.fn()
    } as unknown as Omit<MediaQueryList, 'matches'> & { matches: boolean }

    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { useReducedMotion } = await import('../../composables/useReducedMotion')
    let reducedMotion: ReturnType<typeof useReducedMotion>
    const Consumer = defineComponent({
      setup() {
        reducedMotion = useReducedMotion()

        return () => h('div')
      }
    })
    const consumer = mount(Consumer)

    listener?.({ matches: true } as MediaQueryListEvent)

    expect(reducedMotion!.value).toBe(true)

    consumer.unmount()
  })

  it('removes the media-query listener after the last consumer unmounts', async () => {
    const addEventListener = vi.fn()
    const removeEventListener = vi.fn()
    const mediaQuery = {
      matches: false,
      addEventListener,
      removeEventListener
    } as unknown as MediaQueryList & { matches: boolean }

    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { useReducedMotion } = await import('../../composables/useReducedMotion')
    const Consumer = defineComponent({
      setup() {
        useReducedMotion()

        return () => h('div')
      }
    })

    const firstConsumer = mount(Consumer)
    const secondConsumer = mount(Consumer)

    firstConsumer.unmount()

    expect(removeEventListener).not.toHaveBeenCalled()

    secondConsumer.unmount()

    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('does not retain a listener for an unscoped caller after a component cycle', async () => {
    const addEventListener = vi.fn()
    const removeEventListener = vi.fn()
    const mediaQuery = {
      matches: false,
      addEventListener,
      removeEventListener
    } as unknown as Omit<MediaQueryList, 'matches'> & { matches: boolean }

    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { useReducedMotion } = await import('../../composables/useReducedMotion')
    const externalPreference = useReducedMotion()
    const Consumer = defineComponent({
      setup() {
        useReducedMotion()

        return () => h('div')
      }
    })

    expect(addEventListener).not.toHaveBeenCalled()

    const consumer = mount(Consumer)
    consumer.unmount()
    mediaQuery.matches = true

    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(externalPreference.value).toBe(false)
  })

  it('does not warn or leave a listener when called during render', async () => {
    const addEventListener = vi.fn()
    const removeEventListener = vi.fn()
    const mediaQuery = {
      matches: false,
      addEventListener,
      removeEventListener
    } as unknown as MediaQueryList
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { useReducedMotion } = await import('../../composables/useReducedMotion')
    const Consumer = defineComponent({
      setup() {
        return () => {
          useReducedMotion()

          return h('div')
        }
      }
    })

    const consumer = mount(Consumer)
    consumer.unmount()

    expect(warn).not.toHaveBeenCalled()
    expect(removeEventListener).toHaveBeenCalledTimes(addEventListener.mock.calls.length)
  })
})

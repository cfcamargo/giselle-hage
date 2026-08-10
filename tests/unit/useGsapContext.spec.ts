import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'

const { context, revert, state } = vi.hoisted(() => {
  const revert = vi.fn()
  const context = vi.fn((setup: () => void) => {
    setup()
    return { revert }
  })
  const state: { defer: boolean, resolve?: () => void } = { defer: false }

  return { context, revert, state }
})

vi.mock('gsap', () => {
  if (state.defer) {
    return new Promise(resolve => {
      state.resolve = () => resolve({ gsap: { context } })
    })
  }

  return { gsap: { context } }
})

describe('useGsapContext', () => {
  afterEach(() => {
    context.mockClear()
    revert.mockClear()
    state.defer = false
    state.resolve = undefined
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it('reverts the GSAP context when its component unmounts', async () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    })))

    const animation = vi.fn()
    const { useGsapContext } = await import('../../composables/useGsapContext')
    const Component = defineComponent({
      setup() {
        const scope = ref<HTMLElement | null>(null)
        useGsapContext(scope, animation)

        return () => h('section', { ref: scope })
      }
    })

    const wrapper = mount(Component)
    await nextTick()
    await vi.dynamicImportSettled()

    expect(context).toHaveBeenCalledWith(expect.any(Function), wrapper.element)

    wrapper.unmount()

    expect(revert).toHaveBeenCalledOnce()
  })

  it('does not run animations when reduced motion is preferred', async () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    })))

    const animation = vi.fn()
    const { useGsapContext } = await import('../../composables/useGsapContext')
    const Component = defineComponent({
      setup() {
        const scope = ref<HTMLElement | null>(null)
        useGsapContext(scope, animation)

        return () => h('section', { ref: scope })
      }
    })

    mount(Component)
    await nextTick()
    await vi.dynamicImportSettled()

    expect(animation).not.toHaveBeenCalled()
    expect(context).not.toHaveBeenCalled()
  })

  it('does not create an animation context after its component unmounts', async () => {
    state.defer = true
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    })))

    const animation = vi.fn()
    const { useGsapContext } = await import('../../composables/useGsapContext')
    const Component = defineComponent({
      setup() {
        const scope = ref<HTMLElement | null>(null)
        useGsapContext(scope, animation)

        return () => h('section', { ref: scope })
      }
    })

    const wrapper = mount(Component)
    await nextTick()
    wrapper.unmount()
    state.resolve?.()
    await vi.dynamicImportSettled()

    expect(animation).not.toHaveBeenCalled()
    expect(context).not.toHaveBeenCalled()
  })

  it('reverts ordinary motion and rebuilds it when the live preference changes', async () => {
    let matches = false
    const listeners = new Set<(event: MediaQueryListEvent) => void>()
    const mediaQuery = {
      media: '(prefers-reduced-motion: reduce)',
      get matches() {
        return matches
      },
      addEventListener: vi.fn((type: string, listener: (event: MediaQueryListEvent) => void) => {
        if (type === 'change') listeners.add(listener)
      }),
      removeEventListener: vi.fn((type: string, listener: (event: MediaQueryListEvent) => void) => {
        if (type === 'change') listeners.delete(listener)
      }),
      setMatches(nextMatches: boolean) {
        matches = nextMatches
        const event = { matches, media: mediaQuery.media } as MediaQueryListEvent
        for (const listener of listeners) listener(event)
      }
    }
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const cleanup = vi.fn()
    const animation = vi.fn((_gsap, element: HTMLElement) => {
      element.dataset.motion = 'active'
      return () => {
        delete element.dataset.motion
        cleanup()
      }
    })
    const { useGsapContext } = await import('../../composables/useGsapContext')
    const Component = defineComponent({
      setup() {
        const scope = ref<HTMLElement | null>(null)
        useGsapContext(scope, gsap => animation(gsap, scope.value!))

        return () => h('section', { ref: scope })
      }
    })

    const wrapper = mount(Component)
    await nextTick()
    await vi.dynamicImportSettled()

    expect(wrapper.attributes('data-motion')).toBe('active')
    expect(context).toHaveBeenCalledTimes(1)

    mediaQuery.setMatches(true)
    await nextTick()

    expect(wrapper.attributes('data-motion')).toBeUndefined()
    expect(revert).toHaveBeenCalledTimes(1)
    expect(cleanup).toHaveBeenCalledTimes(1)

    mediaQuery.setMatches(false)
    await nextTick()
    await vi.dynamicImportSettled()

    expect(wrapper.attributes('data-motion')).toBe('active')
    expect(context).toHaveBeenCalledTimes(2)

    wrapper.unmount()

    expect(revert).toHaveBeenCalledTimes(2)
    expect(cleanup).toHaveBeenCalledTimes(2)
    expect(mediaQuery.removeEventListener).toHaveBeenCalled()
  })
})

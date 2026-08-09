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
})

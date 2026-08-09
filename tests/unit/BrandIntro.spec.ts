import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import BrandIntro from '../../components/landing/BrandIntro.vue'

const gsapState = vi.hoisted(() => {
  const state: { onComplete?: () => void } = {}
  const kill = vi.fn()
  const chain = { to: vi.fn(), kill }
  chain.to.mockReturnValue(chain)

  return {
    state,
    set: vi.fn(),
    kill,
    timeline: vi.fn((options: { onComplete: () => void }) => {
      state.onComplete = options.onComplete
      return chain
    })
  }
})

vi.mock('gsap', () => ({
  gsap: {
    set: gsapState.set,
    timeline: gsapState.timeline
  }
}))

describe('BrandIntro', () => {
  let wrapper: VueWrapper | undefined

  beforeEach(() => {
    sessionStorage.clear()
    vi.useFakeTimers()
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    })))
    gsapState.state.onComplete = undefined
    gsapState.set.mockClear()
    gsapState.timeline.mockClear()
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = undefined
    document.documentElement.classList.remove('intro-active')
    vi.clearAllTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('skips the full timeline when the session flag exists', async () => {
    sessionStorage.setItem('giselle-intro-seen', '1')

    wrapper = mount(BrandIntro)
    await nextTick()
    await nextTick()

    expect(wrapper.emitted('complete')).toHaveLength(1)
  })

  it('exposes a skip control while the intro is active', () => {
    wrapper = mount(BrandIntro)

    expect(wrapper.get('button').text()).toContain('Pular introdução')
  })

  it('renders the existing logo at the intended intro scale', () => {
    wrapper = mount(BrandIntro)

    expect(wrapper.get('svg').attributes('width')).toBe('150')
    expect(wrapper.get('svg').attributes('height')).toBe('78')
  })

  it('uses 2100 ms as a hard cap and records completion', async () => {
    wrapper = mount(BrandIntro)
    await nextTick()
    await vi.dynamicImportSettled()

    await vi.advanceTimersByTimeAsync(2099)
    expect(wrapper.emitted('complete')).toBeUndefined()

    await vi.advanceTimersByTimeAsync(1)
    expect(wrapper.emitted('complete')).toHaveLength(1)
    expect(sessionStorage.getItem('giselle-intro-seen')).toBe('1')
  })

  it('records the session flag when the skip control is activated', async () => {
    wrapper = mount(BrandIntro)
    await nextTick()

    await wrapper.get('button').trigger('click')

    expect(sessionStorage.getItem('giselle-intro-seen')).toBe('1')
    expect(wrapper.emitted('complete')).toHaveLength(1)
  })

  it('completes on the next tick when reduced motion is preferred', async () => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    })))

    wrapper = mount(BrandIntro)
    await nextTick()
    await nextTick()

    expect(wrapper.emitted('complete')).toHaveLength(1)
    expect(sessionStorage.getItem('giselle-intro-seen')).toBe('1')
  })

  it('emits completion only once when completion paths race', async () => {
    wrapper = mount(BrandIntro)
    await nextTick()
    await vi.dynamicImportSettled()

    await wrapper.get('button').trigger('click')
    gsapState.state.onComplete?.()
    await vi.runAllTimersAsync()

    expect(wrapper.emitted('complete')).toHaveLength(1)
  })

  it('removes the scroll lock and pending timeout when unmounted', async () => {
    wrapper = mount(BrandIntro)
    await nextTick()
    await vi.dynamicImportSettled()

    expect(document.documentElement.classList.contains('intro-active')).toBe(true)
    expect(vi.getTimerCount()).toBe(1)

    wrapper.unmount()
    wrapper = undefined

    expect(document.documentElement.classList.contains('intro-active')).toBe(false)
    expect(vi.getTimerCount()).toBe(0)
  })
})

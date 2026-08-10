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

interface ControlledMediaQuery extends MediaQueryList {
  setMatches: (matches: boolean) => void
}

function installMatchMedia(initial: boolean) {
  let matches = initial
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  const mediaQuery = {
    media: '(prefers-reduced-motion: reduce)',
    get matches() {
      return matches
    },
    onchange: null,
    addEventListener: vi.fn((type: string, listener: (event: MediaQueryListEvent) => void) => {
      if (type === 'change') listeners.add(listener)
    }),
    removeEventListener: vi.fn((type: string, listener: (event: MediaQueryListEvent) => void) => {
      if (type === 'change') listeners.delete(listener)
    }),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
    setMatches(nextMatches: boolean) {
      matches = nextMatches
      const event = { matches, media: mediaQuery.media } as MediaQueryListEvent
      for (const listener of listeners) listener(event)
      mediaQuery.onchange?.(event)
    }
  } as ControlledMediaQuery

  vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))
  return mediaQuery
}

describe('BrandIntro', () => {
  let wrapper: VueWrapper | undefined

  beforeEach(() => {
    sessionStorage.clear()
    vi.useFakeTimers()
    installMatchMedia(false)
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
    window.history.replaceState({}, '', '/')
  })

  it('replays the full timeline even when an old session flag exists', async () => {
    sessionStorage.setItem('giselle-intro-seen', '1')

    wrapper = mount(BrandIntro)
    await nextTick()
    await vi.dynamicImportSettled()

    expect(wrapper.attributes('data-intro-state')).toBe('active')
    expect(gsapState.timeline).toHaveBeenCalledOnce()
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

  it('stays visible while the asynchronous animation is being prepared', () => {
    wrapper = mount(BrandIntro)

    expect(wrapper.attributes('data-intro-state')).toBe('pending')
    expect(wrapper.attributes('style')).toBeUndefined()
  })

  it('uses 2100 ms as a hard cap', async () => {
    wrapper = mount(BrandIntro)
    await nextTick()
    await vi.dynamicImportSettled()

    await vi.advanceTimersByTimeAsync(2099)
    expect(wrapper.emitted('complete')).toBeUndefined()

    await vi.advanceTimersByTimeAsync(1)
    expect(wrapper.emitted('complete')).toHaveLength(1)
    expect(sessionStorage.getItem('giselle-intro-seen')).toBeNull()
  })

  it('finishes without recording a session flag when the skip control is activated', async () => {
    wrapper = mount(BrandIntro)
    await nextTick()

    await wrapper.get('button').trigger('click')

    expect(sessionStorage.getItem('giselle-intro-seen')).toBeNull()
    expect(wrapper.emitted('complete')).toHaveLength(1)
  })

  it('completes on the next tick when reduced motion is preferred', async () => {
    installMatchMedia(true)

    wrapper = mount(BrandIntro)
    await nextTick()
    await nextTick()

    expect(wrapper.emitted('complete')).toHaveLength(1)
    expect(sessionStorage.getItem('giselle-intro-seen')).toBeNull()
  })

  it('finishes an active intro immediately when reduced motion is enabled and does not restart it', async () => {
    const mediaQuery = installMatchMedia(false)
    wrapper = mount(BrandIntro)
    await nextTick()
    await vi.dynamicImportSettled()

    expect(wrapper.attributes('data-intro-state')).toBe('active')
    expect(document.documentElement.classList.contains('intro-active')).toBe(true)
    expect(vi.getTimerCount()).toBe(1)

    mediaQuery.setMatches(true)
    await nextTick()

    expect(wrapper.attributes('data-intro-state')).toBe('complete')
    expect(wrapper.emitted('complete')).toHaveLength(1)
    expect(document.documentElement.classList.contains('intro-active')).toBe(false)
    expect(vi.getTimerCount()).toBe(0)
    expect(sessionStorage.getItem('giselle-intro-seen')).toBeNull()

    mediaQuery.setMatches(false)
    await nextTick()

    expect(wrapper.attributes('data-intro-state')).toBe('complete')
    expect(wrapper.emitted('complete')).toHaveLength(1)
    expect(gsapState.timeline).toHaveBeenCalledTimes(1)
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

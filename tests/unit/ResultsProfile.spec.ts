import { mount, type VueWrapper } from '@vue/test-utils'
import { renderToString } from '@vue/server-renderer'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createSSRApp, nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AboutSection from '../../components/landing/AboutSection.vue'
import ResultsSection from '../../components/landing/ResultsSection.vue'

const motionState = vi.hoisted(() => {
  const state: { defer: boolean, resolve?: () => void } = { defer: false }
  const revert = vi.fn()
  const fromTo = vi.fn()
  const set = vi.fn()
  const to = vi.fn()
  const toArray = vi.fn((selector: string) => Array.from(document.querySelectorAll(selector)))
  const timeline = vi.fn((options: { scrollTrigger?: { pin?: boolean } } = {}) => {
    if (options.scrollTrigger?.pin) {
      const spacer = document.createElement('div')
      spacer.className = 'pin-spacer'
      document.body.append(spacer)
    }

    const chain = { fromTo, to }
    fromTo.mockReturnValue(chain)
    to.mockReturnValue(chain)
    return chain
  })
  const context = vi.fn((setup: () => void) => {
    setup()
    return { revert }
  })
  const registerPlugin = vi.fn()

  return { context, fromTo, registerPlugin, revert, set, state, timeline, to, toArray }
})

vi.mock('gsap', () => {
  const module = {
    gsap: {
      context: motionState.context,
      registerPlugin: motionState.registerPlugin,
      set: motionState.set,
      timeline: motionState.timeline,
      utils: {
        toArray: motionState.toArray
      }
    }
  }

  if (motionState.state.defer) {
    return new Promise((resolve) => {
      motionState.state.resolve = () => resolve(module)
    })
  }

  return module
})

const ScrollTrigger = { name: 'ScrollTrigger' }
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger }))

const NuxtImg = {
  inheritAttrs: false,
  props: ['src', 'alt'],
  template: '<img :src="src" :alt="alt">'
}

interface ControlledMediaQuery extends MediaQueryList {
  setMatches: (matches: boolean) => void
}

function installMatchMedia(reduced: boolean, desktop = true) {
  let reducedMatches = reduced
  const listeners = new Set<(event: MediaQueryListEvent) => void>()
  const mediaQuery = {
    media: '(prefers-reduced-motion: reduce)',
    get matches() {
      return reducedMatches
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
      reducedMatches = nextMatches
      const event = { matches: reducedMatches, media: mediaQuery.media } as MediaQueryListEvent
      for (const listener of listeners) listener(event)
      mediaQuery.onchange?.(event)
    }
  } as ControlledMediaQuery
  const desktopQuery = {
    media: '(min-width: 64rem)',
    get matches() {
      return desktop
    },
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => true)
  } as MediaQueryList

  vi.stubGlobal('matchMedia', vi.fn((query: string) => {
    return query.includes('prefers-reduced-motion') ? mediaQuery : desktopQuery
  }))
  return mediaQuery
}

function installAnimationFrame() {
  let nextId = 1
  const callbacks = new Map<number, FrameRequestCallback>()
  const request = vi.fn((callback: FrameRequestCallback) => {
    const id = nextId++
    callbacks.set(id, callback)
    return id
  })
  const cancel = vi.fn((id: number) => callbacks.delete(id))
  vi.stubGlobal('requestAnimationFrame', request)
  vi.stubGlobal('cancelAnimationFrame', cancel)

  return {
    cancel,
    flush() {
      const pending = [...callbacks.values()]
      callbacks.clear()
      for (const callback of pending) callback(16)
    },
    pending: () => callbacks.size
  }
}

function configureGalleryLayout(wrapper: VueWrapper) {
  const gallery = wrapper.get('#results-gallery').element as HTMLElement
  const viewportElement = wrapper.get('[data-results-viewport]').element as HTMLElement
  const cardOffsets = [32, 416, 800, 1184, 1568, 1952, 2336]
  const clientWidth = 1024
  const scrollWidth = 2728
  let scrollLeft = 0
  const rectangle = (left: number, width: number): DOMRect => ({
    x: left,
    y: 0,
    top: 0,
    left,
    right: left + width,
    bottom: 100,
    width,
    height: 100,
    toJSON: () => ({})
  })

  // Mirrors the real browser: an `overflow: visible` track's own clientWidth
  // inflates to match its scrollWidth, so travel must be measured against the
  // clipping viewport element instead (see getMaxTrackTravel in the component).
  Object.defineProperty(gallery, 'clientWidth', { configurable: true, value: scrollWidth })
  Object.defineProperty(gallery, 'scrollWidth', { configurable: true, value: scrollWidth })
  Object.defineProperty(gallery, 'scrollLeft', {
    configurable: true,
    get: () => scrollLeft
  })
  Object.defineProperty(gallery, 'getBoundingClientRect', {
    configurable: true,
    value: () => rectangle(0, clientWidth)
  })
  Object.defineProperty(viewportElement, 'clientWidth', { configurable: true, value: clientWidth })

  for (const [index, card] of wrapper.findAll('[data-result-card]').entries()) {
    Object.defineProperty(card.element, 'offsetLeft', {
      configurable: true,
      value: cardOffsets[index]
    })
    Object.defineProperty(card.element, 'getBoundingClientRect', {
      configurable: true,
      value: () => rectangle(cardOffsets[index]! - scrollLeft, 360)
    })
  }

  return {
    maxScroll: scrollWidth - clientWidth,
    setScrollLeft(nextScrollLeft: number) {
      scrollLeft = nextScrollLeft
    }
  }
}

async function settleMotion() {
  await nextTick()
  await vi.dynamicImportSettled()
  await nextTick()
}

describe('results and professional profile', () => {
  const wrappers: VueWrapper[] = []
  let animationFrame: ReturnType<typeof installAnimationFrame>

  beforeEach(() => {
    installMatchMedia(true)
    animationFrame = installAnimationFrame()
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn()
    })
  })

  afterEach(() => {
    for (const wrapper of wrappers) wrapper.unmount()
    wrappers.length = 0
    document.querySelectorAll('.pin-spacer').forEach(spacer => spacer.remove())
    motionState.context.mockClear()
    motionState.fromTo.mockClear()
    motionState.registerPlugin.mockClear()
    motionState.revert.mockClear()
    motionState.set.mockClear()
    motionState.state.defer = false
    motionState.state.resolve = undefined
    motionState.timeline.mockClear()
    motionState.to.mockClear()
    motionState.toArray.mockClear()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('renders result cards as one labelled horizontal gallery with honest context', () => {
    const wrapper = mount(ResultsSection, {
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)

    expect(wrapper.get('section').attributes('id')).toBe('resultados')
    expect(wrapper.find('[data-results-stage]').exists()).toBe(true)
    expect(wrapper.find('[data-results-pin]').exists()).toBe(true)
    expect(wrapper.get('[data-results-track]').attributes('id')).toBe('results-gallery')
    expect(wrapper.find('[data-results-progress]').exists()).toBe(true)
    expect(wrapper.get('[role="region"]').attributes('aria-describedby')).toBe('results-disclaimer')
    expect(wrapper.findAll('[data-result-card]')).toHaveLength(7)
    expect(wrapper.findAll('[data-result-image]')).toHaveLength(7)
    expect(wrapper.findAll('[data-result-card] img').every(image => (image.attributes('alt')?.length ?? 0) >= 20)).toBe(true)
    expect(wrapper.text()).toContain('Montagens fotográficas')
    expect(wrapper.findAll('figcaption small').every(label => label.text() === 'Montagem lado a lado')).toBe(true)
    expect(wrapper.get('#results-disclaimer').text()).toContain('Resultados variam de pessoa para pessoa')
    expect(wrapper.find('[role="slider"]').exists()).toBe(false)
  })

  it('keeps mobile result cards dimensionally stable while images load', () => {
    const source = readFileSync(join(process.cwd(), 'components/landing/ResultsSection.vue'), 'utf8')

    expect(source).not.toContain('<ResultsDesktopGallery')
    expect(source).not.toContain('<ResultsMobileGallery')
    expect(source).not.toContain('ScrollTrigger')
    expect(source).not.toContain('window.scrollTo')
    expect(source).not.toContain('scrollTop')
    expect(source).toContain('syncingFromSectionScroll')
    expect(source).toContain('syncingFromControl')
    expect(source).toContain('data-results-stage')
    expect(source).toContain('data-results-pin')
    expect(source).toContain('data-results-track')
    expect(source).toContain('data-result-card')
    expect(source).toContain('data-results-progress')
    expect(source).toContain('.results-section__stage')
    expect(source).toContain('.results-section__pin')
    expect(source).toContain('.results-section__viewport')
    expect(source).toContain('position: sticky;')
    expect(source).toContain('scroll-snap-type: x mandatory;')
    expect(source).toContain('@media (min-width: 64rem)')
    expect(source).toContain('@media (prefers-reduced-motion: reduce)')
    expect(source).toContain('overflow: hidden;')
    expect(source).toContain('.results-section__viewport li {')
    expect(source).toContain('.results-section__viewport li.is-current {')
    expect(source).toContain('.results-section__viewport figure {\n  position: relative;')
    expect(source).toContain('aspect-ratio: 1;')
    expect(source).toContain('.results-section__viewport img {\n  position: absolute;')
    expect(source).toContain('inset: 0;')
    expect(source).toContain('height: 100%;')
    expect(source).toContain('<img')
    expect(source).not.toContain('<NuxtImg\n                :src="result.image"')
  })

  it('keeps controls and current result state in sync with the cinematic gallery', async () => {
    const wrapper = mount(ResultsSection, {
      attachTo: document.body,
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)

    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 1 de 7')
    expect(wrapper.findAll('[data-result-card]')[0]!.attributes('aria-current')).toBe('true')

    await wrapper.get('button[aria-label="Ver próximo resultado"]').trigger('click')
    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 2 de 7')
    expect(wrapper.findAll('[data-result-card]')[1]!.attributes('aria-current')).toBe('true')
    expect(wrapper.findAll('[data-result-card]')[0]!.attributes('aria-current')).toBeUndefined()

    for (let index = 0; index < 5; index += 1) {
      await wrapper.get('button[aria-label="Ver próximo resultado"]').trigger('click')
    }

    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 7 de 7')
    expect(wrapper.findAll('[data-result-card]')[6]!.attributes('aria-current')).toBe('true')
  })

  it('starts controls from the visually current card and keeps edge controls focused', async () => {
    const wrapper = mount(ResultsSection, {
      attachTo: document.body,
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    const previous = wrapper.get('button[aria-label="Ver resultado anterior"]')
    const next = wrapper.get('button[aria-label="Ver próximo resultado"]')

    for (let index = 0; index < 6; index += 1) {
      await next.trigger('click')
    }

    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 7 de 7')
    expect(next.attributes('aria-disabled')).toBe('true')
    expect(next.attributes()).not.toHaveProperty('disabled')
    ;(next.element as HTMLElement).focus()
    await next.trigger('click')
    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 7 de 7')
    expect(document.activeElement).toBe(next.element)

    ;(previous.element as HTMLElement).focus()
    for (let index = 0; index < 6; index += 1) {
      await previous.trigger('click')
    }

    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 1 de 7')
    expect(previous.attributes('aria-disabled')).toBe('true')
    expect(previous.attributes()).not.toHaveProperty('disabled')
    expect(document.activeElement).toBe(previous.element)
  })

  it('removes the page scroll listener and cancels pending cinematic synchronization on unmount', async () => {
    installMatchMedia(false)
    const removeEventListener = vi.spyOn(window, 'removeEventListener')
    const wrapper = mount(ResultsSection, {
      attachTo: document.body,
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    configureGalleryLayout(wrapper)
    await nextTick()
    animationFrame.flush()
    animationFrame.flush()
    await settleMotion()

    window.dispatchEvent(new Event('scroll'))
    expect(animationFrame.pending()).toBe(1)

    wrapper.unmount()
    wrappers.pop()

    expect(animationFrame.cancel).toHaveBeenCalledOnce()
    expect(removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
    expect(removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('supports arrow keys when the result rail itself is focused', async () => {
    const wrapper = mount(ResultsSection, {
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    const gallery = wrapper.get('#results-gallery')

    await gallery.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 2 de 7')

    await gallery.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 1 de 7')
  })

  it('advances the mobile editorial deck with native horizontal scroll alignment', async () => {
    installMatchMedia(false, false)
    const scrollIntoView = vi.spyOn(HTMLElement.prototype, 'scrollIntoView')
    const wrapper = mount(ResultsSection, {
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)

    await wrapper.get('button[aria-label="Ver próximo resultado"]').trigger('click')
    await nextTick()

    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 2 de 7')
    expect(wrapper.findAll('[data-result-card]')[1]!.attributes('aria-current')).toBe('true')
    expect(scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({
      block: 'nearest',
      inline: 'center'
    }))
  })

  it('uses the results source when opening the evaluation CTA', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    const sources: string[] = []
    const receiveSource = (event: Event) => {
      sources.push((event as CustomEvent<{ source: string }>).detail.source)
    }
    window.addEventListener('whatsapp:click', receiveSource)
    const wrapper = mount(ResultsSection, {
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)

    await wrapper.get('a').trigger('click')

    expect(open).toHaveBeenCalledOnce()
    expect(sources).toEqual(['results'])
    window.removeEventListener('whatsapp:click', receiveSource)
  })

  it('rechecks reduced motion after deferred animation imports resolve', async () => {
    motionState.state.defer = true
    const mediaQuery = installMatchMedia(false)
    const wrapper = mount(AboutSection, {
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    await vi.waitFor(() => expect(motionState.state.resolve).toBeTypeOf('function'))

    mediaQuery.setMatches(true)
    motionState.state.resolve?.()
    await settleMotion()

    expect(motionState.context).not.toHaveBeenCalled()
  })

  it('creates sticky cinematic motion for results when motion is allowed', async () => {
    installMatchMedia(false)
    const wrapper = mount(ResultsSection, {
      attachTo: document.body,
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    configureGalleryLayout(wrapper)
    await nextTick()
    animationFrame.flush()
    animationFrame.flush()
    await settleMotion()

    const source = readFileSync(join(process.cwd(), 'components/landing/ResultsSection.vue'), 'utf8')

    expect(source).toContain('position: sticky;')
    expect(source).toContain('window.addEventListener(\'scroll\', queueSectionSync')
    expect(source).toContain('translate3d(${-travel * nextProgress}px, 0, 0)')
    expect(motionState.registerPlugin).not.toHaveBeenCalledWith(ScrollTrigger)
    expect(wrapper.get('[data-results-stage]').classes()).toContain('is-cinematic')

    wrapper.unmount()
    wrappers.pop()
  })

  it('translates the desktop track horizontally as the page scrolls through the pin', async () => {
    installMatchMedia(false)
    const wrapper = mount(ResultsSection, {
      attachTo: document.body,
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    configureGalleryLayout(wrapper)
    await nextTick()
    animationFrame.flush()
    animationFrame.flush()
    await settleMotion()

    const stageElement = wrapper.get('[data-results-stage]').element as HTMLElement
    Object.defineProperty(stageElement, 'offsetHeight', { configurable: true, value: 2000 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })
    Object.defineProperty(stageElement, 'getBoundingClientRect', {
      configurable: true,
      value: () => ({ top: -600, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => ({}) })
    })

    window.dispatchEvent(new Event('scroll'))
    animationFrame.flush()
    await nextTick()

    const trackElement = wrapper.get('[data-results-track]').element as HTMLElement
    expect(trackElement.style.transform).not.toBe('translate3d(0px, 0, 0)')

    wrapper.unmount()
    wrappers.pop()
  })

  it('keeps the profile in normal flow and cleans up its reveal animation', async () => {
    installMatchMedia(false)
    const wrapper = mount(AboutSection, {
      attachTo: document.body,
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    await settleMotion()

    expect(document.querySelectorAll('.pin-spacer')).toHaveLength(0)
    expect(motionState.registerPlugin).toHaveBeenCalledWith(ScrollTrigger)

    wrapper.unmount()
    wrappers.pop()
    expect(motionState.revert).toHaveBeenCalledOnce()
  })

  it('reverts and rebuilds profile motion in both preference directions', async () => {
    const mediaQuery = installMatchMedia(false)
    const wrapper = mount(AboutSection, {
      attachTo: document.body,
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    await settleMotion()

    expect(wrapper.get('section').classes()).toContain('js-motion')
    expect(motionState.context).toHaveBeenCalledTimes(1)

    mediaQuery.setMatches(true)
    await nextTick()

    expect(wrapper.get('section').classes()).not.toContain('js-motion')
    expect(motionState.revert).toHaveBeenCalledTimes(1)

    mediaQuery.setMatches(false)
    await settleMotion()

    expect(wrapper.get('section').classes()).toContain('js-motion')
    expect(motionState.context).toHaveBeenCalledTimes(2)

    wrapper.unmount()
    wrappers.pop()
    expect(motionState.revert).toHaveBeenCalledTimes(2)
    expect(mediaQuery.removeEventListener).toHaveBeenCalled()
  })

  it('does not create profile motion when reduced motion is preferred', async () => {
    const wrapper = mount(AboutSection, {
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    await settleMotion()

    expect(motionState.context).not.toHaveBeenCalled()
    wrapper.unmount()
    wrappers.pop()
  })

  it('renders the verified profile and result context in server HTML', async () => {
    const resultsApp = createSSRApp(ResultsSection)
    resultsApp.component('NuxtImg', NuxtImg)
    const aboutApp = createSSRApp(AboutSection)
    aboutApp.component('NuxtImg', NuxtImg)

    const [resultsHtml, aboutHtml] = await Promise.all([
      renderToString(resultsApp),
      renderToString(aboutApp)
    ])

    expect(resultsHtml).toContain('Resultados variam de pessoa para pessoa')
    expect(resultsHtml).toContain('/results/botox1.jpg')
    expect(resultsHtml).toContain('href="https://api.whatsapp.com/send?phone=5567981269482&amp;text=')
    expect(aboutHtml).toContain('CRO-MS 4589')
    expect(aboutHtml).toContain('avaliação individual')
    expect(aboutHtml).toContain('/about.jpg')
  })
})

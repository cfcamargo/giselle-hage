import { mount, type VueWrapper } from '@vue/test-utils'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import AboutSection from '../../components/landing/AboutSection.vue'
import ResultsSection from '../../components/landing/ResultsSection.vue'

const motionState = vi.hoisted(() => {
  const revert = vi.fn()
  const fromTo = vi.fn()
  const timeline = vi.fn((options: { scrollTrigger?: { pin?: boolean } } = {}) => {
    if (options.scrollTrigger?.pin) {
      const spacer = document.createElement('div')
      spacer.className = 'pin-spacer'
      document.body.append(spacer)
    }

    const chain = { fromTo }
    fromTo.mockReturnValue(chain)
    return chain
  })
  const context = vi.fn((setup: () => void) => {
    setup()
    return { revert }
  })
  const registerPlugin = vi.fn()

  return { context, fromTo, registerPlugin, revert, timeline }
})

vi.mock('gsap', () => ({
  gsap: {
    context: motionState.context,
    registerPlugin: motionState.registerPlugin,
    timeline: motionState.timeline
  }
}))

const ScrollTrigger = { name: 'ScrollTrigger' }
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger }))

const NuxtImg = {
  inheritAttrs: false,
  props: ['src', 'alt'],
  template: '<img :src="src" :alt="alt">'
}

function installMatchMedia(reduced: boolean) {
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches: reduced,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  })))
}

async function settleMotion() {
  await nextTick()
  await vi.dynamicImportSettled()
  await nextTick()
}

describe('results and professional profile', () => {
  const wrappers: VueWrapper[] = []

  beforeEach(() => {
    installMatchMedia(true)
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
    motionState.timeline.mockClear()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('renders result cards as one labelled horizontal gallery with honest context', () => {
    const wrapper = mount(ResultsSection, {
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)

    expect(wrapper.get('section').attributes('id')).toBe('resultados')
    expect(wrapper.get('[role="region"]').attributes('aria-describedby')).toBe('results-disclaimer')
    expect(wrapper.findAll('[data-result-card]')).toHaveLength(10)
    expect(wrapper.findAll('[data-result-card] img').every(image => (image.attributes('alt')?.length ?? 0) >= 20)).toBe(true)
    expect(wrapper.get('#results-disclaimer').text()).toContain('Resultados variam de pessoa para pessoa')
    expect(wrapper.find('[role="slider"]').exists()).toBe(false)
  })

  it('advances and reverses the gallery while retaining keyboard focus', async () => {
    const wrapper = mount(ResultsSection, {
      attachTo: document.body,
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    const previous = wrapper.get('button[aria-label="Ver resultado anterior"]')
    const next = wrapper.get('button[aria-label="Ver próximo resultado"]')

    expect(previous.attributes()).toHaveProperty('disabled')
    next.element.focus()
    await next.trigger('click')

    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 2 de 10')
    expect(document.activeElement).toBe(next.element)

    await previous.trigger('click')
    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 1 de 10')

    wrapper.unmount()
    wrappers.pop()
  })

  it('supports arrow keys when the result rail itself is focused', async () => {
    const wrapper = mount(ResultsSection, {
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    const gallery = wrapper.get('#results-gallery')

    await gallery.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 2 de 10')

    await gallery.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.get('[role="status"]').text()).toContain('Resultado 1 de 10')
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
    expect(resultsHtml).toContain('/services/botox1.jpg')
    expect(aboutHtml).toContain('CRO-MS 4589')
    expect(aboutHtml).toContain('avaliação individual')
    expect(aboutHtml).toContain('/about.jpg')
  })
})

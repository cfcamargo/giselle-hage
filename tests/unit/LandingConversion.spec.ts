import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ClosingCta from '../../components/landing/ClosingCta.vue'
import FloatingWhatsApp from '../../components/landing/FloatingWhatsApp.vue'
import LocationSection from '../../components/landing/LocationSection.vue'
import SiteFooter from '../../components/landing/SiteFooter.vue'
import { landingContent } from '../../data/landing'

describe('landing conversion sections', () => {
  beforeEach(() => {
    vi.stubGlobal('open', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  })

  it('places the verified address and regional context before a lazy Portuguese map', () => {
    const wrapper = mount(LocationSection)
    const address = wrapper.get('address')
    const iframe = wrapper.get('iframe')

    expect(address.text()).toContain(landingContent.location.address)
    expect(address.element.compareDocumentPosition(iframe.element) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(wrapper.text()).toContain('Pedro Juan Caballero')
    expect(iframe.attributes('loading')).toBe('lazy')
    expect(iframe.attributes('title')).toBeTruthy()
    expect(iframe.attributes('src')).toContain('pt-BR')
  })

  it.each([
    [LocationSection, 'location'],
    [ClosingCta, 'closing']
  ] as const)('reports the correct WhatsApp source from %s', async (component, source) => {
    const received: string[] = []
    window.addEventListener('whatsapp:click', ((event: CustomEvent<{ source: string }>) => received.push(event.detail.source)) as EventListener, { once: true })
    const wrapper = mount(component)

    await wrapper.get('a[href^="https://api.whatsapp.com/"]').trigger('click')

    expect(received).toEqual([source])
  })

  it('shows the floating CTA after the hero action leaves view and disconnects its observer', async () => {
    const heroAction = document.createElement('a')
    heroAction.className = 'landing-hero__cta'
    document.body.append(heroAction)
    let callback: IntersectionObserverCallback | undefined
    const disconnect = vi.fn()
    const observe = vi.fn()
    class IntersectionObserverDouble {
      readonly root = null
      readonly rootMargin = ''
      readonly thresholds: number[] = []
      disconnect = disconnect
      observe = observe
      unobserve = vi.fn()
      takeRecords = vi.fn(() => [])

      constructor(handler: IntersectionObserverCallback) {
        callback = handler
      }
    }
    vi.stubGlobal('IntersectionObserver', IntersectionObserverDouble)

    const wrapper = mount(FloatingWhatsApp, { attachTo: document.body })
    await wrapper.vm.$nextTick()
    expect(wrapper.get('a').attributes('data-visible')).toBe('false')
    expect(observe).toHaveBeenCalledWith(heroAction)

    callback?.([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver)
    await wrapper.vm.$nextTick()

    expect(wrapper.get('a').attributes('data-visible')).toBe('true')
    wrapper.unmount()
    expect(disconnect).toHaveBeenCalledOnce()
  })

  it('keeps a real WhatsApp link as the floating no-JS fallback', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const wrapper = mount(FloatingWhatsApp)
    const link = wrapper.get('a')

    expect(link.attributes('href')).toMatch(/^https:\/\/api\.whatsapp\.com\//)
    expect(link.attributes('aria-label')).toContain('WhatsApp')
    expect(link.attributes('data-visible')).toBe('true')
  })

  it('renders the compact professional footer without a developer credit', () => {
    const wrapper = mount(SiteFooter)

    expect(wrapper.text()).toContain('Dra. Giselle Hage')
    expect(wrapper.text()).toContain('CRO-MS 4589')
    expect(wrapper.text()).not.toContain('Desenvolvido por')
    expect(wrapper.get('a[href*="instagram.com"]').exists()).toBe(true)
    expect(wrapper.get('a[href^="https://api.whatsapp.com/"]').exists()).toBe(true)
  })
})

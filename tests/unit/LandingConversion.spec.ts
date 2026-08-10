import { mount, shallowMount } from '@vue/test-utils'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ClosingCta from '../../components/landing/ClosingCta.vue'
import FloatingWhatsApp from '../../components/landing/FloatingWhatsApp.vue'
import LocationSection from '../../components/landing/LocationSection.vue'
import SiteFooter from '../../components/landing/SiteFooter.vue'
import LandingHero from '../../components/landing/LandingHero.vue'
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
    expect(wrapper.text()).not.toMatch(/clínica (?:em|no) (?:Pedro Juan Caballero|Paraguai)/i)
    expect(wrapper.text()).not.toMatch(/atendimento (?:em|no) Paraguai/i)
    expect(iframe.attributes('loading')).toBe('lazy')
    expect(iframe.attributes('title')).toBeTruthy()
    expect(iframe.attributes('src')).toContain('pt-BR')
    expect(iframe.attributes('referrerpolicy')).toBe('strict-origin-when-cross-origin')
  })

  it.each([
    [LocationSection, 'location'],
    [ClosingCta, 'closing']
  ] as const)('reports the correct WhatsApp source from %s', async (component, source) => {
    const received: string[] = []
    window.addEventListener('whatsapp:click', (event: Event) => {
      received.push((event as CustomEvent<{ source: string }>).detail.source)
    }, { once: true })
    const wrapper = mount(component)

    await wrapper.get('a[href^="https://api.whatsapp.com/"]').trigger('click')

    expect(received).toEqual([source])
  })

  function installFloatingTargets() {
    const heroAction = document.createElement('a')
    heroAction.dataset.heroCta = ''
    const closing = document.createElement('section')
    closing.id = 'agendamento-final'
    const footer = document.createElement('footer')
    footer.id = 'rodape'
    document.body.append(heroAction, closing, footer)

    return { closing, footer, heroAction }
  }

  function installIntersectionObserver() {
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

    return {
      disconnect,
      observe,
      emit(...entries: Array<{ target: Element, isIntersecting: boolean }>) {
        callback?.(entries as IntersectionObserverEntry[], {} as IntersectionObserver)
      }
    }
  }

  it('shows the floating CTA only between the hero and the closing boundaries', async () => {
    const targets = installFloatingTargets()
    const observer = installIntersectionObserver()

    const wrapper = mount(FloatingWhatsApp, { attachTo: document.body })
    await wrapper.vm.$nextTick()
    expect(wrapper.get('a').attributes('data-visible')).toBe('false')
    expect(observer.observe).toHaveBeenCalledTimes(3)
    expect(observer.observe).toHaveBeenCalledWith(targets.heroAction)
    expect(observer.observe).toHaveBeenCalledWith(targets.closing)
    expect(observer.observe).toHaveBeenCalledWith(targets.footer)

    observer.emit(
      { target: targets.heroAction, isIntersecting: false },
      { target: targets.closing, isIntersecting: false },
      { target: targets.footer, isIntersecting: false }
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.get('a').attributes('data-visible')).toBe('true')

    observer.emit({ target: targets.heroAction, isIntersecting: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.get('a').attributes('data-visible')).toBe('false')

    observer.emit({ target: targets.heroAction, isIntersecting: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.get('a').attributes('data-visible')).toBe('true')

    observer.emit({ target: targets.footer, isIntersecting: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.get('a').attributes('data-visible')).toBe('false')

    observer.emit({ target: targets.footer, isIntersecting: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.get('a').attributes('data-visible')).toBe('true')
    wrapper.unmount()
    expect(observer.disconnect).toHaveBeenCalledOnce()
  })

  it('starts hidden and keeps a real WhatsApp link in a noscript fallback', async () => {
    const html = await renderToString(createSSRApp(FloatingWhatsApp))

    expect(html).toContain('data-visible="false"')
    expect(html).toContain('<noscript')
    expect(html).toMatch(/<noscript[^>]*><a[^>]+href="https:\/\/api\.whatsapp\.com\//)
    expect(html).toMatch(/<noscript[^>]*><a[^>]+aria-label="[^"]*WhatsApp[^"]*"/)
  })

  it('stays safely hidden when observation targets are unavailable', async () => {
    const observer = installIntersectionObserver()
    const wrapper = mount(FloatingWhatsApp)
    const link = wrapper.get('a')

    expect(link.attributes('href')).toMatch(/^https:\/\/api\.whatsapp\.com\//)
    expect(link.attributes('aria-label')).toContain('WhatsApp')
    expect(link.attributes('data-visible')).toBe('false')
    expect(observer.observe).not.toHaveBeenCalled()
  })

  it('reports the floating source and enforces safe-area positioning without animation', async () => {
    const received: string[] = []
    window.addEventListener('whatsapp:click', (event: Event) => {
      received.push((event as CustomEvent<{ source: string }>).detail.source)
    }, { once: true })
    const wrapper = mount(FloatingWhatsApp)
    const link = wrapper.get('a')

    expect(link.element.getAttribute('style')).toContain('safe-area-inset-bottom')
    expect(link.element.getAttribute('style')).toContain('animation: none')
    await link.trigger('click')
    expect(received).toEqual(['floating'])
  })

  it('renders the compact professional footer without a developer credit', () => {
    const wrapper = mount(SiteFooter)

    expect(wrapper.text()).toContain('Dra. Giselle Hage')
    expect(wrapper.text()).toContain('CRO-MS 4589')
    expect(wrapper.text()).toContain(String(new Date().getFullYear()))
    expect(wrapper.text()).toContain(landingContent.location.address)
    expect(wrapper.text()).not.toContain('Desenvolvido por')
    expect(wrapper.find('a[href*="instagram.com"]').exists()).toBe(true)
    expect(wrapper.get('a[href*="instagram.com"]').attributes('href')).toBe(landingContent.contact.instagramUrl)
    expect(wrapper.find('a[href^="https://api.whatsapp.com/"]').exists()).toBe(true)
  })

  it('reports the footer source before opening WhatsApp', async () => {
    const received: string[] = []
    window.addEventListener('whatsapp:click', (event: Event) => {
      received.push((event as CustomEvent<{ source: string }>).detail.source)
    }, { once: true })
    const wrapper = mount(SiteFooter)

    await wrapper.get('a[href^="https://api.whatsapp.com/"]').trigger('click')

    expect(received).toEqual(['footer'])
    expect(window.open).toHaveBeenCalledOnce()
  })

  it('renders the exact primary conversion label in the hero', () => {
    const wrapper = shallowMount(LandingHero)

    expect(wrapper.get('[data-hero-cta]').text()).toContain('Agende sua avaliação')
    expect(wrapper.text()).not.toContain('Agendar minha avaliação')
  })
})

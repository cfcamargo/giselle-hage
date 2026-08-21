import { mount, type VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import LandingHeader from '../../components/landing/LandingHeader.vue'

describe('LandingHeader', () => {
  let wrapper: VueWrapper | undefined

  function mountHeader() {
    wrapper = mount(LandingHeader, { attachTo: document.body })
    return wrapper
  }

  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    })))
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = undefined
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('keeps the mobile links in a native disclosure in the initial HTML', () => {
    wrapper = mountHeader()

    const disclosure = wrapper.get('details')
    const panel = wrapper.get('#landing-mobile-navigation')

    expect(disclosure.element.contains(panel.element)).toBe(true)
    expect(panel.attributes('style') ?? '').not.toContain('opacity: 0')
    expect(panel.findAll('a').map(anchor => anchor.attributes('href'))).toEqual([
      '#sobre',
      '#harmonizacao-orofacial',
      '#procedimentos',
      '#casos',
      '#conteudos',
      '#contato'
    ])
  })

  it('exposes a desktop booking CTA that opens WhatsApp', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    wrapper = mountHeader()

    const cta = wrapper.get('a.landing-header__cta')
    expect(cta.text()).toBe('Agendar')

    await cta.trigger('click')

    expect(open).toHaveBeenCalledOnce()
  })

  it('updates the toggle name and returns focus after Escape closes the menu', async () => {
    wrapper = mountHeader()

    const disclosure = wrapper.get('details')
    const toggle = wrapper.get('summary')

    expect(toggle.attributes('aria-label')).toBe('Abrir navegação')
    expect(toggle.attributes('aria-controls')).toBe('landing-mobile-navigation')
    expect(wrapper.find('#landing-mobile-navigation').exists()).toBe(true)

    ;(disclosure.element as HTMLDetailsElement).open = true
    await disclosure.trigger('toggle')

    expect(toggle.attributes('aria-label')).toBe('Fechar navegação')

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()

    expect((disclosure.element as HTMLDetailsElement).open).toBe(false)
    expect(toggle.attributes('aria-label')).toBe('Abrir navegação')
    expect(document.activeElement).toBe(toggle.element)
  })
})

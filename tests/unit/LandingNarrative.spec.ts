import { mount, type VueWrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CredentialsStrip from '../../components/landing/CredentialsStrip.vue'
import PhilosophySection from '../../components/landing/PhilosophySection.vue'
import TreatmentsSection from '../../components/landing/TreatmentsSection.vue'

const NuxtImg = {
  inheritAttrs: false,
  props: ['src', 'alt'],
  template: '<img :src="src" :alt="alt">'
}

describe('landing narrative sections', () => {
  const wrappers: VueWrapper[] = []

  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    })))
  })

  afterEach(() => {
    for (const wrapper of wrappers) wrapper.unmount()
    wrappers.length = 0
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('renders the three credentials as a semantic list', () => {
    const wrapper = mount(CredentialsStrip)
    wrappers.push(wrapper)

    expect(wrapper.get('ul').findAll('li').map(item => item.text())).toEqual([
      'FormaçãoCirurgiã-dentista desde 2009',
      'Registro profissionalCRO-MS 4589',
      'AtendimentoAtendimento individualizado'
    ])
  })

  it('renders anchored treatment articles with accessible images and working CTAs', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    const receivedSources: string[] = []
    const receiveSource = (event: Event) => {
      receivedSources.push((event as CustomEvent<{ source: string }>).detail.source)
    }
    window.addEventListener('whatsapp:click', receiveSource)

    const wrapper = mount(TreatmentsSection, {
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)

    const articles = wrapper.findAll('article')
    expect(articles).toHaveLength(3)
    expect(articles.map(article => article.attributes('aria-labelledby'))).toEqual([
      'treatment-botox-title',
      'treatment-preenchimento-title',
      'treatment-peeling-title'
    ])
    expect(articles.map(article => article.get('img').attributes('alt'))).toEqual([
      'Mulher com expressão serena durante um cuidado facial individualizado.',
      'Perfil feminino em destaque para representar o planejamento dos contornos faciais.',
      'Rosto feminino em luz suave para representar o cuidado com a qualidade da pele.'
    ])

    const callsToAction = wrapper.findAll('article a')
    expect(callsToAction).toHaveLength(3)
    expect(callsToAction.every(link => link.attributes('href')?.startsWith('https://api.whatsapp.com/send?'))).toBe(true)

    await callsToAction[0].trigger('click')

    expect(open).toHaveBeenCalledOnce()
    expect(receivedSources).toEqual(['botox'])
    window.removeEventListener('whatsapp:click', receiveSource)
  })

  it('connects prevention, care and preservation in one labelled section', () => {
    const wrapper = mount(PhilosophySection)
    wrappers.push(wrapper)

    expect(wrapper.get('h2').text()).toBe('Prevenir. Cuidar. Preservar.')
    expect(wrapper.findAll('h3').map(heading => heading.text())).toEqual([
      'Prevenir', 'Cuidar', 'Preservar'
    ])
    expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true')
  })
})

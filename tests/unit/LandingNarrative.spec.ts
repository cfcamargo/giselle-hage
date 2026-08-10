import { mount, type VueWrapper } from '@vue/test-utils'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CredentialsStrip from '../../components/landing/CredentialsStrip.vue'
import PhilosophySection from '../../components/landing/PhilosophySection.vue'
import TreatmentsSection from '../../components/landing/TreatmentsSection.vue'

type Cleanup = () => void
type MediaListener = (event: MediaQueryListEvent) => void

const motionState = vi.hoisted(() => {
  let cleanupCollector: Cleanup[] | undefined

  function addCleanup(cleanup: Cleanup) {
    cleanupCollector?.push(cleanup)
  }

  function markMotion(target: unknown, mode: 'pin' | 'reveal') {
    if (!(target instanceof HTMLElement)) return

    target.dataset.motionMode = mode
    let spacer: HTMLElement | undefined
    if (mode === 'pin') {
      spacer = document.createElement('div')
      spacer.className = 'pin-spacer'
      spacer.dataset.pinFor = target.getAttribute('aria-labelledby') ?? ''
      document.body.append(spacer)
    }

    addCleanup(() => {
      delete target.dataset.motionMode
      spacer?.remove()
    })
  }

  const timeline = vi.fn((options: { scrollTrigger?: { trigger?: unknown, pin?: boolean } } = {}) => {
    const trigger = options.scrollTrigger?.trigger
    if (options.scrollTrigger?.pin) markMotion(trigger, 'pin')
    else if (options.scrollTrigger) markMotion(trigger, 'reveal')

    const chain = {
      fromTo: vi.fn()
    }
    chain.fromTo.mockReturnValue(chain)
    return chain
  })

  const fromTo = vi.fn((target: unknown, _from: unknown, to: { scrollTrigger?: unknown } = {}) => {
    if (to.scrollTrigger) markMotion(target, 'reveal')
    return { revert: vi.fn() }
  })

  const matchMediaInstances: Array<{ revert: ReturnType<typeof vi.fn> }> = []
  const matchMedia = vi.fn(() => {
    const bindings: Array<{ query: MediaQueryList, listener: MediaListener }> = []
    let revertCycle: Cleanup | undefined

    const instance = {
      add(conditions: Record<string, string>, setup: (context: { conditions: Record<string, boolean> }) => void | Cleanup) {
        const queries = Object.entries(conditions).map(([name, query]) => ({
          name,
          mediaQuery: window.matchMedia(query)
        }))

        const run = () => {
          revertCycle?.()
          const cleanups: Cleanup[] = []
          const previousCollector = cleanupCollector
          cleanupCollector = cleanups
          const cleanup = setup({
            conditions: Object.fromEntries(queries.map(({ name, mediaQuery }) => [name, mediaQuery.matches]))
          })
          cleanupCollector = previousCollector
          revertCycle = () => {
            cleanup?.()
            for (const dispose of cleanups.reverse()) dispose()
          }
        }

        for (const { mediaQuery } of queries) {
          const listener: MediaListener = () => run()
          mediaQuery.addEventListener('change', listener)
          bindings.push({ query: mediaQuery, listener })
        }
        run()
        return instance
      },
      revert: vi.fn(() => {
        revertCycle?.()
        revertCycle = undefined
        for (const { query, listener } of bindings) query.removeEventListener('change', listener)
        bindings.length = 0
      })
    }

    matchMediaInstances.push(instance)
    return instance
  })

  const contextReverts: Array<ReturnType<typeof vi.fn>> = []
  const context = vi.fn((setup: () => void) => {
    const cleanups: Cleanup[] = []
    const previousCollector = cleanupCollector
    cleanupCollector = cleanups
    setup()
    cleanupCollector = previousCollector

    const revert = vi.fn(() => {
      for (const dispose of cleanups.reverse()) dispose()
    })
    contextReverts.push(revert)
    return { revert }
  })

  const registerPlugin = vi.fn()
  const set = vi.fn()
  const to = vi.fn()

  function reset() {
    document.querySelectorAll('.pin-spacer').forEach(spacer => spacer.remove())
    cleanupCollector = undefined
    context.mockClear()
    contextReverts.length = 0
    fromTo.mockClear()
    matchMedia.mockClear()
    matchMediaInstances.length = 0
    registerPlugin.mockClear()
    set.mockClear()
    timeline.mockClear()
    to.mockClear()
  }

  return {
    context,
    contextReverts,
    fromTo,
    matchMedia,
    matchMediaInstances,
    registerPlugin,
    reset,
    set,
    timeline,
    to
  }
})

vi.mock('gsap', () => ({
  gsap: {
    context: motionState.context,
    fromTo: motionState.fromTo,
    matchMedia: motionState.matchMedia,
    registerPlugin: motionState.registerPlugin,
    set: motionState.set,
    timeline: motionState.timeline,
    to: motionState.to,
    utils: {
      toArray: (selector: string) => Array.from(document.querySelectorAll(selector))
    }
  }
}))

const ScrollTrigger = { name: 'ScrollTrigger' }
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger }))

const NuxtImg = {
  inheritAttrs: false,
  props: ['src', 'alt'],
  template: '<img :src="src" :alt="alt">'
}

type ControlledMediaQuery = Omit<MediaQueryList, 'matches'> & {
  matches: boolean
  setMatches: (matches: boolean) => void
}

function installMatchMedia(initial: { desktop: boolean, reduced: boolean }) {
  const queries = new Map<string, ControlledMediaQuery>()

  function createQuery(media: string): ControlledMediaQuery {
    const listeners = new Set<MediaListener>()
    const legacyListeners = new Set<MediaListener>()
    const query = {
      media,
      matches: media === '(min-width: 1024px)' ? initial.desktop : initial.reduced,
      onchange: null,
      addEventListener: vi.fn((type: string, listener: MediaListener) => {
        if (type === 'change') listeners.add(listener)
      }),
      removeEventListener: vi.fn((type: string, listener: MediaListener) => {
        if (type === 'change') listeners.delete(listener)
      }),
      addListener: vi.fn((listener: MediaListener) => legacyListeners.add(listener)),
      removeListener: vi.fn((listener: MediaListener) => legacyListeners.delete(listener)),
      dispatchEvent: vi.fn(() => true),
      setMatches(matches: boolean) {
        query.matches = matches
        const event = { matches, media } as MediaQueryListEvent
        for (const listener of [...listeners, ...legacyListeners]) listener(event)
        query.onchange?.(event)
      }
    } as ControlledMediaQuery

    return query
  }

  vi.stubGlobal('matchMedia', vi.fn((media: string) => {
    if (!queries.has(media)) queries.set(media, createQuery(media))
    return queries.get(media)!
  }))

  return {
    desktop: () => queries.get('(min-width: 1024px)') ?? window.matchMedia('(min-width: 1024px)') as ControlledMediaQuery,
    reduced: () => queries.get('(prefers-reduced-motion: reduce)') ?? window.matchMedia('(prefers-reduced-motion: reduce)') as ControlledMediaQuery
  }
}

async function settleMotion() {
  await nextTick()
  await vi.dynamicImportSettled()
  await nextTick()
}

describe('landing narrative sections', () => {
  const wrappers: VueWrapper[] = []

  beforeEach(() => {
    motionState.reset()
    installMatchMedia({ desktop: false, reduced: true })
  })

  afterEach(() => {
    for (const wrapper of wrappers) wrapper.unmount()
    wrappers.length = 0
    motionState.reset()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  function mountTreatments() {
    const wrapper = mount(TreatmentsSection, {
      attachTo: document.body,
      global: { stubs: { NuxtImg } }
    })
    wrappers.push(wrapper)
    return wrapper
  }

  it('renders the three credentials as a semantic list', () => {
    const wrapper = mount(CredentialsStrip)
    wrappers.push(wrapper)

    expect(wrapper.get('ul').findAll('li').map(item => item.text())).toEqual([
      'FormaçãoCirurgiã-dentista desde 2009',
      'Registro profissionalCRO-MS 4589',
      'AtendimentoAtendimento individualizado'
    ])
  })

  it('renders anchored treatment articles with accessible images and treatment-specific CTAs', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    const receivedSources: string[] = []
    const receiveSource = (event: Event) => {
      receivedSources.push((event as CustomEvent<{ source: string }>).detail.source)
    }
    window.addEventListener('whatsapp:click', receiveSource)

    const wrapper = mountTreatments()

    const articles = wrapper.findAll('article')
    expect(articles).toHaveLength(3)
    expect(articles.map(article => article.attributes('aria-labelledby'))).toEqual([
      'treatment-botox-title',
      'treatment-preenchimento-title',
      'treatment-peeling-title'
    ])
    expect(articles.map(article => article.get('img').attributes('alt'))).toEqual([
      'Mulher com expressão serena durante um cuidado facial individualizado.',
      'Aplicação clínica próxima à região dos olhos e da face durante atendimento profissional.',
      'Rosto feminino em luz suave para representar o cuidado com a qualidade da pele.'
    ])

    const callsToAction = wrapper.findAll('article a')
    expect(callsToAction).toHaveLength(3)
    expect(callsToAction.every(link => link.attributes('href')?.startsWith('https://api.whatsapp.com/send?'))).toBe(true)

    for (const callToAction of callsToAction) await callToAction.trigger('click')

    expect(open).toHaveBeenCalledTimes(3)
    expect(receivedSources).toEqual(['botox', 'preenchimento', 'peeling'])
    window.removeEventListener('whatsapp:click', receiveSource)
  })

  it('registers ScrollTrigger only after client mount', async () => {
    const app = createSSRApp(TreatmentsSection)
    app.component('NuxtImg', NuxtImg)

    await renderToString(app)
    expect(motionState.registerPlugin).not.toHaveBeenCalled()

    mountTreatments()
    await settleMotion()

    expect(motionState.registerPlugin).toHaveBeenCalledOnce()
    expect(motionState.registerPlugin).toHaveBeenCalledWith(ScrollTrigger)
  })

  it('creates three desktop pins and replaces them with mobile reveals when the breakpoint changes', async () => {
    const media = installMatchMedia({ desktop: true, reduced: false })
    const wrapper = mountTreatments()
    await settleMotion()

    expect(document.querySelectorAll('.pin-spacer')).toHaveLength(3)
    expect(wrapper.findAll('[data-motion-mode="pin"]')).toHaveLength(3)

    media.desktop().setMatches(false)

    expect(document.querySelectorAll('.pin-spacer')).toHaveLength(0)
    expect(wrapper.findAll('[data-motion-mode="reveal"]')).toHaveLength(3)
  })

  it('uses normal-flow reveals without pinning on mobile', async () => {
    const wrapper = mountTreatments()
    installMatchMedia({ desktop: false, reduced: false })
    await settleMotion()

    expect(document.querySelectorAll('.pin-spacer')).toHaveLength(0)
    expect(wrapper.findAll('[data-motion-mode="reveal"]')).toHaveLength(3)
  })

  it('creates no motion when reduced motion is active and removes active pins when it changes', async () => {
    const media = installMatchMedia({ desktop: true, reduced: false })
    const wrapper = mountTreatments()
    await settleMotion()
    expect(document.querySelectorAll('.pin-spacer')).toHaveLength(3)

    media.reduced().setMatches(true)

    expect(document.querySelectorAll('.pin-spacer')).toHaveLength(0)
    expect(wrapper.findAll('[data-motion-mode]')).toHaveLength(0)

    wrapper.unmount()
    wrappers.pop()
    motionState.reset()
    installMatchMedia({ desktop: true, reduced: true })

    const reducedWrapper = mountTreatments()
    await settleMotion()

    expect(document.querySelectorAll('.pin-spacer')).toHaveLength(0)
    expect(reducedWrapper.findAll('[data-motion-mode]')).toHaveLength(0)
  })

  it('reverts responsive motion and removes media listeners on unmount', async () => {
    const media = installMatchMedia({ desktop: true, reduced: false })
    const wrapper = mountTreatments()
    await settleMotion()
    expect(document.querySelectorAll('.pin-spacer')).toHaveLength(3)

    wrapper.unmount()
    wrappers.pop()

    expect(document.querySelectorAll('.pin-spacer')).toHaveLength(0)
    expect(motionState.matchMediaInstances[0].revert).toHaveBeenCalledOnce()
    expect(media.desktop().removeEventListener).toHaveBeenCalled()
    expect(media.reduced().removeEventListener).toHaveBeenCalled()
    expect(motionState.contextReverts[0]).toHaveBeenCalledOnce()
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

  it.each([
    [CredentialsStrip, '.credentials-strip'],
    [PhilosophySection, '.philosophy-section']
  ])('removes and rebuilds %s motion when reduced-motion changes', async (component, selector) => {
    const media = installMatchMedia({ desktop: false, reduced: false })
    const wrapper = mount(component, { attachTo: document.body })
    wrappers.push(wrapper)
    await settleMotion()

    const section = wrapper.get(selector)
    expect(section.attributes('data-motion-mode')).toBe('reveal')

    media.reduced().setMatches(true)
    expect(section.attributes('data-motion-mode')).toBeUndefined()

    media.reduced().setMatches(false)
    expect(section.attributes('data-motion-mode')).toBe('reveal')

    wrapper.unmount()
    wrappers.pop()
    expect(motionState.matchMediaInstances[0].revert).toHaveBeenCalledOnce()
    expect(media.reduced().removeEventListener).toHaveBeenCalled()
  })
})

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import BrandIntro from '../../components/landing/BrandIntro.vue'

describe('BrandIntro', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('skips the full timeline when the session flag exists', async () => {
    sessionStorage.setItem('giselle-intro-seen', '1')

    const wrapper = mount(BrandIntro)
    await nextTick()

    expect(wrapper.emitted('complete')).toHaveLength(1)
  })

  it('exposes a skip control while the intro is active', () => {
    const wrapper = mount(BrandIntro)

    expect(wrapper.get('button').text()).toContain('Pular introdução')
    wrapper.unmount()
  })

  it('renders the existing logo at the intended intro scale', () => {
    const wrapper = mount(BrandIntro)

    expect(wrapper.get('svg').attributes('width')).toBe('150')
    expect(wrapper.get('svg').attributes('height')).toBe('78')
    wrapper.unmount()
  })
})

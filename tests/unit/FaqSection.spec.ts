import { mount } from '@vue/test-utils'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import { describe, expect, it } from 'vitest'
import FaqSection from '../../components/landing/FaqSection.vue'
import { landingContent } from '../../data/landing'

describe('FaqSection', () => {
  it('connects every question to its answer in the server HTML', async () => {
    const html = await renderToString(createSSRApp(FaqSection))

    for (const item of landingContent.faqs) {
      expect(html).toContain(item.question)
      expect(html).toContain(item.answer)
    }

    const wrapper = mount(FaqSection)
    const buttons = wrapper.findAll('button[aria-controls]')

    expect(buttons).toHaveLength(landingContent.faqs.length)
    expect(new Set(buttons.map(button => button.attributes('aria-controls'))).size).toBe(buttons.length)

    for (const button of buttons) {
      const answer = wrapper.get(`#${button.attributes('aria-controls')}`)
      expect(answer.attributes('aria-labelledby')).toBe(button.attributes('id'))
    }
  })

  it('expands questions independently so multiple answers can be compared', async () => {
    const wrapper = mount(FaqSection)
    const buttons = wrapper.findAll('button[aria-expanded="false"]')

    await buttons[0].trigger('click')
    await buttons[1].trigger('click')

    expect(buttons[0].attributes('aria-expanded')).toBe('true')
    expect(buttons[1].attributes('aria-expanded')).toBe('true')
    expect(wrapper.get(`#${buttons[0].attributes('aria-controls')}`).isVisible()).toBe(true)
    expect(wrapper.get(`#${buttons[1].attributes('aria-controls')}`).isVisible()).toBe(true)
  })
})

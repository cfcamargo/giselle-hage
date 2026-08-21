import { mount } from '@vue/test-utils'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import { describe, expect, it } from 'vitest'
import ContentSection from '../../components/landing/ContentSection.vue'
import { landingContent } from '../../data/landing'

describe('ContentSection', () => {
  it('renders every content post and an Instagram call to action', () => {
    const wrapper = mount(ContentSection)

    expect(wrapper.get('section').attributes('id')).toBe('conteudos')

    const cards = wrapper.findAll('.content-section__card')
    expect(cards).toHaveLength(landingContent.content.length)
    expect(cards.map(card => card.get('h3').text())).toEqual(
      landingContent.content.map(post => post.title)
    )

    const cta = wrapper.get('a.content-section__cta')
    expect(cta.attributes('href')).toBe(landingContent.contact.instagramUrl)
    expect(cta.attributes('target')).toBe('_blank')
    expect(cta.attributes('rel')).toContain('noopener')
  })

  it('renders every post teaser in the server HTML', async () => {
    const html = await renderToString(createSSRApp(ContentSection))

    for (const post of landingContent.content) {
      expect(html).toContain(post.title)
      expect(html).toContain(post.teaser)
    }
  })
})

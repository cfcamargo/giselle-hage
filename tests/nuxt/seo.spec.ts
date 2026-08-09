// @vitest-environment node

import { describe, expect, it } from 'vitest'
import { $fetch, fetch, setup } from '@nuxt/test-utils/e2e'

const title = 'Dra. Giselle Hage | Harmonização Facial em Ponta Porã'
const description = 'Harmonização facial com precisão, naturalidade e cuidado individual em Ponta Porã. Conheça Botox, preenchimento e peeling.'

async function renderPage (path: string) {
  return { html: await $fetch<string>(path) }
}

describe('landing SEO', async () => {
  await setup({
    rootDir: process.cwd(),
    dev: true,
    env: {
      NUXT_PUBLIC_SITE_URL: 'https://seo.example.test'
    }
  })

  it('renders canonical local-business metadata', async () => {
    const page = await renderPage('/')

    expect(page.html.match(/<h1(?:\s|>)/g)).toHaveLength(1)
    expect(page.html).toContain('Harmonização Facial em Ponta Porã')
    expect(page.html).toContain(`<title>${title}</title>`)
    expect(page.html).toContain(`name="description" content="${description}"`)
    expect(page.html).toMatch(/<html[^>]*lang="pt-BR"/)
    expect(page.html).toContain('rel="canonical" href="https://seo.example.test/"')
    expect(page.html).toContain('property="og:url" content="https://seo.example.test/"')
    expect(page.html.match(/type="application\/ld\+json"/g)).toHaveLength(1)
    expect(page.html).toContain('CRO-MS 4589')
    expect(page.html).toContain('"Dentist"')
    expect(page.html).toContain('"url":"https://seo.example.test/"')
  })

  it('preserves the existing home content and treatments anchor', async () => {
    const page = await renderPage('/')

    expect(page.html).toContain('Revele sua beleza natural')
    expect(page.html).toContain('id="tratamentos"')
  })

  it('permanently redirects the published peeling alias', async () => {
    const response = await fetch('/peeling', { redirect: 'manual' })

    expect(response.status).toBe(301)
    expect(response.headers.get('location')).toBe('/#tratamentos')
  })
})

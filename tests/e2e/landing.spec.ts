import { expect, test } from '@playwright/test'

const sectionHeadings = [
  'Escolhas cuidadosas, orientadas por você.',
  'Prevenir. Cuidar. Preservar.',
  'Cuidado que respeita cada rosto.',
  'Prazer, Dra. Giselle Hage.',
  'Antes de decidir, entenda o cuidado.',
  'Seu cuidado começa em Ponta Porã.',
  'Seu plano começa com uma conversa.'
]

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
})

test('renders one headline and a real WhatsApp conversion link', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)

  const cta = page.getByRole('link', { name: 'Agendar minha avaliação' }).first()
  await expect(cta).toHaveAttribute(
    'href',
    /^https:\/\/api\.whatsapp\.com\/send\?phone=5567981269482&text=.+/
  )
})

test('completes the intro for reduced motion and exposes keyboard focus', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('[data-intro-state="complete"]')).toBeAttached()
  await page.keyboard.press('Tab')
  await expect(page.locator(':focus-visible')).toBeVisible()
})

test('preserves the complete published sibling order', async ({ page }) => {
  await page.goto('/')

  const composition = await page.locator('#__nuxt').evaluate(root =>
    [...root.children].map(element =>
      element instanceof HTMLElement
        ? `${element.tagName.toLowerCase()}.${element.className}`
        : element.tagName.toLowerCase()
    )
  )
  const mainSections = await page.locator('main#conteudo').evaluate(main =>
    [...main.children].map(element => element.className)
  )

  expect(composition).toEqual([
    'div.brand-intro',
    'header.landing-header',
    'main.',
    'div.floating-whatsapp-host',
    'footer.site-footer'
  ])
  expect(mainSections).toEqual([
    'landing-hero',
    'credentials-strip',
    'treatments-section',
    'philosophy-section',
    'results-section',
    'about-section',
    'faq-section',
    'location-section',
    'closing-cta'
  ])
})

for (const viewport of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 }
]) {
  test(`does not overflow horizontally at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')

    const widths = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth
    }))

    expect(widths.scroll).toBe(widths.client)
  })
}

test('keeps every required section heading visible when scrolled into view', async ({ page }) => {
  await page.goto('/')

  for (const name of sectionHeadings) {
    const heading = page.getByRole('heading', { level: 2, name })
    await expect(heading).toHaveCount(1)
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
  }
})

test('closes the mobile navigation with Escape and restores trigger focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const trigger = page.locator('.landing-header__menu-trigger')
  await trigger.click()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')

  await page.keyboard.press('Escape')

  await expect(trigger).toHaveAttribute('aria-label', 'Abrir navegação')
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(trigger).toBeFocused()
})

test('keeps the floating CTA out of the accessibility tree until useful', async ({ page }) => {
  await page.goto('/')

  const floating = page.locator('.floating-whatsapp').first()
  await expect(floating).toHaveAttribute('data-visible', 'false')
  await expect(floating).toHaveAttribute('aria-hidden', 'true')
  await expect(floating).toHaveAttribute('tabindex', '-1')

  await page.locator('#faq-title').scrollIntoViewIfNeeded()
  await expect(floating).toHaveAttribute('data-visible', 'true')
  await expect(floating).toHaveAttribute('aria-hidden', 'false')
  await expect(floating).not.toHaveAttribute('tabindex', '-1')

  await page.locator('#closing-title').scrollIntoViewIfNeeded()
  await expect(floating).toHaveAttribute('data-visible', 'false')
  await expect(floating).toHaveAttribute('aria-hidden', 'true')
  await expect(floating).toHaveAttribute('tabindex', '-1')
})

test('permanently redirects representative legacy service URLs', async ({ request }) => {
  for (const path of [
    '/services/Botox',
    '/services/Preenchimento',
    '/services/Peeling',
    '/peeling'
  ]) {
    const response = await request.get(path, { maxRedirects: 0 })

    expect(response.status(), path).toBe(301)
    expect(response.headers().location, path).toBe('/#tratamentos')
  }
})

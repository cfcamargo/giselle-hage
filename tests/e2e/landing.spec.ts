import { expect, test } from '@playwright/test'

const sectionHeadings = [
  'Tratamentos que respeitam aquilo que já é seu.',
  'Prevenir. Cuidar. Preservar.',
  'Cuidado que respeita cada rosto.',
  'Prazer, Dra. Giselle Hage.',
  'Antes de decidir, entenda o cuidado.',
  'Seu cuidado começa em Ponta Porã.',
  'Seu plano começa com uma conversa.'
]

async function openWithReducedMotion(page: import('@playwright/test').Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
}

async function skipIntro(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: 'Pular introdução' }).click()
  await expect(page.locator('[data-intro-state="complete"]')).toBeAttached()
}

test('serves the untouched standalone production artifact', async ({ request }) => {
  const response = await request.get('/', { maxRedirects: 0 })

  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('text/html')
})

test('renders one headline and a real WhatsApp conversion link', async ({ page }) => {
  await openWithReducedMotion(page)

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)

  const cta = page.locator('[data-hero-cta]')
  await expect(cta).toHaveCount(1)
  await expect(cta).toHaveAccessibleName('Agende sua avaliação')
  await expect(cta).toHaveAttribute(
    'href',
    /^https:\/\/api\.whatsapp\.com\/send\?phone=5567981269482&text=.+/
  )
})

test('completes the intro for reduced motion and exposes keyboard focus', async ({ page }) => {
  await openWithReducedMotion(page)

  await expect(page.locator('[data-intro-state="complete"]')).toBeAttached()
  await page.keyboard.press('Tab')
  const focused = page.locator(':focus-visible')
  await expect(focused).toHaveCount(1)
  await expect(focused).toBeVisible()
  const focusIndicator = await focused.evaluate((element) => {
    const style = getComputedStyle(element)

    return {
      color: style.outlineColor,
      style: style.outlineStyle,
      width: Number.parseFloat(style.outlineWidth)
    }
  })
  expect(focusIndicator.style).not.toBe('none')
  expect(focusIndicator.width).toBeGreaterThanOrEqual(2)
  expect(focusIndicator.color).not.toBe('rgba(0, 0, 0, 0)')
})

test('completes the ordinary-motion intro without manual intervention', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')

  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(false)
  await expect(page.locator('[data-intro-state="complete"]')).toBeAttached({ timeout: 5_000 })
  expect(await page.evaluate(() => sessionStorage.getItem('giselle-intro-seen'))).toBeNull()
  await expect(page.locator('html')).not.toHaveClass(/intro-active/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  await page.reload()
  await expect(page.locator('[data-intro-state="active"]')).toBeAttached()
  await skipIntro(page)
})

test('finishes an active intro when reduced motion is enabled live', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('[data-intro-state="active"]')).toBeAttached()

  await page.emulateMedia({ reducedMotion: 'reduce' })

  await expect(page.locator('[data-intro-state="complete"]')).toBeAttached()
  await expect(page.locator('html')).not.toHaveClass(/intro-active/)
  expect(await page.evaluate(() => sessionStorage.getItem('giselle-intro-seen'))).toBeNull()

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('[data-intro-state="complete"]')).toBeAttached()
})

test('reverts and rebuilds hero and profile motion when the preference changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await skipIntro(page)

  const hero = page.locator('.landing-hero')
  const profile = page.locator('.about-section')
  await expect(hero).toHaveClass(/js-motion/)
  await expect(profile).toHaveClass(/js-motion/)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(hero).not.toHaveClass(/js-motion/)
  await expect(profile).not.toHaveClass(/js-motion/)
  await expect(page.locator('[data-about-mask]')).toHaveCSS('transform', 'none')

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(hero).toHaveClass(/js-motion/)
  await expect(profile).toHaveClass(/js-motion/)
})

test('tears down and rebuilds narrative motion when the preference changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await skipIntro(page)

  const narrativeMotion = () => page.evaluate(() => [
    document.querySelector('[data-credential]'),
    document.querySelector('[data-philosophy-copy]')
  ].map((element) => {
    if (!(element instanceof HTMLElement)) return { active: false, final: false }

    const style = getComputedStyle(element)
    return {
      active: Number(style.opacity) < 1 || style.transform !== 'none',
      final: Number(style.opacity) === 1 && style.transform === 'none'
    }
  }))

  await expect.poll(async () => (await narrativeMotion()).every(state => state.active)).toBe(true)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(async () => (await narrativeMotion()).every(state => state.final)).toBe(true)

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect.poll(async () => (await narrativeMotion()).every(state => state.active)).toBe(true)
})

test('presents treatments as one cinematic scroll stage on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await skipIntro(page)

  const section = page.locator('#tratamentos')
  await expect(section).toHaveClass(/js-cinematic/)
  await expect(section.locator('[data-treatment-stage]')).toHaveAttribute('data-motion-mode', 'cinematic')
  await expect(section.locator('.pin-spacer')).toHaveCount(1)
  await expect(section.locator('[data-treatment-image]')).toHaveCount(3)
  await expect(section.locator('[data-treatment-copy]')).toHaveCount(3)

  await page.locator('.philosophy-section').scrollIntoViewIfNeeded()
  await expect(page.locator('.philosophy-section')).toBeVisible()
})

test('preserves the complete published sibling order', async ({ page }) => {
  await openWithReducedMotion(page)

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
    await openWithReducedMotion(page)

    const lazyImages = page.locator('img[loading="lazy"]')
    const lazyImageCount = await lazyImages.count()
    expect(lazyImageCount).toBeGreaterThan(0)
    for (let index = 0; index < lazyImageCount; index++) {
      const image = lazyImages.nth(index)
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate(element =>
        (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0
      )).toBe(true)
    }
    await page.locator('#rodape').scrollIntoViewIfNeeded()

    const widths = await page.evaluate(() => ({
      client: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth
    }))

    expect(widths.scroll).toBe(widths.client)
  })
}

test('keeps every required section heading visible when scrolled into view', async ({ page }) => {
  await openWithReducedMotion(page)

  for (const name of sectionHeadings) {
    const heading = page.getByRole('heading', { level: 2, name })
    await expect(heading).toHaveCount(1)
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
  }
})

test('closes the mobile navigation with Escape and restores trigger focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await openWithReducedMotion(page)

  const trigger = page.locator('.landing-header__menu-trigger')
  const menu = page.locator('details.landing-header__mobile-navigation')
  await expect(menu).toHaveJSProperty('open', false)
  await trigger.click()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(menu).toHaveJSProperty('open', true)

  await page.keyboard.press('Escape')

  await expect(trigger).toHaveAttribute('aria-label', 'Abrir navegação')
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(menu).toHaveJSProperty('open', false)
  await expect(trigger).toBeFocused()
})

test('keeps the floating CTA out of the accessibility tree until useful', async ({ page }) => {
  await openWithReducedMotion(page)

  const floating = page.locator('.floating-whatsapp-host > a.floating-whatsapp')
  await expect(floating).toHaveCount(1)
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

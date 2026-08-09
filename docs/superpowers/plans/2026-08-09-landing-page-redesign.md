# Dra. Giselle Hage Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing multi-page site as a premium, motion-rich, SEO-oriented landing page that establishes clinical authority and converts visitors into WhatsApp conversations.

**Architecture:** Keep Nuxt 3, Vue 3, Tailwind and Nuxt Image, but replace the current home composition with focused landing-page sections backed by typed content. Isolate animation in client-only composables/components, keep all essential content server-rendered, and implement route redirects and structured metadata at the Nuxt layer.

**Tech Stack:** Nuxt 3, Vue 3, TypeScript, Tailwind CSS, `@nuxt/image`, GSAP with ScrollTrigger, `motion-v` with its Nuxt module, Vitest, Vue Test Utils, Nuxt Test Utils, Playwright.

## Global Constraints

- The interface language is Portuguese only.
- Preserve the Dra. Giselle Hage name and existing logo; all other visual identity may change.
- Use the existing photography for the first presentation and keep image sources centralized for later replacement.
- Clinical authority is the primary perception; sophistication and natural beauty support it.
- Botox, preenchimento and peeling are the primary treatments.
- The primary CTA label is “Agende sua avaliação”.
- Every WhatsApp CTA uses phone `5567981269482` and the exact message: “Olá, Dra. Giselle! Conheci seu site e gostaria de agendar uma avaliação para entender qual tratamento é mais indicado para mim.”
- The full brand intro appears at most once per browser session and must never delay CTA access by more than approximately two seconds.
- Essential content remains usable and indexable without animation.
- `prefers-reduced-motion: reduce` displays final visual states immediately.
- SEO targets Ponta Porã–MS, nearby cities and the border region with Pedro Juan Caballero/Paraguay without creating doorway pages.
- Preserve unrelated existing modifications in `package-lock.json` and `yarn.lock`; inspect and merge dependency changes instead of overwriting them.
- Do not claim guaranteed medical or aesthetic results. Validate credentials, address and procedure copy with the client before production publication.

## File Structure

### Create

- `types/landing.ts` — shared content and analytics types.
- `data/landing.ts` — all landing copy, image paths, credentials, treatment data and FAQs.
- `composables/useWhatsApp.ts` — canonical WhatsApp URL generation and click event dispatch.
- `composables/useReducedMotion.ts` — reactive reduced-motion preference.
- `composables/useGsapContext.ts` — scoped GSAP context creation and cleanup.
- `components/landing/BrandIntro.vue` — session-aware animated logo opening.
- `components/landing/LandingHeader.vue` — compact desktop/mobile anchor navigation.
- `components/landing/LandingHero.vue` — SSR-visible hero and primary CTA.
- `components/landing/CredentialsStrip.vue` — CRO, experience and local care proof.
- `components/landing/TreatmentsSection.vue` — primary procedure editorial panels.
- `components/landing/PhilosophySection.vue` — prevention and natural-aging narrative.
- `components/landing/ResultsSection.vue` — accessible result gallery and disclaimer.
- `components/landing/AboutSection.vue` — concise professional biography.
- `components/landing/FaqSection.vue` — accessible accordion.
- `components/landing/LocationSection.vue` — address, regional reach and map.
- `components/landing/ClosingCta.vue` — final conversion block.
- `components/landing/FloatingWhatsApp.vue` — persistent accessible CTA.
- `components/landing/SiteFooter.vue` — compact legal/contact footer.
- `tests/unit/useWhatsApp.spec.ts` — WhatsApp link and event tests.
- `tests/unit/useReducedMotion.spec.ts` — media preference tests.
- `tests/unit/landingData.spec.ts` — content and semantic invariants.
- `tests/unit/FaqSection.spec.ts` — accordion accessibility tests.
- `tests/unit/BrandIntro.spec.ts` — session/reduced-motion behavior tests.
- `tests/nuxt/seo.spec.ts` — rendered metadata and structured-data tests.
- `tests/e2e/landing.spec.ts` — responsive, keyboard and CTA smoke tests.
- `vitest.config.ts` — unit and Nuxt test configuration.
- `playwright.config.ts` — production-preview browser test configuration.

### Modify

- `package.json` — animation and test dependencies/scripts.
- `nuxt.config.ts` — modules, global metadata, route rules and image defaults.
- `app.vue` — global SEO defaults and removal of obsolete animation import.
- `assets/css/main.css` — design tokens, typography, reset, utilities and reduced-motion rules.
- `tailwind.config.js` — editorial palette, type families, spacing and breakpoints.
- `pages/index/index.vue` — landing composition, page SEO and JSON-LD.
- `layouts/AppLayout.vue` — remove old global chrome or reduce to a slot-only compatibility layout.

### Remove after redirects are verified

- `pages/services/BigodeChines.vue`
- `pages/services/Bioestimuladores.vue`
- `pages/services/Botox.vue`
- `pages/services/EmagrecimentoFacial.vue`
- `pages/services/HomeCare.vue`
- `pages/services/Microagulhamento.vue`
- `pages/services/Peeling.vue`
- `pages/services/Preenchimento.vue`
- `pages/services/TratamentoManchas.vue`

Legacy components may remain temporarily if they are no longer imported. Remove them only in the final cleanup after confirming no references with `rg`.

---

### Task 1: Test Harness, Typed Content and WhatsApp Conversion Contract

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `types/landing.ts`
- Create: `data/landing.ts`
- Create: `composables/useWhatsApp.ts`
- Test: `tests/unit/useWhatsApp.spec.ts`
- Test: `tests/unit/landingData.spec.ts`

**Interfaces:**
- Produces: `Treatment`, `FaqItem`, `Credential`, `WhatsAppSource` types.
- Produces: `landingContent` readonly content object.
- Produces: `useWhatsApp(): { message: string; href: ComputedRef<string>; openWhatsApp(source: WhatsAppSource): void }`.

- [ ] **Step 1: Add animation and test tooling**

Run:

```bash
npm install gsap motion-v
npm install -D vitest @vue/test-utils @nuxt/test-utils happy-dom @playwright/test
```

Then add scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "test:e2e:install": "playwright install chromium"
  }
}
```

- [ ] **Step 2: Configure Vitest**

Create `vitest.config.ts`:

```ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.spec.ts']
  }
})
```

- [ ] **Step 3: Write failing conversion and content tests**

Create assertions that require the exact phone, encoded message, source event and three priority treatments:

```ts
import { describe, expect, it, vi } from 'vitest'
import { useWhatsApp } from '../../composables/useWhatsApp'
import { landingContent } from '../../data/landing'

describe('useWhatsApp', () => {
  it('builds the canonical prefilled WhatsApp URL', () => {
    const { href } = useWhatsApp()
    expect(decodeURIComponent(href.value)).toContain('phone=5567981269482')
    expect(decodeURIComponent(href.value)).toContain('Olá, Dra. Giselle! Conheci seu site')
  })

  it('dispatches a source-aware analytics event before opening', () => {
    const dispatch = vi.spyOn(window, 'dispatchEvent')
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    useWhatsApp().openWhatsApp('hero')
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'whatsapp:click' }))
    expect(open).toHaveBeenCalledOnce()
  })
})

describe('landingContent', () => {
  it('keeps the three commercial priorities in order', () => {
    expect(landingContent.treatments.map(item => item.slug)).toEqual([
      'botox', 'preenchimento', 'peeling'
    ])
  })
})
```

- [ ] **Step 4: Run tests and verify they fail**

Run: `npm test -- tests/unit/useWhatsApp.spec.ts tests/unit/landingData.spec.ts`

Expected: FAIL because the modules do not exist.

- [ ] **Step 5: Implement types, canonical content and composable**

Define exact source values and a browser-safe opener:

```ts
export type WhatsAppSource =
  | 'header' | 'hero' | 'botox' | 'preenchimento' | 'peeling'
  | 'results' | 'faq' | 'location' | 'closing' | 'floating'

export interface Treatment {
  slug: 'botox' | 'preenchimento' | 'peeling'
  eyebrow: string
  title: string
  summary: string
  image: string
}
```

```ts
import type { WhatsAppSource } from '~/types/landing'

const phone = '5567981269482'
const message = 'Olá, Dra. Giselle! Conheci seu site e gostaria de agendar uma avaliação para entender qual tratamento é mais indicado para mim.'

export function useWhatsApp() {
  const href = computed(() => `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`)

  function openWhatsApp(source: WhatsAppSource) {
    if (!import.meta.client) return
    window.dispatchEvent(new CustomEvent('whatsapp:click', { detail: { source } }))
    window.open(href.value, '_blank', 'noopener,noreferrer')
  }

  return { message, href, openWhatsApp }
}
```

Populate `landingContent` with the approved headline, verified CRO/address data already present in the site, the three treatments, existing result image paths and concise FAQs. Keep every image path in this file.

- [ ] **Step 6: Run tests and type-check**

Run: `npm test -- tests/unit/useWhatsApp.spec.ts tests/unit/landingData.spec.ts`

Expected: PASS.

Run: `npx nuxi typecheck`

Expected: exit 0.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts types/landing.ts data/landing.ts composables/useWhatsApp.ts tests/unit
git commit -m "feat: add landing content and conversion contract"
```

---

### Task 2: Editorial Design System and Reduced Motion Foundation

**Files:**
- Modify: `assets/css/main.css`
- Modify: `tailwind.config.js`
- Create: `composables/useReducedMotion.ts`
- Create: `composables/useGsapContext.ts`
- Test: `tests/unit/useReducedMotion.spec.ts`

**Interfaces:**
- Produces: CSS variables `--color-ivory`, `--color-plum`, `--color-champagne`, `--color-ink`, `--font-display`, `--font-sans`.
- Produces: `useReducedMotion(): Readonly<Ref<boolean>>`.
- Produces: `useGsapContext(scope, setup): void` with automatic cleanup.

- [ ] **Step 1: Write failing reduced-motion tests**

```ts
import { describe, expect, it, vi } from 'vitest'
import { useReducedMotion } from '../../composables/useReducedMotion'

it('reflects the reduced-motion media query', () => {
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches: true,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn()
  })))
  expect(useReducedMotion().value).toBe(true)
})
```

- [ ] **Step 2: Run test and verify it fails**

Run: `npm test -- tests/unit/useReducedMotion.spec.ts`

Expected: FAIL because `useReducedMotion` does not exist.

- [ ] **Step 3: Implement preference and GSAP lifecycle composables**

Use a shared readonly ref updated through `matchMedia('(prefers-reduced-motion: reduce)')`. In `useGsapContext`, import GSAP only inside `onMounted`, create `gsap.context(setup, scope.value)`, and call `context.revert()` in `onBeforeUnmount`. Skip setup when reduced motion is enabled.

```ts
export function useGsapContext(
  scope: Ref<HTMLElement | null>,
  setup: (gsap: typeof import('gsap').gsap) => void
) {
  const reduced = useReducedMotion()
  let context: import('gsap').Context | undefined

  onMounted(async () => {
    if (reduced.value || !scope.value) return
    const { gsap } = await import('gsap')
    context = gsap.context(() => setup(gsap), scope.value)
  })

  onBeforeUnmount(() => context?.revert())
}
```

- [ ] **Step 4: Replace global CSS and Tailwind tokens**

Keep Tailwind directives, add a restrained editorial palette, responsive type scale, focus-visible styles, body background and a global reduced-motion fallback:

```css
:root {
  --color-ivory: #f5f0e8;
  --color-plum: #351d2d;
  --color-champagne: #b9a27d;
  --color-ink: #211d1f;
}

html { scroll-behavior: smooth; scroll-padding-top: 6rem; }
body { margin: 0; color: var(--color-ink); background: var(--color-ivory); }
:focus-visible { outline: 2px solid var(--color-champagne); outline-offset: 4px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Verify tests, CSS build and type-check**

Run: `npm test -- tests/unit/useReducedMotion.spec.ts && npm run build`

Expected: PASS and Nuxt build exit 0.

- [ ] **Step 6: Commit**

```bash
git add assets/css/main.css tailwind.config.js composables/useReducedMotion.ts composables/useGsapContext.ts tests/unit/useReducedMotion.spec.ts
git commit -m "feat: establish editorial design and motion foundation"
```

---

### Task 3: SEO, Structured Data and Legacy Redirects

**Files:**
- Modify: `nuxt.config.ts`
- Modify: `app.vue`
- Modify: `pages/index/index.vue`
- Create: `tests/nuxt/seo.spec.ts`

**Interfaces:**
- Produces: canonical home metadata, JSON-LD graph and permanent redirect rules.
- Consumes: `landingContent` identity, location and FAQ data.

- [ ] **Step 1: Write failing rendered SEO test**

Use `renderPage('/')` and assert one H1, title, description, canonical, JSON-LD and Portuguese locale:

```ts
import { describe, expect, it } from 'vitest'
import { renderPage } from '@nuxt/test-utils/e2e'

describe('landing SEO', () => {
  it('renders canonical local-business metadata', async () => {
    const page = await renderPage('/')
    expect(page.html.match(/<h1/g)).toHaveLength(1)
    expect(page.html).toContain('Harmonização Facial em Ponta Porã')
    expect(page.html).toContain('application/ld+json')
    expect(page.html).toContain('CRO-MS 4589')
  })
})
```

- [ ] **Step 2: Run SEO test and verify it fails**

Run: `npm test -- tests/nuxt/seo.spec.ts`

Expected: FAIL because the new metadata and rendered page do not exist.

- [ ] **Step 3: Configure global head and redirects**

Remove duplicate/obsolete descriptions and `keywords`. Set `htmlAttrs.lang` to `pt-BR`, configure the final site URL through `runtimeConfig.public.siteUrl`, add `motion-v/nuxt` to `modules`, and add `routeRules`:

```ts
routeRules: {
  '/services/Botox': { redirect: { to: '/#tratamentos', statusCode: 301 } },
  '/services/Preenchimento': { redirect: { to: '/#tratamentos', statusCode: 301 } },
  '/services/Peeling': { redirect: { to: '/#tratamentos', statusCode: 301 } },
  '/services/**': { redirect: { to: '/#tratamentos', statusCode: 301 } }
}
```

Add lowercase and current mixed-case aliases observed in the route manifest so every deployed legacy URL resolves consistently.

- [ ] **Step 4: Add page SEO and JSON-LD**

In `pages/index/index.vue`, create a canonical URL from runtime config, use `useSeoMeta` and `useHead`, and serialize one server-rendered JSON-LD script containing `Dentist`/`LocalBusiness` compatible fields and only verified data:

```ts
useSeoMeta({
  title: 'Dra. Giselle Hage | Harmonização Facial em Ponta Porã',
  description: 'Harmonização facial com precisão, naturalidade e cuidado individual em Ponta Porã. Conheça Botox, preenchimento e peeling.',
  ogLocale: 'pt_BR',
  ogType: 'website',
  ogImage: '/hero-bg.jpg'
})
```

- [ ] **Step 5: Run SEO test and inspect generated HTML**

Run: `npm test -- tests/nuxt/seo.spec.ts && npm run generate`

Expected: PASS; generation exits 0 and `.output/public/index.html` includes the headline and JSON-LD.

- [ ] **Step 6: Commit**

```bash
git add nuxt.config.ts app.vue pages/index/index.vue tests/nuxt/seo.spec.ts
git commit -m "feat: add local SEO and legacy redirects"
```

---

### Task 4: Brand Intro, Header and Hero Experience

**Files:**
- Create: `components/landing/BrandIntro.vue`
- Create: `components/landing/LandingHeader.vue`
- Create: `components/landing/LandingHero.vue`
- Create: `tests/unit/BrandIntro.spec.ts`
- Modify: `pages/index/index.vue`

**Interfaces:**
- `BrandIntro` emits `complete` once and sets `sessionStorage['giselle-intro-seen'] = '1'`.
- `LandingHeader` consumes anchor IDs `inicio`, `tratamentos`, `sobre`, `resultados`, `contato`.
- `LandingHero` consumes `landingContent.hero` and `useWhatsApp()`.

- [ ] **Step 1: Write failing intro behavior tests**

```ts
it('skips the full timeline when the session flag exists', async () => {
  sessionStorage.setItem('giselle-intro-seen', '1')
  const wrapper = mount(BrandIntro)
  await nextTick()
  expect(wrapper.emitted('complete')).toHaveLength(1)
})

it('exposes a skip control while the intro is active', () => {
  const wrapper = mount(BrandIntro)
  expect(wrapper.get('button').text()).toContain('Pular introdução')
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test -- tests/unit/BrandIntro.spec.ts`

Expected: FAIL because `BrandIntro` does not exist.

- [ ] **Step 3: Implement the accessible brand intro**

Render the existing logo immediately in HTML. Animate SVG paths with GSAP `strokeDashoffset`, then reveal the page using a clip-path mask. Provide a visible-on-focus skip button and a 2100 ms hard timeout that calls the same idempotent `finish()` function. When reduced motion or the session flag is present, finish on the next frame without animation.

- [ ] **Step 4: Implement header navigation**

Use semantic `<header>` and `<nav aria-label="Navegação principal">`. Desktop links use anchors; mobile navigation uses a button with `aria-expanded`, closes on Escape and returns focus to the trigger. Animate menu state with Motion for Vue, not GSAP.

- [ ] **Step 5: Implement SSR-visible hero**

Render eyebrow, one H1, supporting text, location, primary CTA and `/hero-bg.jpg` through `NuxtImg`. Use `preload`, explicit width/height and `sizes`. Apply GSAP only to decorative reveals after hydration; keep final content visible in initial CSS and switch to motion-ready states only after a `.js-motion` class is applied.

- [ ] **Step 6: Compose intro, header and hero and verify**

Run: `npm test -- tests/unit/BrandIntro.spec.ts && npm run build`

Expected: PASS and build exit 0.

Manually verify: reload twice in the same tab; the first load runs the full intro, the second reveals immediately.

- [ ] **Step 7: Commit**

```bash
git add components/landing/BrandIntro.vue components/landing/LandingHeader.vue components/landing/LandingHero.vue tests/unit/BrandIntro.spec.ts pages/index/index.vue
git commit -m "feat: build animated brand opening and hero"
```

---

### Task 5: Credentials, Treatments and Philosophy Narrative

**Files:**
- Create: `components/landing/CredentialsStrip.vue`
- Create: `components/landing/TreatmentsSection.vue`
- Create: `components/landing/PhilosophySection.vue`
- Modify: `pages/index/index.vue`
- Modify: `tests/unit/landingData.spec.ts`

**Interfaces:**
- Consumes: `landingContent.credentials`, `landingContent.treatments`, `landingContent.philosophy`.
- Emits no component events; treatment CTAs call `openWhatsApp(treatment.slug)`.

- [ ] **Step 1: Extend failing content invariants**

Assert every treatment has a unique slug, non-empty summary, valid public image path and no guarantee language:

```ts
for (const treatment of landingContent.treatments) {
  expect(treatment.image).toMatch(/^\//)
  expect(treatment.summary.length).toBeGreaterThan(40)
  expect(treatment.summary).not.toMatch(/garantid|definitiv|sem risco/i)
}
```

- [ ] **Step 2: Run test and confirm failure against incomplete data**

Run: `npm test -- tests/unit/landingData.spec.ts`

Expected: FAIL until every required treatment field is populated.

- [ ] **Step 3: Implement credentials strip**

Render semantic list items for “Cirurgiã-dentista desde 2009”, “CRO-MS 4589” and “Atendimento individualizado”. Animate reveal and numeric emphasis with a single ScrollTrigger timeline; do not animate the actual text value from zero because the credentials are content, not decorative counters.

- [ ] **Step 4: Implement treatment editorial panels**

Render three `<article>` elements with anchored heading, short benefit copy, image and CTA. On desktop, use alternating pinned editorial layouts only when `matchMedia('(min-width: 1024px)')` and reduced motion is false. On mobile, use normal document flow with simple opacity/translate reveals.

- [ ] **Step 5: Implement philosophy section**

Use one section to connect “Prevenir”, “Cuidar” and “Preservar” to prevention and natural aging. Use a decorative facial-contour line with `aria-hidden="true"`; animate its path only when motion is allowed.

- [ ] **Step 6: Compose and verify**

Run: `npm test -- tests/unit/landingData.spec.ts && npm run build`

Expected: PASS and build exit 0.

Manually verify widths 390 px and 1440 px: normal reading order, all three CTAs visible, no pinned scroll on mobile.

- [ ] **Step 7: Commit**

```bash
git add components/landing/CredentialsStrip.vue components/landing/TreatmentsSection.vue components/landing/PhilosophySection.vue pages/index/index.vue data/landing.ts tests/unit/landingData.spec.ts
git commit -m "feat: add authority and treatment narrative"
```

---

### Task 6: Results and Professional Profile

**Files:**
- Create: `components/landing/ResultsSection.vue`
- Create: `components/landing/AboutSection.vue`
- Modify: `pages/index/index.vue`
- Modify: `data/landing.ts`

**Interfaces:**
- Consumes: existing result images from `public/services` and `/about.jpg`.
- Results cards expose accessible labels and a visible “Resultados variam de pessoa para pessoa” disclaimer.

- [ ] **Step 1: Add result data assertions**

Require descriptive alt text and category on every result:

```ts
expect(landingContent.results.every(item => item.alt.length >= 20)).toBe(true)
expect(landingContent.results.every(item => ['botox', 'preenchimento'].includes(item.category))).toBe(true)
```

- [ ] **Step 2: Run the content test and verify it fails**

Run: `npm test -- tests/unit/landingData.spec.ts`

Expected: FAIL until result metadata is complete.

- [ ] **Step 3: Implement results gallery without false before/after controls**

The current assets are individual result images, not verified pairs. Present them in a horizontally scrollable, keyboard-accessible gallery with scroll snap, previous/next buttons and descriptive labels. Do not create a comparison slider until compatible pairs are supplied. Add the visible variability disclaimer and a WhatsApp CTA.

- [ ] **Step 4: Implement profile section**

Use `/about.jpg`, verified biography copy, CRO and a compact statement about individual evaluation. Apply a slow image-mask reveal and no sticky/pinned behavior on mobile.

- [ ] **Step 5: Compose and verify**

Run: `npm test -- tests/unit/landingData.spec.ts && npm run build`

Expected: PASS and build exit 0.

Keyboard check: focus gallery controls, advance and reverse, and confirm focus remains visible.

- [ ] **Step 6: Commit**

```bash
git add components/landing/ResultsSection.vue components/landing/AboutSection.vue pages/index/index.vue data/landing.ts tests/unit/landingData.spec.ts
git commit -m "feat: present results and clinical profile"
```

---

### Task 7: FAQ, Location and Closing Conversion

**Files:**
- Create: `components/landing/FaqSection.vue`
- Create: `components/landing/LocationSection.vue`
- Create: `components/landing/ClosingCta.vue`
- Create: `components/landing/FloatingWhatsApp.vue`
- Create: `components/landing/SiteFooter.vue`
- Test: `tests/unit/FaqSection.spec.ts`
- Modify: `pages/index/index.vue`

**Interfaces:**
- FAQ items use unique IDs with button `aria-expanded` and answer `aria-labelledby`.
- All conversion components consume the canonical `useWhatsApp()` interface.

- [ ] **Step 1: Write failing FAQ accessibility tests**

```ts
it('connects each question to a collapsible answer', async () => {
  const wrapper = mount(FaqSection)
  const button = wrapper.get('button[aria-expanded="false"]')
  await button.trigger('click')
  expect(button.attributes('aria-expanded')).toBe('true')
  expect(wrapper.get(`#${button.attributes('aria-controls')}`).isVisible()).toBe(true)
})
```

- [ ] **Step 2: Run test and verify it fails**

Run: `npm test -- tests/unit/FaqSection.spec.ts`

Expected: FAIL because the FAQ component does not exist.

- [ ] **Step 3: Implement FAQ accordion**

Render all questions and answers in server HTML. Use buttons to control visual expansion, preserve answer content for indexing and animate height/opacity with Motion. Allow multiple questions to remain open so users can compare answers.

- [ ] **Step 4: Implement location and regional reach**

Render the existing verified address in text before the map. Keep the map iframe lazy-loaded with an explicit title. Mention Ponta Porã, nearby cities and the Pedro Juan Caballero border region naturally, without stating a clinic presence in Paraguay.

- [ ] **Step 5: Implement final and floating CTAs**

Use source values `closing`, `location` and `floating`. The floating CTA appears after the hero CTA leaves the viewport, remains above safe-area insets, has a text label on desktop and an accessible name on mobile, and never pulses continuously.

- [ ] **Step 6: Implement compact footer and compose the page**

Include current year, professional name, CRO, Instagram, WhatsApp and address. Remove the obsolete developer-owner footer from the rendered tree.

- [ ] **Step 7: Verify tests and build**

Run: `npm test -- tests/unit/FaqSection.spec.ts tests/unit/useWhatsApp.spec.ts && npm run build`

Expected: PASS and build exit 0.

- [ ] **Step 8: Commit**

```bash
git add components/landing/FaqSection.vue components/landing/LocationSection.vue components/landing/ClosingCta.vue components/landing/FloatingWhatsApp.vue components/landing/SiteFooter.vue tests/unit/FaqSection.spec.ts pages/index/index.vue
git commit -m "feat: complete landing conversion journey"
```

---

### Task 8: Replace Legacy Composition and Remove Service Pages

**Files:**
- Modify: `layouts/AppLayout.vue`
- Modify: `pages/index/index.vue`
- Remove: `pages/services/*.vue` files listed in File Structure
- Remove: legacy home components proven unreferenced by the Step 1 `rg` audit

**Interfaces:**
- The only public content route is `/`; legacy service URLs return 301 redirects.
- The landing section order matches the approved design specification.

- [ ] **Step 1: Audit references before removal**

Run:

```bash
rg -n "HomeTemplate|HeroSection|HeroBanner|Services|CardAboutHome|Results|Faq|VisitUS|OwnerFooter|pages/services" --glob '!docs/**' --glob '!node_modules/**'
```

Expected: legacy components are imported only by the old composition and service routes.

- [ ] **Step 2: Make the landing composition explicit**

`pages/index/index.vue` must render in this order:

```vue
<BrandIntro @complete="introComplete = true" />
<LandingHeader />
<main id="conteudo">
  <LandingHero />
  <CredentialsStrip />
  <TreatmentsSection />
  <PhilosophySection />
  <ResultsSection />
  <AboutSection />
  <FaqSection />
  <LocationSection />
  <ClosingCta />
</main>
<FloatingWhatsApp />
<SiteFooter />
```

Reduce `AppLayout` to `<slot />` and remove old Header/Footer/OwnerFooter imports from it.

- [ ] **Step 3: Verify redirects before deleting route files**

Run the preview server and check:

```bash
curl -I http://localhost:3000/services/Botox
curl -I http://localhost:3000/services/Preenchimento
curl -I http://localhost:3000/services/Peeling
```

Expected: HTTP 301 with `Location: /#tratamentos`.

- [ ] **Step 4: Remove obsolete service page files and unreferenced home components**

Use `rg` once more before each deletion group. Keep atoms or generic components still imported by landing components. Do not remove public images used by `landingContent`.

- [ ] **Step 5: Build and inspect route output**

Run: `npm run generate`

Expected: generation exits 0; only the landing content is generated while legacy paths are handled by route rules.

- [ ] **Step 6: Commit**

```bash
git add layouts/AppLayout.vue pages/index/index.vue pages/services components
git commit -m "refactor: replace legacy site with single landing page"
```

---

### Task 9: Browser-Level Accessibility, Responsiveness and Conversion Tests

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/landing.spec.ts`
- Modify: `components/landing/LandingHeader.vue`
- Modify: `components/landing/BrandIntro.vue`
- Modify: `components/landing/FloatingWhatsApp.vue`

**Interfaces:**
- Tests the production build through `npm run preview`.

- [ ] **Step 1: Configure Playwright against production preview**

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run build && npm run preview',
    port: 3000,
    reuseExistingServer: !process.env.CI
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } }
  ]
})
```

- [ ] **Step 2: Write failing landing smoke tests**

```ts
import { expect, test } from '@playwright/test'

test('renders one headline and a working WhatsApp CTA', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  const cta = page.getByRole('link', { name: 'Agende sua avaliação' }).first()
  await expect(cta).toHaveAttribute('href', /api\.whatsapp\.com/)
})

test('honors reduced motion and keyboard navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.locator(':focus-visible')).toBeVisible()
  await expect(page.locator('[data-intro-state="complete"]')).toBeAttached()
})
```

- [ ] **Step 3: Run tests and fix observable defects**

Run: `npm run test:e2e`

Expected: all desktop and mobile projects pass. Fix only defects demonstrated by failing assertions; add a regression assertion for every fix.

- [ ] **Step 4: Add responsive overflow and section tests**

Assert `document.documentElement.scrollWidth === document.documentElement.clientWidth` at 390×844 and 1440×900. Assert each required section heading is visible after scrolling and the mobile menu closes on Escape.

- [ ] **Step 5: Run full automated suite**

Run: `npm test && npm run test:e2e && npx nuxi typecheck`

Expected: all tests pass and type-check exits 0.

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/e2e components/landing
git commit -m "test: cover landing accessibility and conversion"
```

---

### Task 10: Performance, SEO and Release Verification

**Files:**
- Modify: `nuxt.config.ts`
- Modify: `data/landing.ts`
- Modify: `components/landing/BrandIntro.vue`
- Modify: `components/landing/LandingHero.vue`
- Modify: `components/landing/TreatmentsSection.vue`

**Interfaces:**
- Produces a production-ready landing page with no known acceptance-criteria failures.

- [ ] **Step 1: Run clean production verification**

Run:

```bash
npm test
npm run build
npm run test:e2e
npx nuxi typecheck
git diff --check
```

Expected: every command exits 0.

- [ ] **Step 2: Verify generated semantics and metadata**

Run:

```bash
npm run generate
rg -n "<h1|canonical|application/ld\+json|CRO-MS 4589|Harmonização Facial em Ponta Porã" .output/public/index.html
```

Expected: one H1, canonical link, JSON-LD, credential and local headline are present in generated HTML.

- [ ] **Step 3: Audit image and animation behavior manually**

Check desktop 1440×900, tablet 768×1024 and mobile 390×844 in Chromium. Confirm:

- intro ends within 2.1 seconds and can be skipped;
- second load in the same session skips the full intro;
- reduced motion shows all final states immediately;
- no horizontal overflow or scroll lock remains;
- hero image loads first and below-fold images lazy-load;
- pinned desktop sequences release correctly;
- WhatsApp opens with the exact approved message from every CTA;
- no result image is presented as a guaranteed outcome.

- [ ] **Step 4: Validate redirects against every legacy path**

Check all nine old service URLs and lowercase aliases with `curl -I`. Expected: 301 to `/#tratamentos`, with no redirect loops.

- [ ] **Step 5: Review factual publication checklist with the client**

Before deploying publicly, obtain confirmation for these exact facts: professional title, CRO-MS 4589, “desde 2009”, address, opening hours, WhatsApp number, Instagram handle, treatment summaries and permission to publish each result image. Record corrections directly in `data/landing.ts` and rerun the complete suite.

- [ ] **Step 6: Final commit**

```bash
git add nuxt.config.ts data/landing.ts components/landing assets/css/main.css
git commit -m "perf: finalize landing experience"
```

If no audit-driven file changes are required, do not create an empty commit.

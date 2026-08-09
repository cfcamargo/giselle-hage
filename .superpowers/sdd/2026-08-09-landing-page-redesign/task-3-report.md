# Task 3 Report — SEO, Structured Data and Legacy Redirects

## Status

DONE_WITH_CONCERNS

Implemented canonical home metadata, Portuguese document locale, one server-rendered `Dentist`/`LocalBusiness` JSON-LD graph, permanent legacy service route rules, and activation of `motion-v/nuxt`.

## Changes

- `nuxt.config.ts`
  - Added `runtimeConfig.public.siteUrl`, overridden by `NUXT_PUBLIC_SITE_URL`, with an empty safe default.
  - Set `htmlAttrs.lang` to `pt-BR` and removed the obsolete global title, duplicate descriptions, and keywords.
  - Activated `motion-v/nuxt`; disabled its utility auto-imports so its `useReducedMotion` does not replace the project composable with the same name. Motion components remain registered.
  - Added explicit 301 rules for all nine mixed-case legacy service routes, their deployed lowercase/kebab-case aliases, and the `/services/**` fallback.
- `app.vue`
  - Removed duplicate global page SEO and the obsolete `animate.css` import.
- `pages/index/index.vue`
  - Added the single SSR-visible local H1 required by this task while preserving the legacy home composition.
  - Added page-specific SEO/Open Graph metadata and canonical derived from runtime config.
  - Added one JSON-LD script with verified brand, CRO, image, and address data from `landingContent`.
- `tests/nuxt/seo.spec.ts`
  - Added a real SSR HTML contract test for one H1, title, description, language, canonical, JSON-LD, CRO, and schema type.

## TDD evidence

- RED: `npm test -- tests/nuxt/seo.spec.ts` reached the intended assertion and failed because `Harmonização Facial em Ponta Porã` and the new metadata were absent.
- GREEN: the same focused command passed: 1 file, 1 test.
- Build/generation: `npm test -- tests/nuxt/seo.spec.ts && npm run generate` exited 0; `.output/public/index.html` contains one H1, `lang="pt-BR"`, title/description, canonical, `application/ld+json`, `Dentist`, and `CRO-MS 4589`.
- Generated redirect artifacts contain `url=/#tratamentos` for the explicit mixed-case and lowercase aliases.
- `git diff --check` exited 0.

## Deviations and concerns

1. **Production domain is not confirmed.** No production hostname was invented. Before deployment, set `NUXT_PUBLIC_SITE_URL` to the confirmed absolute HTTPS origin and regenerate. Without a valid HTTPS origin, canonical, Open Graph URL, and origin-dependent JSON-LD fields are safely omitted.
2. The installed `@nuxt/test-utils` 4.1.0 does not export the brief's `renderPage` helper. The test preserves the requested `renderPage('/')` call through a local adapter over the official real-SSR `$fetch` helper. Its production fixture mode is incompatible with the repository's older Nuxt 3.10 bundle (`vue/server-renderer` resolution failure), so the focused test uses the dev fixture; `npm run generate` separately validates the production static renderer.
3. FAQ JSON-LD was intentionally deferred: the approved `landingContent.faqs` are not yet visible in SSR HTML until the future FAQ section is implemented. Google's structured-data guidelines require markup to represent reader-visible content, so emitting `FAQPage` now would be premature. The local-business graph contains only currently rendered/verified identity data.
4. Nitro's generic static preset serializes redirects as HTML meta refresh files; HTTP 301 semantics from `routeRules` require a Nitro server deployment or equivalent rules in the eventual hosting platform. The production host is not selected in this task, so platform-specific redirect configuration and an HTTP `status`/`Location` check remain release work.
5. The legacy `HomeTemplate` remains rendered during the staged redesign. Its FAQ title was corrected from H1 to H2 and the local landing headline is the page's only H1; no future visual section was implemented.
6. Existing toolchain warnings remain for the CommonJS-loaded Vitest config, Node's deprecated `fs.Stats`, and outdated Browserslist data. They do not fail the focused test or generation.

## Primary references checked

- Nuxt testing documentation: <https://nuxt.com/docs/3.x/getting-started/testing>
- Schema.org `LocalBusiness`: <https://schema.org/LocalBusiness>
- Google structured-data guidelines: <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>
- Google FAQ rich-result change: <https://developers.google.com/search/blog/2023/08/howto-faq-changes>

## Fix Round 1

### Findings addressed

- Removed the unconditional localhost fallback. `runtimeConfig.public.siteUrl` now defaults to empty and is overridden by Nuxt's `NUXT_PUBLIC_SITE_URL` convention.
- Origin-dependent SEO output is emitted only for a valid HTTPS origin. Missing, malformed, or HTTP values omit canonical, `og:url`, and JSON-LD `@id`/`url`/absolute image instead of leaking localhost.
- Restored `HomeTemplate`, retained exactly one H1 by changing the legacy FAQ heading to H2, and renamed the existing services anchor to `tratamentos` so redirect targets resolve to real content.
- Added the published `/peeling` alias as a permanent redirect to `/#tratamentos`.

### RED/GREEN evidence

- RED — `npm test -- tests/nuxt/seo.spec.ts`: 3/3 failed for the expected reasons: configured HTTPS origin still rendered localhost, legacy home/anchor were absent, and `/peeling` returned 404 instead of 301.
- RED — `npm test -- tests/nuxt/seo-no-origin.spec.ts`: 1/1 failed because unconfigured SSR emitted `rel="canonical" href="http://localhost:3000/"`.
- GREEN — `npm test -- tests/nuxt/seo.spec.ts`: 3/3 passed, including real SSR metadata/content assertions and real HTTP 301/`Location` verification.
- GREEN — `npm test -- tests/nuxt/seo-no-origin.spec.ts`: 1/1 passed; SSR without an origin contains no localhost canonical, `og:url`, or JSON-LD URL.
- Final focused verification — `npm test -- tests/nuxt/seo.spec.ts tests/nuxt/seo-no-origin.spec.ts`: 2 files and 4 tests passed.
- Generate — `NUXT_PUBLIC_SITE_URL=https://seo.example.test npm run generate`: exit 0; generated HTML contains one H1, the HTTPS canonical/`og:url`/JSON-LD URLs, legacy conversion content, and `id="tratamentos"`. `.output/public/peeling/index.html` targets `/#tratamentos`.

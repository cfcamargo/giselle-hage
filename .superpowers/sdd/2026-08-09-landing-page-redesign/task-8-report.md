# Task 8 Report — Replace Legacy Composition and Remove Service Pages

## Status

DONE

## Delivered

- Replaced the homepage's hidden `HomeTemplate` composition with the approved landing sequence inside `main#conteudo`.
- Reduced `AppLayout` to a transparent slot and retained homepage SEO/canonical/JSON-LD metadata.
- Deleted the nine `pages/services/*.vue` routes and only the legacy template/organisms proven unreferenced by the audit.
- Preserved landing assets and generic atoms/molecules; all legacy URLs remain covered by existing `routeRules` redirects.
- Updated the Nuxt SEO integration contract to cover the published landing content, section order and current primary navigation anchors.

## TDD evidence

- RED: the new rendered-page composition test failed with `main#conteudo` absent.
- GREEN: after the explicit composition, `npm test -- tests/nuxt/seo.spec.ts` passed 5/5.

## Verification

- `npm test`: PASS — 12 files, 62 tests.
- `npm run generate`: PASS — static output generated successfully.
- Nitro HTTP verification: `curl -I` for `/services/Botox`, `/services/Preenchimento` and `/services/Peeling` each returned `301` with `location: /#tratamentos`.
- Route audit: `pages/` contains only `pages/index/index.vue`; generated service entries are redirect stubs, not legacy page content.
- `git diff --check`: PASS.

## Contract

`/` renders one landing page in this order: BrandIntro, LandingHeader, LandingHero, CredentialsStrip, Treatments, Philosophy, Results, About, FAQ, Location, Closing CTA, Floating WhatsApp and SiteFooter. Published service URLs permanently redirect to `/#tratamentos`.

## Notes

Existing toolchain warnings remain unchanged: npm config deprecations, Vite's native-config warning, Node `fs.Stats` deprecation, the Vitest Nuxt e2e-config warning, a Vite websocket-port warning during parallel full-suite startup, and outdated Browserslist data.

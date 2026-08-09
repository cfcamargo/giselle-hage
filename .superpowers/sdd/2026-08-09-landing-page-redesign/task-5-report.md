# Task 5 Report — Credentials, Treatments and Philosophy Narrative

## Status

DONE_WITH_CONCERNS

## Implemented

- Added `CredentialsStrip` with a semantic credentials list and a single ScrollTrigger timeline for reveal/emphasis.
- Added `TreatmentsSection` with three anchored articles, accessible images, individual summaries and real WhatsApp CTAs keyed by treatment slug.
- Added desktop-only alternating pinned panels behind `(min-width: 1024px)` and normal-flow mobile reveals.
- Added `PhilosophySection` connecting “Prevenir”, “Cuidar” and “Preservar” to prevention and natural aging, including an `aria-hidden` contour illustration.
- Composed all three sections between `LandingHero` and the legacy `HomeTemplate` without removing legacy content.
- Added accessible treatment image descriptions and content invariants for unique slugs, public paths, summary completeness and prohibited guarantee language.
- Added focused behavior tests for semantic structure, accessible images, WhatsApp CTA behavior and philosophy hierarchy.

All GSAP and ScrollTrigger imports occur after mount on the client. Each section registers ScrollTrigger inside that client-side import path and owns a `gsap.context()` reverted on unmount. Reduced-motion preference bypasses animation setup.

## TDD evidence

- RED: `landingData.spec.ts` failed because treatment image descriptions were absent.
- GREEN: descriptions were added to the typed treatment content and all four content tests passed.
- RED: the focused narrative suite failed because the three requested components did not exist.
- GREEN: the three components were implemented; the focused suite now passes 7/7 tests.

## Verification

- `npm test -- tests/unit/landingData.spec.ts tests/unit/LandingNarrative.spec.ts` — PASS, 2 files / 7 tests.
- `npm run build` — PASS, exit 0; client and SSR server bundles built successfully.
- `git diff --check` — PASS.
- Browser audit at 390 × 900 — correct reading order, 3 articles/CTAs, one `h1`, no horizontal overflow, 0 pin spacers; all reveals visible after normal scroll.
- Browser audit at 1440 × 900 — correct reading order, 3 articles/CTAs, one `h1`, no horizontal overflow, 3 desktop pin spacers.

## Concerns

- The full `npm test` suite could not be completed in this environment. Inside the sandbox the two Nuxt suites fail before assertions with `uv_interface_addresses` while trying to allocate a local port. An escalated retry was started but externally interrupted before producing a result. The 21 non-Nuxt baseline assertions had passed before that environmental failure, and all Task 5 focused tests pass.
- The production server artifact starts, but requesting it in this workspace returned an existing packaging/runtime resolution error for `.output/server/node_modules/vue/server-renderer/index.mjs`; the Nuxt development server served the page successfully and was used for browser verification. `npm run build` itself exits 0.

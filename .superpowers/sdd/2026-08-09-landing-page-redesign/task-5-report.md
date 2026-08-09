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

## Fix Round 1

### Changes

- Replaced the one-time treatment breakpoint check with `gsap.matchMedia()` conditions for `(min-width: 1024px)` and `(prefers-reduced-motion: reduce)`.
- Responsive GSAP contexts now revert the previous desktop pins/mobile reveals before rebuilding for the new media state.
- Enabling reduced motion during the session removes active treatment motion; disabling it rebuilds the appropriate current layout.
- Component unmount explicitly reverts both the responsive match-media context and the owning GSAP context.
- Expanded the GSAP/ScrollTrigger test double to model stable `MediaQueryList` objects, change listeners, responsive re-runs, pin spacers and cleanup.
- Added coverage for SSR-safe plugin registration, exactly three desktop pins, desktop-to-mobile cleanup, mobile reveals without pins, initial/dynamic reduced motion, unmount cleanup and all three CTA sources.
- Corrected the preenchimento image description to describe a clinical application near the eyes/face without implying a result.

### RED/GREEN evidence

- RED: `npm test -- tests/unit/LandingNarrative.spec.ts` — FAIL, 6 failed / 2 passed. Failures covered the old alt, missing client registration under the static gate, missing pins/reveals, missing responsive rebuild and missing responsive cleanup.
- GREEN: `npm test -- tests/unit/LandingNarrative.spec.ts tests/unit/landingData.spec.ts` — PASS, 2 files / 12 tests.
- BUILD: `npm run build` — PASS, exit 0; 1,935 client modules and 229 SSR modules transformed.

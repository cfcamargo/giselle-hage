# Task 4 Report — Brand Intro, Header and Hero Experience

## Status

DONE_WITH_CONCERNS

Implemented the staged landing opening: an accessible, session-aware brand intro, a responsive editorial header, and an SSR-visible clinical hero. The legacy `HomeTemplate` remains below the new experience for Task 8, while the hero now owns the page's only H1 and the Task 3 metadata/JSON-LD remain unchanged.

## Changes

- `components/landing/BrandIntro.vue`
  - Renders the existing SVG logo in the initial HTML.
  - Runs a GSAP path-drawing sequence with `strokeDashoffset`, fills the mark, and removes the intro with a clip-path reveal.
  - Uses the idempotent `finish()` path for timeline completion, the keyboard/touch skip control, the 2100 ms hard timeout, reduced motion, and the `giselle-intro-seen` session flag.
  - Starts hidden in SSR and only activates after mount, so the page is visible and usable without JavaScript or motion.
  - Cleans the timer, timeline, and document scroll-lock class on completion/unmount.
- `components/landing/LandingHeader.vue`
  - Adds a fixed semantic header and `<nav aria-label="Navegação principal">` using the existing logo and the required `inicio`, `tratamentos`, `sobre`, `resultados`, and `contato` anchors.
  - Adds a responsive mobile menu with `aria-expanded`, Motion for Vue enter/exit animation, reduced-motion duration zero, Escape handling, and focus return to the trigger.
- `components/landing/LandingHero.vue`
  - Renders the content-backed eyebrow, single H1, supporting text, Ponta Porã location, and WhatsApp CTA.
  - Renders `/hero-bg.jpg` through `NuxtImg` with preload, intrinsic 3024×3185 dimensions, responsive sizes, and decorative/empty alt treatment because the clinical information is already present in text.
  - Keeps all meaningful content visible in base CSS; GSAP enhances only the media, rule, and folio decorations after hydration through the existing reduced-motion-aware GSAP context.
- `pages/index/index.vue`
  - Composes the intro, new header, and hero.
  - Removes the temporary Task 3 H1 so `LandingHero` owns the only page H1.
  - Preserves `HomeTemplate` below for Task 8, hiding only its duplicate legacy fixed header and removing its obsolete top offset.
  - Leaves SEO metadata, canonical handling, and JSON-LD logic unchanged.
- `package.json` / `package-lock.json`
  - Adds `@vueuse/core@^10.9.0`, the mandatory peer declared by the already-selected `motion-v@2.3.0`. Importing Motion components without it reproducibly caused unresolved-module errors and SSR HTTP 500 responses.
  - `yarn.lock` was restored and is unchanged.

## TDD evidence

- Initial RED — `npm test -- tests/unit/BrandIntro.spec.ts`: failed at import resolution because `BrandIntro.vue` did not exist.
- Initial GREEN — the same command passed 1 file and 2 tests for session-flag completion and the skip control.
- Review RED — added a regression test for the existing logo's intended intro dimensions; it failed with width `75` instead of `150`, exposing an incorrect kebab-case binding to the legacy snake-case props.
- Review GREEN — corrected the prop bindings; the focused suite passed 1 file and 3 tests.
- Final suite — `npm test` passed 7 files and 18 tests, including real Nuxt SSR coverage for the single H1, metadata, JSON-LD, redirects, and preserved legacy content.
- Final build — `npm run build` exited 0 after building the client, SSR bundle, and Nitro server.
- `git diff --check` exited 0.

## Debugging evidence

- The first sandboxed full-suite run could not enumerate local interfaces (`uv_interface_addresses`); rerunning outside the network sandbox exposed the actual integration issue.
- Both Nuxt fixtures returned HTTP 500 because `motion-v` imports `@vueuse/core`; `npm ls` confirmed the peer was absent and `motion-v/package.json` declares `@vueuse/core >=10.0.0`.
- Adding the existing lock-compatible `@vueuse/core@10.9.0` was the single production fix. The next complete run passed all SSR and unit tests.
- The first plain `npm install` was blocked by unrelated pre-existing Nuxt/Vite/Vitest peer conflicts. The dependency was installed with `--legacy-peer-deps` to avoid changing those versions.

## Concerns

1. The requested same-tab visual reload check was not performed in a real browser because no Playwright browser binary is installed in this environment. Automated coverage verifies the session flag path and skip control; a final visual smoke check should still confirm the full first-load timeline, immediate second-load reveal, header/menu layout, and image crop on target devices.
2. `HomeTemplate` intentionally remains for the staged migration, so the page temporarily repeats legacy hero/content below the new hero. Its old fixed header is hidden to prevent it from covering the new header. Task 8 should remove this bridge.
3. The new header already uses the final Portuguese IDs, but legacy sections still expose `about`/`contact` and no `resultados` ID. Those links become fully resolvable when the future sections replace `HomeTemplate`; no future-section markup was added here.
4. The repository still emits pre-existing warnings for npm config keys, Vitest's future native config loader, deprecated `fs.Stats`, outdated Browserslist data, and dependency audit findings. They do not fail the focused tests, full suite, or production build.

# Task 9 Report — Browser Accessibility, Responsiveness and Conversion

## Status

DONE_WITH_CONCERNS

## Delivered

- Added Playwright coverage against a production Nuxt build and `npm run preview`, with desktop Chrome and Pixel 7 projects.
- Covered one H1, a canonical WhatsApp `href`, reduced-motion intro completion, visible keyboard focus, exact landing sibling/section order, all required section headings, horizontal overflow at 390×844 and 1440×900, mobile-menu Escape/focus restoration, and permanent redirects for `/services/Botox`, `/services/Preenchimento`, `/services/Peeling`, and `/peeling`.
- Added browser-level regression coverage for the Task 7 floating CTA contract: hidden/unfocusable at the hero, visible in the middle journey, then hidden/unfocusable while the closing CTA intersects.
- Added explicit `pending`/`active`/`complete` intro state so reduced-motion completion has an observable browser contract.
- Kept Playwright artifacts out of version control and excluded `tests/e2e/**` from Vitest discovery.

## TDD evidence

- RED: desktop Playwright initially passed 7/9 and failed because `[data-intro-state="complete"]` did not exist. The menu assertion also failed because its accessible-name locator invalidated itself when the label changed; stabilizing that test proved no header production change was needed.
- GREEN: the focused intro/menu run passed 2/2 after the minimal intro state addition and selector correction.
- Regression matrix: `npm run test:e2e` passed 18/18 across desktop and mobile.

## Production-preview workaround

The Nuxt/Nitro build emits the narrow generated symlink `.output/server/node_modules/vue -> .nitro/vue@3.4.19`, but that traced package omits `vue/server-renderer`; preview therefore responds 500. The Playwright web-server command unlinks only that generated symlink after every fresh build. Node then resolves the project's installed Vue 3.5.41, and the real Nuxt preview renders `/` with HTTP 200 while preserving Nitro's HTTP 301 route rules. The command also fixes `HOST`, `PORT`, and `NUXT_PUBLIC_SITE_URL` explicitly.

## Verification

- `npm run test:e2e`: PASS — 18/18 (desktop and mobile).
- `npm test`: PASS — 12 files, 62/62 tests.
- `git diff --check`: PASS.
- `npx nuxi typecheck`: BLOCKED by its unpinned transient pair `vue-tsc@3.3.9` + `typescript@7.0.2` (`ERR_PACKAGE_PATH_NOT_EXPORTED`) before project analysis.
- Compatible fallback `npx --yes --package vue-tsc@2.2.12 --package typescript@5.7.3 vue-tsc --noEmit`: FAIL — 18 existing errors in GSAP typings and older test helpers. No reported error is in `playwright.config.ts`, `tests/e2e/landing.spec.ts`, or `BrandIntro.vue`; these cross-cutting pre-existing issues were left outside Task 9 scope.

## Contract

The production preview now has repeatable desktop/mobile browser tests for accessibility, responsive containment, landing order, conversion links, floating-CTA intersections, and representative permanent legacy redirects. Browser and unit suites are green; repository-wide typecheck remains a documented pre-existing concern.

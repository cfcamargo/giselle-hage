# Task 9 Report — Browser Accessibility, Responsiveness and Conversion

## Status

DONE

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

## Production preview

Playwright builds a temporary source copy outside the nested Git worktree and runs the real Nuxt production preview there. It reuses the checkout's installed dependencies but never mutates `.output` or any generated symlink in the checkout. `HOST`, `PORT`, and `NUXT_PUBLIC_SITE_URL` are fixed explicitly, and `reuseExistingServer` is always false.

## Verification

- `npm run test:e2e`: PASS — 22/22 (desktop and mobile).
- `npm test`: PASS — 12 files, 62/62 tests.
- `git diff --check`: PASS.
- `npm run typecheck`: PASS with exact local `vue-tsc@1.8.27` and `typescript@5.3.3`.

## Contract

The production preview now has repeatable desktop/mobile browser tests for accessibility, responsive containment, landing order, conversion links, floating-CTA intersections, and representative permanent legacy redirects. Browser, unit, and typecheck suites are green.

## Fix Round 1

### Status

DONE — the unlink workaround is removed, and the untouched standalone artifact is exercised outside the environment-specific nested-worktree collision.

### Root-cause evidence

- RED, untouched artifact: a clean `npm run build` followed by `npm run preview` returns HTTP 500 for `/` with `Cannot find .../.output/server/node_modules/vue/server-renderer/index.mjs`.
- The generated link is `.output/server/node_modules/vue -> .nitro/vue@3.4.19`. That traced directory contains Vue's root entrypoints and `dist`, but omits the exported `server-renderer` directory. Nitro also traces `.nitro/vue@3.5.41`, which does contain `server-renderer/index.mjs`.
- Before the fix attempt the application resolved `vue` and `@vue/server-renderer` 3.5.41, while Nuxt 3.10.2 and `@nuxt/vite-builder` declare Vue `^3.4.19`/`3.4.19`; Nitro is 2.8.1. The base commit `095e08a` has the same package manifests and lockfile shape, so this dependency/toolchain debt predates Task 9.
- Moving the entire generated `.output` aside and rebuilding falsified the stale-output hypothesis: Nitro recreated the same 3.4.19 link.
- Pinning Vue and server-renderer together at 3.4.19 made the standalone smoke pass, but proved incompatible with the repository's `@vue/test-utils@2.4.11`, which calls Vue 3.5's `app.onUnmount` and caused 12 unit failures.
- Pinning both at 3.5.41 restored the unit suite, but a clean build inside the nested worktree still generated the Vue 3.4.19 link. The nested Git worktree sits beneath the main checkout, and Nitro can trace both the worktree and parent checkout `node_modules`; the parent contains Vue 3.4.19.
- Environmental confirmation copied the same source and lockfile to `/tmp`, excluded `.git`, `.output`, `.nuxt`, `node_modules`, and the tracked `dist` symlink, then ran `npm ci`, build, and the untouched server. `/` returned 200; all four representative legacy paths returned 301 with `location: /#tratamentos`. This isolates the defect to nested-worktree dependency discovery rather than the deployable artifact.

### Other requested fixes completed locally

- Removed the symlink unlink from Playwright and set `reuseExistingServer: false`.
- Added a standalone HTTP 200 smoke and strengthened coverage for a CSS-visible focus indicator, exact disclosure open state, unique CTA/floating locators, ordinary-motion intro completion, and overflow after scrolling/lazy image completion.
- Added exact local `vue-tsc@1.8.27` and `typescript@5.3.3`, plus `npm run typecheck`; the command now exits 0 after minimal production/test typing corrections.

### Verification

- `npm run typecheck`: PASS (exit 0).
- `npm test`: PASS — 12 files, 62/62 tests.
- `npm run test:e2e`: PASS — 22/22 across desktop and mobile, including the untouched artifact smoke and representative 301 redirects.
- `git diff --check`: PASS.

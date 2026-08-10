# Task 10 Report — Performance, SEO and Release Verification

## Status

`DONE_WITH_RELEASE_GATES`

The landing page is verified for local/staging presentation. Public deployment remains gated by client fact/permission confirmation, a real `NUXT_PUBLIC_SITE_URL`, and platform-native 301 rules for the chosen static host.

No clinical fact or publication claim was changed in Task 10.

## Audit-driven fix

The Task 5 ledger concern was reproducible: `CredentialsStrip` and `PhilosophySection` read reduced motion only during mount, so a live OS preference change did not tear down their active GSAP/ScrollTrigger effects.

- Root cause: the reactive preference was used as a one-time guard rather than as animation lifecycle input.
- Fix: both sections now use `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)`, revert the current media cycle when the preference changes, rebuild motion when it is disabled, and release media/context resources on unmount.
- RED: `npm test -- tests/unit/LandingNarrative.spec.ts` — 1 file, 10 tests; 8 passed and the 2 new live-preference cases failed with `expected 'reveal' to be undefined`.
- GREEN: the same command — 1 file, 10/10 passed.

The Task 7 and Task 8 ledger minors were already closed by fresh existing coverage:

- Task 7: unit and E2E coverage assert the closing-section intersection plus `data-visible`, `aria-hidden` and `tabindex` transitions.
- Task 8: E2E asserts the complete root sibling order and all nine `main#conteudo` section siblings; representative Nitro redirects cover `/services/Botox`, `/services/Preenchimento`, `/services/Peeling` and `/peeling`.

## Fresh command verification

Commands were run from the Task 10 worktree.

| Command | Result |
| --- | --- |
| `npm test` in sandbox | Environmental failure before the two Nuxt suites: `uv_interface_addresses`; 10 files/56 tests passed and 6 Nuxt tests were skipped. |
| `npm test` with local-interface access | PASS — 12 files, 62/62 tests. |
| `npm run build` | PASS — exit 0; 1,831 client modules and 166 SSR modules transformed. |
| `npm run test:e2e` | PASS — 22/22 across desktop and mobile, including the untouched lockfile-faithful production artifact. |
| `npx nuxi typecheck` | PASS — exit 0. |
| `git diff --check` before the audit fix | PASS. |
| `npm test -- tests/unit/LandingNarrative.spec.ts` after the fix | PASS — 10/10. |
| `NUXT_PUBLIC_SITE_URL=https://release-audit.example npm run generate` after the fix | PASS — exit 0; static artifact generated. This command also completed fresh client and SSR production builds. |
| `node /tmp/task10-browser-audit.mjs` against the generated preview | PASS — exit 0 for all assertions at 1440×900, 768×1024 and 390×844. |
| `git diff --check` after the fix | PASS. |

The full-suite, E2E and typecheck runs preceded the narrowly scoped animation fix. Post-fix evidence is the focused 10/10 regression suite, a complete fresh generate/build, the three-viewport Chromium audit and the final diff check.

Existing non-fatal toolchain warnings remain: npm project-option deprecations, Vite native config warning, Node `fs.Stats` deprecation, an outdated Browserslist database, and the known parallel Nuxt test websocket-port warning.

## Generated HTML and SEO

The HTML was located from the generated artifact rather than assumed from an obsolete build path; the generated homepage resolved to `.output/public/index.html`.

Generation used the controlled origin `https://release-audit.example`. A Node semantic audit exited 0 and recorded:

- exactly 1 `<h1>`;
- canonical `https://release-audit.example/`;
- exactly 1 `application/ld+json` script with `Dentist` and `LocalBusiness` types;
- title `Dra. Giselle Hage | Harmonização Facial em Ponta Porã`;
- local headline `Harmonização Facial em Ponta Porã` and credential `CRO-MS 4589` present;
- required IDs `conteudo`, `inicio`, `landing-hero-title`, `tratamentos`, `resultados`, `sobre`, `faq`, `contato`, `agendamento-final` and `rodape` present;
- no duplicate IDs and no missing in-page navigation targets;
- 12 content images: exactly 1 eager hero image and 11 lazy images; every image has width and height.

`NUXT_PUBLIC_SITE_URL` is therefore proven to control canonical/absolute structured-data URLs. The application intentionally omits unsafe canonical/absolute business URLs when no valid HTTPS origin is configured; production must supply the confirmed value.

## Chromium audit

The ordinary-motion intro completed in 1,980.1 ms measured from `active` to `complete`, below the 2.1-second cap. The skip control completed it in 61 ms. A reload in the same session had no active overlay, kept it `display: none`, and reached `complete` at 148.3 ms after navigation.

At 1440×900, 768×1024 and 390×844 with reduced motion:

- intro and every audited reveal were in final visible state immediately;
- no pin spacers were created;
- `scrollWidth === clientWidth` (1440, 768 and 390 respectively);
- neither `html` nor `body` retained scroll locking;
- the hero was the only eager image and was loaded; all 11 below-fold images were lazy, loaded successfully when scrolled, and retained intrinsic dimensions;
- observed layout-shift total was 0 in each controlled run;
- the observed LCP candidate was the hero `H1` (not a synthetic Lighthouse score): 213,453 px² desktop, 60,534 px² tablet and 58,587 px² mobile.

At desktop ordinary motion, three treatment pin spacers were created. After scrolling to Philosophy, zero treatment panels remained fixed, the Philosophy heading was visible and scrolling was unlocked, confirming release from the pinned sequence.

All 11 rendered WhatsApp links had exactly:

`https://api.whatsapp.com/send?phone=5567981269482&text=Ol%C3%A1%2C%20Dra.%20Giselle!%20Conheci%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20para%20entender%20qual%20tratamento%20%C3%A9%20mais%20indicado%20para%20mim.`

The nine JavaScript-driven CTA clicks invoked `window.open` with that exact URL, `_blank` and `noopener,noreferrer`; the remaining rendered links are direct anchors with the same exact href. Results copy retained its variability disclaimer and contained no result-guarantee claim.

## Performance evidence

No Lighthouse score was invented or reported.

Fresh production output showed these main browser resources:

- entry JS: 185.03 kB raw / 67.85 kB gzip;
- main page JS: 178.15 kB raw / 59.72 kB gzip;
- supporting page JS: 70.88 kB raw / 27.96 kB gzip;
- ScrollTrigger chunk: 43.99 kB raw / 18.27 kB gzip;
- page CSS: 32.06 kB raw / 6.04 kB gzip.

The generated static directory is about 35 MB because Nuxt copies legacy files still present under `public/`, including several unused 1–2 MB source images. These files were not requested by the audited landing page, so they do not enter its measured initial candidate path; pruning them can be handled as a separate asset-debt task after confirming no external consumers rely on their public URLs.

## Legacy redirects

`nuxt.config.ts` declares 301 rules for all nine legacy `/services/*` names, their nine lowercase aliases, `/peeling`, and a `/services/**` fallback. Generation emitted a redirect stub for every one of those 19 explicit paths. The fresh E2E production-Nitro audit returned 301 with `Location: /#tratamentos` for the four representative routes and found no loop.

The requested `curl` binary is not installed in this execution image (`command not found`). An equivalent fresh HEAD matrix via Node against Nuxt's generic static `serve` preview returned `200` with no `Location` for all 19 paths. This is expected for HTML redirect stubs and proves that `routeRules` alone cannot guarantee HTTP 301 on an unspecified static platform. Platform-native 301 configuration and a full 19-path HEAD/curl rerun on the chosen host are a public-release gate.

## Public-release gates

Before public deployment:

1. Client confirms the professional title, `CRO-MS 4589`, “desde 2009”, address, opening hours, WhatsApp number, Instagram handle, each treatment summary, and permission to publish every result image. Apply corrections in `data/landing.ts` without inventing clinical facts, then rerun the complete suite.
2. Client confirms the production domain and deploy provides a valid HTTPS `NUXT_PUBLIC_SITE_URL`; it is mandatory for canonical and absolute structured-data URLs.
3. Deployment target is selected and configured with platform-native 301 rules for all 19 explicit legacy variants (plus the fallback where supported); rerun HEAD/curl on the deployed origin and reject any 200 stub or redirect loop.

These gates do not block local/staging presentation, but they do block a public-release sign-off.

## Fix Round 1 — faithful `gsap.matchMedia` lifecycle

Review of GSAP's installed source confirmed that `MatchMedia.add()` invokes a conditional callback only when at least one registered condition matches. The initial Task 10 fix registered only `(prefers-reduced-motion: reduce)` and then returned from that matching branch. As a result, the real callback never built ordinary-motion resources and could not rebuild them after a reduce → no-preference transition. This section supersedes the earlier implementation detail that described the reduce-only registration as complete.

The correction is deliberately scoped to animation lifecycle behavior:

- `CredentialsStrip` and `PhilosophySection` now register complementary `allowMotion` and `reduceMotion` conditions. Ordinary motion builds, switching to reduce reverts the active media cycle, and switching back rebuilds it.
- The faithful mock exposed the same incomplete condition set in the existing mobile branch of `TreatmentsSection`; it now also registers `allowMotion`, preserving its intended ordinary-motion reveals without changing content.
- `LandingNarrative.spec.ts` now models the installed GSAP behavior: initial setup runs only when any registered condition matches, media changes are reactive only when a condition toggles, the previous cycle is reverted, and setup is skipped when the new state has no matching condition.
- Both affected components are exercised in both directions: no-preference → reduce tears resources down, and reduce → no-preference rebuilds them. Listener cleanup remains asserted.
- A timing-independent Playwright assertion checks computed animation state for both sections: resources/styles are active in ordinary motion, absent/final in reduce, and active again after returning to no-preference. It uses `expect.poll` rather than fixed sleeps and runs in both desktop and mobile projects.

### RED/GREEN evidence

- Unit RED, before the production fix: `npm test -- tests/unit/LandingNarrative.spec.ts` — 1 file, 10 tests; 6 passed and 4 failed. The two affected sections had no ordinary reveal, and the faithful lifecycle also exposed the two Treatment ordinary/mobile cases.
- Browser RED, before the production fix: `npm run test:e2e -- --grep "tears down and rebuilds narrative motion"` — 0/2 passed; desktop and mobile both timed out on the initial ordinary-motion assertion.
- Focused unit GREEN: the same unit command — 1 file, 10/10 passed.
- Focused browser GREEN: the same filtered E2E command — 2/2 passed (desktop 906 ms; mobile 937 ms).

### Fresh post-fix verification

| Command | Result |
| --- | --- |
| `npm test` | PASS — 12 files, 64/64 tests; 13.66 s. |
| `npm run test:e2e` | PASS — 24/24 tests across desktop and mobile; 36.0 s. |
| `npm run typecheck` | PASS — exit 0. |
| `NUXT_PUBLIC_SITE_URL=https://release-audit.example npm run generate` | PASS — exit 0; static output generated after fresh client (1,831 modules) and SSR (166 modules) builds. |
| `git diff --check` | PASS after the report append — no whitespace errors. |

The generated main page JavaScript remained 178.31 kB raw / 59.73 kB gzip, the entry 185.03 / 67.85 kB, ScrollTrigger 43.99 / 18.27 kB, and page CSS 32.06 / 6.04 kB. No Lighthouse score is inferred from these resource sizes.

The overall status remains `DONE_WITH_RELEASE_GATES`. No clinical fact or publication claim changed. The three public-release gates above remain unchanged: client fact/permission confirmation, a confirmed production domain supplied through mandatory `NUXT_PUBLIC_SITE_URL`, and platform-native 301 rules plus deployed-origin verification for the selected static host.

## Whole-branch Fix Wave 1 — final review corrections

This wave closes the remaining whole-branch findings without a Nuxt major migration or new clinical claims.

### Dependency and toolchain reconciliation

- Repository search found no `nuxt-swiper` source consumer. The module and dependency were removed.
- npm is now the declared workflow (`npm@10.9.2`, Node `>=20`, npm `>=10`), and the stale Yarn v1 lock was removed. The production-preview harness already proves a clean `npm ci --legacy-peer-deps` install before build/preview. `.nuxtrc` records the installed `@nuxt/test-utils` setup lifecycle version generated by Nuxt.
- The inherited partial lock refresh had moved Nuxt from the previously installed 3.10.2 to 3.21.11 and emitted TypeScript parser errors with the pinned TypeScript/vue-tsc toolchain. It was rejected. Nuxt is pinned to the already validated 3.10.2, and the lock was regenerated with npm 10 before compatible audit patches were applied.
- Compatible transitive audit fixes updated Babel helpers, `braces`, `cross-spawn`, `ipx`, `micromatch`, `node-forge`, `picomatch`, `sharp`, `tar-fs` and related packages without changing the Nuxt or `@nuxt/image` major/minor contract.

The production audit improved from 14 vulnerable package entries (1 low, 3 moderate, 9 high, 1 critical) to 7 (6 high, 1 critical). The remaining paths are:

- `@nuxt/image@1.0.0-rc.1 → ipx@1.3.2 → sharp@0.32.6`: `sharp <0.35.0` inherits current libvips advisories. The current site only transforms repository-owned images during build/static generation and has no user-upload surface, but the advisory remains real. npm proposes `@nuxt/image@2.1.0`, a breaking upgrade, so it was not forced in this wave.
- `@nuxt/kit@3.10.2 → c12@1.11.2 → giget@1.2.5 → tar@6.2.1`: current `node-tar` archive traversal/overwrite/DoS advisories. This path is build/config acquisition tooling; the published landing page does not accept or extract user-provided archives at runtime. Clearing it requires a framework-compatible dependency migration or an unproven transitive major override, so it remains documented rather than represented as clean.

### Motion lifecycle

- `useGsapContext` now observes the shared reduced-motion ref, immediately reverts the active context and component cleanup on no-preference → reduce, and rebuilds once on reduce → no-preference. Async imports are generation-guarded so neither a reduced transition nor unmount can create a late context.
- `LandingHero` releases its `js-motion` marker through the composable cleanup contract.
- `AboutSection` owns the same live revert/rebuild lifecycle for its ScrollTrigger context, removes `js-motion` on teardown and rejects stale async imports.
- `BrandIntro` treats a live transition to reduced motion as completion: it kills its timeline, clears the hard timeout and scroll lock, records the session and never restarts when no-preference returns.
- Unit tests cover both preference directions, listener/unmount cleanup and deferred-import races. Playwright covers the active intro transition and ordinary → reduce → ordinary resources for hero and profile without fixed sleeps.

### Trusted-origin SEO and conversion contracts

- `utils/siteOrigin.ts` is the single HTTPS-origin validator. It rejects missing, malformed, credential-bearing and non-HTTPS values, strips path/query/hash and normalizes the accepted origin to `/`.
- With a valid origin, canonical, Open Graph URL/image and structured-data URLs are absolute; `robots.txt` allows crawling and names the absolute sitemap; `sitemap.xml` lists the absolute homepage and is prerendered.
- Without one, the page emits `noindex, nofollow`, omits canonical and origin-dependent Open Graph/JSON-LD URL fields, robots disallows crawling, and the sitemap route returns 404 and is not selected for prerender.
- Address parts, the formatted address, Instagram URL, WhatsApp phone and exact prefilled message now live in `landingContent`. JSON-LD, visible location/footer and WhatsApp links consume those shared facts.
- Footer WhatsApp uses `openWhatsApp('footer')`, so it dispatches `whatsapp:click` before opening. The hero primary label is exactly `Agende sua avaliação`.
- Regional copy now says the border is between Brazil and Paraguay and mentions nearby Pedro Juan Caballero without claiming a clinic or attendance in Paraguay.
- No approved font binaries exist and no runtime font request was added; CSS uses system-safe display and sans-serif stacks. Test preview origin is the reserved `https://preview.example.test`.

### TDD and final evidence

The new contracts were written before their implementations. The first scoped RED run failed on the missing origin utility, two missing landing-data contracts, the WhatsApp centralization contract, footer source/Instagram reuse and the old hero label. The initial Nuxt RED attempt could not reach assertions inside the restricted sandbox because `uv_interface_addresses` is blocked; it was rerun with local-interface access after implementation. Focused GREEN evidence was 7 unit files / 56 tests and 2 Nuxt files / 8 tests.

Fresh final commands from this worktree:

| Command | Result |
| --- | --- |
| `npm test` with local-interface access | PASS — 13 files, 83/83 tests. |
| `npm run typecheck` | PASS — exit 0, no TypeScript diagnostics. |
| `npm run build` without an origin | PASS — Nuxt 3.10.2 / Nitro 2.8.1; 1,818 client and 139 SSR modules; only `robots.txt` selected for prerender. |
| `npm run test:e2e` | PASS — 28/28 across desktop and mobile; `.last-run.json` recorded `passed` with no failed tests after the clean-install production-preview run. |
| `NUXT_PUBLIC_SITE_URL=https://release-audit.example npm run generate` | PASS — controlled static artifact generated with homepage, robots and sitemap. |
| Generated-artifact semantic check | PASS — exactly one H1; canonical, `og:url`, absolute `og:image`, JSON-LD image, crawlable robots and sitemap all use `https://release-audit.example/`. |
| `npm audit --omit=dev --audit-level=high` after compatible fixes | Expected non-zero — 7 residual entries (6 high, 1 critical), paths and exposure recorded above. |
| `git diff --check` | PASS before commit. |

Warnings remain non-fatal and explicit: the legacy npm project options, Node `fs.Stats` deprecation, old Nuxt/Vite tooling notices and the parallel Nuxt-test websocket warning. No Lighthouse score is inferred.

The status remains `DONE_WITH_RELEASE_GATES`. Public release still requires client confirmation of professional/contact/content facts and result-image permission, the real HTTPS `NUXT_PUBLIC_SITE_URL`, and host-native 301 rules plus deployed-origin verification for all legacy URLs.

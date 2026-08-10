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

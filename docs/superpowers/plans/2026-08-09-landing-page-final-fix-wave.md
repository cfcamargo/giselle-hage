# Landing Page Final Fix Wave Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close all important final review findings with compatible dependency remediation, live reduced-motion lifecycle, trustworthy SEO artifacts, centralized contact facts and conversion-contract corrections.

**Architecture:** Keep the current Nuxt 3 structure. Share only two new boundaries: a pure site-origin validator used by page/server/config code, and the existing landing content object for all address/contact facts. Motion lifecycle remains scoped to its owning composable/component.

**Tech Stack:** Nuxt 3, Vue 3, TypeScript, GSAP/ScrollTrigger, Vitest, Nuxt test utils, Playwright, npm.

## Global Constraints

- Do not change clinical facts without a source.
- Do not use a runtime network font dependency.
- Do not force a breaking package upgrade.
- `NUXT_PUBLIC_SITE_URL` remains mandatory for public release.
- Keep client confirmation and static-host 301 configuration as release gates.
- Produce one coherent implementation commit after full verification.

---

### Task 1: Dependency and toolchain hygiene

**Files:** Modify `package.json`, `package-lock.json`, `nuxt.config.ts`; delete `yarn.lock`; test with repository search, npm audit and production build.

- [ ] Prove `nuxt-swiper` has no source consumer with `rg`.
- [ ] Remove its Nuxt module and npm dependency, updating the lock through npm.
- [ ] Add Node/npm metadata and remove the stale Yarn lock after confirming npm is the current production-preview workflow.
- [ ] Run audit/build and apply only compatible safe audit remediation; record every residual advisory and dependency path.

### Task 2: Reactive reduced-motion lifecycle

**Files:** Modify `composables/useGsapContext.ts`, `components/landing/LandingHero.vue`, `components/landing/AboutSection.vue`, `components/landing/BrandIntro.vue`; test `tests/unit/useGsapContext.spec.ts`, `tests/unit/BrandIntro.spec.ts`, `tests/unit/ResultsProfile.spec.ts`, `tests/e2e/landing.spec.ts`.

- [ ] Add tests proving ordinary → reduce reverts immediately and reduce → ordinary rebuilds once, plus unmount/import-race cleanup.
- [ ] Run focused tests and confirm expected RED failures.
- [ ] Implement the smallest reactive lifecycle and explicit component cleanup.
- [ ] Run focused tests and confirm GREEN, including browser preference transitions without fixed sleeps.

### Task 3: Trusted-origin SEO artifacts

**Files:** Create `utils/siteOrigin.ts`, `server/routes/robots.txt.ts`, `server/routes/sitemap.xml.ts`; modify `pages/index/index.vue`, `nuxt.config.ts`, `tests/nuxt/seo.spec.ts`, `tests/nuxt/seo-no-origin.spec.ts`, `tests/e2e/production-preview.mjs`.

- [ ] Add SSR/route tests for absolute canonical/OG image, robots and sitemap from a reserved HTTPS test origin.
- [ ] Add no-origin tests for `noindex, nofollow`, omitted origin-dependent fields, disallowing robots and a 404 sitemap.
- [ ] Run focused Nuxt tests and confirm RED.
- [ ] Implement origin validation, conditional metadata/routes and conditional sitemap prerendering.
- [ ] Run focused Nuxt tests and confirm GREEN; inspect controlled generated artifacts in final verification.

### Task 4: Central facts and conversion contracts

**Files:** Modify `data/landing.ts`, `composables/useWhatsApp.ts`, `types/landing.ts`, `components/landing/SiteFooter.vue`, `components/landing/LandingHero.vue`, `tests/unit/landingData.spec.ts`, `tests/unit/useWhatsApp.spec.ts`, `tests/unit/LandingConversion.spec.ts`, `tests/e2e/landing.spec.ts`, `tests/nuxt/seo.spec.ts`.

- [ ] Add contract tests for structured address/contact reuse, footer source/event, and exact hero label.
- [ ] Run focused tests and confirm RED.
- [ ] Move existing facts to `landingContent`, wire all consumers, add `footer` source and restore `Agende sua avaliação`.
- [ ] Run focused tests and confirm GREEN.

### Task 5: Safe minors and release documentation

**Files:** Modify `assets/css/main.css`, `data/landing.ts`, `.superpowers/sdd/2026-08-09-landing-page-redesign/task-10-report.md`, and the final review ledger under the same SDD directory.

- [ ] Use accurate system-safe font stacks because no approved local font assets exist.
- [ ] Use natural border-region wording without claiming presence in Paraguay.
- [ ] Replace production-looking test origins with reserved test origins.
- [ ] Append correction workflow, RED/GREEN evidence, exact residual advisories/exposure and unchanged release gates to report and ledger.

### Task 6: Whole-branch verification and commit

**Files:** All changed files above.

- [ ] Run `npm test` and record exact counts.
- [ ] Run `npm run typecheck` and `npm run build`.
- [ ] Run `npm run test:e2e` across both projects.
- [ ] Run `NUXT_PUBLIC_SITE_URL=https://release-audit.example npm run generate` and verify generated canonical, robots, sitemap, absolute OG image and one H1.
- [ ] Run `npm audit --omit=dev --audit-level=high` and report the exact non-zero residual rather than claiming zero.
- [ ] Run `git diff --check`, inspect the complete staged diff, commit once, and confirm a clean worktree.

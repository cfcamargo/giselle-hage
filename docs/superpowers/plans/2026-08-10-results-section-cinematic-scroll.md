# Results Section Cinematic Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the results gallery into a cinematic desktop scroll sequence with a stacked-card feeling while preserving accessible navigation and mobile fallback.

**Architecture:** Keep the implementation inside `components/landing/ResultsSection.vue`. Reuse the existing `landingContent.results`, button navigation, keyboard navigation, and scroll synchronization; add GSAP ScrollTrigger only for desktop motion. Component tests verify semantic controls and reduced-motion-safe structure.

**Tech Stack:** Nuxt, Vue 3 Composition API, TypeScript, GSAP ScrollTrigger, CSS responsive media queries, Vitest.

## Global Constraints

- Desktop uses pinned horizontal scroll with active-card emphasis.
- Upcoming cards are partially visible with depth offsets.
- Mobile and reduced-motion avoid heavy pinning and remain scroll-snap based.
- Preserve ARIA labels, keyboard navigation, counter, disclaimer, and WhatsApp CTA.
- Do not alter clinical result metadata or make outcome claims.

---

### Task 1: Results Gallery Structure And Test Coverage

**Files:**
- Modify: `components/landing/ResultsSection.vue`
- Modify: `tests/unit/ResultsProfile.spec.ts`

**Interfaces:**
- Consumes: `landingContent.results`
- Produces: stable DOM hooks `data-results-stage`, `data-results-track`, `data-results-progress`, `data-result-card`, and `data-result-image`

- [ ] **Step 1: Write the failing test**

Add expectations that the rendered results section exposes the cinematic stage hooks while keeping navigation and disclaimer text.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/unit/ResultsProfile.spec.ts`

- [ ] **Step 3: Add DOM structure**

Add a stage wrapper around the current gallery, a visual progress element, and image/card data hooks. Keep list semantics and current controls.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/unit/ResultsProfile.spec.ts`

### Task 2: Cinematic Desktop Motion

**Files:**
- Modify: `components/landing/ResultsSection.vue`

**Interfaces:**
- Consumes: refs `section`, `stage`, `gallery`
- Produces: desktop GSAP timeline that pins the stage and updates `currentResult`

- [ ] **Step 1: Write the failing test**

Add a component test that verifies the section contains the motion-safe hooks used by the GSAP setup and still exposes the scrollable list.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/unit/ResultsProfile.spec.ts`

- [ ] **Step 3: Implement GSAP setup**

Import GSAP and ScrollTrigger on mount, create a desktop-only matchMedia timeline, translate the track horizontally, scale active cards through timeline progress, update progress line, and clean up on unmount.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- tests/unit/ResultsProfile.spec.ts`

### Task 3: Visual Styling And Fallbacks

**Files:**
- Modify: `components/landing/ResultsSection.vue`

**Interfaces:**
- Consumes: existing CSS variables
- Produces: dark editorial section, stacked-card depth, mobile scroll-snap fallback, reduced-motion fallback

- [ ] **Step 1: Write the failing test**

Add assertions for the preserved CTA/disclaimer/navigation behavior after layout changes.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- tests/unit/ResultsProfile.spec.ts`

- [ ] **Step 3: Update styles**

Apply the darker section, wider cards, layered transforms, active-card classes, progress line, responsive mobile layout, and reduced-motion rules.

- [ ] **Step 4: Run focused tests**

Run: `npm run test -- tests/unit/ResultsProfile.spec.ts tests/unit/landingData.spec.ts`

- [ ] **Step 5: Run full build or available verification**

Run: `npm run build`

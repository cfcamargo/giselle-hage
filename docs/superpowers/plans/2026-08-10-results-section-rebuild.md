# Results Section Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the landing page results section from scratch as a stable cinematic gallery for desktop and a native scroll-snap gallery for mobile.

**Architecture:** Replace the current split-component implementation with one self-contained `components/landing/ResultsSection.vue`. Desktop uses sticky positioning plus measured scroll progress to translate a horizontal track; mobile and reduced-motion use native scroll-snap. The section must not use GSAP `ScrollTrigger` or call `window.scrollTo`.

**Tech Stack:** Nuxt, Vue 3 Composition API, TypeScript, CSS media queries, Vitest, Vue Test Utils.

## Global Constraints

- Do not reuse `components/landing/ResultsDesktopGallery.vue`.
- Do not reuse `components/landing/ResultsMobileGallery.vue`.
- Keep `landingContent.results` unchanged.
- Keep clinical caution copy and disclaimer.
- Do not use GSAP `ScrollTrigger` in `ResultsSection.vue`.
- Do not call `window.scrollTo` in `ResultsSection.vue`.
- Desktop cards must move horizontally on normal page scroll.
- Mobile must not use sticky or pinned scroll.
- Reduced-motion must use the native scroll-snap behavior.
- Preserve accessible buttons, keyboard navigation, counter, `aria-current`, and WhatsApp CTA behavior.

---

### Task 1: Replace Split Components With One ResultsSection Contract

**Files:**
- Modify: `components/landing/ResultsSection.vue`
- Delete: `components/landing/ResultsDesktopGallery.vue`
- Delete: `components/landing/ResultsMobileGallery.vue`
- Modify: `tests/unit/ResultsProfile.spec.ts`

**Interfaces:**
- Consumes: `landingContent.results`, `useWhatsApp()`, `@lucide/vue` icons.
- Produces: a single `ResultsSection.vue` rendering `data-results-stage`, `data-results-pin`, `data-results-track`, `data-result-card`, and `data-results-progress`.

- [ ] **Step 1: Write failing source-structure test**

Update the "keeps mobile result cards dimensionally stable while images load" test so it reads only `components/landing/ResultsSection.vue`.

Expected assertions:

```ts
const source = readFileSync(join(process.cwd(), 'components/landing/ResultsSection.vue'), 'utf8')

expect(source).not.toContain('<ResultsDesktopGallery')
expect(source).not.toContain('<ResultsMobileGallery')
expect(source).not.toContain('ScrollTrigger')
expect(source).not.toContain('window.scrollTo')
expect(source).toContain('data-results-stage')
expect(source).toContain('data-results-pin')
expect(source).toContain('data-results-track')
expect(source).toContain('data-result-card')
expect(source).toContain('data-results-progress')
expect(source).toContain('position: sticky;')
expect(source).toContain('scroll-snap-type: x mandatory;')
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test -- tests/unit/ResultsProfile.spec.ts
```

Expected: FAIL because the current implementation imports `ResultsDesktopGallery` and `ResultsMobileGallery`.

- [ ] **Step 3: Replace template with one gallery implementation**

In `ResultsSection.vue`, remove the two child gallery components and render this structure directly:

```vue
<div
  ref="stage"
  class="results-section__stage"
  :class="{ 'is-cinematic': isCinematicEnabled }"
  :style="{ '--results-travel': `${sectionTravel}px` }"
  data-results-stage
  role="region"
  aria-label="Galeria de resultados clínicos"
  aria-describedby="results-disclaimer"
>
  <div class="results-section__pin" data-results-pin>
    <div class="results-section__viewport">
      <ul
        id="results-gallery"
        ref="track"
        tabindex="0"
        aria-label="Resultados, use as setas para navegar"
        data-results-track
        @keydown.left.prevent="showPrevious"
        @keydown.right.prevent="showNext"
        @scroll.passive="queueNativeSync"
      >
        <li
          v-for="(result, index) in landingContent.results"
          :id="`result-card-${index + 1}`"
          :key="result.image"
          :aria-label="`Resultado ${index + 1} de ${landingContent.results.length}: ${categoryLabels[result.category]}`"
          :aria-current="index === currentResult ? 'true' : undefined"
          :class="{ 'is-current': index === currentResult }"
          data-result-card
        >
          <figure>
            <img
              :src="result.image"
              :alt="result.alt"
              width="892"
              height="892"
              :loading="index === 0 ? 'eager' : 'lazy'"
              decoding="async"
            />
            <figcaption>
              <span>{{ categoryLabels[result.category] }}</span>
              <small>Montagem lado a lado</small>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>

    <div class="results-section__progress" aria-hidden="true">
      <i :style="{ transform: `scaleX(${progress})` }" data-results-progress />
    </div>
  </div>
</div>
```

- [ ] **Step 4: Remove child component files**

Delete:

```bash
components/landing/ResultsDesktopGallery.vue
components/landing/ResultsMobileGallery.vue
```

- [ ] **Step 5: Run focused test**

Run:

```bash
npm run test -- tests/unit/ResultsProfile.spec.ts
```

Expected: structural tests pass or reveal the next missing behavior.

### Task 2: Implement Stable Scroll State

**Files:**
- Modify: `components/landing/ResultsSection.vue`
- Modify: `tests/unit/ResultsProfile.spec.ts`

**Interfaces:**
- Consumes: refs `stage: Ref<HTMLElement | null>` and `track: Ref<HTMLElement | null>`.
- Produces: `currentResult`, `progress`, `sectionTravel`, `showResult(index: number)`, `showPrevious()`, `showNext()`, `queueSectionSync()`, and `queueNativeSync()`.

- [ ] **Step 1: Add tests for controls and keyboard navigation**

Keep or adapt tests so they verify:

```ts
await wrapper.get('button[aria-label="Ver próximo resultado"]').trigger('click')
expect(wrapper.get('[role="status"]').text()).toContain('Resultado 2 de 7')
expect(wrapper.findAll('[data-result-card]')[1]!.attributes('aria-current')).toBe('true')

await wrapper.get('[data-results-track]').trigger('keydown', { key: 'ArrowLeft' })
expect(wrapper.get('[role="status"]').text()).toContain('Resultado 1 de 7')
```

- [ ] **Step 2: Add scroll-loop guard test**

Add source assertions:

```ts
expect(source).not.toContain('window.scrollTo')
expect(source).toContain('syncingFromSectionScroll')
expect(source).toContain('syncingFromControl')
```

- [ ] **Step 3: Implement state and guards**

Use this script shape:

```ts
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const stage = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const currentResult = ref(0)
const progress = ref(0)
const sectionTravel = ref(1200)
const isCinematicEnabled = ref(false)
const reducedMotion = useReducedMotion()
let frame: number | undefined
let resizeFrame: number | undefined
let syncingFromSectionScroll = false
let syncingFromControl = false

function clampIndex(index: number) {
  return Math.min(Math.max(index, 0), landingContent.results.length - 1)
}

function isDesktopLayout() {
  return window.matchMedia('(min-width: 64rem)').matches
}

function canUseCinematic() {
  return isDesktopLayout() && !reducedMotion.value
}

function setCurrentResult(index: number) {
  currentResult.value = clampIndex(index)
}
```

- [ ] **Step 4: Implement measurement**

```ts
function getMaxTrackTravel() {
  if (!track.value) return 0
  return Math.max(0, track.value.scrollWidth - track.value.clientWidth)
}

function measureSectionTravel() {
  sectionTravel.value = Math.max(window.innerHeight * 1.35, getMaxTrackTravel())
}
```

- [ ] **Step 5: Implement desktop section scroll sync**

```ts
function syncSectionScroll() {
  frame = undefined
  if (!stage.value || !track.value || !canUseCinematic()) return

  const distance = Math.max(1, stage.value.offsetHeight - window.innerHeight)
  const rawProgress = -stage.value.getBoundingClientRect().top / distance
  progress.value = Math.min(Math.max(rawProgress, 0), 1)
  const travel = getMaxTrackTravel()

  syncingFromSectionScroll = true
  track.value.style.transform = `translate3d(${-travel * progress.value}px, 0, 0)`
  setCurrentResult(Math.round(progress.value * (landingContent.results.length - 1)))
  void nextTick(() => {
    syncingFromSectionScroll = false
  })
}
```

- [ ] **Step 6: Implement mobile/native gallery sync**

```ts
function syncNativeGallery() {
  frame = undefined
  if (!track.value || canUseCinematic() || syncingFromControl) return

  const cards = Array.from(track.value.children) as HTMLElement[]
  const trackLeft = track.value.getBoundingClientRect().left
  const center = trackLeft + track.value.clientWidth / 2
  let nextIndex = 0
  let nearestDistance = Number.POSITIVE_INFINITY

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    const cardCenter = rect.left + rect.width / 2
    const distance = Math.abs(cardCenter - center)
    if (distance < nearestDistance) {
      nearestDistance = distance
      nextIndex = index
    }
  })

  setCurrentResult(nextIndex)
  progress.value = (nextIndex + 1) / landingContent.results.length
}
```

- [ ] **Step 7: Implement queues and lifecycle**

```ts
function queueSectionSync() {
  if (frame !== undefined) return
  frame = requestAnimationFrame(syncSectionScroll)
}

function queueNativeSync() {
  if (frame !== undefined) return
  frame = requestAnimationFrame(syncNativeGallery)
}

function queueMeasure() {
  if (resizeFrame !== undefined) return
  resizeFrame = requestAnimationFrame(() => {
    resizeFrame = undefined
    measureSectionTravel()
    syncSectionScroll()
  })
}

onMounted(async () => {
  await nextTick()
  measureSectionTravel()
  isCinematicEnabled.value = canUseCinematic()
  if (isCinematicEnabled.value) syncSectionScroll()
  window.addEventListener('scroll', queueSectionSync, { passive: true })
  window.addEventListener('resize', queueMeasure, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', queueSectionSync)
  window.removeEventListener('resize', queueMeasure)
  if (frame !== undefined) cancelAnimationFrame(frame)
  if (resizeFrame !== undefined) cancelAnimationFrame(resizeFrame)
})
```

- [ ] **Step 8: Run focused tests**

Run:

```bash
npm run test -- tests/unit/ResultsProfile.spec.ts
```

Expected: behavior tests pass.

### Task 3: Implement Navigation Without Page Jumps

**Files:**
- Modify: `components/landing/ResultsSection.vue`
- Modify: `tests/unit/ResultsProfile.spec.ts`

**Interfaces:**
- Consumes: `showResult(index: number)`.
- Produces: button/keyboard navigation that updates active state and uses `scrollIntoView` only for native snap mode.

- [ ] **Step 1: Add source test preventing page-scroll commands**

```ts
expect(source).not.toContain('window.scrollTo')
expect(source).not.toContain('scrollTop')
```

- [ ] **Step 2: Implement `showResult`**

```ts
function showResult(index: number) {
  const nextIndex = clampIndex(index)
  setCurrentResult(nextIndex)
  progress.value = nextIndex / Math.max(1, landingContent.results.length - 1)

  if (!track.value || canUseCinematic()) return

  const card = track.value.children.item(nextIndex)
  if (!(card instanceof HTMLElement)) return

  syncingFromControl = true
  card.scrollIntoView({
    behavior: reducedMotion.value ? 'auto' : 'smooth',
    block: 'nearest',
    inline: 'center'
  })
  window.setTimeout(() => {
    syncingFromControl = false
  }, reducedMotion.value ? 0 : 350)
}
```

- [ ] **Step 3: Keep existing `showPrevious` and `showNext`**

```ts
function showPrevious() {
  if (currentResult.value === 0) return
  showResult(currentResult.value - 1)
}

function showNext() {
  if (currentResult.value === landingContent.results.length - 1) return
  showResult(currentResult.value + 1)
}
```

- [ ] **Step 4: Run focused tests**

Run:

```bash
npm run test -- tests/unit/ResultsProfile.spec.ts
```

Expected: edge focus tests and keyboard tests pass.

### Task 4: Rebuild Responsive Cinematic Styling

**Files:**
- Modify: `components/landing/ResultsSection.vue`
- Modify: `tests/unit/ResultsProfile.spec.ts`

**Interfaces:**
- Consumes: classes from the new single template.
- Produces: desktop sticky cinematic layout and mobile native scroll-snap layout.

- [ ] **Step 1: Add CSS source assertions**

```ts
expect(source).toContain('.results-section__stage')
expect(source).toContain('.results-section__pin')
expect(source).toContain('.results-section__viewport')
expect(source).toContain('position: sticky;')
expect(source).toContain('scroll-snap-type: x mandatory;')
expect(source).toContain('@media (min-width: 64rem)')
expect(source).toContain('@media (prefers-reduced-motion: reduce)')
```

- [ ] **Step 2: Implement base/mobile CSS**

Use mobile as the base layout:

```css
.results-section__stage {
  margin-top: clamp(3rem, 8vw, 6rem);
}

.results-section__pin {
  min-height: auto;
}

.results-section__viewport {
  overflow: hidden;
}

.results-section__viewport ul {
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0 max(1rem, calc((100vw - 86rem) / 2));
  overflow-x: auto;
  overflow-y: hidden;
  list-style: none;
  scroll-padding-inline: max(1rem, calc((100vw - 86rem) / 2));
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.results-section__viewport li {
  width: min(82vw, 29rem);
  flex: 0 0 auto;
  opacity: 0.56;
  transform: scale(0.94);
  scroll-snap-align: center;
  transition: opacity 320ms ease, transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.results-section__viewport li.is-current {
  opacity: 1;
  transform: scale(1);
}
```

- [ ] **Step 3: Implement card figure CSS**

```css
.results-section__viewport figure {
  position: relative;
  margin: 0;
  overflow: hidden;
  aspect-ratio: 1;
  border: 1px solid rgb(248 246 242 / 16%);
  background: #dfe6e1;
  box-shadow: 0 1.4rem 3rem rgb(0 0 0 / 24%);
}

.results-section__viewport img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.92) contrast(0.98);
  transform: scale(1.04);
  transition: filter 420ms ease, transform 520ms ease;
}

.results-section__viewport li.is-current img {
  filter: saturate(1.05) contrast(1.04);
  transform: scale(1);
}
```

- [ ] **Step 4: Implement desktop CSS**

```css
@media (min-width: 64rem) {
  .results-section__stage {
    min-height: calc(100vh + var(--results-travel, 1200px));
    overflow: clip;
  }

  .results-section__pin {
    position: sticky;
    top: 0;
    min-height: 100vh;
    display: grid;
    align-content: center;
  }

  .results-section__viewport {
    min-height: min(58vw, 43rem);
    display: grid;
    align-items: center;
    overflow: hidden;
  }

  .results-section__viewport ul {
    gap: clamp(1rem, 2.8vw, 2.5rem);
    overflow: visible;
    scroll-snap-type: none;
    will-change: transform;
  }

  .results-section__viewport li {
    width: min(38vw, 34rem);
    scroll-snap-align: none;
  }

  .results-section__viewport li + li {
    margin-left: clamp(-3.6rem, -3.8vw, -2rem);
  }

  .results-section__viewport li:nth-child(2n) {
    padding-top: 3.25rem;
  }

  .results-section__viewport li:nth-child(3n) {
    padding-top: 1.5rem;
  }
}
```

- [ ] **Step 5: Implement reduced-motion CSS**

```css
@media (prefers-reduced-motion: reduce) {
  .results-section__stage {
    min-height: auto !important;
  }

  .results-section__pin {
    position: static;
    min-height: auto;
  }

  .results-section__viewport ul {
    transform: none !important;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }

  .results-section__viewport li,
  .results-section__viewport img {
    transition: none;
  }
}
```

- [ ] **Step 6: Run focused tests**

Run:

```bash
npm run test -- tests/unit/ResultsProfile.spec.ts
```

Expected: source and behavior tests pass.

### Task 5: Final Cleanup And Verification

**Files:**
- Modify: `tests/unit/ResultsProfile.spec.ts`
- Verify: `components/landing/ResultsSection.vue`

**Interfaces:**
- Consumes: all previous tasks.
- Produces: verified rebuild ready for manual browser review.

- [ ] **Step 1: Remove obsolete tests**

Remove tests that inspect `ResultsDesktopGallery.vue` or `ResultsMobileGallery.vue`, because those files must not exist after the rebuild.

- [ ] **Step 2: Confirm deleted component references**

Run:

```bash
rg -n "ResultsDesktopGallery|ResultsMobileGallery|results-desktop|results-mobile" components tests
```

Expected: no matches.

- [ ] **Step 3: Run focused tests**

Run:

```bash
npm run test -- tests/unit/ResultsProfile.spec.ts tests/unit/landingData.spec.ts
```

Expected: all tests pass.

- [ ] **Step 4: Run typecheck**

Run:

```bash
npm run typecheck
```

Expected: exit code 0.

- [ ] **Step 5: Run Vercel build**

Run:

```bash
VERCEL=1 npm run build
```

Expected: exit code 0. Existing non-blocking warnings about npm config, route rules, or unused H3 imports may remain.

- [ ] **Step 6: Manual browser checklist**

After restarting the dev server, verify:

- Desktop section does not appear above treatments or philosophy.
- Desktop page scroll does not jump to top.
- Desktop cards move horizontally while scrolling through the section.
- Desktop active card receives visual emphasis.
- Mobile has no sticky/pinned section.
- Mobile horizontal snap works with buttons and keyboard.
- WhatsApp CTA still opens with `results` source.

## Self-Review

- Spec coverage: the plan covers one-file rebuild, desktop cinematic scroll, mobile native snap, reduced-motion fallback, accessibility, and verification.
- Placeholder scan: no `TBD`, `TODO`, or unspecified implementation steps remain.
- Type consistency: refs and functions are consistently named `stage`, `track`, `currentResult`, `progress`, `sectionTravel`, `queueSectionSync`, and `queueNativeSync`.

<template>
  <section
    id="resultados"
    ref="section"
    class="results-section"
    aria-labelledby="results-title"
  >
    <div class="results-section__header">
      <div>
        <p class="results-section__eyebrow">Registros visuais</p>
        <h2 id="results-title">Cuidado que respeita cada rosto.</h2>
      </div>

      <p class="results-section__introduction">
        Montagens fotográficas fornecidas pela profissional, apresentadas sem controles de comparação porque a ordem e as condições dos registros não foram verificadas.
      </p>
    </div>

    <div
      ref="stage"
      class="results-section__stage"
      data-results-stage
      role="region"
      aria-label="Galeria de resultados clínicos"
      aria-describedby="results-disclaimer"
    >
      <div class="results-section__gallery">
        <ul
          id="results-gallery"
          ref="gallery"
          tabindex="0"
          aria-label="Resultados, use as setas para navegar"
          data-results-track
          @keydown.left.prevent="showPrevious"
          @keydown.right.prevent="showNext"
        >
          <li
            v-for="(result, index) in landingContent.results"
            :id="`result-card-${index + 1}`"
            :key="result.image"
            :aria-label="`Resultado ${index + 1} de ${landingContent.results.length}: ${categoryLabels[result.category]}`"
            :aria-current="index === currentResult ? 'true' : undefined"
            :class="{
              'is-current': index === currentResult,
              'is-before': index < currentResult,
              'is-after': index > currentResult
            }"
            data-result-card
          >
            <figure data-result-image>
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
        <i
          :style="{ transform: `scaleX(${(currentResult + 1) / landingContent.results.length})` }"
          data-results-progress
        />
      </div>
    </div>

    <div class="results-section__footer">
      <div class="results-section__navigation" aria-label="Controles da galeria">
        <button
          type="button"
          aria-label="Ver resultado anterior"
          aria-controls="results-gallery"
          :aria-disabled="currentResult === 0 ? 'true' : 'false'"
          @click="showPrevious"
        >
          <ArrowLeft :size="19" :stroke-width="1.4" aria-hidden="true" />
        </button>

        <p role="status" aria-live="polite" aria-atomic="true">
          Resultado {{ currentResult + 1 }} de {{ landingContent.results.length }}
        </p>

        <button
          type="button"
          aria-label="Ver próximo resultado"
          aria-controls="results-gallery"
          :aria-disabled="currentResult === landingContent.results.length - 1 ? 'true' : 'false'"
          @click="showNext"
        >
          <ArrowRight :size="19" :stroke-width="1.4" aria-hidden="true" />
        </button>
      </div>

      <div class="results-section__context">
        <p id="results-disclaimer">
          Resultados variam de pessoa para pessoa. A indicação e a resposta ao tratamento dependem de avaliação individual.
        </p>
        <a
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          @click.prevent="openWhatsApp('results')"
        >
          Agendar minha avaliação
          <ArrowUpRight :size="18" :stroke-width="1.4" aria-hidden="true" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useWhatsApp } from '~/composables/useWhatsApp'
import { landingContent } from '~/data/landing'

const categoryLabels = {
  botox: 'Toxina botulínica',
  preenchimento: 'Preenchimento facial'
} as const

const section = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const gallery = ref<HTMLElement | null>(null)
const currentResult = ref(0)
const reducedMotion = useReducedMotion()
const { href, openWhatsApp } = useWhatsApp()
let animationContext: gsap.Context | undefined
let scrollFrame: number | undefined
let unmounted = false

function isDesktopResultsLayout() {
  return window.matchMedia('(min-width: 64rem)').matches
}

function syncCurrentResult() {
  scrollFrame = undefined
  if (!gallery.value || !isDesktopResultsLayout()) return

  const cards = Array.from(gallery.value.children) as HTMLElement[]
  if (!cards.length) return

  const scrollPosition = gallery.value.scrollLeft
  const maxScroll = Math.max(0, gallery.value.scrollWidth - gallery.value.clientWidth)
  const edgeTolerance = 2

  if (scrollPosition <= edgeTolerance) {
    currentResult.value = 0
    return
  }

  if (maxScroll - scrollPosition <= edgeTolerance) {
    currentResult.value = cards.length - 1
    return
  }

  const firstOffset = cards[0].offsetLeft
  let nearestIndex = 0
  let nearestDistance = Number.POSITIVE_INFINITY

  for (const [index, card] of cards.entries()) {
    const snapPosition = card.offsetLeft - firstOffset
    const distance = Math.abs(snapPosition - scrollPosition)

    if (distance < nearestDistance) {
      nearestDistance = distance
      nearestIndex = index
    }
  }

  currentResult.value = nearestIndex
}

function queueScrollSync() {
  if (scrollFrame !== undefined) return

  scrollFrame = requestAnimationFrame(syncCurrentResult)
}

function showResult(index: number) {
  const lastIndex = landingContent.results.length - 1
  currentResult.value = Math.min(Math.max(index, 0), lastIndex)

  void nextTick(() => {
    if (!isDesktopResultsLayout()) return

    const card = gallery.value?.children.item(currentResult.value)
    if (!(card instanceof HTMLElement)) return

    card.scrollIntoView({
      behavior: reducedMotion.value ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'start'
    })
  })
}

function showPrevious() {
  if (currentResult.value === 0) return

  showResult(currentResult.value - 1)
}

function showNext() {
  if (currentResult.value === landingContent.results.length - 1) return

  showResult(currentResult.value + 1)
}

onMounted(() => {
  gallery.value?.addEventListener('scroll', queueScrollSync, { passive: true })
})

onMounted(async () => {
  if (!section.value || !stage.value || !gallery.value || reducedMotion.value) return
  if (!isDesktopResultsLayout()) return

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ])
  if (unmounted || !section.value || !stage.value || !gallery.value || reducedMotion.value) return
  if (!isDesktopResultsLayout()) return

  gsap.registerPlugin(ScrollTrigger)
  animationContext = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-result-card]')
    const images = gsap.utils.toArray<HTMLElement>('[data-result-image]')
    const progress = section.value?.querySelector<HTMLElement>('[data-results-progress]')
    const maxScroll = Math.max(0, gallery.value!.scrollWidth - gallery.value!.clientWidth)
    if (!cards.length || maxScroll <= 0) return

    section.value?.classList.add('js-cinematic')
    gsap.set(cards, { transformOrigin: 'center center' })
    gsap.set(cards.slice(1), { scale: 0.88, y: 34, autoAlpha: 0.72 })
    gsap.set(images, { scale: 1.04 })
    if (progress) gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: stage.value,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight * 1.4, maxScroll)}`,
        pin: true,
        scrub: 0.85,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            cards.length - 1,
            Math.round(self.progress * (cards.length - 1))
          )
          currentResult.value = nextIndex
        }
      }
    })

    timeline.to(gallery.value, { x: () => -maxScroll, duration: 1 }, 0)
    if (progress) timeline.to(progress, { scaleX: 1, duration: 1 }, 0)

    cards.forEach((card, index) => {
      const start = Math.max(0, (index - 1) / cards.length)
      const active = index / Math.max(1, cards.length - 1)
      timeline
        .to(card, { scale: 1, y: 0, autoAlpha: 1, duration: 0.18 }, active)
        .to(card, { scale: 0.9, y: -20, autoAlpha: 0.78, duration: 0.18 }, Math.min(1, active + 0.15))
      timeline.to(images[index], { scale: 1, duration: 0.26 }, start)
    })
  }, section.value)
})

onBeforeUnmount(() => {
  unmounted = true
  animationContext?.revert()
  animationContext = undefined
  gallery.value?.removeEventListener('scroll', queueScrollSync)

  if (scrollFrame !== undefined) {
    cancelAnimationFrame(scrollFrame)
    scrollFrame = undefined
  }
})
</script>

<style scoped>
.results-section {
  padding: clamp(5.5rem, 10vw, 9rem) 0;
  overflow: hidden;
  color: var(--color-ivory);
  background:
    radial-gradient(circle at 12% 18%, rgb(188 167 138 / 18%), transparent 28rem),
    linear-gradient(135deg, #253b34 0%, #182720 52%, #2c2030 100%);
}

.results-section__header,
.results-section__footer {
  display: grid;
  width: min(100% - 2rem, 86rem);
  margin: 0 auto;
  gap: 1.5rem;
}

.results-section__eyebrow {
  margin: 0 0 1.3rem;
  color: rgb(226 205 172 / 82%);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.results-section h2 {
  max-width: 11ch;
  margin: 0;
  color: var(--color-ivory);
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.88;
}

.results-section__introduction {
  max-width: 34rem;
  margin: 0;
  color: rgb(248 246 242 / 68%);
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.78;
}

.results-section__stage {
  position: relative;
  margin-top: clamp(3.5rem, 7vw, 6.5rem);
}

.results-section__gallery {
  overflow: visible;
}

.results-section__gallery ul {
  display: grid;
  margin: 0;
  padding: 0 max(1rem, calc((100vw - 86rem) / 2));
  overflow: hidden;
  list-style: none;
}

.results-section__gallery li {
  grid-area: 1 / 1;
  width: min(100%, 29rem);
  justify-self: center;
  opacity: 0;
  pointer-events: none;
  transform: translateX(24%) scale(0.92) rotate(2deg);
  transform-origin: center bottom;
  transition:
    opacity 380ms ease,
    transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.results-section__gallery li.is-current {
  z-index: 3;
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0) scale(1) rotate(0deg);
}

.results-section__gallery li.is-before {
  transform: translateX(-24%) scale(0.9) rotate(-2deg);
}

.results-section__gallery li.is-after {
  z-index: 1;
  opacity: 0.34;
  transform: translateX(12%) translateY(0.85rem) scale(0.94) rotate(1.4deg);
}

.results-section__gallery li.is-after ~ li.is-after {
  opacity: 0;
}

.results-section__gallery figure {
  position: relative;
  margin: 0;
  overflow: hidden;
  aspect-ratio: 1;
  border: 1px solid rgb(248 246 242 / 14%);
  background: #dfe6e1;
  box-shadow: 0 2rem 5rem rgb(0 0 0 / 26%);
  transform: translateZ(0);
}

.results-section__gallery figure::after {
  position: absolute;
  inset: 55% 0 0;
  background: linear-gradient(0deg, rgb(35 19 30 / 64%), transparent);
  content: '';
  pointer-events: none;
}

.results-section__gallery img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 500ms ease, transform 500ms ease;
}

.results-section__gallery li:hover img,
.results-section__gallery li.is-current img {
  filter: saturate(1.04) contrast(1.03);
  transform: scale(1.015);
}

.results-section__gallery figcaption {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  color: var(--color-ivory);
}

.results-section__gallery figcaption span {
  font-family: var(--font-display);
  font-size: 1.35rem;
}

.results-section__gallery figcaption small {
  font-size: 0.52rem;
  letter-spacing: 0.12em;
  text-align: right;
  text-transform: uppercase;
}

.results-section__footer {
  margin-top: 2.25rem;
}

.results-section__progress {
  width: min(100% - 2rem, 86rem);
  height: 1px;
  margin: 1.9rem auto 0;
  overflow: hidden;
  background: rgb(248 246 242 / 18%);
}

.results-section__progress i {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--color-champagne);
  transform: scaleX(0);
  transform-origin: left center;
}

.results-section__navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.results-section__navigation button {
  display: inline-grid;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: 1px solid rgb(248 246 242 / 30%);
  color: var(--color-ivory);
  background: transparent;
  cursor: pointer;
  place-items: center;
  transition: color 180ms ease, background 180ms ease, opacity 180ms ease;
}

.results-section__navigation button:hover:not([aria-disabled='true']),
.results-section__navigation button:focus-visible:not([aria-disabled='true']) {
  color: var(--color-ivory);
  background: rgb(248 246 242 / 16%);
}

.results-section__navigation button[aria-disabled='true'] {
  opacity: 0.3;
  cursor: not-allowed;
}

.results-section__navigation p {
  min-width: 8.3rem;
  margin: 0;
  color: rgb(248 246 242 / 62%);
  font-size: 0.62rem;
  letter-spacing: 0.09em;
  text-align: center;
  text-transform: uppercase;
}

.results-section__context {
  display: grid;
  gap: 1.25rem;
}

.results-section__context p {
  max-width: 36rem;
  margin: 0;
  color: rgb(248 246 242 / 62%);
  font-size: 0.7rem;
  line-height: 1.65;
}

.results-section__context a {
  display: inline-flex;
  width: fit-content;
  min-height: 3.25rem;
  padding: 0.8rem 1.2rem;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: 1px solid rgb(248 246 242 / 78%);
  color: #24352e;
  background: var(--color-ivory);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease, background 180ms ease;
}

.results-section__context a:hover,
.results-section__context a:focus-visible {
  color: var(--color-ivory);
  background: transparent;
}

@media (min-width: 48rem) {
  .results-section__header,
  .results-section__footer {
    width: min(100% - 4rem, 86rem);
  }

  .results-section__header {
    grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.65fr);
    align-items: end;
    gap: 4rem;
  }

  .results-section__gallery ul {
    padding-inline: max(2rem, calc((100vw - 86rem) / 2));
    scroll-padding-inline: max(2rem, calc((100vw - 86rem) / 2));
  }

  .results-section__gallery li {
    width: min(48vw, 31rem);
  }

  .results-section__footer {
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 3rem;
  }

  .results-section__context {
    justify-items: end;
  }

  .results-section__context p {
    text-align: right;
  }
}

@media (min-width: 64rem) {
  .results-section.js-cinematic {
    padding-bottom: clamp(3rem, 6vw, 5rem);
  }

  .results-section.js-cinematic .results-section__stage {
    min-height: 100vh;
    display: grid;
    align-content: center;
  }

  .results-section.js-cinematic .results-section__gallery {
    min-height: min(58vw, 43rem);
    display: grid;
    align-items: center;
  }

  .results-section.js-cinematic .results-section__gallery ul {
    display: flex;
    gap: clamp(1rem, 2.8vw, 2.5rem);
    overflow: visible;
    overscroll-behavior-inline: contain;
    scrollbar-color: rgb(226 205 172 / 70%) transparent;
    scrollbar-width: thin;
    scroll-padding-inline: max(2rem, calc((100vw - 86rem) / 2));
    scroll-snap-type: none;
    will-change: transform;
  }

  .results-section__gallery li {
    grid-area: auto;
    width: min(38vw, 34rem);
    flex: 0 0 auto;
    justify-self: auto;
    opacity: 1;
    pointer-events: auto;
    scroll-snap-align: start;
    transform: translateY(0);
  }

  .results-section__gallery li + li {
    margin-left: clamp(-3.8rem, -4vw, -2rem);
  }

  .results-section__gallery li:nth-child(2n) {
    padding-top: 3.25rem;
  }

  .results-section__gallery li:nth-child(3n) {
    padding-top: 1.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .results-section__gallery img {
    transition: none;
  }

  .results-section__progress i {
    transform: none;
  }
}
</style>

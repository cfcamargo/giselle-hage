<template>
  <section
    id="casos"
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
      :class="{ 'is-cinematic': isCinematicEnabled }"
      :style="{ '--results-travel': `${sectionTravel}px` }"
      data-results-stage
      role="region"
      aria-label="Galeria de resultados clínicos"
      aria-describedby="results-disclaimer"
    >
      <div class="results-section__pin" data-results-pin>
        <div ref="viewport" class="results-section__viewport" data-results-viewport>
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
          <i :style="{ transform: `scaleX(${progress})` }" data-results-progress />
        </div>
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
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@lucide/vue'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useWhatsApp } from '~/composables/useWhatsApp'
import { landingContent } from '~/data/landing'

const categoryLabels = {
  botox: 'Toxina botulínica',
  preenchimento: 'Preenchimento facial'
} as const

const stage = ref<HTMLElement | null>(null)
const viewport = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const currentResult = ref(0)
const progress = ref(1 / landingContent.results.length)
const sectionTravel = ref(1200)
const isCinematicEnabled = ref(false)
const reducedMotion = useReducedMotion()
const { href, openWhatsApp } = useWhatsApp()
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

function getMaxTrackTravel() {
  if (!track.value || !viewport.value) return 0

  return Math.max(0, track.value.scrollWidth - viewport.value.clientWidth)
}

function measureSectionTravel() {
  sectionTravel.value = Math.max(window.innerHeight * 1.35, getMaxTrackTravel())
}

function syncSectionScroll() {
  frame = undefined
  if (!stage.value || !track.value || !canUseCinematic()) return

  const distance = Math.max(1, stage.value.offsetHeight - window.innerHeight)
  const rawProgress = -stage.value.getBoundingClientRect().top / distance
  const nextProgress = Math.min(Math.max(rawProgress, 0), 1)
  const travel = getMaxTrackTravel()

  progress.value = nextProgress
  syncingFromSectionScroll = true
  track.value.style.transform = `translate3d(${-travel * nextProgress}px, 0, 0)`
  setCurrentResult(Math.round(nextProgress * (landingContent.results.length - 1)))
  void nextTick(() => {
    syncingFromSectionScroll = false
  })
}

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
    if (canUseCinematic()) {
      syncSectionScroll()
    } else if (track.value) {
      track.value.style.transform = ''
      progress.value = (currentResult.value + 1) / landingContent.results.length
    }
  })
}

function showResult(index: number) {
  const nextIndex = clampIndex(index)
  setCurrentResult(nextIndex)

  if (canUseCinematic()) {
    const nextProgress = nextIndex / Math.max(1, landingContent.results.length - 1)
    progress.value = nextProgress
    if (track.value) {
      track.value.style.transform = `translate3d(${-getMaxTrackTravel() * nextProgress}px, 0, 0)`
    }
    return
  }

  progress.value = (nextIndex + 1) / landingContent.results.length
  if (!track.value) return

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

function showPrevious() {
  if (currentResult.value === 0) return

  showResult(currentResult.value - 1)
}

function showNext() {
  if (currentResult.value === landingContent.results.length - 1) return

  showResult(currentResult.value + 1)
}

onMounted(async () => {
  await nextTick()
  measureSectionTravel()
  isCinematicEnabled.value = canUseCinematic()
  if (isCinematicEnabled.value) {
    syncSectionScroll()
  }
  window.addEventListener('scroll', queueSectionSync, { passive: true })
  window.addEventListener('resize', queueMeasure, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', queueSectionSync)
  window.removeEventListener('resize', queueMeasure)

  if (track.value) track.value.style.transform = ''

  if (frame !== undefined) {
    cancelAnimationFrame(frame)
    frame = undefined
  }

  if (resizeFrame !== undefined) {
    cancelAnimationFrame(resizeFrame)
    resizeFrame = undefined
  }
})
</script>

<style scoped>
.results-section {
  position: relative;
  padding: clamp(5.5rem, 10vw, 9rem) 0;
  overflow: clip;
  color: var(--color-graphite);
  background: var(--color-ivory);
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
  color: var(--color-taupe);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.results-section h2 {
  max-width: 11ch;
  margin: 0;
  color: var(--color-graphite);
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.88;
}

.results-section__introduction {
  max-width: 34rem;
  margin: 0;
  color: rgb(46 43 39 / 68%);
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.78;
}

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

.results-section__viewport ul::-webkit-scrollbar {
  display: none;
}

.results-section__viewport li {
  width: min(82vw, 29rem);
  flex: 0 0 auto;
  opacity: 0.56;
  transform: scale(0.94);
  transform-origin: center bottom;
  scroll-snap-align: center;
  transition:
    opacity 320ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.results-section__viewport li.is-current {
  opacity: 1;
  transform: scale(1);
}

.results-section__viewport figure {
  position: relative;
  margin: 0;
  overflow: hidden;
  aspect-ratio: 1;
  border: 1px solid rgb(46 43 39 / 12%);
  background: var(--color-sand);
  box-shadow: 0 1.4rem 3rem rgb(46 43 39 / 16%);
  transform: translateZ(0);
}

.results-section__viewport figure::after {
  position: absolute;
  inset: 55% 0 0;
  background: linear-gradient(0deg, rgb(35 19 30 / 64%), transparent);
  content: '';
  pointer-events: none;
}

.results-section__viewport img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.92) contrast(0.98);
  transform: scale(1.04);
  transition:
    filter 420ms ease,
    transform 520ms ease;
}

.results-section__viewport li.is-current img {
  filter: saturate(1.05) contrast(1.04);
  transform: scale(1);
}

.results-section__viewport figcaption {
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

.results-section__viewport figcaption span {
  font-family: var(--font-display);
  font-size: 1.35rem;
}

.results-section__viewport figcaption small {
  font-size: 0.52rem;
  letter-spacing: 0.12em;
  text-align: right;
  text-transform: uppercase;
}

.results-section__progress {
  width: min(100% - 2rem, 86rem);
  height: 1px;
  margin: 1.9rem auto 0;
  overflow: hidden;
  background: rgb(46 43 39 / 14%);
}

.results-section__progress i {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--color-gold);
  transform-origin: left center;
}

.results-section__footer {
  margin-top: 2.25rem;
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
  border: 1px solid rgb(46 43 39 / 24%);
  color: var(--color-graphite);
  background: transparent;
  cursor: pointer;
  place-items: center;
  transition: color 180ms ease, background 180ms ease, opacity 180ms ease;
}

.results-section__navigation button:hover:not([aria-disabled='true']),
.results-section__navigation button:focus-visible:not([aria-disabled='true']) {
  color: var(--color-graphite);
  background: rgb(46 43 39 / 8%);
}

.results-section__navigation button[aria-disabled='true'] {
  opacity: 0.3;
  cursor: not-allowed;
}

.results-section__navigation p {
  min-width: 8.3rem;
  margin: 0;
  color: rgb(46 43 39 / 62%);
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
  color: rgb(46 43 39 / 62%);
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
  border: 1px solid var(--color-graphite);
  color: var(--color-ivory);
  background: var(--color-graphite);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease, background 180ms ease;
}

.results-section__context a:hover,
.results-section__context a:focus-visible {
  color: var(--color-graphite);
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

  .results-section__footer {
    grid-template-columns: 1fr auto;
    align-items: start;
  }

  .results-section__context {
    justify-items: end;
  }

  .results-section__context p {
    text-align: right;
  }
}

@media (min-width: 64rem) {
  .results-section {
    padding-bottom: clamp(3rem, 6vw, 5rem);
  }

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
    padding-inline: max(2rem, calc((100vw - 86rem) / 2));
    overflow: visible;
    scroll-padding-inline: max(2rem, calc((100vw - 86rem) / 2));
    scroll-snap-type: none;
    will-change: transform;
  }

  .results-section__viewport li {
    width: min(38vw, 34rem);
    transform: translateY(48px) scale(0.88);
    scroll-snap-align: none;
  }

  .results-section__viewport li.is-current {
    transform: translateY(0) scale(1.04);
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

  .results-section__progress {
    width: min(100% - 4rem, 86rem);
  }
}

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
</style>

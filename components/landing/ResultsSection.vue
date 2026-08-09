<template>
  <section
    id="resultados"
    class="results-section"
    aria-labelledby="results-title"
  >
    <div class="results-section__header">
      <div>
        <p class="results-section__eyebrow">Resultados clínicos</p>
        <h2 id="results-title">Cuidado que respeita cada rosto.</h2>
      </div>

      <p class="results-section__introduction">
        Registros individuais de tratamentos realizados com planejamento, critério clínico e atenção à naturalidade.
      </p>
    </div>

    <div
      class="results-section__gallery"
      role="region"
      aria-label="Galeria de resultados clínicos"
      aria-describedby="results-disclaimer"
    >
      <ul
        id="results-gallery"
        ref="gallery"
        tabindex="0"
        aria-label="Resultados, use as setas para navegar"
        @keydown.left.prevent="showPrevious"
        @keydown.right.prevent="showNext"
      >
        <li
          v-for="(result, index) in landingContent.results"
          :id="`result-card-${index + 1}`"
          :key="result.image"
          :aria-label="`Resultado ${index + 1} de ${landingContent.results.length}: ${categoryLabels[result.category]}`"
          data-result-card
        >
          <figure>
            <NuxtImg
              :src="result.image"
              :alt="result.alt"
              width="892"
              height="892"
              sizes="xs:82vw sm:65vw md:42vw lg:31vw xl:420px"
              loading="lazy"
            />
            <figcaption>
              <span>{{ categoryLabels[result.category] }}</span>
              <small>Resultado individual</small>
            </figcaption>
          </figure>
        </li>
      </ul>
    </div>

    <div class="results-section__footer">
      <div class="results-section__navigation" aria-label="Controles da galeria">
        <button
          type="button"
          aria-label="Ver resultado anterior"
          aria-controls="results-gallery"
          :disabled="currentResult === 0"
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
          :disabled="currentResult === landingContent.results.length - 1"
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
import { nextTick, ref } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useWhatsApp } from '~/composables/useWhatsApp'
import { landingContent } from '~/data/landing'

const categoryLabels = {
  botox: 'Toxina botulínica',
  preenchimento: 'Preenchimento facial'
} as const

const gallery = ref<HTMLElement | null>(null)
const currentResult = ref(0)
const reducedMotion = useReducedMotion()
const { href, openWhatsApp } = useWhatsApp()

function showResult(index: number) {
  const lastIndex = landingContent.results.length - 1
  currentResult.value = Math.min(Math.max(index, 0), lastIndex)

  void nextTick(() => {
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
  showResult(currentResult.value - 1)
}

function showNext() {
  showResult(currentResult.value + 1)
}
</script>

<style scoped>
.results-section {
  padding: clamp(6rem, 11vw, 10rem) 0;
  overflow: hidden;
  color: var(--color-ink);
  background: #e9e0d6;
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
  color: #79634c;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.results-section h2 {
  max-width: 10ch;
  margin: 0;
  color: var(--color-plum);
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.88;
}

.results-section__introduction {
  max-width: 34rem;
  margin: 0;
  color: rgb(33 29 31 / 68%);
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.78;
}

.results-section__gallery {
  margin-top: clamp(3.5rem, 7vw, 6.5rem);
}

.results-section__gallery ul {
  display: flex;
  margin: 0;
  padding: 0 max(1rem, calc((100vw - 86rem) / 2));
  gap: clamp(1rem, 2.4vw, 2rem);
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scrollbar-color: var(--color-champagne) transparent;
  scrollbar-width: thin;
  scroll-padding-inline: max(1rem, calc((100vw - 86rem) / 2));
  scroll-snap-type: inline mandatory;
  list-style: none;
}

.results-section__gallery li {
  width: min(82vw, 25rem);
  flex: 0 0 auto;
  scroll-snap-align: start;
}

.results-section__gallery figure {
  position: relative;
  margin: 0;
  overflow: hidden;
  background: #d4c7bc;
}

.results-section__gallery figure::after {
  position: absolute;
  inset: 55% 0 0;
  background: linear-gradient(0deg, rgb(35 19 30 / 64%), transparent);
  content: '';
  pointer-events: none;
}

.results-section__gallery img {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  transition: transform 500ms ease;
}

.results-section__gallery li:hover img {
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
  border: 1px solid rgb(53 29 45 / 32%);
  color: var(--color-plum);
  background: transparent;
  cursor: pointer;
  place-items: center;
  transition: color 180ms ease, background 180ms ease, opacity 180ms ease;
}

.results-section__navigation button:hover:not(:disabled),
.results-section__navigation button:focus-visible:not(:disabled) {
  color: var(--color-ivory);
  background: var(--color-plum);
}

.results-section__navigation button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.results-section__navigation p {
  min-width: 8.3rem;
  margin: 0;
  color: rgb(33 29 31 / 62%);
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
  color: rgb(33 29 31 / 62%);
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
  border: 1px solid var(--color-plum);
  color: var(--color-ivory);
  background: var(--color-plum);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease, background 180ms ease;
}

.results-section__context a:hover,
.results-section__context a:focus-visible {
  color: var(--color-plum);
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
    width: min(42vw, 25rem);
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
  .results-section__gallery li {
    width: min(31vw, 26rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .results-section__gallery img {
    transition: none;
  }
}
</style>

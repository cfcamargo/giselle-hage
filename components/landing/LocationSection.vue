<template>
  <section id="contato" class="location-section" aria-labelledby="location-title">
    <div class="location-section__inner">
      <div class="location-section__copy">
        <p class="location-section__eyebrow">Onde estamos</p>
        <h2 id="location-title">Seu cuidado começa em Ponta Porã.</h2>
        <p class="location-section__regional">{{ landingContent.location.regionalReach }}</p>

        <address>
          <MapPin :size="21" :stroke-width="1.4" aria-hidden="true" />
          <span>{{ landingContent.location.address }}</span>
        </address>

        <a
          class="location-section__cta"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          @click.prevent="openWhatsApp('location')"
        >
          Agendar uma avaliação
          <ArrowUpRight :size="17" :stroke-width="1.5" aria-hidden="true" />
        </a>
      </div>

      <div class="location-section__map">
        <iframe
          :src="landingContent.location.mapEmbedUrl"
          title="Mapa da clínica da Dra. Giselle Hage em Ponta Porã"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight, MapPin } from '@lucide/vue'
import { useWhatsApp } from '~/composables/useWhatsApp'
import { landingContent } from '~/data/landing'

const { href, openWhatsApp } = useWhatsApp()
</script>

<style scoped>
.location-section {
  padding: clamp(5rem, 10vw, 9rem) 0;
  color: var(--color-ivory);
  background: var(--color-ink);
}

.location-section__inner {
  display: grid;
  width: min(100% - 2rem, 78rem);
  margin: 0 auto;
  gap: clamp(2.5rem, 6vw, 5rem);
}

.location-section__copy {
  align-self: center;
}

.location-section__eyebrow {
  margin: 0 0 1.25rem;
  color: var(--color-champagne);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.location-section h2 {
  max-width: 11ch;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 5.6rem);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.9;
}

.location-section__regional {
  max-width: 36rem;
  margin: 1.75rem 0 0;
  color: rgb(245 240 232 / 68%);
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.8;
}

.location-section address {
  display: flex;
  max-width: 32rem;
  margin-top: 2rem;
  padding-top: 1.25rem;
  align-items: flex-start;
  gap: 0.8rem;
  border-top: 1px solid rgb(245 240 232 / 18%);
  color: rgb(245 240 232 / 82%);
  font-size: 0.78rem;
  font-style: normal;
  line-height: 1.65;
}

.location-section address svg {
  flex: 0 0 auto;
  color: var(--color-champagne);
}

.location-section__cta {
  display: inline-flex;
  min-height: 3.25rem;
  margin-top: 2rem;
  padding: 0.75rem 1.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  border: 1px solid var(--color-champagne);
  color: var(--color-ink);
  background: var(--color-champagne);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease, background 180ms ease;
}

.location-section__cta:hover,
.location-section__cta:focus-visible {
  color: var(--color-ivory);
  background: transparent;
}

.location-section__map {
  min-height: 27rem;
  border: 1px solid rgb(185 162 125 / 42%);
  background: #302b2d;
}

.location-section__map iframe {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 27rem;
  border: 0;
  filter: grayscale(0.35) contrast(0.92);
}

@media (min-width: 54rem) {
  .location-section__inner {
    grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
    width: min(100% - 4rem, 78rem);
    align-items: stretch;
  }
}
</style>

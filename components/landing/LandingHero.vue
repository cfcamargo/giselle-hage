<template>
  <section id="inicio" ref="hero" class="landing-hero" aria-labelledby="landing-hero-title">
    <div class="landing-hero__media" aria-hidden="true" data-hero-media>
      <NuxtImg
        :src="landingContent.hero.image"
        alt=""
        width="1672"
        height="941"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw"
        preload
      />
    </div>
    <div class="landing-hero__wash" aria-hidden="true" />
    <div class="landing-hero__grain" aria-hidden="true" />

    <div class="landing-hero__content">
      <div class="landing-hero__rule" aria-hidden="true" data-hero-line />
      <p class="landing-hero__eyebrow">{{ landingContent.hero.eyebrow }}</p>
      <h1 id="landing-hero-title">{{ landingContent.hero.headline }}</h1>
      <p class="landing-hero__supporting">{{ landingContent.hero.supporting }}</p>

      <div class="landing-hero__actions">
        <a
          data-hero-cta
          class="landing-hero__cta"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          @click.prevent="openWhatsApp('hero')"
        >
          Agende sua avaliação
          <ArrowUpRight :size="17" :stroke-width="1.5" aria-hidden="true" />
        </a>

        <p class="landing-hero__location">
          <MapPin :size="17" :stroke-width="1.4" aria-hidden="true" />
          {{ landingContent.location.city }}
        </p>
      </div>
    </div>

    <div class="landing-hero__folio" aria-hidden="true" data-hero-folio>
      <span>01</span>
      <i />
      <span>Clínica &amp; naturalidade</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight, MapPin } from '@lucide/vue'
import { ref } from 'vue'
import { useGsapContext } from '~/composables/useGsapContext'
import { useWhatsApp } from '~/composables/useWhatsApp'
import { landingContent } from '~/data/landing'

const hero = ref<HTMLElement | null>(null)
const { href, openWhatsApp } = useWhatsApp()

useGsapContext(hero, (gsap) => {
  hero.value?.classList.add('js-motion')

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo('[data-hero-media]', { scale: 1.035 }, { scale: 1, duration: 1.5 })
    .fromTo('[data-hero-line]', { scaleY: 0 }, { scaleY: 1, duration: 0.9 }, 0.12)
    .fromTo('[data-hero-folio]', { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.7 }, 0.35)

  return () => hero.value?.classList.remove('js-motion')
})
</script>

<style scoped>
.landing-hero {
  position: relative;
  display: grid;
  min-height: 100svh;
  overflow: hidden;
  color: var(--color-graphite);
  background: var(--color-ivory);
  isolation: isolate;
}

.landing-hero__media,
.landing-hero__wash,
.landing-hero__grain {
  position: absolute;
  inset: 0;
}

.landing-hero__media {
  z-index: -3;
  transform-origin: 70% 50%;
}

.landing-hero__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

.landing-hero__wash {
  z-index: -2;
  background:
    linear-gradient(90deg, rgb(248 246 242 / 98%) 0%, rgb(248 246 242 / 92%) 38%, rgb(248 246 242 / 28%) 72%),
    linear-gradient(0deg, rgb(248 246 242 / 40%), transparent 55%);
}

.landing-hero__grain {
  z-index: -1;
  opacity: 0.18;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E");
  pointer-events: none;
}

.landing-hero__content {
  display: grid;
  width: min(100% - 2rem, 86rem);
  margin: auto;
  padding-top: 7.5rem;
  padding-bottom: 6rem;
  align-content: center;
}

.landing-hero__rule {
  width: 1px;
  height: clamp(3.25rem, 8vh, 5.75rem);
  margin-bottom: 1.5rem;
  background: var(--color-gold);
  transform-origin: top;
}

.landing-hero__eyebrow {
  max-width: 42rem;
  margin: 0 0 1.25rem;
  color: var(--color-taupe);
  font-size: clamp(0.65rem, 1vw, 0.78rem);
  font-weight: 500;
  letter-spacing: 0.19em;
  text-transform: uppercase;
}

.landing-hero h1 {
  max-width: 12ch;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.35rem, 8.4vw, 7.7rem);
  font-weight: 400;
  line-height: 0.82;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.landing-hero__supporting {
  max-width: 38rem;
  margin: 2rem 0 0;
  color: rgb(46 43 39 / 76%);
  font-size: clamp(0.95rem, 1.4vw, 1.14rem);
  font-weight: 300;
  line-height: 1.75;
}

.landing-hero__actions {
  display: flex;
  margin-top: 2.2rem;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem 2rem;
}

.landing-hero__cta {
  display: inline-flex;
  min-height: 3.35rem;
  padding: 0.8rem 1.35rem;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  border: 1px solid var(--color-graphite);
  color: var(--color-white);
  background: var(--color-graphite);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease, background 180ms ease;
}

.landing-hero__cta:hover,
.landing-hero__cta:focus-visible {
  color: var(--color-graphite);
  background: transparent;
}

.landing-hero__location {
  display: inline-flex;
  margin: 0;
  align-items: center;
  gap: 0.55rem;
  color: rgb(46 43 39 / 66%);
  font-size: 0.72rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

.landing-hero__folio {
  position: absolute;
  right: 1rem;
  bottom: 1.4rem;
  display: none;
  align-items: center;
  gap: 0.8rem;
  color: rgb(46 43 39 / 62%);
  font-size: 0.57rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.landing-hero__folio i {
  display: block;
  width: 3.5rem;
  height: 1px;
  background: rgb(169 131 92 / 72%);
}

@media (max-width: 47.99rem) {
  .landing-hero__wash {
    background:
      linear-gradient(0deg, rgb(248 246 242 / 98%) 4%, rgb(248 246 242 / 88%) 50%, rgb(248 246 242 / 18%) 100%),
      linear-gradient(90deg, rgb(248 246 242 / 38%), transparent);
  }

  .landing-hero__media img {
    object-position: 66% center;
  }

  .landing-hero__content {
    padding-top: 10rem;
    align-content: end;
  }

  .landing-hero h1 {
    max-width: 10ch;
    font-size: clamp(3.2rem, 16vw, 5rem);
    line-height: 0.86;
  }
}

@media (min-width: 48rem) {
  .landing-hero__content {
    width: min(100% - 4rem, 86rem);
  }

  .landing-hero__folio {
    right: 2rem;
    display: flex;
  }
}
</style>

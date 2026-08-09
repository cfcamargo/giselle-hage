<template>
  <section
    id="tratamentos"
    ref="section"
    class="treatments-section"
    aria-labelledby="treatments-title"
  >
    <header class="treatments-section__header">
      <p>Tratamentos em destaque</p>
      <h2 id="treatments-title">Escolhas cuidadosas,<br>orientadas por você.</h2>
      <span>Uma avaliação individual define indicações, prioridades e possibilidades para cada momento.</span>
    </header>

    <div class="treatments-section__panels">
      <article
        v-for="(treatment, index) in landingContent.treatments"
        :key="treatment.slug"
        :aria-labelledby="`treatment-${treatment.slug}-title`"
        class="treatment-panel"
        data-treatment-panel
      >
        <div class="treatment-panel__inner">
          <figure class="treatment-panel__media" data-treatment-media>
            <NuxtImg
              :src="treatment.image"
              :alt="treatment.alt"
              width="1200"
              height="1400"
              sizes="xs:100vw sm:100vw md:50vw lg:50vw xl:680px"
              loading="lazy"
            />
            <figcaption>{{ treatment.eyebrow }}</figcaption>
          </figure>

          <div class="treatment-panel__content" data-treatment-content>
            <div class="treatment-panel__number" aria-hidden="true">
              <span>0{{ index + 1 }}</span>
              <i />
            </div>
            <p class="treatment-panel__eyebrow">{{ treatment.eyebrow }}</p>
            <h3 :id="`treatment-${treatment.slug}-title`">{{ treatment.title }}</h3>
            <p class="treatment-panel__summary">{{ treatment.summary }}</p>
            <a
              :href="href"
              target="_blank"
              rel="noopener noreferrer"
              @click.prevent="openWhatsApp(treatment.slug)"
            >
              Conversar sobre este tratamento
              <ArrowUpRight :size="18" :stroke-width="1.4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useWhatsApp } from '~/composables/useWhatsApp'
import { landingContent } from '~/data/landing'

const section = ref<HTMLElement | null>(null)
const { href, openWhatsApp } = useWhatsApp()
let animationContext: import('gsap').Context | undefined
let responsiveMedia: import('gsap').MatchMedia | undefined
let unmounted = false

onMounted(async () => {
  if (!section.value) return

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ])
  if (unmounted || !section.value) return

  gsap.registerPlugin(ScrollTrigger)
  animationContext = gsap.context(() => {
    const panels = gsap.utils.toArray<HTMLElement>('[data-treatment-panel]')
    responsiveMedia = gsap.matchMedia()
    responsiveMedia.add({
      desktop: '(min-width: 1024px)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    }, (context) => {
      const { desktop, reduceMotion } = context.conditions as {
        desktop: boolean
        reduceMotion: boolean
      }
      if (reduceMotion) return

      for (const [index, panel] of panels.entries()) {
        const media = panel.querySelector('[data-treatment-media]')
        const content = panel.querySelector('[data-treatment-content]')

        if (desktop) {
          const direction = index % 2 === 0 ? -1 : 1
          gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: panel,
              start: 'top top',
              end: '+=70%',
              pin: true,
              pinSpacing: true,
              scrub: 0.8
            }
          })
            .fromTo(media, { xPercent: direction * 3, scale: 1.025 }, { xPercent: 0, scale: 1, duration: 1 })
            .fromTo(content, { opacity: 0.45, x: direction * -26 }, { opacity: 1, x: 0, duration: 0.72 }, 0)
        } else {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 88%',
                once: true
              }
            }
          )
        }
      }
    })
  }, section.value)
})

onBeforeUnmount(() => {
  unmounted = true
  responsiveMedia?.revert()
  responsiveMedia = undefined
  animationContext?.revert()
  animationContext = undefined
})
</script>

<style scoped>
.treatments-section {
  padding: clamp(5.5rem, 10vw, 9.5rem) 0 0;
  overflow: clip;
  color: var(--color-ink);
  background: var(--color-ivory);
}

.treatments-section__header {
  display: grid;
  width: min(100% - 2rem, 86rem);
  margin: 0 auto clamp(4rem, 8vw, 7.5rem);
  gap: 1.25rem;
}

.treatments-section__header > p,
.treatment-panel__eyebrow {
  margin: 0;
  color: #79634c;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.treatments-section__header h2 {
  max-width: 13ch;
  margin: 0;
  color: var(--color-plum);
  font-family: var(--font-display);
  font-size: clamp(3rem, 7vw, 6.6rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.treatments-section__header > span {
  max-width: 35rem;
  color: rgb(33 29 31 / 68%);
  font-size: 0.91rem;
  font-weight: 300;
  line-height: 1.75;
}

.treatment-panel {
  position: relative;
  padding: 0 1rem clamp(5rem, 11vw, 9rem);
}

.treatment-panel__inner {
  display: grid;
  width: min(100%, 86rem);
  margin: 0 auto;
  gap: 2.25rem;
}

.treatment-panel__media {
  position: relative;
  min-height: 27rem;
  margin: 0;
  overflow: hidden;
  background: #d9cec5;
}

.treatment-panel__media::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 64%, rgb(35 19 30 / 35%));
  content: '';
  pointer-events: none;
}

.treatment-panel__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.treatment-panel__media figcaption {
  position: absolute;
  right: 1.25rem;
  bottom: 1.15rem;
  z-index: 1;
  color: var(--color-ivory);
  font-size: 0.57rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.treatment-panel__content {
  display: flex;
  padding: 0 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.treatment-panel__number {
  display: flex;
  width: 100%;
  margin-bottom: 2rem;
  align-items: center;
  gap: 0.9rem;
  color: #8a7357;
  font-family: var(--font-display);
  font-size: 0.9rem;
}

.treatment-panel__number i {
  display: block;
  width: min(5rem, 22vw);
  height: 1px;
  background: rgb(138 115 87 / 55%);
}

.treatment-panel h3 {
  margin: 0.65rem 0 1.35rem;
  color: var(--color-plum);
  font-family: var(--font-display);
  font-size: clamp(3.1rem, 7vw, 6rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.treatment-panel__summary {
  max-width: 34rem;
  margin: 0;
  color: rgb(33 29 31 / 72%);
  font-size: 0.93rem;
  font-weight: 300;
  line-height: 1.85;
}

.treatment-panel a {
  display: inline-flex;
  min-height: 2.9rem;
  margin-top: 2rem;
  padding-bottom: 0.42rem;
  align-items: center;
  gap: 0.7rem;
  border-bottom: 1px solid var(--color-champagne);
  color: var(--color-plum);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-decoration: none;
  text-transform: uppercase;
}

.treatment-panel a svg {
  transition: transform 180ms ease;
}

.treatment-panel a:hover svg,
.treatment-panel a:focus-visible svg {
  transform: translate(0.2rem, -0.2rem);
}

@media (min-width: 48rem) {
  .treatments-section__header {
    grid-template-columns: 0.7fr 2fr 1fr;
    width: min(100% - 4rem, 86rem);
    align-items: end;
    gap: 3rem;
  }

  .treatment-panel {
    padding-right: 2rem;
    padding-left: 2rem;
  }

  .treatment-panel__inner {
    grid-template-columns: minmax(0, 1.16fr) minmax(18rem, 0.84fr);
    align-items: stretch;
    gap: clamp(3rem, 7vw, 7.5rem);
  }

  .treatment-panel:nth-child(even) .treatment-panel__media {
    grid-column: 2;
    grid-row: 1;
  }

  .treatment-panel:nth-child(even) .treatment-panel__content {
    grid-column: 1;
    grid-row: 1;
    padding-left: clamp(1rem, 5vw, 5rem);
  }

  .treatment-panel__media {
    min-height: clamp(36rem, 72vh, 52rem);
  }
}

@media (min-width: 64rem) {
  .treatment-panel {
    min-height: 100svh;
    padding-bottom: 0;
    background: var(--color-ivory);
  }

  .treatment-panel__inner {
    min-height: 100svh;
    padding: 6.5rem 0 3rem;
  }

  .treatment-panel__media {
    min-height: 0;
    height: calc(100svh - 9.5rem);
  }
}
</style>

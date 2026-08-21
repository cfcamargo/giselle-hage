<template>
  <section
    id="harmonizacao-orofacial"
    ref="section"
    class="harmonization-section"
    aria-labelledby="harmonization-title"
  >
    <div class="harmonization-section__inner">
      <header class="harmonization-section__header" data-harmonization-copy>
        <p>Harmonização Orofacial</p>
        <h2 id="harmonization-title">Um caminho, passo a passo.</h2>
        <span>
          Harmonização orofacial é o conjunto de procedimentos que equilibram os traços faciais com
          naturalidade, sempre a partir de uma avaliação individual. Veja como o cuidado se desenvolve,
          do primeiro contato ao acompanhamento.
        </span>
      </header>

      <ol class="harmonization-section__steps">
        <i class="harmonization-section__track" aria-hidden="true" />
        <i class="harmonization-section__fill" aria-hidden="true" data-harmonization-fill />

        <li
          v-for="(step, index) in landingContent.process"
          :key="step.title"
          class="harmonization-step"
          data-harmonization-step
        >
          <span class="harmonization-step__badge" aria-hidden="true">0{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { landingContent } from '~/data/landing'

const section = ref<HTMLElement | null>(null)
let animationContext: gsap.Context | undefined
let responsiveMedia: gsap.MatchMedia | undefined
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
    responsiveMedia = gsap.matchMedia()
    responsiveMedia.add({
      allowMotion: '(prefers-reduced-motion: no-preference)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    }, (context) => {
      if (context.conditions?.reduceMotion) return

      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section.value,
          start: 'top 80%',
          once: true
        }
      })
        .fromTo('[data-harmonization-copy]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo('[data-harmonization-step]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.13 }, 0.2)

      gsap.set('[data-harmonization-fill]', { scaleX: 0 })
      gsap.to('[data-harmonization-fill]', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section.value,
          start: 'top 72%',
          end: 'bottom 60%',
          scrub: 0.6
        }
      })
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
.harmonization-section {
  padding: clamp(5.5rem, 11vw, 10rem) 0;
  background: var(--color-sand);
}

.harmonization-section__inner {
  width: min(100% - 2rem, 86rem);
  margin: 0 auto;
}

.harmonization-section__header {
  max-width: 42rem;
}

.harmonization-section__header > p {
  margin: 0 0 1.25rem;
  color: var(--color-taupe);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.harmonization-section__header h2 {
  max-width: 13ch;
  margin: 0;
  color: var(--color-graphite);
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 6vw, 4.8rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 0.94;
}

.harmonization-section__header > span {
  display: block;
  max-width: 38rem;
  margin-top: 1.75rem;
  color: rgb(46 43 39 / 72%);
  font-size: clamp(0.9rem, 1.3vw, 1.02rem);
  font-weight: 300;
  line-height: 1.8;
}

.harmonization-section__steps {
  position: relative;
  display: grid;
  margin: clamp(3.5rem, 7vw, 5.5rem) 0 0;
  padding: 0 0 0 3.75rem;
  gap: 2.5rem;
  list-style: none;
}

.harmonization-section__track,
.harmonization-section__fill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1.375rem;
  width: 1px;
}

.harmonization-section__track {
  background: rgb(46 43 39 / 16%);
}

.harmonization-section__fill {
  display: none;
  background: var(--color-gold);
  transform: scaleY(0);
  transform-origin: top center;
}

.harmonization-step {
  position: relative;
  display: grid;
  grid-template-columns: 2.75rem 1fr;
  align-items: start;
  column-gap: 1.5rem;
  margin-left: -3.75rem;
}

.harmonization-step__badge {
  display: inline-grid;
  width: 2.75rem;
  height: 2.75rem;
  grid-row: 1 / 3;
  place-items: center;
  border: 1px solid var(--color-taupe);
  border-radius: 50%;
  background: var(--color-sand);
  color: var(--color-graphite);
  font-family: var(--font-display);
  font-size: 0.95rem;
}

.harmonization-step h3 {
  margin: 0.4rem 0 0.6rem;
  color: var(--color-graphite);
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
}

.harmonization-step p {
  max-width: 26rem;
  margin: 0;
  color: rgb(46 43 39 / 68%);
  font-size: 0.86rem;
  font-weight: 300;
  line-height: 1.75;
}

@media (min-width: 48rem) {
  .harmonization-section__inner {
    width: min(100% - 4rem, 86rem);
  }

  .harmonization-section__steps {
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
    gap: 2rem;
  }

  .harmonization-section__track,
  .harmonization-section__fill {
    top: 1.375rem;
    bottom: auto;
    left: 0;
    right: 0;
    width: auto;
    height: 1px;
  }

  .harmonization-section__fill {
    display: block;
    transform: scaleX(0);
    transform-origin: left center;
  }

  .harmonization-step {
    grid-template-columns: auto;
    margin-left: 0;
    gap: 0.9rem;
  }

  .harmonization-step__badge {
    grid-row: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .harmonization-section__fill {
    transform: none;
  }
}
</style>

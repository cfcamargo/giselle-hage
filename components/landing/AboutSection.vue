<template>
  <section
    id="sobre"
    ref="section"
    class="about-section"
    aria-labelledby="about-title"
  >
    <div class="about-section__inner">
      <figure class="about-section__media">
        <NuxtImg
          data-about-image
          :src="landingContent.profile.image"
          :alt="landingContent.profile.alt"
          width="3024"
          height="3510"
          sizes="xs:100vw sm:100vw md:50vw lg:50vw xl:650px"
          loading="lazy"
        />
        <span class="about-section__mask" data-about-mask aria-hidden="true" />
        <figcaption>Harmonização orofacial &middot; Ponta Porã</figcaption>
      </figure>

      <div class="about-section__content" data-about-copy>
        <p class="about-section__eyebrow">Perfil profissional</p>
        <h2 id="about-title">Prazer,<br>Dra. Giselle Hage.</h2>
        <p class="about-section__biography">{{ landingContent.profile.biography }}</p>

        <dl>
          <div>
            <dt>Registro profissional</dt>
            <dd>{{ landingContent.profile.registration }}</dd>
          </div>
          <div>
            <dt>Princípio de cuidado</dt>
            <dd>Naturalidade com planejamento</dd>
          </div>
        </dl>

        <blockquote>
          <p>{{ landingContent.profile.evaluation }}</p>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { landingContent } from '~/data/landing'

const section = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()
let animationContext: gsap.Context | undefined
let unmounted = false

onMounted(async () => {
  if (reducedMotion.value || !section.value) return

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ])
  if (unmounted || reducedMotion.value || !section.value) return

  gsap.registerPlugin(ScrollTrigger)
  section.value.classList.add('js-motion')
  animationContext = gsap.context(() => {
    gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: section.value,
        start: 'top 78%',
        once: true
      }
    })
      .fromTo('[data-about-mask]', { scaleY: 1 }, { scaleY: 0, duration: 1.45 })
      .fromTo('[data-about-image]', { scale: 1.045 }, { scale: 1, duration: 1.7 }, 0)
      .fromTo('[data-about-copy]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.85 }, 0.3)
  }, section.value)
})

onBeforeUnmount(() => {
  unmounted = true
  animationContext?.revert()
  animationContext = undefined
})
</script>

<style scoped>
.about-section {
  padding: clamp(6rem, 12vw, 11rem) 0;
  overflow: hidden;
  color: var(--color-ivory);
  background: var(--color-plum);
}

.about-section__inner {
  display: grid;
  width: min(100% - 2rem, 78rem);
  margin: 0 auto;
  gap: clamp(3rem, 8vw, 7rem);
}

.about-section__media {
  position: relative;
  min-height: 32rem;
  margin: 0;
  overflow: hidden;
  background: #5d4652;
}

.about-section__media img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 32rem;
  object-fit: cover;
  object-position: center 42%;
  transform-origin: center;
}

.about-section__mask {
  position: absolute;
  inset: 0;
  background: var(--color-plum);
  pointer-events: none;
  transform: scaleY(0);
  transform-origin: bottom;
}

.about-section.js-motion .about-section__mask {
  transform: scaleY(1);
}

.about-section__media figcaption {
  position: absolute;
  right: 1.1rem;
  bottom: 1rem;
  z-index: 1;
  color: rgb(245 240 232 / 72%);
  font-size: 0.54rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  writing-mode: vertical-rl;
}

.about-section__content {
  align-self: center;
}

.about-section__eyebrow {
  margin: 0 0 1.5rem;
  color: var(--color-champagne);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.about-section h2 {
  max-width: 10ch;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 7vw, 6.6rem);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.86;
}

.about-section__biography {
  max-width: 38rem;
  margin: 2rem 0 0;
  color: rgb(245 240 232 / 72%);
  font-size: clamp(0.91rem, 1.4vw, 1.04rem);
  font-weight: 300;
  line-height: 1.8;
}

.about-section dl {
  display: grid;
  margin: 2.5rem 0 0;
  padding: 0;
  gap: 1.5rem;
}

.about-section dl div {
  padding-top: 1rem;
  border-top: 1px solid rgb(245 240 232 / 20%);
}

.about-section dt {
  color: rgb(245 240 232 / 52%);
  font-size: 0.56rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.about-section dd {
  margin: 0.65rem 0 0;
  font-family: var(--font-display);
  font-size: 1.45rem;
}

.about-section blockquote {
  max-width: 34rem;
  margin: 2.5rem 0 0;
  padding: 0 0 0 1.25rem;
  border-left: 1px solid var(--color-champagne);
}

.about-section blockquote p {
  margin: 0;
  color: rgb(245 240 232 / 68%);
  font-size: 0.78rem;
  font-weight: 300;
  line-height: 1.78;
}

@media (min-width: 40rem) {
  .about-section dl {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 48rem) {
  .about-section__inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr);
    width: min(100% - 4rem, 78rem);
    align-items: center;
  }

  .about-section__media {
    min-height: clamp(38rem, 68vw, 48rem);
  }

  .about-section__media img {
    min-height: clamp(38rem, 68vw, 48rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-section__mask {
    display: none;
  }
}
</style>

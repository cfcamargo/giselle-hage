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

    <div class="about-section__extra">
      <p class="about-section__transition" data-about-transition>{{ landingContent.profile.transition }}</p>

      <div class="about-section__foundations">
        <article
          v-for="foundation in landingContent.profile.foundations"
          :key="foundation.title"
          class="about-section__foundation"
          data-about-foundation
        >
          <h3>{{ foundation.title }}</h3>
          <p>{{ foundation.description }}</p>
        </article>
      </div>

      <blockquote class="about-section__couplet" data-about-couplet>
        <p v-for="line in landingContent.profile.statement" :key="line">{{ line }}</p>
      </blockquote>

      <p class="about-section__closing" data-about-closing>{{ landingContent.profile.closing }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { landingContent } from '~/data/landing'

const section = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()
let animationContext: gsap.Context | undefined
let stopReducedWatcher: (() => void) | undefined
let buildVersion = 0
let unmounted = false

function revertMotion() {
  buildVersion += 1
  animationContext?.revert()
  animationContext = undefined
  section.value?.classList.remove('js-motion')
}

async function buildMotion() {
  if (reducedMotion.value || !section.value) return
  const version = ++buildVersion

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ])
  if (unmounted || reducedMotion.value || !section.value || version !== buildVersion) return

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

    gsap.timeline({
      scrollTrigger: { trigger: '[data-about-transition]', start: 'top 85%', once: true }
    }).fromTo('[data-about-transition]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })

    gsap.timeline({
      scrollTrigger: { trigger: '.about-section__foundations', start: 'top 82%', once: true }
    }).fromTo('[data-about-foundation]', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 })

    gsap.timeline({
      scrollTrigger: { trigger: '[data-about-couplet]', start: 'top 85%', once: true }
    }).fromTo('[data-about-couplet] p', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.18 })

    gsap.timeline({
      scrollTrigger: { trigger: '[data-about-closing]', start: 'top 85%', once: true }
    }).fromTo('[data-about-closing]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
  }, section.value)
}

onMounted(() => {
  stopReducedWatcher = watch(reducedMotion, (isReduced) => {
    if (isReduced) revertMotion()
    else void buildMotion()
  }, { flush: 'sync' })
  void buildMotion()
})

onBeforeUnmount(() => {
  unmounted = true
  stopReducedWatcher?.()
  stopReducedWatcher = undefined
  revertMotion()
})
</script>

<style scoped>
.about-section {
  padding: clamp(6rem, 12vw, 11rem) 0;
  overflow: hidden;
  color: var(--color-graphite);
  background: var(--color-sand);
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
  background: var(--color-ivory);
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
  background: var(--color-sand);
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
  color: var(--color-taupe);
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
  color: rgb(46 43 39 / 72%);
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
  border-top: 1px solid rgb(46 43 39 / 16%);
}

.about-section dt {
  color: rgb(46 43 39 / 56%);
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
  border-left: 1px solid var(--color-taupe);
}

.about-section blockquote p {
  margin: 0;
  color: rgb(46 43 39 / 68%);
  font-size: 0.78rem;
  font-weight: 300;
  line-height: 1.78;
}

.about-section__extra {
  width: min(100% - 2rem, 78rem);
  margin: clamp(4rem, 8vw, 7rem) auto 0;
}

.about-section__transition {
  max-width: 34rem;
  margin: 0;
  color: var(--color-graphite);
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2.2vw, 1.5rem);
  font-weight: 400;
  line-height: 1.4;
}

.about-section__foundations {
  display: grid;
  margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
  padding: 0;
  gap: 2rem;
}

.about-section__foundation {
  padding-top: 1.25rem;
  border-top: 1px solid rgb(46 43 39 / 16%);
}

.about-section__foundation h3 {
  max-width: 20ch;
  margin: 0 0 0.85rem;
  color: var(--color-graphite);
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.4vw, 1.5rem);
  font-weight: 400;
  line-height: 1.15;
}

.about-section__foundation p {
  max-width: 30rem;
  margin: 0;
  color: rgb(46 43 39 / 70%);
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.75;
}

.about-section__couplet {
  max-width: 42rem;
  margin: clamp(3rem, 6vw, 4.5rem) 0 0;
  padding: 0 0 0 1.5rem;
  border-left: 1px solid var(--color-gold);
}

.about-section__couplet p {
  margin: 0;
  color: var(--color-graphite);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.2vw, 2.15rem);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.28;
}

.about-section__couplet p + p {
  margin-top: 0.75rem;
}

.about-section__closing {
  max-width: 40rem;
  margin: clamp(2.5rem, 5vw, 3.5rem) 0 0;
  color: rgb(46 43 39 / 72%);
  font-size: clamp(0.91rem, 1.4vw, 1.04rem);
  font-weight: 300;
  line-height: 1.85;
}

@media (min-width: 40rem) {
  .about-section dl {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .about-section__foundations {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 48rem) {
  .about-section__extra {
    width: min(100% - 4rem, 78rem);
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

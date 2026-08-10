<template>
  <aside ref="section" class="credentials-strip" aria-label="Credenciais profissionais">
    <div class="credentials-strip__inner">
      <p class="credentials-strip__eyebrow">Experiência que orienta cada cuidado</p>

      <ul>
        <li
          v-for="credential in landingContent.credentials"
          :key="credential.label"
          data-credential
        >
          <span>{{ credential.label }}</span>
          <strong data-credential-emphasis>{{ credential.value }}</strong>
        </li>
      </ul>
    </div>
  </aside>
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
    responsiveMedia.add({ reduceMotion: '(prefers-reduced-motion: reduce)' }, (context) => {
      if (context.conditions?.reduceMotion) return

      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section.value,
          start: 'top 82%',
          once: true
        }
      })
        .fromTo('[data-credential]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.72, stagger: 0.11 })
        .fromTo('[data-credential-emphasis]', { scale: 0.97 }, { scale: 1, duration: 0.45, stagger: 0.08 }, 0.18)
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
.credentials-strip {
  color: var(--color-ivory);
  background: var(--color-plum);
}

.credentials-strip__inner {
  display: grid;
  width: min(100% - 2rem, 86rem);
  margin: 0 auto;
  padding: 2.5rem 0;
  gap: 1.75rem;
}

.credentials-strip__eyebrow {
  margin: 0;
  color: var(--color-champagne);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.17em;
  line-height: 1.5;
  text-transform: uppercase;
}

.credentials-strip ul {
  display: grid;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
  list-style: none;
}

.credentials-strip li {
  display: grid;
  padding-top: 1.05rem;
  gap: 0.48rem;
  border-top: 1px solid rgb(245 240 232 / 19%);
}

.credentials-strip li span {
  color: rgb(245 240 232 / 58%);
  font-size: 0.59rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.credentials-strip li strong {
  display: inline-block;
  width: fit-content;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 3vw, 1.85rem);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.12;
  transform-origin: left center;
}

@media (min-width: 48rem) {
  .credentials-strip__inner {
    grid-template-columns: minmax(10rem, 0.7fr) 3fr;
    width: min(100% - 4rem, 86rem);
    padding: 3.25rem 0;
    align-items: start;
    gap: 3rem;
  }

  .credentials-strip ul {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
</style>

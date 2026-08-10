<template>
  <section
    ref="section"
    class="philosophy-section"
    aria-labelledby="philosophy-title"
  >
    <div class="philosophy-section__contour">
      <svg viewBox="0 0 520 700" fill="none" aria-hidden="true" focusable="false">
        <path
          data-contour-path
          d="M331 40c-56 44-86 97-91 159-5 58 22 80 8 127-13 42-61 57-66 92-7 46 49 69 63 118 11 39-7 79-26 124m110-540c36 59 44 121 21 186-18 52-12 84 20 115 30 30 40 66 17 105-20 34-60 47-88 83"
        />
      </svg>
    </div>

    <div class="philosophy-section__inner">
      <header class="philosophy-section__header" data-philosophy-copy>
        <p>Nossa filosofia</p>
        <h2 id="philosophy-title">Prevenir. Cuidar. Preservar.</h2>
        <span>{{ landingContent.philosophy }}</span>
      </header>

      <ol class="philosophy-section__principles">
        <li data-philosophy-principle>
          <span>01</span>
          <h3>Prevenir</h3>
          <p>Observar cedo e acompanhar com constância ajuda a construir escolhas conscientes ao longo do tempo.</p>
        </li>
        <li data-philosophy-principle>
          <span>02</span>
          <h3>Cuidar</h3>
          <p>Cada plano começa pela escuta e considera anatomia, rotina, histórico e expectativas individuais.</p>
        </li>
        <li data-philosophy-principle>
          <span>03</span>
          <h3>Preservar</h3>
          <p>O cuidado acompanha o envelhecimento natural com respeito à identidade e aos traços de cada pessoa.</p>
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

      const contour = section.value?.querySelector<SVGPathElement>('[data-contour-path]')
      const contourLength = contour?.getTotalLength() ?? 0

      if (contour && contourLength > 0) {
        gsap.set(contour, { strokeDasharray: contourLength, strokeDashoffset: contourLength })
        gsap.to(contour, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section.value,
            start: 'top 78%',
            end: 'bottom 42%',
            scrub: 0.8
          }
        })
      }

      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: section.value,
          start: 'top 76%',
          once: true
        }
      })
        .fromTo('[data-philosophy-copy]', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.85 })
        .fromTo('[data-philosophy-principle]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12 }, 0.24)
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
.philosophy-section {
  position: relative;
  overflow: hidden;
  color: var(--color-ivory);
  background: var(--color-plum);
  isolation: isolate;
}

.philosophy-section::before {
  position: absolute;
  inset: 0;
  z-index: -2;
  opacity: 0.16;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.14'/%3E%3C/svg%3E");
  content: '';
  pointer-events: none;
}

.philosophy-section__contour {
  position: absolute;
  top: -7rem;
  right: -8rem;
  bottom: -5rem;
  z-index: -1;
  width: min(78vw, 39rem);
  opacity: 0.27;
  pointer-events: none;
}

.philosophy-section__contour svg {
  width: 100%;
  height: 100%;
}

.philosophy-section__contour path {
  stroke: var(--color-champagne);
  stroke-width: 1.1;
  vector-effect: non-scaling-stroke;
}

.philosophy-section__inner {
  width: min(100% - 2rem, 86rem);
  margin: 0 auto;
  padding: clamp(6rem, 12vw, 11rem) 0;
}

.philosophy-section__header {
  max-width: 56rem;
}

.philosophy-section__header > p {
  margin: 0 0 1.5rem;
  color: var(--color-champagne);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.19em;
  text-transform: uppercase;
}

.philosophy-section__header h2 {
  max-width: 11ch;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.3rem, 8vw, 7.4rem);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.85;
}

.philosophy-section__header > span {
  display: block;
  max-width: 39rem;
  margin-top: 2.1rem;
  color: rgb(245 240 232 / 70%);
  font-size: clamp(0.92rem, 1.4vw, 1.08rem);
  font-weight: 300;
  line-height: 1.8;
}

.philosophy-section__principles {
  display: grid;
  margin: clamp(4.5rem, 9vw, 8rem) 0 0;
  padding: 0;
  gap: 2.5rem;
  list-style: none;
}

.philosophy-section__principles li {
  padding-top: 1.25rem;
  border-top: 1px solid rgb(245 240 232 / 20%);
}

.philosophy-section__principles span {
  color: var(--color-champagne);
  font-family: var(--font-display);
  font-size: 0.9rem;
}

.philosophy-section__principles h3 {
  margin: 1.25rem 0 0.8rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
}

.philosophy-section__principles p {
  max-width: 27rem;
  margin: 0;
  color: rgb(245 240 232 / 64%);
  font-size: 0.83rem;
  font-weight: 300;
  line-height: 1.78;
}

@media (min-width: 48rem) {
  .philosophy-section__inner {
    width: min(100% - 4rem, 86rem);
  }

  .philosophy-section__principles {
    grid-template-columns: repeat(3, 1fr);
    gap: clamp(2rem, 5vw, 5rem);
  }
}

@media (min-width: 64rem) {
  .philosophy-section__contour {
    top: -3rem;
    right: 2vw;
    bottom: -3rem;
    width: min(47vw, 43rem);
  }
}
</style>

<template>
  <section
    id="tratamentos"
    ref="section"
    class="treatments-section"
    aria-labelledby="treatments-title"
  >
    <header class="treatments-section__header">
      <p>Tratamentos em destaque</p>
      <h2 id="treatments-title">Tratamentos que respeitam aquilo que já é seu.</h2>
      <span>Uma avaliação individual define indicações, prioridades e possibilidades para cada momento.</span>
    </header>

    <div ref="stage" class="treatments-stage" data-treatment-stage>
      <div class="treatments-stage__rail" aria-hidden="true">
        <span>Tratamentos</span>
        <i data-treatment-progress />
        <b>03</b>
      </div>

      <div class="treatments-stage__chapters">
        <article
          v-for="(treatment, index) in landingContent.treatments"
          :key="treatment.slug"
          :aria-labelledby="`treatment-${treatment.slug}-title`"
          class="treatment-chapter"
          data-treatment-chapter
        >
          <figure class="treatment-chapter__media" data-treatment-image>
            <NuxtImg
              :src="treatment.image"
              :alt="treatment.alt"
              width="1200"
              height="1400"
              sizes="xs:100vw sm:100vw md:58vw lg:58vw xl:800px"
              loading="lazy"
            />
            <span class="treatment-chapter__wash" />
            <figcaption>{{ treatment.eyebrow }}</figcaption>
          </figure>

          <div class="treatment-chapter__copy" data-treatment-copy>
            <div class="treatment-chapter__index" aria-hidden="true">
              <span>0{{ index + 1 }}</span>
              <i />
              <span>03</span>
            </div>
            <p class="treatment-chapter__eyebrow">{{ treatment.eyebrow }}</p>
            <h3 :id="`treatment-${treatment.slug}-title`">
              <span v-for="word in treatment.title.split(' ')" :key="word">{{ word }}</span>
            </h3>
            <p class="treatment-chapter__summary">{{ treatment.summary }}</p>
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
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useWhatsApp } from '~/composables/useWhatsApp'
import { landingContent } from '~/data/landing'

const section = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const { href, openWhatsApp } = useWhatsApp()
let animationContext: gsap.Context | undefined
let responsiveMedia: gsap.MatchMedia | undefined
let unmounted = false

onMounted(async () => {
  if (!section.value || !stage.value) return

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ])
  if (unmounted || !section.value || !stage.value) return

  gsap.registerPlugin(ScrollTrigger)
  animationContext = gsap.context(() => {
    const chapters = gsap.utils.toArray<HTMLElement>('[data-treatment-chapter]')
    const images = gsap.utils.toArray<HTMLElement>('[data-treatment-image]')
    const copies = gsap.utils.toArray<HTMLElement>('[data-treatment-copy]')
    const progress = section.value?.querySelector('[data-treatment-progress]')

    responsiveMedia = gsap.matchMedia()
    responsiveMedia.add({
      allowMotion: '(prefers-reduced-motion: no-preference)',
      desktop: '(min-width: 1024px)',
      reduceMotion: '(prefers-reduced-motion: reduce)'
    }, (context) => {
      const { desktop, reduceMotion } = context.conditions as {
        desktop: boolean
        reduceMotion: boolean
      }
      if (reduceMotion) return

      if (desktop && stage.value && section.value) {
        const firstImage = images[0]
        if (!firstImage) return

        section.value.classList.add('js-cinematic')
        stage.value.dataset.motionMode = 'cinematic'
        gsap.set(images.slice(1), { clipPath: 'inset(100% 0 0 0)', scale: 1.08 })
        gsap.set(copies.slice(1), { autoAlpha: 0, y: 54 })
        gsap.set(firstImage, { scale: 1.04 })
        if (progress) gsap.set(progress, { scaleY: 0, transformOrigin: 'top center' })

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage.value,
            start: 'top top',
            end: '+=260%',
            pin: true,
            scrub: 0.85
          }
        })

        timeline.to(firstImage, { scale: 1, duration: 0.7 })
        chapters.slice(1).forEach((_, index) => {
          const current = index + 1
          const previousCopy = copies[index]
          const currentImage = images[current]
          const currentCopy = copies[current]
          if (!previousCopy || !currentImage || !currentCopy) return

          timeline
            .to(previousCopy, { autoAlpha: 0, y: -42, duration: 0.28 })
            .to(currentImage, { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 0.72 }, '<0.05')
            .to(currentCopy, { autoAlpha: 1, y: 0, duration: 0.42 }, '<0.22')
        })
        if (progress) timeline.to(progress, { scaleY: 1, duration: timeline.duration() }, 0)

        return () => {
          section.value?.classList.remove('js-cinematic')
          if (stage.value) delete stage.value.dataset.motionMode
        }
      }

      chapters.forEach((chapter) => {
        chapter.dataset.motionMode = 'reveal'
        gsap.fromTo(chapter, { opacity: 0, y: 42 }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: chapter, start: 'top 86%', once: true }
        })
      })

      return () => chapters.forEach(chapter => delete chapter.dataset.motionMode)
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
  padding: clamp(5.5rem, 10vw, 9.5rem) 0 clamp(5rem, 8vw, 8rem);
  overflow: clip;
  color: var(--color-ink);
  background: var(--color-ivory);
}

.treatments-section__header {
  display: grid;
  width: min(100% - 2rem, 86rem);
  margin: 0 auto clamp(4rem, 8vw, 7rem);
  gap: 1.25rem;
}

.treatments-section__header > p,
.treatment-chapter__eyebrow {
  margin: 0;
  color: #79634c;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.treatments-section__header h2 {
  max-width: 15ch;
  margin: 0;
  color: var(--color-plum);
  font-family: var(--font-display);
  font-size: clamp(3rem, 6.8vw, 6.4rem);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.91;
}

.treatments-section__header > span {
  max-width: 34rem;
  color: rgb(33 29 31 / 68%);
  font-size: 0.91rem;
  font-weight: 300;
  line-height: 1.75;
}

.treatments-stage {
  position: relative;
  width: min(100% - 2rem, 86rem);
  margin: 0 auto;
}

.treatments-stage__rail { display: none; }
.treatments-stage__chapters { display: grid; gap: 5.5rem; }
.treatment-chapter { display: grid; gap: 2rem; }

.treatment-chapter__media {
  position: relative;
  min-height: 31rem;
  margin: 0;
  overflow: hidden;
  background: #dfe6e1;
}

.treatment-chapter__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.treatment-chapter__wash {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 55%, rgb(35 19 30 / 36%));
  pointer-events: none;
}

.treatment-chapter__media figcaption {
  position: absolute;
  right: 1.25rem;
  bottom: 1.1rem;
  color: var(--color-ivory);
  font-size: 0.56rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.treatment-chapter__copy { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; }
.treatment-chapter__index { display: flex; width: 100%; margin-bottom: 1.8rem; align-items: center; gap: 0.8rem; color: #8a7357; font-family: var(--font-display); font-size: 0.82rem; }
.treatment-chapter__index i { width: min(5rem, 24vw); height: 1px; background: rgb(138 115 87 / 52%); }

.treatment-chapter h3 {
  display: flex;
  margin: 0.6rem 0 1.35rem;
  color: var(--color-plum);
  flex-direction: column;
  font-family: var(--font-display);
  font-size: clamp(4rem, 12vw, 7.6rem);
  font-weight: 400;
  letter-spacing: -0.055em;
  line-height: 0.78;
}

.treatment-chapter__summary { max-width: 32rem; margin: 0; color: rgb(33 29 31 / 72%); font-size: 0.93rem; font-weight: 300; line-height: 1.85; }
.treatment-chapter a { display: inline-flex; min-height: 2.9rem; margin-top: 2rem; padding-bottom: 0.42rem; align-items: center; gap: 0.7rem; border-bottom: 1px solid var(--color-champagne); color: var(--color-plum); font-size: 0.64rem; font-weight: 600; letter-spacing: 0.12em; text-decoration: none; text-transform: uppercase; }
.treatment-chapter a svg { transition: transform 180ms ease; }
.treatment-chapter a:hover svg, .treatment-chapter a:focus-visible svg { transform: translate(0.2rem, -0.2rem); }

@media (min-width: 48rem) {
  .treatments-section__header { grid-template-columns: 0.65fr 2fr 1fr; width: min(100% - 4rem, 86rem); align-items: end; gap: 3rem; }
  .treatments-stage { width: min(100% - 4rem, 86rem); }
  .treatment-chapter { grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr); gap: clamp(3rem, 7vw, 7rem); }
  .treatment-chapter__media { min-height: 44rem; }
}

@media (min-width: 64rem) {
  .treatments-section { padding-bottom: 0; }
  .js-cinematic .treatments-stage { height: 100svh; width: 100%; background: #f8f6f2; }
  .js-cinematic .treatments-stage__chapters { position: relative; height: 100%; display: block; }
  .js-cinematic .treatment-chapter { position: absolute; inset: 0; display: block; }
  .js-cinematic .treatment-chapter__media { position: absolute; inset: 0 0 0 40%; min-height: 0; height: 100%; }
  .js-cinematic .treatment-chapter__copy { position: absolute; z-index: 2; inset: 0 54% 0 max(5rem, calc((100vw - 86rem) / 2)); padding-right: 2rem; }
  .js-cinematic .treatment-chapter h3 { font-size: clamp(5.5rem, 8.8vw, 9.5rem); }
  .js-cinematic .treatment-chapter h3 span { position: relative; z-index: 2; }
  .js-cinematic .treatment-chapter__media::before { position: absolute; z-index: 1; inset: 0 auto 0 0; width: 32%; background: linear-gradient(90deg, #f8f6f2, transparent); content: ''; }
  .js-cinematic .treatments-stage__rail { position: absolute; z-index: 5; right: max(1.5rem, calc((100vw - 86rem) / 2)); top: 50%; display: flex; height: 45%; align-items: center; flex-direction: column; gap: 0.8rem; color: rgb(255 255 255 / 75%); font-size: 0.56rem; letter-spacing: 0.16em; text-transform: uppercase; transform: translateY(-50%); }
  .js-cinematic .treatments-stage__rail span { writing-mode: vertical-rl; }
  .js-cinematic .treatments-stage__rail i { width: 1px; height: 100%; background: rgb(255 255 255 / 55%); }
  .js-cinematic .treatments-stage__rail b { font: inherit; }
}

@media (prefers-reduced-motion: reduce) {
  .treatment-chapter, .treatment-chapter__media, .treatment-chapter__copy { opacity: 1 !important; transform: none !important; clip-path: none !important; }
}
</style>

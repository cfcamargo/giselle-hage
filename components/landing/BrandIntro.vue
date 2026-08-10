<template>
  <div
    ref="intro"
    v-show="active"
    class="brand-intro"
    :data-intro-state="introState"
    aria-label="Introdução da marca Dra. Giselle Hage"
  >
    <div class="brand-intro__mark" aria-hidden="true">
      <Logo color="#b9a27d" icon_width="150" icon_height="78" />
      <span>Dra. Giselle Hage</span>
    </div>

    <button class="brand-intro__skip" type="button" @click="finish">
      Pular introdução
    </button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const emit = defineEmits<{
  complete: []
}>()

const SESSION_KEY = 'giselle-intro-seen'
const MAX_INTRO_DURATION = 2100

const intro = ref<HTMLElement | null>(null)
const active = ref(false)
const introState = ref<'pending' | 'active' | 'complete'>('pending')
const reducedMotion = useReducedMotion()
let timeline: { kill: () => void } | undefined
let hardTimeout: ReturnType<typeof setTimeout> | undefined
let stopReducedWatcher: (() => void) | undefined
let finished = false
let unmounted = false

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function rememberIntro() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    // Storage can be unavailable in privacy modes; the intro still completes.
  }
}

function finish() {
  if (finished || unmounted) return

  finished = true
  if (hardTimeout) clearTimeout(hardTimeout)
  timeline?.kill()
  document.documentElement.classList.remove('intro-active')
  rememberIntro()
  active.value = false
  introState.value = 'complete'
  emit('complete')
}

function pathLength(path: SVGPathElement) {
  try {
    return Math.ceil(path.getTotalLength())
  } catch {
    return 160
  }
}

onMounted(async () => {
  stopReducedWatcher = watch(reducedMotion, (isReduced) => {
    if (isReduced) finish()
  }, { flush: 'sync' })

  if (hasSeenIntro() || reducedMotion.value) {
    await nextTick()
    finish()
    return
  }

  active.value = true
  introState.value = 'active'
  document.documentElement.classList.add('intro-active')
  await nextTick()

  hardTimeout = setTimeout(finish, MAX_INTRO_DURATION)

  try {
    const { gsap } = await import('gsap')
    if (finished || unmounted || !intro.value) return

    const paths = [...intro.value.querySelectorAll<SVGPathElement>('path')]
    const lengths = paths.map(pathLength)

    gsap.set(paths, {
      fill: 'transparent',
      stroke: '#b9a27d',
      strokeWidth: 0.7,
      strokeDasharray: index => lengths[index],
      strokeDashoffset: index => lengths[index]
    })

    timeline = gsap.timeline({ onComplete: finish })
      .to(paths, {
        strokeDashoffset: 0,
        duration: 0.72,
        ease: 'power2.out',
        stagger: 0.07
      })
      .to(paths, {
        fill: '#b9a27d',
        strokeOpacity: 0,
        duration: 0.28,
        ease: 'power1.inOut'
      })
      .to(intro.value, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.62,
        ease: 'power4.inOut'
      }, '+=0.12')
  } catch {
    finish()
  }
})

onBeforeUnmount(() => {
  unmounted = true
  stopReducedWatcher?.()
  stopReducedWatcher = undefined
  if (hardTimeout) clearTimeout(hardTimeout)
  timeline?.kill()
  document.documentElement.classList.remove('intro-active')
})
</script>

<style scoped>
.brand-intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  overflow: hidden;
  color: var(--color-champagne);
  background:
    radial-gradient(circle at 50% 43%, rgb(185 162 125 / 10%), transparent 28rem),
    var(--color-plum);
  clip-path: inset(0);
}

.brand-intro__mark {
  display: grid;
  justify-items: center;
  gap: 1.2rem;
}

.brand-intro__mark span {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 3vw, 2rem);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.brand-intro__skip {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  padding: 0.7rem 1rem;
  border: 1px solid rgb(185 162 125 / 65%);
  border-radius: 999px;
  color: var(--color-ivory);
  background: rgb(33 29 31 / 35%);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  opacity: 0;
  transform: translateY(0.4rem);
  transition: opacity 180ms ease, transform 180ms ease;
}

.brand-intro__skip:focus-visible {
  opacity: 1;
  transform: translateY(0);
}

:global(html.intro-active) {
  overflow: hidden;
}

@media (hover: none) {
  .brand-intro__skip {
    opacity: 0.78;
    transform: translateY(0);
  }
}
</style>

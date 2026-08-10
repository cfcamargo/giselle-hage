<template>
  <div class="floating-whatsapp-host">
    <a
      class="floating-whatsapp"
      :class="{ 'floating-whatsapp--visible': visible }"
      :data-visible="visible"
      :href="href"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar avaliação pelo WhatsApp"
      :aria-hidden="!visible"
      :tabindex="visible ? undefined : -1"
      style="--floating-safe-right: env(safe-area-inset-right, 0px); --floating-safe-bottom: env(safe-area-inset-bottom, 0px); animation: none;"
      @click.prevent="openWhatsApp('floating')"
    >
      <MessageCircle :size="21" :stroke-width="1.6" aria-hidden="true" />
      <span>Agendar pelo WhatsApp</span>
    </a>

    <noscript>
      <a
        class="floating-whatsapp floating-whatsapp--visible"
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar avaliação pelo WhatsApp"
        style="--floating-safe-right: env(safe-area-inset-right, 0px); --floating-safe-bottom: env(safe-area-inset-bottom, 0px); animation: none;"
      >
        Agendar pelo WhatsApp
      </a>
    </noscript>
  </div>
</template>

<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useWhatsApp } from '~/composables/useWhatsApp'

const visible = ref(false)
const { href, openWhatsApp } = useWhatsApp()
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return

  const heroAction = document.querySelector('[data-hero-cta]')
  const closing = document.querySelector('#agendamento-final')
  const footer = document.querySelector('#rodape')
  if (!heroAction || !closing || !footer) return

  const intersections = new Map<Element, boolean>([
    [heroAction, true],
    [closing, true],
    [footer, true]
  ])

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (intersections.has(entry.target)) intersections.set(entry.target, entry.isIntersecting)
    }

    visible.value = intersections.get(heroAction) === false
      && intersections.get(closing) === false
      && intersections.get(footer) === false
  })

  for (const target of intersections.keys()) observer.observe(target)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = undefined
})
</script>

<style scoped>
.floating-whatsapp {
  position: fixed;
  right: calc(1rem + var(--floating-safe-right, 0px));
  bottom: calc(1rem + var(--floating-safe-bottom, 0px));
  z-index: 55;
  display: inline-flex;
  width: 3.35rem;
  height: 3.35rem;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(245 240 232 / 42%);
  border-radius: 50%;
  color: var(--color-ivory);
  background: var(--color-plum);
  box-shadow: 0 0.75rem 2rem rgb(33 29 31 / 24%);
  opacity: 0;
  text-decoration: none;
  transform: translateY(0.8rem);
  transition: opacity 220ms ease, transform 220ms ease, background 180ms ease;
  pointer-events: none;
}

.floating-whatsapp--visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.floating-whatsapp:hover,
.floating-whatsapp:focus-visible {
  background: #31483f;
}

.floating-whatsapp span {
  display: none;
}

@media (min-width: 48rem) {
  .floating-whatsapp {
    width: auto;
    height: 3.35rem;
    padding: 0 1.2rem;
    gap: 0.65rem;
    border-radius: 0;
  }

  .floating-whatsapp span {
    display: inline;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }
}

@media (prefers-reduced-motion: reduce) {
  .floating-whatsapp {
    transition: none;
  }
}
</style>

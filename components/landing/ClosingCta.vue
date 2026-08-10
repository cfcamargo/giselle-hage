<template>
  <section id="agendamento-final" class="closing-cta" aria-labelledby="closing-title">
    <div class="closing-cta__inner">
      <p class="closing-cta__eyebrow">Uma escolha individual</p>
      <h2 id="closing-title">Seu plano começa com uma conversa.</h2>
      <p class="closing-cta__supporting">
        Agende sua avaliação para entender possibilidades, indicações e um cuidado pensado para preservar a naturalidade dos seus traços.
      </p>
      <a
        :href="href"
        target="_blank"
        rel="noopener noreferrer"
        @click.prevent="openWhatsApp('closing')"
      >
        Agendar minha avaliação
        <ArrowUpRight :size="18" :stroke-width="1.5" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { useWhatsApp } from '~/composables/useWhatsApp'

const { href, openWhatsApp } = useWhatsApp()
</script>

<style scoped>
.closing-cta {
  position: relative;
  padding: clamp(6rem, 13vw, 11rem) 1rem;
  overflow: hidden;
  text-align: center;
  background: var(--color-champagne);
}

.closing-cta::before {
  position: absolute;
  inset: 1rem;
  border: 1px solid rgb(53 29 45 / 20%);
  content: '';
  pointer-events: none;
}

.closing-cta__inner {
  position: relative;
  width: min(100%, 54rem);
  margin: 0 auto;
}

.closing-cta__eyebrow {
  margin: 0 0 1.25rem;
  color: rgb(53 29 45 / 65%);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.closing-cta h2 {
  margin: 0;
  color: var(--color-plum);
  font-family: var(--font-display);
  font-size: clamp(3.2rem, 7vw, 6.4rem);
  font-weight: 400;
  letter-spacing: -0.05em;
  line-height: 0.86;
  text-wrap: balance;
}

.closing-cta__supporting {
  max-width: 42rem;
  margin: 2rem auto 0;
  color: rgb(53 29 45 / 72%);
  font-size: clamp(0.88rem, 1.4vw, 1rem);
  line-height: 1.8;
}

.closing-cta a {
  display: inline-flex;
  min-height: 3.5rem;
  margin-top: 2.25rem;
  padding: 0.85rem 1.4rem;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border: 1px solid var(--color-plum);
  color: var(--color-ivory);
  background: var(--color-plum);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.11em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease, background 180ms ease;
}

.closing-cta a:hover,
.closing-cta a:focus-visible {
  color: var(--color-plum);
  background: transparent;
}
</style>

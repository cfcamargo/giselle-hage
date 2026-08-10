<template>
  <section id="faq" class="faq-section" aria-labelledby="faq-title">
    <div class="faq-section__inner">
      <header class="faq-section__header">
        <p>Perguntas frequentes</p>
        <h2 id="faq-title">Antes de decidir,<br>entenda o cuidado.</h2>
      </header>

      <div class="faq-section__content">
        <div class="faq-section__list">
          <article v-for="(item, index) in landingContent.faqs" :key="questionId(index)" class="faq-section__item">
            <h3>
              <button
                :id="questionId(index)"
                type="button"
                :aria-expanded="isOpen(index)"
                :aria-controls="answerId(index)"
                @click="toggle(index)"
              >
                <span>{{ item.question }}</span>
                <ChevronDown
                  :class="{ 'faq-section__icon--open': isOpen(index) }"
                  :size="20"
                  :stroke-width="1.5"
                  aria-hidden="true"
                />
              </button>
            </h3>

            <motion.div
              :id="answerId(index)"
              class="faq-section__answer"
              role="region"
              :aria-labelledby="questionId(index)"
              :aria-hidden="!isOpen(index)"
              :initial="false"
              :animate="isOpen(index)
                ? { height: 'auto', opacity: 1 }
                : { height: 0, opacity: 0 }"
              :transition="{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }"
            >
              <p>{{ item.answer }}</p>
            </motion.div>
          </article>
        </div>

        <aside class="faq-section__aside" aria-label="Agendamento">
          <p>Ainda tem alguma dúvida sobre o tratamento ideal para você?</p>
          <a
            :href="href"
            target="_blank"
            rel="noopener noreferrer"
            @click.prevent="openWhatsApp('faq')"
          >
            Conversar pelo WhatsApp
            <ArrowUpRight :size="17" :stroke-width="1.5" aria-hidden="true" />
          </a>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight, ChevronDown } from '@lucide/vue'
import { motion } from 'motion-v'
import { ref } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useWhatsApp } from '~/composables/useWhatsApp'
import { landingContent } from '~/data/landing'

const openItems = ref(new Set<number>())
const reducedMotion = useReducedMotion()
const { href, openWhatsApp } = useWhatsApp()

const questionId = (index: number) => `faq-question-${index + 1}`
const answerId = (index: number) => `faq-answer-${index + 1}`
const isOpen = (index: number) => openItems.value.has(index)

function toggle(index: number) {
  const next = new Set(openItems.value)
  if (next.has(index)) next.delete(index)
  else next.add(index)
  openItems.value = next
}
</script>

<style scoped>
.faq-section {
  padding: clamp(5.5rem, 11vw, 10rem) 0;
  background: var(--color-ivory);
}

.faq-section__inner {
  display: grid;
  width: min(100% - 2rem, 78rem);
  margin: 0 auto;
  gap: clamp(3rem, 8vw, 7rem);
}

.faq-section__header > p {
  margin: 0 0 1.25rem;
  color: var(--color-champagne);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.faq-section__header h2 {
  max-width: 11ch;
  margin: 0;
  color: var(--color-plum);
  font-family: var(--font-display);
  font-size: clamp(3rem, 6.5vw, 5.75rem);
  font-weight: 400;
  letter-spacing: -0.045em;
  line-height: 0.9;
}

.faq-section__content {
  min-width: 0;
}

.faq-section__item {
  border-top: 1px solid rgb(53 29 45 / 18%);
}

.faq-section__item:last-child {
  border-bottom: 1px solid rgb(53 29 45 / 18%);
}

.faq-section__item h3 {
  margin: 0;
}

.faq-section__item button {
  display: flex;
  width: 100%;
  padding: 1.45rem 0;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  border: 0;
  color: var(--color-ink);
  background: transparent;
  font: inherit;
  font-size: clamp(0.93rem, 1.5vw, 1.08rem);
  line-height: 1.5;
  text-align: left;
  cursor: pointer;
}

.faq-section__item svg {
  flex: 0 0 auto;
  color: var(--color-champagne);
  transition: transform 220ms ease;
}

.faq-section__icon--open {
  transform: rotate(180deg);
}

.faq-section__answer {
  overflow: hidden;
}

.faq-section__answer p {
  max-width: 42rem;
  margin: 0;
  padding: 0 2.5rem 1.5rem 0;
  color: rgb(33 29 31 / 68%);
  font-size: 0.86rem;
  font-weight: 300;
  line-height: 1.8;
}

.faq-section__aside {
  display: flex;
  margin-top: 2.25rem;
  padding: 1.5rem 0;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.faq-section__aside p {
  max-width: 32rem;
  margin: 0;
  color: rgb(33 29 31 / 65%);
  font-size: 0.78rem;
  line-height: 1.7;
}

.faq-section__aside a {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: var(--color-plum);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
}

@media (min-width: 56rem) {
  .faq-section__inner {
    grid-template-columns: minmax(16rem, 0.68fr) minmax(0, 1.32fr);
    width: min(100% - 4rem, 78rem);
  }

  .faq-section__header {
    position: sticky;
    top: 8rem;
    align-self: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-section__item svg {
    transition: none;
  }
}
</style>

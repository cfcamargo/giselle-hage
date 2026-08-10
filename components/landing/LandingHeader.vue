<template>
  <header class="landing-header">
    <nav class="landing-header__nav" aria-label="Navegação principal">
      <a class="landing-header__brand" href="#inicio" aria-label="Dra. Giselle Hage — início">
        <Logo color="#b9a27d" icon_width="76" icon_height="40" aria-hidden="true" />
        <span class="landing-header__signature">
          <strong>Dra. Giselle Hage</strong>
          <small>Harmonização facial</small>
        </span>
      </a>

      <ul class="landing-header__desktop-links">
        <li v-for="item in navigation" :key="item.id">
          <a :href="`#${item.id}`">{{ item.label }}</a>
        </li>
      </ul>

      <details
        ref="mobileNavigation"
        class="landing-header__mobile-navigation"
        @toggle="syncMenuState"
      >
        <summary
          ref="menuTrigger"
          class="landing-header__menu-trigger"
          :aria-label="menuOpen ? 'Fechar navegação' : 'Abrir navegação'"
          aria-controls="landing-mobile-navigation"
          :aria-expanded="menuOpen"
        >
          <X v-if="menuOpen" :size="24" :stroke-width="1.5" aria-hidden="true" />
          <Menu v-else :size="24" :stroke-width="1.5" aria-hidden="true" />
        </summary>

        <motion.div
          id="landing-mobile-navigation"
          class="landing-header__mobile-panel"
          :initial="{ opacity: 1, y: 0 }"
          :animate="menuOpen && !reducedMotion
            ? { opacity: [0, 1], y: [-14, 0] }
            : { opacity: 1, y: 0 }"
          :transition="{ duration: reducedMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }"
        >
          <ul>
            <li v-for="(item, index) in navigation" :key="item.id">
              <a :href="`#${item.id}`" @click="closeMenu(false)">
                <span>0{{ index + 1 }}</span>
                {{ item.label }}
              </a>
            </li>
          </ul>
        </motion.div>
      </details>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next'
import { motion } from 'motion-v'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const navigation = [
  { id: 'inicio', label: 'Início' },
  { id: 'tratamentos', label: 'Tratamentos' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'contato', label: 'Contato' }
] as const

const menuOpen = ref(false)
const mobileNavigation = ref<HTMLDetailsElement | null>(null)
const menuTrigger = ref<HTMLElement | null>(null)
const reducedMotion = useReducedMotion()

function syncMenuState() {
  menuOpen.value = Boolean(mobileNavigation.value?.open)
}

async function closeMenu(returnFocus: boolean) {
  if (!menuOpen.value && !mobileNavigation.value?.open) return

  if (mobileNavigation.value) mobileNavigation.value.open = false
  menuOpen.value = false
  if (returnFocus) {
    await nextTick()
    menuTrigger.value?.focus()
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu(true)
}

onMounted(() => window.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', handleEscape))
</script>

<style scoped>
.landing-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 60;
  border-bottom: 1px solid rgb(245 240 232 / 14%);
  color: var(--color-ivory);
  background: rgb(64 91 80 / 94%);
  backdrop-filter: blur(18px);
}

.landing-header__nav {
  position: relative;
  display: flex;
  width: min(100% - 2rem, 86rem);
  min-height: 5rem;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
}

.landing-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  color: inherit;
  text-decoration: none;
}

.landing-header__signature {
  display: grid;
  line-height: 1;
}

.landing-header__signature strong {
  font-family: var(--font-display);
  font-size: 1.12rem;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.landing-header__signature small {
  margin-top: 0.35rem;
  color: rgb(245 240 232 / 62%);
  font-size: 0.55rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.landing-header__desktop-links {
  display: none;
  align-items: center;
  gap: clamp(1.4rem, 2.5vw, 2.75rem);
  margin: 0;
  padding: 0;
  list-style: none;
}

.landing-header__desktop-links a {
  position: relative;
  color: rgb(245 240 232 / 80%);
  font-size: 0.68rem;
  letter-spacing: 0.13em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease;
}

.landing-header__desktop-links a::after {
  position: absolute;
  right: 0;
  bottom: -0.55rem;
  left: 0;
  height: 1px;
  background: var(--color-champagne);
  content: '';
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 220ms ease;
}

.landing-header__desktop-links a:hover,
.landing-header__desktop-links a:focus-visible {
  color: var(--color-ivory);
}

.landing-header__desktop-links a:hover::after,
.landing-header__desktop-links a:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left;
}

.landing-header__menu-trigger {
  display: inline-grid;
  width: 2.75rem;
  height: 2.75rem;
  place-items: center;
  border: 1px solid rgb(185 162 125 / 44%);
  border-radius: 999px;
  color: var(--color-ivory);
  background: transparent;
  cursor: pointer;
  list-style: none;
}

.landing-header__menu-trigger::-webkit-details-marker {
  display: none;
}

.landing-header__mobile-panel {
  position: absolute;
  top: calc(100% + 1px);
  right: -1rem;
  left: -1rem;
  padding: 1rem 1rem 1.5rem;
  border-bottom: 1px solid rgb(185 162 125 / 25%);
  background: var(--color-plum);
  box-shadow: 0 1.5rem 3rem rgb(33 29 31 / 28%);
}

.landing-header__mobile-panel ul {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}

.landing-header__mobile-panel a {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.82rem 0.25rem;
  border-bottom: 1px solid rgb(245 240 232 / 10%);
  color: var(--color-ivory);
  font-family: var(--font-display);
  font-size: 1.7rem;
  text-decoration: none;
}

.landing-header__mobile-panel a span {
  color: var(--color-champagne);
  font-family: var(--font-sans);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
}

@media (min-width: 56rem) {
  .landing-header__nav {
    width: min(100% - 4rem, 86rem);
  }

  .landing-header__desktop-links {
    display: flex;
  }

  .landing-header__menu-trigger,
  .landing-header__mobile-navigation {
    display: none;
  }
}
</style>

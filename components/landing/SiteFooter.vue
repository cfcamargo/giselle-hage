<template>
  <footer id="rodape" class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__identity">
        <strong>{{ landingContent.brand.name }}</strong>
        <span>{{ landingContent.profile.registration }}</span>
      </div>

      <address>{{ landingContent.location.address }}</address>

      <nav aria-label="Contato e redes sociais">
        <a :href="landingContent.contact.instagramUrl" target="_blank" rel="noopener noreferrer">
          <Camera :size="17" :stroke-width="1.5" aria-hidden="true" />
          Instagram
        </a>
        <a :href="href" target="_blank" rel="noopener noreferrer" @click.prevent="openWhatsApp('footer')">
          <MessageCircle :size="17" :stroke-width="1.5" aria-hidden="true" />
          WhatsApp
        </a>
      </nav>
    </div>

    <p class="site-footer__legal">&copy; {{ currentYear }} {{ landingContent.brand.name }}. Todos os direitos reservados.</p>
  </footer>
</template>

<script setup lang="ts">
import { Camera, MessageCircle } from '@lucide/vue'
import { useWhatsApp } from '~/composables/useWhatsApp'
import { landingContent } from '~/data/landing'

const currentYear = new Date().getFullYear()
const { href, openWhatsApp } = useWhatsApp()
</script>

<style scoped>
.site-footer {
  padding: 2.5rem 1rem 1.25rem;
  color: rgb(245 240 232 / 70%);
  background: var(--color-plum);
}

.site-footer__inner {
  display: grid;
  width: min(100%, 78rem);
  margin: 0 auto;
  align-items: center;
  gap: 1.5rem;
}

.site-footer__identity {
  display: grid;
  gap: 0.35rem;
}

.site-footer__identity strong {
  color: var(--color-ivory);
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 500;
}

.site-footer__identity span,
.site-footer address,
.site-footer nav a,
.site-footer__legal {
  font-size: 0.59rem;
  letter-spacing: 0.09em;
  line-height: 1.6;
  text-transform: uppercase;
}

.site-footer address {
  max-width: 25rem;
  font-style: normal;
}

.site-footer nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.site-footer nav a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--color-ivory);
  text-decoration: none;
}

.site-footer__legal {
  width: min(100%, 78rem);
  margin: 2rem auto 0;
  padding-top: 1.15rem;
  border-top: 1px solid rgb(245 240 232 / 14%);
  color: rgb(245 240 232 / 42%);
}

@media (min-width: 48rem) {
  .site-footer {
    padding-right: 2rem;
    padding-left: 2rem;
  }

  .site-footer__inner {
    grid-template-columns: 0.8fr 1.35fr auto;
  }

  .site-footer nav {
    justify-content: flex-end;
  }
}
</style>

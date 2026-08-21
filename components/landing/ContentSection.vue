<template>
  <section id="conteudos" class="content-section" aria-labelledby="content-title">
    <div class="content-section__inner">
      <header class="content-section__header">
        <p>Conteúdos</p>
        <h2 id="content-title">Para decidir com mais clareza.</h2>
      </header>

      <ul class="content-section__list">
        <li v-for="post in landingContent.content" :key="post.title" class="content-section__card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.teaser }}</p>
        </li>
      </ul>

      <a
        class="content-section__cta"
        :href="landingContent.contact.instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver mais no Instagram
        <ArrowUpRight :size="17" :stroke-width="1.5" aria-hidden="true" />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { landingContent } from '~/data/landing'
</script>

<style scoped>
.content-section {
  padding: clamp(5.5rem, 11vw, 10rem) 0;
  background: var(--color-ivory);
}

.content-section__inner {
  width: min(100% - 2rem, 78rem);
  margin: 0 auto;
}

.content-section__header > p {
  margin: 0 0 1.25rem;
  color: var(--color-taupe);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.content-section__header h2 {
  max-width: 14ch;
  margin: 0;
  color: var(--color-graphite);
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 5.5vw, 4.4rem);
  font-weight: 400;
  letter-spacing: -0.04em;
  line-height: 0.96;
}

.content-section__list {
  display: grid;
  margin: clamp(3rem, 6vw, 4.5rem) 0 0;
  padding: 0;
  gap: 1.5rem;
  list-style: none;
}

.content-section__card {
  padding: 1.75rem 0 0;
  border-top: 1px solid rgb(46 43 39 / 16%);
}

.content-section__card h3 {
  margin: 0 0 0.75rem;
  color: var(--color-graphite);
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 400;
}

.content-section__card p {
  max-width: 34rem;
  margin: 0;
  color: rgb(46 43 39 / 68%);
  font-size: 0.86rem;
  font-weight: 300;
  line-height: 1.75;
}

.content-section__cta {
  display: inline-flex;
  min-height: 3.25rem;
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
  padding: 0.8rem 1.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  border: 1px solid var(--color-graphite);
  color: var(--color-ivory);
  background: var(--color-graphite);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 180ms ease, background 180ms ease;
}

.content-section__cta:hover,
.content-section__cta:focus-visible {
  color: var(--color-graphite);
  background: transparent;
}

@media (min-width: 48rem) {
  .content-section__inner {
    width: min(100% - 4rem, 78rem);
  }

  .content-section__list {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}
</style>

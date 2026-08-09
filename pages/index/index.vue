<template>
  <main id="inicio">
    <h1>{{ landingContent.hero.headline }}</h1>
  </main>
</template>

<script setup lang="ts">
import { landingContent } from '~/data/landing'

const title = 'Dra. Giselle Hage | Harmonização Facial em Ponta Porã'
const description = 'Harmonização facial com precisão, naturalidade e cuidado individual em Ponta Porã. Conheça Botox, preenchimento e peeling.'
const runtimeConfig = useRuntimeConfig()
const canonicalUrl = new URL('/', runtimeConfig.public.siteUrl).toString()
const professionalRegistration = landingContent.credentials.find(({ label }) => label === 'Registro profissional')?.value

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Dentist', 'LocalBusiness'],
      '@id': `${canonicalUrl}#dentist`,
      name: landingContent.brand.name,
      url: canonicalUrl,
      image: new URL(landingContent.hero.image, canonicalUrl).toString(),
      description,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'R. Tiradentes, 481 - Centro',
        addressLocality: 'Ponta Porã',
        addressRegion: 'MS',
        postalCode: '79904-620',
        addressCountry: 'BR'
      },
      identifier: {
        '@type': 'PropertyValue',
        name: 'Registro profissional',
        value: professionalRegistration
      }
    }
  ]
}

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogLocale: 'pt_BR',
  ogType: 'website',
  ogUrl: canonicalUrl,
  ogImage: '/hero-bg.jpg',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData)
    }
  ]
})
</script>

<template>
  <div id="inicio">
    <h1 class="sr-only">{{ landingContent.hero.headline }}</h1>
    <HomeTemplate />
  </div>
</template>

<script setup lang="ts">
import { landingContent } from '~/data/landing'

const title = 'Dra. Giselle Hage | Harmonização Facial em Ponta Porã'
const description = 'Harmonização facial com precisão, naturalidade e cuidado individual em Ponta Porã. Conheça Botox, preenchimento e peeling.'
const runtimeConfig = useRuntimeConfig()
const canonicalUrl = (() => {
  if (!runtimeConfig.public.siteUrl) return undefined

  try {
    const configuredOrigin = new URL(runtimeConfig.public.siteUrl)
    return configuredOrigin.protocol === 'https:'
      ? new URL('/', configuredOrigin).toString()
      : undefined
  } catch {
    return undefined
  }
})()
const professionalRegistration = landingContent.credentials.find(({ label }) => label === 'Registro profissional')?.value

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Dentist', 'LocalBusiness'],
      name: landingContent.brand.name,
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
      },
      ...(canonicalUrl
        ? {
            '@id': `${canonicalUrl}#dentist`,
            url: canonicalUrl,
            image: new URL(landingContent.hero.image, canonicalUrl).toString()
          }
        : {})
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
    ...(canonicalUrl ? [{ rel: 'canonical', href: canonicalUrl }] : [])
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData)
    }
  ]
})
</script>

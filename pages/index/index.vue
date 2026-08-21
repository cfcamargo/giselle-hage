<template>
  <BrandIntro @complete="introComplete = true" />
  <LandingHeader />
  <main id="conteudo">
    <LandingHero />
    <CredentialsStrip />
    <TreatmentsSection />
    <HarmonizationSection />
    <PhilosophySection />
    <ResultsSection />
    <AboutSection />
    <ContentSection />
    <FaqSection />
    <LocationSection />
    <ClosingCta />
  </main>
  <FloatingWhatsApp />
  <SiteFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { landingContent } from '~/data/landing'
import { resolveSiteOrigin } from '~/utils/siteOrigin'

const introComplete = ref(false)
const title = 'Dra. Giselle Hage | Harmonização Orofacial em Ponta Porã'
const description = 'Harmonização orofacial com precisão, naturalidade e cuidado individual em Ponta Porã. Conheça Botox, preenchimento e peeling.'
const runtimeConfig = useRuntimeConfig()
const canonicalUrl = resolveSiteOrigin(runtimeConfig.public.siteUrl)
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
        ...landingContent.location.postalAddress
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
  ogImage: canonicalUrl ? new URL(landingContent.hero.image, canonicalUrl).toString() : undefined,
  robots: canonicalUrl ? 'index, follow' : 'noindex, nofollow',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    ...(canonicalUrl ? [{ rel: 'canonical' as const, href: canonicalUrl }] : [])
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData)
    }
  ]
})
</script>

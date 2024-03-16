<template>
    <AppLayout>
      <HeroSection />
      <HeroBanner />
      <Services />
      <CardAboutHome />
      <Results />
      <Faq />
      <VisitUS />
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue"
import { useRoute } from "#vue-router"
import { onMounted } from "#imports"

const route = useRoute()

const scrollToSection = () => {
	const section = route.query.section
	if (section == 'about' || section == 'contact') {
		const element = document.getElementById(section)
		if(element){
			setTimeout(() => {
				element.scrollIntoView({ behavior: 'smooth' })
			}, 1000)
		}
	}
}

onMounted(() => {
	scrollToSection()
})

</script>

<template>
  <header class="h-[80px] flex items-center justify-between shadow fixed top-0 bg-primary w-full z-50 xs:px-2 md:px-8"
    @mouseleave="submenu = false">
    <Logo />
    <nav class="xs:hidden md:flex items-center gap-6 text-white">
      <NuxtLink @click="submenu = false" to="/">Home</NuxtLink>
      <div @mouseenter="submenu = true" class="relative">
        <button @click="toogleSubMenu" type="button">Serviços</button>
      </div>
      <button @click="navigateAndScrollToSection('about')">Sobre</button>
      <button @click="navigateAndScrollToSection('contact')">Contato</button>
    </nav>
    <a class="xs:hidden md:flex" href="https://api.whatsapp.com/send/?phone=5567981269482&text&type=phone_number&app_absent=0" target="_blank">
      <WhatsIcon />
    </a>

    <div class="xs:flex md:hidden">
      <button @click="asideShow = true">
        <Menu :size="40" color="white" />
      </button>

      <aside class="w-full h-screen fixed top-0 bottom-0 left-0 right-0 bg-primary py-2 px-2" v-show="asideShow">
        <div class="w-full flex justify-end">
          <button @click="asideShow = false">
            <X :size="40" color="white" />
          </button>
        </div>
        <div class="flex flex-col gap-4 text-xl items-center mt-4">
          <NuxtLink @click="submenu = false" to="/" class="text-white">Home</NuxtLink>

          <div>
            <div class="flex flex-col gap-6 justify-start items-center py-4">
              <NuxtLink :to="`/services/${service.to}`" v-for="(service, index) in servicesData" :key="index"
                class="text-white text-center transform hover:scale-105 cursor-pointer">
                {{ service.name }}
              </NuxtLink>
            </div>
          </div>

          <button @click="navigateAndScrollToSection('about')" class="text-white">Sobre</button>
          <button @click="navigateAndScrollToSection('contact')" class="text-white">Contato</button>
        </div>
      </aside>
    </div>

    <div v-show="submenu" class="xs:hidden absolute left-0 right-0 top-[70px] pt-4 md:flex justify-center items-center">
      <div class="flex gap-10 bg-violet-950 bg-opacity-80 p-4 rounded-full shadow-lg px-8">
        <NuxtLink :to="`/services/${service.to}`" v-for="(service, index) in servicesData" :key="index"
          class="text-white text-center transform hover:scale-105 cursor-pointer">
          {{ service.name }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import services from '@/Models/Services'
import { Menu, X } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const submenu = ref(false)
const asideShow = ref(false)

function toogleSubMenu() {
	submenu.value = !submenu.value
}

const router = useRouter()
const route = useRoute()

const navigateAndScrollToSection = (sectionId: string) => {
	submenu.value = false
	asideShow.value = false
	if (route.path === '/') {
		scrollToSection(sectionId)
	} else {
		router.push({ path: '/', query: { section: sectionId } })
	}
}

const scrollToSection = (sectionId : string) => {
	const element = document.getElementById(sectionId)
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' })
	}
}

const servicesData = services
</script>

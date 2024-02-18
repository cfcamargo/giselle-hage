<template>
    <header class="h-[80px] flex items-center justify-between shadow fixed top-0 bg-primary w-full z-50 px-8" @mouseleave="submenu = false">
       <Logo />
        <nav class="xs:hidden md:flex items-center gap-6 text-white">
        <NuxtLink to="/">Home</NuxtLink>
         <div @mouseenter="submenu = true" class="relative">
          <button @click="toogleSubMenu" type="button">Serviços</button>
         </div>
        <NuxtLink to="/about">Sobre</NuxtLink>
        <NuxtLink to="/contact">Contato</NuxtLink>
       </nav>
       <a>
        <WhatsIcon />
       </a>

       <div v-show="submenu" class="absolute left-0 right-0 top-[70px] pt-4 flex justify-center items-center">
          <div class="flex gap-10 bg-violet-950 bg-opacity-80 p-4 rounded-full shadow-lg px-8">
            <NuxtLink :to="`/services/${service.to}`" v-for="(service, index) in servicesData" :key="index" class="text-white text-center transform hover:scale-105">
              {{ service.name }}
            </NuxtLink>
          </div>
        </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import services from '@/Models/Services'

  const submenu = ref(false)

  function toogleSubMenu() {
    submenu.value = !submenu.value
  }

  const servicesData = services
  </script>
  
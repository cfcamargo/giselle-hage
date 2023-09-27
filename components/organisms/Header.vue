<template>
    <header class="h-[100px] flex items-center shadow fixed top-0 bg-white w-full z-50">
      <Container class="flex justify-between">
       <Logo />
        <nav class="xs:hidden md:flex items-center gap-6">
        <NuxtLink to="/">Home</NuxtLink>
         <div @mouseenter="submenu = true" @mouseleave="submenu = false" class="relative">
          <button @click="toogleSubMenu" type="button">Serviços</button>
          <div v-show="submenu" class="absolute w-80 -left-32 pt-4">
            <div class="flex flex-col gap-6 bg-violet-950 bg-opacity-80 p-4 rounded shadow">
              <NuxtLink :to="`/services/${service.to}`" v-for="service in servicesData" :key="service" class="text-white text-center transform hover:scale-105">
                {{ service.name }}
              </NuxtLink>
            </div>
          </div>
         </div>
        <NuxtLink to="/about">Sobre</NuxtLink>
        <NuxtLink to="/contact">Contato</NuxtLink>
       </nav>
        <div class="xs:flex md:hidden h-full justify-center-center">
            <HamburguerMenu />
        </div>
      </Container>
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
  
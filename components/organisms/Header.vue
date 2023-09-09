<template>
    <header class="h-[100px] flex items-center">
      <Container class="flex justify-between">
       <Logo />
       <nav class="flex items-center gap-6">
        <NuxtLink to="/">Home</NuxtLink>
         <div @mouseenter="submenu = true" @mouseleave="submenu = false" class="relative">
          <button @click="toogleSubMenu"  type="button">Serviços</button>
          <div v-show="submenu" class="absolute -left-4 pt-6">
            <div class="flex flex-col gap-2 bg-violet-950 p-4">
              <NuxtLink to="/services">
                Service
              </NuxtLink>
            </div>
          </div>
         </div>
        <NuxtLink to="/about">Sobre</NuxtLink>
        <NuxtLink to="/contact">Contato</NuxtLink>
       </nav>
      </Container>
    </header>
  </template>
  
  <script setup lang="ts">

  const submenu = ref(false)

  function toogleSubMenu() {
    submenu.value = !submenu.value
  }




  </script>
  
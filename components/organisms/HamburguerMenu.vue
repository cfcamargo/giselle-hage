<template>
  <div>
    <button @click="toogleMenu">
      <Menu color="#3F3164" :size="40"/>
    </button>
  </div>

  <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated animate__fadeOutRight">
    <nav class="w-2/3 h-screen bg-violet-950 flex flex-col items-end px-3 gap-6 fixed top-0 right-0 text-white" v-if="menuShow">
      <div class="w-full flex justify-end py-6">
        <button class="-mr-1" @click="toogleMenu">
          <X color="white" :size="40" />
        </button>
      </div>

      <a href="#home">Home</a>

      <div class="flex flex-col items-end gap-4">
        <button type="button" @click="toogleSubMenu" class="flex items-center gap-2">
          <ChevronDown color="white" :size="20" class="transform transition-all ease-in-out" :class="submenuShow ? 'rotate-180' : 'rotate-0'"/>
          <span>Serviços</span>
        </button>
        <transition enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
          <div v-show="submenuShow" class="flex flex-col items-end gap-6 pt-6 pb-2">
            <NuxtLink :to="`/services/${service.to}`" v-for="(service, index) in services" :key="index" class="font-light">{{ service.name }}</NuxtLink>
          </div>
        </transition>
      </div>

      <a href="#about">Sobre</a>
      <a href="#contact">Contato</a>
    </nav>
  </transition>

</template>

<script setup lang="ts">
import { X, Menu, ChevronDown } from 'lucide-vue-next'
import services from "~/Models/Services"
import { ref } from 'vue'

const menuShow = ref(false)
const submenuShow = ref(false)


function toogleSubMenu() {
	submenuShow.value = !submenuShow.value
}

function toogleMenu() {
	menuShow.value = !menuShow.value
}

</script>
<template>
  <div class="w-full bg-violet-950 bg-opacity-60 fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center" v-if="props.show">
      <div class="w-full max-w-[700px] relative">
        <button class="absolute rounded-full bg-white -top-4 -right-4 shadow" @click="$emit('toogleShow')">
          <X :size="30" />
        </button>
        <nuxt-img
          :src="props.imgURL"
          class="w-full"
        />
      </div>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

const props = defineProps<{
  imgURL: string,
  show: boolean
}>()
</script>

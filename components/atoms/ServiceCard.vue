<template>
  <div class="w-full flex flex-col gap-2">
    <h4 class="text-xl text-violet-950">{{ service.title }}</h4>
    <div class="text-xs">{{ service.description }}</div>
  </div>
</template>
  
<script setup lang="ts">

const props = defineProps<{
  service : {
    title : string,
    description : string
  }
}>();

const { service } = props
</script>
<template>
  <div>
    <ServiceTemplate :id="selectedId"/>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const selectedId = computed(() => {
  return Number(route.params.id)
})
</script>

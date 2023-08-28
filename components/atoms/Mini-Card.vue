<template>
  <div class="w-[204px] h-[24px] flex flex-col">
    <div class="text-[20px] text-[#3E3063]">{{ title }}</div>
    <div class="w-[307px] h-[60px] text-[12px]">{{ description }}</div>
  </div>
</template>
  
<script setup lang="ts">


const props = defineProps({
  title: {
    type: String as PropType<string>,
    required: true,
  },
  description: {
    type: String as PropType<string>,
    required: true,
  },
});
</script>
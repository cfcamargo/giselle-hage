<template>
    <div class="p-8 bg-gray-100 flex flex-col gap-4 w-full min-h-[400px] rounde shadow">
        <div class="flex items-center gap-2">
            <BadgeCheck color="#3F3164" :size="30"/>
            <span class="font-bold text-primary">{{ props.title }}</span>
        </div>


        <div class="flex-1">
            <p class="text-secondary">
                {{ props.description }}
            </p>
        </div>

        <NuxtLink :to="props.link" class="font-bold mt-6 text-primary underline">Saber Mais</NuxtLink>
    </div>
</template>

<script setup>
import { BadgeCheck } from 'lucide-vue-next'

const props = defineProps({
    title: String,
    description: String,
    link: String
})

</script>
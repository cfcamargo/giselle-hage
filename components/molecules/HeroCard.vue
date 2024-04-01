<template>
    <div class="bg-[rgba(255,255,255,0.1)] backdrop-blur-md p-8 rounded-lg shadow-lg max-w-[250px]">
        <div class="flex items-start gap-4 w-full">
            <component :is="component[props.icon]" color="#3F3164" size="50"/>
            <p class="text-secondary" v-html="props.text"></p>
        </div>
    </div>
</template>


<script setup lang="ts">
import { Clock, Heart } from 'lucide-vue-next'

const props = defineProps({
    icon : {
        type: String,
        default: 'Clock'
    },
    text : {
        type: String,
        default: 'Text'
    }
})

const component:any = {
    clock : Clock,
    heart : Heart
}
</script>
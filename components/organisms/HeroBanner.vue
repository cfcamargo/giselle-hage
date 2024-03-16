<template>
    <div class="w-full py-10 bg-gray-100 bg-left bg-cover">
        <Container class="flex justify-between items-center">
            <a href="https://www.instagram.com/dra.gisellehage/" target="_blank">
                <div class="flex gap-4 items-center">
                    <div class="rounded-full w-20 h-20 bg-red border-primary border-2 object-cover overflow-hidden">
                        <img src="/insta-profile.png" class="w-full"/>
                    </div>
                    <span class="font-bold text-primary">@dra.gisellehage</span>
                </div>
            </a>


            <a href="https://maps.app.goo.gl/GzueV4dxy1aZmRLx5" class="flex items-center gap-4">
                <div class="bg-primary rounded-full w-20 h-20 flex justify-center items-center">
                    <MapPin color="white" :size="40"/>
                </div>
                <p class="font-bold text-primary">R. Tiradentes, 481 - Centro, Ponta Porã - MS, <br/>79904-620</p>
            </a>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'

</script>

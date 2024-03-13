<template>
    <Container>
        <div class="py-20">
            <h4 class="text-3xl font-bold text-center underline">Alguns de Nossos <span class="text-primary">Resultados</span></h4>
        </div>
        <Swiper
        :modules="[SwiperAutoplay, SwiperNavigation]"
        :slides-per-view="4"
        :navigation="true"
        :loop="true"
        :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
        }"
        >
        <SwiperSlide v-for="(slide, index) in results" :key="index">
            <div class="px-4">
                <img :src="slide">
            </div>
        </SwiperSlide>
        </Swiper>
    </Container>
</template>

<script setup lang="ts">
const results = [
	'/services/bigode.jpg',
	'/services/botox1.jpg',
	'/services/botox2.jpg',
	'/services/botox3.jpg',
	'/services/labial1.jpg',
	'/services/labial2.jpg',
	'/services/labial3.jpg',
	'/services/mento1.jpg',
	'/services/mento2.jpg',
	'/services/mento3.jpg',
]

</script>

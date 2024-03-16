<template>
    <Container>
        <div class="py-20">
            <h4 class="text-3xl font-bold text-center underline">Alguns de Nossos <span class="text-primary">Resultados</span></h4>
        </div>
        <Swiper
        :modules="[SwiperAutoplay, SwiperNavigation]"
        :slides-per-view="slidesPerVies"
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
const slidesPerVies = ref(4)

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

const changeSlidesPerView = () => {
    if (window.innerWidth < 430) {
        slidesPerVies.value = 1
    } else {
        slidesPerVies.value = 4
    }
}

onMounted(() => {
    changeSlidesPerView()
    window.addEventListener('resize', changeSlidesPerView)
})

</script>

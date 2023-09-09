<template>
    <section class="mt-[215px] overflow-x-hidden">
        <Container class="flex flex-col justify-center items-center gap-10">
            <h1 class="text-5xl font-bold">Galeria de Fotos</h1>
            <div class="w-full">
              <Swiper
                  :modules="[SwiperAutoplay, SwiperEffectCreative]"
                  :slides-per-view="2"
                  :loop="true"
                  :autoplay="{
                        delay: 8000,
                        disableOnInteraction: false,
                    }"
                  class="w-full"
              >
                  <SwiperSlide v-for="(photo, index) in photos" :key="index">
                    <div class="w-[90%] h-[700px] mx-auto">
                      <nuxt-img :src="photo" class="h-full max-w-full object-cover object-center" quality="100"/>
                    </div>
                  </SwiperSlide>
              </Swiper>
            </div>
        </Container>
    </section>
</template>


<script setup lang="ts">

const photos = [
    '/book/img1.jpg',
    '/book/img2.jpg',
    '/book/img3.jpg',
    '/book/img4.jpg',
    '/book/img5.jpg',
    '/book/img6.jpg',
    '/book/img7.jpg',
    '/book/img8.jpg',
    '/book/img9.jpg',
    '/book/img10.jpg',
    '/book/img11.jpg',
]

</script>
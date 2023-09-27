<template>
  <AppLayout>
    <Container class="grid grid-cols-2 py-10 gap-20 items-center">
        <nuxt-img
          src="/image.jpg"
        />
      <div class="py-4 flex flex-col gap-4">
        <a class="transform hover:scale-105 flex items-center gap-2" href="https://api.whatsapp.com/send/?phone=5567981269482&text&type=phone_number&app_absent=0">
          <WhatsappIcon class="w-6" />
          <span>+55 67 9 0000-0000</span>
        </a>

        <a class="transform hover:scale-105 flex items-center gap-2" href="https://www.instagram.com/dra.gisellehage/">
          <Instagram class="w-6" />
          <span>dra.gisellehage</span>
        </a>

        <a class="transform hover:scale-105 flex items-center gap-2" href="mailto:contato.giselle@gmail.com">
          <Mail size="25" />
          <span>contato.giselle@gmail.com</span>
        </a>

        <div class="flex flex-col gap-4 mt-10">
          <h5 class="font-bold">Como Chegar?</h5>

          <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14740.600180165486!2d-55.7266496!3d-22.5360514!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94626fcb4c139687%3A0x6e402d3ecf6437f7!2sDra.%20Giselle%20Hage%20-%20Harmoniza%C3%A7%C3%A3o%20Facial%20em%20Ponta%20Por%C3%A3%20MS!5e0!3m2!1sen!2sbr!4v1695854782910!5m2!1sen!2sbr" class="w-full" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue";
import {Mail} from 'lucide-vue-next'
</script>
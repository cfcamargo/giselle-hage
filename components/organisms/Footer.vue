<template>
  <div class="bg-violet-950">
    <Container class="py-20 grid grid-cols-3">
      <div class="flex flex-col gap-2 text-white">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/services">Serviços</NuxtLink>
        <NuxtLink to="/about">Sobre</NuxtLink>
        <NuxtLink to="/contact">Contato</NuxtLink>
      </div>

      <div class="flex flex-col gap-2 text-white">
          <h4>Hoário de Atendimento:</h4>
          <div class="flex flex-col">
            <span>Segunda a Sexta</span>
            <span>08:00 - 18:00</span>
          </div>

        <div class="flex flex-col">
          <span>Sábado</span>
          <span>08:00 - 12:00</span>
        </div>
      </div>

      <div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14740.600180165486!2d-55.7266496!3d-22.5360514!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94626fcb4c139687%3A0x6e402d3ecf6437f7!2sDra.%20Giselle%20Hage%20-%20Harmoniza%C3%A7%C3%A3o%20Facial%20em%20Ponta%20Por%C3%A3%20MS!5e0!3m2!1sen!2sbr!4v1695854782910!5m2!1sen!2sbr" width="600" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </Container>

    <div class="text-center text-white py-20 text-xs flex flex-col">
      <span>Todos os direitos reservados</span>
      <span>Giselle Hage - 2023</span>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

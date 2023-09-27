<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Toxina Botulínica(Botox)</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          A toxina botulínica, popularmente conhecida como "botox", é uma substância utilizada em procedimentos estéticos para reduzir temporariamente as rugas e linhas de expressão, bem como para tratar condições médicas, como espasmos musculares e hiperidrose (sudorese excessiva).
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          A toxina botulínica é injetada em pequenas quantidades nos músculos responsáveis pelas rugas faciais. Ela atua bloqueando temporariamente os sinais nervosos que levam à contração muscular, relaxando assim os músculos e suavizando as linhas de expressão.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          É procurada para reduzir a aparência de rugas faciais, como as linhas da testa, pés de galinha e rugas entre as sobrancelhas. Também é usada para tratar condições médicas, como espasmos musculares, distonia cervical e hiperidrose axilar.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após o tratamento com toxina botulínica, os pacientes são aconselhados a evitar esfregar a área tratada, deitar-se ou fazer exercícios intensos nas primeiras horas. Os resultados geralmente começam a aparecer dentro de alguns dias e duram vários meses. É importante seguir as orientações do profissional de saúde e agendar retoques conforme necessário para manter os resultados desejados. A toxina botulínica é geralmente segura quando administrada por um profissional qualificado, mas é fundamental escolher um profissional experiente e licenciado para garantir um tratamento seguro e eficaz.
        </p>
      </div>

      <nuxt-img
        src="https://drafairuzhelena.com.br/wp-content/uploads/2021/06/Botox-Preventivo.png"
        class="h-full object-cover"
      />
    </div>


      <div class="py-20">
        <h3 class="text-3xl font-bold">
          Alguns de nossos resultados
        </h3>

        <div class="grid xs:grid-cols-1 md:grid-cols-3 gap-10 py-6">
          <nuxt-img
              class="w-full cursor-pointer transform hover:scale-105"
              src="/services/botox1.jpg"
              @click="viewImage('/services/botox1.jpg')"
          />

          <nuxt-img
              class="w-full cursor-pointer transform hover:scale-105"
              src="/services/botox2.jpg"
              @click="viewImage('/services/botox2.jpg')"
          />

          <nuxt-img
              class="w-full cursor-pointer transform hover:scale-105"
              src="/services/botox3.jpg"
              @click="viewImage('/services/botox3.jpg')"
          />
        </div>

        <ServiceImageModal :imgURL="imgURL" :show="modalShow" @toogleShow="closeModal" />
      </div>
  </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue";

const modalShow = ref(false)
const imgURL = ref('')

function viewImage(url: string){
  imgURL.value = url
  modalShow.value = true
}


function closeModal(){
  modalShow.value = false
  imgURL.value = ''
}

</script>

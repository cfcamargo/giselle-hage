<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Preenchimento de Tempora</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          Um procedimento estético não cirúrgico que visa melhorar o contorno e a aparência das têmporas por meio da injeção de substâncias preenchedoras, frequentemente ácido hialurônico.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          Consiste na injeção da substância preenchedora na área das têmporas, proporcionando um aspecto mais volumoso e suave. Este procedimento ajuda a restaurar a plenitude perdida com o envelhecimento ou a corrigir irregularidades na região.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          É buscado para suavizar vincos e depressões nas têmporas, melhorar a harmonia facial e criar uma aparência rejuvenescida.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após o preenchimento, é possível experimentar inchaço, vermelhidão ou sensibilidade temporários na área tratada. Evitar a exposição solar direta é importante, bem como o uso de protetor solar. Descanso e cuidados com a pele adequados são essenciais para otimizar os resultados. Seguir as orientações do profissional é fundamental para garantir um tratamento eficaz e minimizar riscos.
        </p>
      </div>

      <nuxt-img
        src="https://irp-cdn.multiscreensite.com/dd491ea9/dms3rep/multi/preenchimento+temporas.jpg"
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
              src="/services/bigode.jpg"
              @click="viewImage('/services/bigode.jpg')"
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

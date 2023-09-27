<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Tratamento Terapêutico para Bruxismo e Dores da Articulação Temporomandibular (ATM)</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          O tratamento terapêutico para bruxismo e dores da articulação temporomandibular (ATM) é um conjunto de abordagens médicas e terapêuticas que visam aliviar os sintomas e melhorar a qualidade de vida de indivíduos que sofrem de bruxismo (ranger dos dentes) e desconfortos associados à articulação temporomandibular.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          Esse tratamento pode incluir diversas modalidades terapêuticas, como fisioterapia, uso de dispositivos orais, medicação e terapia comportamental. O objetivo é reduzir a tensão muscular, corrigir desalinhamentos da mandíbula e promover uma função saudável da articulação temporomandibular.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          É procurado por pessoas que enfrentam o bruxismo, que muitas vezes está relacionado ao estresse e à tensão, resultando em dores faciais, dores de cabeça, desgaste dental e outros desconfortos. O tratamento terapêutico visa aliviar esses sintomas, restaurar a função normal da mandíbula e melhorar a qualidade de vida.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Os pacientes devem seguir as orientações do profissional de saúde, que podem incluir o uso contínuo de dispositivos orais, participação em sessões de fisioterapia e adesão às estratégias de gerenciamento do estresse. É fundamental manter consultas de acompanhamento para avaliar a eficácia do tratamento e fazer ajustes conforme necessário. Além disso, adotar práticas de autocuidado, como técnicas de relaxamento, pode ser benéfico para prevenir a recorrência dos sintomas. A colaboração com um profissional de saúde experiente nessa área é essencial para um tratamento bem-sucedido.
        </p>
      </div>

      <nuxt-img
        src="https://apexodontologia.com.br/wp-content/uploads/2022/04/o-que-e-atm-apex-dcd.jpg"
        class="h-full object-cover"
      />
    </div>
  </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue";

const modalShow = ref(false)
const imgURL = ref('')


</script>

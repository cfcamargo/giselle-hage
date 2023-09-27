<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Reestruturação de Órbita</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          A reestruturação de órbita é um procedimento cirúrgico que tem como objetivo corrigir ou melhorar a forma, posição ou estrutura dos ossos orbitais ao redor dos olhos, frequentemente realizado para tratar condições como enoftalmia (olhos afundados) ou exoftalmia (olhos proeminentes).
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          A cirurgia de reestruturação de órbita envolve a remodelação dos ossos orbitais para restaurar a anatomia ocular adequada e corrigir problemas estéticos ou funcionais. O procedimento é personalizado de acordo com as necessidades individuais do paciente.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          É procurado para corrigir deformidades orbitais congênitas, traumáticas ou resultantes de doenças, bem como melhorar a aparência e a funcionalidade dos olhos. A cirurgia pode aliviar desconforto visual, melhorar a estética facial e restaurar a saúde ocular.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após a reestruturação de órbita, é fundamental seguir as orientações rigorosas do cirurgião oftalmoplástico. Isso pode incluir repouso ocular, uso de compressas frias ou quentes, medicação prescrita e acompanhamento médico frequente. Os pacientes devem evitar atividades que possam causar pressão nos olhos e seguir uma dieta adequada, se necessário, para promover a cicatrização. A recuperação pode variar, mas é essencial seguir todas as recomendações para garantir o sucesso do procedimento e evitar complicações.
        </p>
      </div>

      <nuxt-img
        src="https://institutovelasco.com.br/wp-content/uploads/2022/11/850151.jpg"
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

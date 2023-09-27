<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Preenchimento de Malar</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          Um procedimento estético não cirúrgico que visa aprimorar o contorno e o volume das maçãs do rosto (região malar) através da injeção de substâncias preenchedoras, geralmente o ácido hialurônico.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          Consiste na injeção da substância preenchedora na área das maçãs do rosto, proporcionando maior plenitude e definição. Esse procedimento pode restaurar a forma perdida com o envelhecimento ou realçar o contorno facial.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          É procurado para melhorar as características faciais, realçar as maçãs do rosto e corrigir a flacidez que pode ocorrer com o tempo. Também pode ser usado para criar um aspecto mais jovem e esculpido.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após o preenchimento, é possível experimentar inchaço, vermelhidão ou sensibilidade temporários na área tratada. Evitar a exposição solar direta é importante e a aplicação de protetor solar é recomendada. Descanso e cuidados adequados com a pele são essenciais para otimizar os resultados. É fundamental seguir as orientações do profissional para obter um tratamento bem-sucedido e minimizar possíveis complicações.
        </p>
      </div>

      <nuxt-img
        src="https://hamonir.com.br/wp-content/uploads/2021/12/preenchimento-malar.jpg"
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

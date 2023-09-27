<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Preenchimento de Olheiras</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          Um procedimento estético não cirúrgico que visa reduzir a aparência de olheiras por meio da injeção de substâncias preenchedoras, como o ácido hialurônico.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          Envolve a injeção da substância preenchedora na área sob os olhos para preencher sulcos, rugas ou depressões. Isso ajuda a suavizar as olheiras e a restaurar a aparência fresca da pele.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          É procurado para reduzir a aparência de olheiras escuras, sulcos e inchaços sob os olhos, proporcionando um aspecto mais descansado e jovial.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após o preenchimento, podem ocorrer inchaço e vermelhidão temporários na área tratada. Recomenda-se evitar exposição solar direta e aplicar protetor solar. Descansar e manter uma boa rotina de cuidados com a pele são importantes para otimizar os resultados. É fundamental seguir as orientações do profissional para um tratamento bem-sucedido e minimizar possíveis complicações.
        </p>
      </div>

      <nuxt-img
        src="https://hamonir.com.br/wp-content/uploads/2022/07/preenchimento-de-olheiras-antes-e-depois.jpg"
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

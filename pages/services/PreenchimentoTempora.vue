<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Bigode Chines</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          O preenchimento de "bigode chinês" é um procedimento estético não cirúrgico projetado para reduzir a aparência dos sulcos nasogenianos, comumente chamados de "bigode chinês", através da injeção de substâncias preenchedoras, como o ácido hialurônico.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          Este procedimento envolve a injeção da substância preenchedora nos sulcos nasogenianos, que são as linhas que se estendem do nariz até a boca. Isso preenche as depressões e suaviza a área, proporcionando uma aparência mais jovem e revigorada.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          O preenchimento do "bigode chinês" é procurado para corrigir sulcos profundos ao redor do nariz e da boca, suavizar as rugas e linhas finas nessa região, e restaurar uma aparência mais juvenil e descansada.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após o preenchimento, é possível que ocorra inchaço, vermelhidão ou sensibilidade temporários na área tratada. Recomenda-se evitar a exposição direta ao sol e o uso de protetor solar é essencial. Descansar e manter uma boa rotina de cuidados com a pele são importantes para otimizar os resultados. É crucial seguir as orientações do profissional de saúde para garantir um tratamento eficaz e minimizar riscos.
        </p>
      </div>

      <nuxt-img
        src="https://irp-cdn.multiscreensite.com/dd491ea9/dms3rep/multi/preenchimento+temporas.jpg"
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

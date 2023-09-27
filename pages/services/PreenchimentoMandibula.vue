<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Preenchimento de Mandíbula</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          O preenchimento de mandíbula é um procedimento estético não cirúrgico que visa realçar e definir o contorno da mandíbula através da injeção de substâncias de preenchimento.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          Utilizando substâncias como o ácido hialurônico, o preenchimento é injetado em pontos estratégicos ao longo da linha da mandíbula. Isso proporciona uma aparência mais definida, equilibrada e marcada, especialmente no ângulo e no corpo da mandíbula.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          Muitas pessoas buscam o preenchimento de mandíbula para:<br>

           - Melhorar o contorno facial, dando uma aparência mais esculpida.<br/>
           - Corrigir assimetrias ou imperfeições na linha da mandíbula.<br />
           - Restaurar o volume perdido com o envelhecimento, que pode fazer a mandíbula parecer menos definida.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após o preenchimento, é comum que a área tratada fique um pouco inchada e sensível por alguns dias. É importante evitar exercícios intensos, massagens na área tratada e exposição ao sol por pelo menos 24 horas após o procedimento. Sempre é fundamental seguir as orientações do profissional que realizou o procedimento para garantir os melhores resultados e minimizar possíveis complicações.
        </p>
      </div>

      <nuxt-img
        src="https://dravanessadefelicibus.com.br/wp-content/uploads/2018/10/1.png"
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

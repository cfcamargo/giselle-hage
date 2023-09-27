<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Bioestimuladores de Colágeno: Injetáveis, Fios Lisos, Microagulhamento e Peelings</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          Os bioestimuladores de colágeno compreendem uma variedade de técnicas e procedimentos estéticos que visam estimular a produção natural de colágeno na pele, promovendo a firmeza, a elasticidade e a juventude.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          O procedimento envolve a injeção de uma substância preenchedora, geralmente ácido hialurônico, diretamente nos lábios. Isso proporciona um aumento imediato no volume, além de definir e realçar o contorno labial. A substância é absorvida pelo corpo ao longo do tempo, tornando o procedimento temporário, mas pode ser repetido conforme necessário.
        </p>

        <h4 class="font-bold text-2xl mt-6">Injetáveis:</h4>
        <p>
          Essa abordagem envolve a injeção de substâncias bioestimuladoras, como ácido polilático ou hidroxiapatita de cálcio, diretamente na pele. Essas substâncias atuam como "mensagens" para o corpo, incentivando a produção de colágeno, o que resulta em um rejuvenescimento gradual e duradouro.
        </p>

        <h4 class="font-bold text-2xl mt-6">Fios Lisos:</h4>
        <p>
          Nesse método, fios absorvíveis são implantados na pele para criar um efeito de sustentação. Isso não apenas estimula a produção de colágeno, mas também proporciona um efeito imediato de lifting facial.
        </p>

        <h4 class="font-bold text-2xl mt-6">Microagulhamento:</h4>
        <p>
          O microagulhamento utiliza um dispositivo com agulhas minúsculas para criar microperfurações na pele. Essas microlesões estimulam o colágeno e facilitam a absorção de substâncias bioestimuladoras aplicadas na superfície da pele.
        </p>

        <h4 class="font-bold text-2xl mt-6">Peelings:</h4>
        <p>
          Peelings químicos ou a laser podem ser usados para renovar a camada superior da pele, estimulando a produção de colágeno e melhorando a textura e a aparência geral da pele.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          Essas técnicas são procuradas por pessoas que desejam tratar rugas, linhas de expressão, flacidez da pele e melhorar a qualidade da pele de forma geral. Elas proporcionam resultados naturais e duradouros.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após esses procedimentos, é comum experimentar inchaço, vermelhidão e sensibilidade temporários na área tratada. Proteger a pele do sol com protetor solar é essencial para evitar danos. A manutenção de uma rotina adequada de cuidados com a pele e o acompanhamento com o profissional de saúde são fundamentais para otimizar os resultados e manter a pele saudável e rejuvenescida.
        </p>
      </div>


      <nuxt-img
        src="https://www.draraya.com/wp-content/uploads/2019/07/peeling-quimico.jpg"
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

function viewImage(url: string){
  imgURL.value = url
  modalShow.value = true
}


function closeModal(){
  modalShow.value = false
  imgURL.value = ''
}

</script>

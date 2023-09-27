<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Preenchimento Labial</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          É um procedimento estético não cirúrgico que visa aumentar o volume e melhorar o contorno dos lábios através da injeção de substâncias de preenchimento.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          O procedimento envolve a injeção de uma substância preenchedora, geralmente ácido hialurônico, diretamente nos lábios. Isso proporciona um aumento imediato no volume, além de definir e realçar o contorno labial. A substância é absorvida pelo corpo ao longo do tempo, tornando o procedimento temporário, mas pode ser repetido conforme necessário.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          Muitas pessoas buscam o preenchimento labial para corrigir assimetrias, aumentar lábios naturalmente finos ou restaurar o volume perdido com o envelhecimento. Além disso, o procedimento pode suavizar linhas finas ao redor da boca, proporcionando uma aparência mais jovem e rejuvenescida.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após o preenchimento, é comum que os lábios fiquem inchados e sensíveis por alguns dias. Recomenda-se evitar a exposição ao sol, exercícios intensos e massagens na área tratada por pelo menos 24 horas. Também é importante seguir as orientações do profissional que realizou o procedimento para garantir os melhores resultados e minimizar possíveis complicações.
        </p>
      </div>


      <nuxt-img
        src="https://mariofarinazzo.com.br/wp-content/uploads/2017/10/vantagens-do-preenchimento-labial-3.jpg"
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
          src="/services/labial1.jpg"
          @click="viewImage('/services/labial1.jpg')"
        />

        <nuxt-img
            class="w-full cursor-pointer transform hover:scale-105"
            src="/services/labial2.jpg"
            @click="viewImage('/services/labial2.jpg')"
        />

        <nuxt-img
            class="w-full cursor-pointer transform hover:scale-105"
            src="/services/labial3.jpg"
            @click="viewImage('/services/labial3.jpg')"
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

<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Preenchimento de Mento(Queixo)</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          Um procedimento estético não cirúrgico para melhorar o contorno e a projeção do queixo por meio da injeção de substâncias preenchedoras, como o ácido hialurônico.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          Consiste na injeção da substância preenchedora na região do queixo, proporcionando um perfil mais definido e corrigindo possíveis irregularidades. O procedimento é temporário, mas pode ser repetido, se necessário.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          É buscado para equilibrar as proporções faciais, corrigir defeitos no queixo e aumentar a autoestima. Também pode suavizar linhas finas no pescoço e ao redor da boca, conferindo uma aparência rejuvenescida.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após o preenchimento, é comum que haja inchaço e sensibilidade na área tratada temporariamente. Recomenda-se evitar exposição solar direta, exercícios vigorosos e massagens na região nas primeiras 24 horas. É fundamental seguir as orientações do profissional para obter resultados ideais e evitar complicações.
        </p>
      </div>


      <nuxt-img
        src="https://botoesthetic.com.br/wp-content/uploads/2021/06/S_0013_PREENCHIMENTO-DE-MENTO.png"
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
          src="/services/mento1.jpg"
          @click="viewImage('/services/mento1.jpg')"
        />

        <nuxt-img
            class="w-full cursor-pointer transform hover:scale-105"
            src="/services/mento2.jpg"
            @click="viewImage('/services/mento2.jpg')"
        />

        <nuxt-img
            class="w-full cursor-pointer transform hover:scale-105"
            src="/services/mento3.jpg"
            @click="viewImage('/services/mento3.jpg')"
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

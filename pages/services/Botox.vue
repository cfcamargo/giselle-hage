<template>
  <AppLayout>
    <div class="w-full xs:h-[300px] md:h-[calc(100dvh_-_80px)] xs:bg-[url('/BotoxBanner.png')] md:bg-[url('/botox-bg.png')] bg-cover">
      <div class="w-full h-full bg-white/30">
        <Container class="h-full flex flex-col items-start justify-center">
          <h2 class="text-6xl font-bold text-primary">BOTOX</h2>
          <span class="text-gray-900 text-xl">Toxina Butolínica</span>
        </Container>
      </div>
    </div>
    <div class="xs:py-8 md:py-20">
      <Container>
        <div class="flex flex-col gap-2 items-center justify-center">
          <h4 class="xs:text-center md:text-start text-2xl font-bold">O que é e como funciona o <span>botox?</span></h4>
          <p class="mt-2 text-justify">Botox é o nome comercial - mas já se tornou praticamente sinônimo - da toxina botulínica. Essa substância ficou mundialmente conhecida por seu efeito na prevenção e tratamento de rugas de expressão. Não é a toa que a aplicação de botox é o procedimento estético mais realizado no mundo para todas as faixas etárias.</p>
          <p class="mt-2 text-justify">A aplicação faz com que os músculos das mímicas faciais relaxem e não se contraiam. Com a interrupção dos movimentos, a pele para de criar vincos e as rugas dinâmicas desaparecem.</p>
          <p class="mt-2 text-justify">O Botox rejuvenesce e revitaliza sua aparência em poucos dias, prevenindo ou suavizando rugas. Descubra a beleza de um sorriso confiante e uma expressão renovada.</p>
        </div>


        <div class="mt-20">
          <h4 class="font-bold text-center text-2xl">Resultados na aplicação do <span class="text-primary">BOTOX</span></h4>

          <div class="grid xs:grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <img src="/services/botox1.jpg" alt="" class="cursor-pointer transform hover:scale-105 hover:shadow" @click="viewImage('/services/botox1.jpg')">
            <img src="/services/botox2.jpg" alt="" class="cursor-pointer transform hover:scale-105 hover:shadow" @click="viewImage('/services/botox2.jpg')">
            <img src="/services/botox3.jpg" alt="" class="cursor-pointer transform hover:scale-105 hover:shadow" @click="viewImage('/services/botox3.jpg')">
          </div>
        </div>


        <div class="flex flex-col xs:py-2 md:py-20">
          <h4 class="text-2xl font-bold text-center">Aplicações do <span class="text-primary">botox?</span></h4>

          <div class="xs:py-2 md:py-20">
            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <img src="/services/atm.png">
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-primary text-2xl">ATM</h4>
                <p class="text-justify">O Botox para disfunções temporo-mandibulares não é o tratamento definitivo, contudo oferece uma solução eficaz para aliviar dores e desconfortos relacionados. Através de injeções precisas, o tratamento relaxa os músculos ao redor da ATM, reduzindo a tensão e melhorando significativamente a qualidade de vida. Indicado como tratamento auxiliar para quem sofre com bruxismo. Proporciona alívio, permitindo uma rotina mais confortável e sem dor.</p>
              </div>
            </div>

            <Divisor />

            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <img src="/services/rinotox.png">
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-primary text-2xl">RINOTOX</h4>
                <p class="text-justify">O Rinotox é uma técnica inovadora que utiliza o Botox para refinar e harmonizar os traços do nariz sem a necessidade de cirurgia. Este procedimento minimamente invasivo suaviza as linhas e ajusta a ponta do nariz, proporcionando uma aparência mais equilibrada e esteticamente agradável. Ideal para quem busca uma solução rápida e sem tempo de recuperação, o Rinotox é perfeito para realçar a beleza do seu rosto com resultados naturais e sutis.</p>
              </div>
            </div>

            <Divisor />

            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <img src="/services/sorriso-triste.png">
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-primary text-2xl uppercase">SORRISO TRISTE</h4>
                <p class="text-justify">O tratamento para o sorriso triste transforma expressões de tristeza involuntária em um sorriso mais harmonioso e alegre. Utilizando técnicas precisas, este procedimento corrige a inclinação dos cantos da boca, proporcionando um aspecto mais positivo e rejuvenescido. Ideal para quem deseja melhorar a expressão facial e aumentar a autoestima, este tratamento oferece uma mudança sutil, mas impactante, permitindo que sua verdadeira felicidade brilhe através de um sorriso naturalmente mais acolhedor.</p>
              </div>
            </div>

            <Divisor />

            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <img src="/services/sorriso.png">
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-primary text-2xl uppercase">SORRISO GENGIVAL</h4>
                <p class="text-justify">O tratamento para o sorriso gengival oferece uma solução estética para aqueles que se sentem desconfortáveis com a exposição excessiva da gengiva ao sorrir. Através de procedimentos minimamente invasivos, como a aplicação de Botox, é possível ajustar a altura do sorriso, reduzindo a visibilidade da gengiva e criando uma aparência mais equilibrada e harmoniosa. Este tratamento é ideal para quem busca um sorriso mais confiante e atraente, com resultados naturais que realçam sua beleza sem a necessidade de intervenções cirúrgicas complexas.</p>
              </div>
            </div>

            <Divisor />

            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <img src="/services/olhar.png">
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-primary text-2xl uppercase">EMBELEZAMENTO DO OLHAR</h4>
                <p class="text-justify">O embelezamento do olhar revitaliza e destaca a área dos olhos, transformando olhares cansados em expressões vivas e radiantes. Este tratamento abrange técnicas como lifting de sobrancelhas, redução de olheiras e suavização de linhas finas, utilizando procedimentos minimamente invasivos para rejuvenescer e iluminar seu olhar. Perfeito para quem deseja refletir sua vitalidade interior, o embelezamento do olhar oferece resultados imediatos, melhorando a aparência de forma natural e sutil, sem longos períodos de recuperação. Desperte sua beleza com um olhar mais jovem e expressivo.</p>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>

    <ServiceImageModal :imgURL="imgURL" :show="modalShow" @toogleShow="closeModal" />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue"
import { ref } from 'vue'

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

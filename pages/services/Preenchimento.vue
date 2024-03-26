<template>
  <AppLayout>
    <div class="w-full xs:h-[300px] md:h-[calc(100dvh_-_80px)] xs:bg-[url('/BannerPreenchimento.png')] md:bg-[url('/preenchimento.png')] bg-cover">
      <div class="w-full h-full bg-white/30">
        <Container class="h-full flex flex-col xs:items-center md:items-start md:justify-center xs:justify-end">
          <h2 class="xs:text-4xl md:text-6xl font-bold text-primary">PREENCHIMENTO</h2>
          <span class="text-gray-900 text-xl">Ácido hialurônico</span>
        </Container>
      </div>
    </div>
    <div class="xs:py-2 md:py-20">
      <Container>
        <div class="flex flex-col gap-2 items-center justify-center">
          <h4 class="text-2xl font-bold">O que é e como funciona o <span>preenchimento?</span></h4>
          <p class="text-justify mt-2">O preenchimento é um tratamento estético minimamente invasivo que utiliza substâncias, como ácido hialurônico, para restaurar o volume, suavizar linhas e rugas e melhorar contornos faciais. Ideal para quem busca uma aparência rejuvenescida sem cirurgias, ele oferece resultados imediatos em áreas como lábios, maçãs do rosto, olheiras e sulcos nasolabiais. Além de promover a hidratação da pele, o preenchimento também pode ser usado para definir o contorno da mandíbula e do queixo, garantindo um visual harmonioso e natural. Com duração variável, dependendo da área tratada e do metabolismo individual, é uma solução eficaz para realçar a beleza natural e aumentar a autoestima.</p>
        </div>


        <div class="xs:py-2 md:mt-20">
          <h4 class="font-bold text-center text-2xl">Resultados do <span class="text-primary">Preenchimento</span></h4>

          <div class="grid xs:grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <img src="/services/labial1.jpg" alt="" class="cursor-pointer transform hover:scale-105 hover:shadow" @click="viewImage('/services/botox1.jpg')">
            <img src="/services/mento1.jpg" alt="" class="cursor-pointer transform hover:scale-105 hover:shadow" @click="viewImage('/services/botox2.jpg')">
            <img src="/services/labial2.jpg" alt="" class="cursor-pointer transform hover:scale-105 hover:shadow" @click="viewImage('/services/botox3.jpg')">
          </div>
        </div>


        <div class="flex flex-col xs:py-2 md:py-20">
          <h4 class="text-2xl font-bold text-center">Tipoes de <span class="text-primary">Preenchimento</span></h4>

          <div class="xs:py-2 md:py-20">
            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <img src="/services/labial.png">
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-primary text-2xl">LABIAL</h4>
                <p class="text-justify">O preenchimento labial é o segredo para lábios mais volumosos, definidos e sensuais. Utilizando substâncias como o ácido hialurônico, este procedimento não só aumenta o volume dos lábios, mas também melhora seu contorno e simetria, proporcionando um acabamento natural e atraente. Ideal para quem deseja destacar os lábios de forma sutil ou mais marcante, o preenchimento labial é rápido, seguro e com resultados imediatos que realçam a beleza do seu sorriso. Descubra a confiança de lábios perfeitamente contornados e hidratados.</p>
              </div>
            </div>

            <Divisor />

            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <img src="/services/mento.png">
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-primary text-2xl">MENTO</h4>
                <p class="text-justify">O preenchimento de mento (queixo) é uma técnica refinada para melhorar o contorno e a projeção do queixo, equilibrando as proporções faciais e realçando a estética do perfil. Utilizando substâncias como o ácido hialurônico, este procedimento não apenas aprimora a forma e o volume do queixo, mas também pode corrigir assimetrias leves, oferecendo uma solução imediata para um rosto mais harmonioso e definido. Ideal para quem deseja um resultado natural sem a necessidade de cirurgia, o preenchimento de mento contribui significativamente para a confiança e a satisfação com a própria imagem.</p>
              </div>
            </div>

            <Divisor />

            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <img src="/services/olheira.png">
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-primary text-2xl">OLHEIRAS</h4>
                <p class="text-justify">O preenchimento para olheiras é um tratamento eficaz que revitaliza a área abaixo dos olhos, reduzindo a aparência de cansaço e sombras escuras. Utilizando substâncias como o ácido hialurônico, ele restaura o volume perdido, suaviza o sulco lacrimal e melhora a qualidade da pele, iluminando e rejuvenescendo o olhar. Este procedimento minimamente invasivo é ideal para quem busca uma solução rápida e natural para olheiras profundas, oferecendo resultados imediatos que refletem uma aparência mais descansada e vibrante.</p>
              </div>
            </div>

            <Divisor />

            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <img src="/services/tempora.png">
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-primary text-2xl uppercase">TEMPORA</h4>
                <p class="text-justify">O preenchimento temporal é destinado à região das têmporas, uma área frequentemente afetada pela perda de volume com o envelhecimento. Este tratamento utiliza substâncias como o ácido hialurônico para preencher e suavizar a concavidade nas têmporas, restaurando um contorno facial mais jovem e equilibrado. Além de melhorar a harmonia do rosto, o preenchimento temporal pode também levantar sutilmente a área dos olhos e das sobrancelhas, proporcionando um efeito rejuvenescedor completo. Ideal para quem deseja uma aparência mais plena e revitalizada, este procedimento oferece resultados naturais e duradouros, sem necessidade de cirurgia.</p>
              </div>
            </div>

            <Divisor />

            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <img src="/services/malar.png">
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-primary text-2xl uppercase">MALAR</h4>
                <p class="text-justify">O preenchimento malar foca nas maçãs do rosto, proporcionando volume e definição para uma aparência mais jovem e contornada. Este procedimento utiliza substâncias como o ácido hialurônico para realçar a estrutura óssea, melhorando a proporção facial e restaurando a plenitude perdida com a idade. Além de oferecer um lifting natural, o preenchimento malar destaca a beleza das feições, promovendo um equilíbrio harmonioso entre os traços faciais. Ideal para quem busca um efeito rejuvenescedor sem intervenções cirúrgicas, este tratamento traz resultados imediatos e duradouros, melhorando significativamente a autoestima e a satisfação com a própria imagem.</p>
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

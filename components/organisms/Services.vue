<template>
    <section class="mt-32">
        <Container class="flex flex-col gap-4 justify-center items-center">
            <h1 class="text-5xl">Harmonização Orofacial</h1>
            <div class="w-full flex py-10 gap-6">
                <div class="flex flex-1 flex-col justify-between">
                  <ServiceCard :service="services[0]" class="xs:mr-0 md:ml-[20%]"/>
                  <ServiceCard :service="services[1]"/>
                  <ServiceCard :service="services[2]" class="xs:mr-0 md:ml-[20%]"/>
                </div>
                <div class="flex items-center justify-center px-10 w-6/12">
                  <nuxt-img
                    src="/harmonizationCover.png"
                    fit="cover"
                  />
                </div>
                <div class="flex flex-1 flex-col justify-between items-end gap-20">
                  <ServiceCard :service="services[3]" class="xs:mr-0 md:mr-[20%] "/>
                  <ServiceCard :service="services[4]"/>
                  <ServiceCard :service="services[5]" class="xs:mr-0 md:mr-[20%]"/>

                </div>
            </div>
        </Container>
    </section>
</template>

<script setup lang="ts">

const services = [
  {
    title : 'Harmonização Facial',
    description : 'Procedimentos não cirúrgicos que realçam e equilibram traços faciais através de preenchimentos e toxina botulínica. Resultados naturais e rejuvenescidos.'
  },
  {
    title: 'Preenchimento',
    description: 'Técnica  que utiliza materiais como ácido hialurônico para suavizar rugas, linhas de expressão e realçar contornos da região da boca e áreas adjacentes. Proporciona lábios mais volumosos, contorno facial harmonioso e aparência rejuvenescida.'
  },
  {
    title: 'Linhas de expressão',
    description: 'Procedimento que utiliza toxina botulínica para relaxar os músculos faciais e reduzir as rugas dinâmicas, como pés de galinha e linhas na testa. Resultados naturais e mais joviais, contribuindo para uma aparência mais leve e fresca.'
  },
  {
    title: 'Olheiras',
    description: 'A solução para reduzir as olheiras indesejadas e o aspecto de cansaço ao redor dos olhos. Com o uso de preenchedores dérmicos ou tratamentos a laser, as olheiras podem ser amenizadas, proporcionando uma aparência mais descansada e iluminada'
  },
  {
    title: 'Peeling Químico',
    description: 'Um procedimento que utiliza uma solução química aplicada à pele para remover camadas superficiais danificadas, promovendo a renovação celular e o estímulo da produção de colágeno.'
  },
  {
    title: 'Bioestimulador de colageno',
    description: 'O bioestimulador de colágeno é um procedimento estético que estimula a produção natural de colágeno na pele. Geralmente, envolve a aplicação de substâncias como o ácido polilático por meio de injeções, que atuam como "sinalizadores" para o organismo produzir mais colágeno. Isso resulta na melhoria da firmeza, elasticidade e textura da pele, reduzindo rugas e linhas de expressão de forma duradoura, sem a necessidade de cirurgia invasiva.'
  },
]

</script>
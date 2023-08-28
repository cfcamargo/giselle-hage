<template>
    <section class="mt-[106px] h-[100vh]">
        <Container class="flex flex-col justify-center  items-center h-auto">
            <h1 class="text-[40px] w-[471px]">Harmonização Orofacial</h1>
            <div class="mt-[166px] flex flex-row w-full   h-[1000px]">
                <div class="flex-1 h-[100%] flex flex-col gap-[150px]">
                    <Mini-Card class="w-[307px] h-[100px] mr-[-10px]" :title="titles[0]" :description="descriptions[0]" />

                    <Mini-Card class="w-[307px] h-[100px] ml-[-43px] " :title="titles[1]" :description="descriptions[1]" />

                    <Mini-Card class="w-[307px] h-[100px]    " :title="titles[2]" :description="descriptions[2]" />
                </div>
                <div class=" flex  items-center mb-[50%]  ">
                    <Img-Harmonizacao />
                </div>
                <div class="flex-1 h-[100%] flex flex-col gap-[150px]">
                    <Mini-Card class="w-[307px] h-[100px] " :title="titles[3]" :description="descriptions[3]" />
                    <Mini-Card class="w-[307px] h-[100px] ml-[43px] " :title="titles[4]" :description="descriptions[4]" />
                    <Mini-Card class="w-[307px] h-[100px] " :title="titles[5]" :description="descriptions[5]" />
                </div>
            </div>
        </Container>
    </section>
</template>

<script setup lang="ts">


let titles = ['Harmonização Facial', 'Preenchimento', 'Linhas de expressão', 'Olheiras', 'Peeling Químico', 'Bigode Chines']
let descriptions = ['Procedimentos não cirúrgicos que realçam e equilibram traços faciais através de preenchimentos e toxina botulínica. Resultados naturais e rejuvenescidos.', 'Técnica  que utiliza materiais como ácido hialurônico para suavizar rugas, linhas de expressão e realçar contornos da região da boca e áreas adjacentes. Proporciona lábios mais volumosos, contorno facial harmonioso e aparência rejuvenescida.', 'Procedimento que utiliza toxina botulínica para relaxar os músculos faciais e reduzir as rugas dinâmicas, como pés de galinha e linhas na testa. Resultados naturais e mais joviais, contribuindo para uma aparência mais leve e fresca.', 'A solução para reduzir as olheiras indesejadas e o aspecto de cansaço ao redor dos olhos. Com o uso de preenchedores dérmicos ou tratamentos a laser, as olheiras podem ser amenizadas, proporcionando uma aparência mais descansada e iluminada', 'Um procedimento que utiliza uma solução química aplicada à pele para remover camadas superficiais danificadas, promovendo a renovação celular e o estímulo da produção de colágeno.', 'O procedimento para suavização do "bigode chinês" pode ser realizado com preenchimento de ácido hialurônico, que ajuda a preencher essas linhas e restaurar o volume perdido.']
</script>
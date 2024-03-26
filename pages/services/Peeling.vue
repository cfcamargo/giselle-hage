<template>
  <AppLayout>
    <div class="w-full xs:h-[300px] md:h-[calc(100dvh_-_80px)] xs:bg-[url('/PeelingBanner.png')] md:bg-[url('/peeling-bg.png')] bg-cover">
      <div class="w-full h-full bg-white/30">
        <Container class="h-full flex flex-col items-start justify-center">
          <h2 class="xs:text-5xl md:text-6xl font-bold text-primary">PEELING</h2>
        </Container>
      </div>
    </div>
    <Container class="xs:py-2 md:py-20">
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p class="xs:text-justify md:text-start">
          O peeling na harmonização orofacial é um tratamento estético inovador, destinado a melhorar a qualidade da pele facial. Este procedimento utiliza técnicas específicas para remover as camadas exteriores danificadas da pele, promovendo a renovação celular e melhorando sua textura e aparência. Através do peeling, é possível tratar uma variedade de questões estéticas, desde linhas finas e rugas até manchas e irregularidades na textura da pele, contribuindo significativamente para a harmonia e beleza facial.
        </p>


        <h4 class="font-bold text-2xl mt-6">Benefícios</h4>
        <p>
          O peeling na harmonização orofacial oferece múltiplos benefícios, ajudando a:
        </p>
        <ul class="mt-2">
          <li> - Reduzir a aparência de linhas finas e rugas, especialmente em torno dos olhos e boca.</li>
          <li> - Diminuir manchas causadas pelo sol, envelhecimento e hiperpigmentação.</li>
          <li> - Melhorar a textura e a qualidade da pele, tornando-a mais suave e uniforme.</li>
          <li> - Minimizar a visibilidade dos poros.</li>
          <li> - Estimular a produção de colágeno, essencial para a firmeza e elasticidade da pele.</li>
          <li> - Promover um aspecto rejuvenescido e revitalizado, contribuindo para uma aparência mais jovem e harmoniosa.</li>
        </ul>

        <h4 class="font-bold text-2xl mt-6">Procedimento</h4>
        <p class="xs:text-justify md:text-start">
          O procedimento de peeling na harmonização orofacial começa com a limpeza profunda da pele para remover impurezas e prepará-la para o tratamento. Em seguida, uma solução específica é aplicada na área a ser tratada, a qual irá agir nas camadas superiores da pele para promover a esfoliação e a renovação celular. O tipo de peeling utilizado (superficial, médio ou profundo) será determinado de acordo com as necessidades específicas de cada paciente e os resultados desejados. Após o procedimento, cuidados pós-tratamento específicos serão recomendados para garantir uma recuperação suave e maximizar os resultados.
        </p>

        <p class="xs:text-justify md:text-start">Este procedimento é ideal para indivíduos que desejam melhorar a aparência da pele de forma significativa, sem a necessidade de intervenções cirúrgicas. É importante realizar uma consulta com um especialista em harmonização orofacial para avaliar a condição da pele e determinar o tratamento mais adequado às necessidades individuais.</p>

      </div>

      <nuxt-img
        src="/services/peeling.png"
        class="h-full object-cover"
      />
    </div>
  </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue"

</script>

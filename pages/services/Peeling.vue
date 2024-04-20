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
        <p class="text-justify">
          Os peelings removem as camadas danificadas da pele, promovendo a renovação celular e melhorando sua textura e aparência. Através do peeling, é possível tratar uma variedade de questões estéticas, desde linhas finas e rugas até manchas e irregularidades na textura da pele, contribuindo significativamente para a harmonia e beleza facial.
        </p>


        <h4 class="font-bold text-2xl mt-6">Benefícios</h4>
        <p>
          O peeling na harmonização orofacial oferece múltiplos benefícios, ajudando a:
        </p>
        <ul class="mt-2">
          <li> - Reduzir a aparência de linhas finas e rugas, especialmente em torno dos olhos e boca.</li>
          <li> - Tratamento para acne</li>
          <li> - Diminuir manchas causadas pelo sol, envelhecimento e hiperpigmentação.</li>
          <li> - Melhorar a textura e a qualidade da pele, tornando-a mais suave e uniforme.</li>
          <li> - Minimizar a visibilidade dos poros.</li>
          <li> - Estimular a produção de colágeno, essencial para a firmeza e elasticidade da pele.</li>
          <li> - Promover um aspecto rejuvenescido e revitalizado, contribuindo para uma aparência mais jovem e harmoniosa.</li>
        </ul>

      </div>

      <nuxt-img
        src="/services/peeling.png"
        class="h-full object-cover xs:max-h-[400px] md:max-h-[600px] mx-auto w-full"
      />
    </div>
  </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue"

</script>

<template>
  <AppLayout>
    <div class="w-full xs:h-[300px] md:h-[calc(100dvh_-_80px)] xs:bg-[url('/MicroagulhamentoBanner.png')] md:bg-[url('/microagulhamento-bg.png')] bg-cover">
      <div class="w-full h-full bg-white/30">
        <Container class="h-full flex flex-col xs:items-center md:items-start xs:justify-end md:justify-center">
          <h2 class="xs:text-3xl md:text-6xl font-bold text-primary">MICROAGULHAMENTO</h2>
          <span class="text-gray-900 text-xl">Indução Percutânea de Colágeno</span>
        </Container>
      </div>
    </div>
    <Container class="xs:py-4 md:py-20">
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          A indução percutânea de colágeno, mais conhecida como microagulhamento, é um procedimento estético que visa rejuvenescer e revitalizar a pele. Esta técnica cria microperfurações na superfície da pele sem provocar sangramento. Estas pequenas lesões estimulam a produção natural de colágeno e elastina, componentes chave para a manutenção da firmeza, elasticidade e saúde da pele. O procedimento é minimamente invasivo e melhora a textura, a tonalidade e a aparência geral da pele.
        </p>


        <h4 class="font-bold text-2xl mt-6">Benefícios</h4>
        <p>
          O microagulhamento é eficaz em tratar e melhorar diversas condições da pele, incluindo:
        </p>
        <ul class="mt-2">
          <li> - Redução de linhas finas e rugas, promovendo uma pele mais jovem e firme.</li>
          <li> - Melhora na textura da pele, tornando-a mais lisa e uniforme.</li>
          <li> - Diminuição na aparência de poros dilatados.</li>
          <li> - Estimulação do crescimento de novo colágeno e elastina, essenciais para a elasticidade e firmeza da pele.</li>
        </ul>
      </div>

      <nuxt-img
        src="/services/microagulhamento.png"
        class="h-full object-cover xs:max-h-[400px] md:max-h-[600px] mx-auto"
      />
    </div>
  </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue"

</script>

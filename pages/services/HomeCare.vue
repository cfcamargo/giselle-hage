<template>
  <AppLayout>
    <div class="w-full xs:h-[300px] md:h-[calc(100dvh_-_80px)] xs:bg-[url('/HomeCareBanner.png')] md:bg-[url('/HomeCareDesktop.png')] bg-cover">
        <div class="w-full h-full bg-white/30">
            <Container class="h-full flex flex-col items-start justify-center">
            <h2 class="xs:text-3xl md:text-6xl font-bold text-primary">HOME CARE</h2>
            </Container>
        </div>
    </div>
    <Container class="xs:py-4 md:py-20">
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p class="text-justify">
          O Home Care Personalizado para Harmonização Orofacial é um serviço sob medida que visa fornecer cuidados e acompanhamento específicos após procedimentos de harmonização orofacial no conforto da residência do paciente.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p class="text-justify">
          Após tratamentos como preenchimento labial, preenchimento de mento, toxina botulínica e outros procedimentos de harmonização orofacial, um profissional de saúde, geralmente um dentista ou médico estético, pode oferecer serviços de acompanhamento personalizado no ambiente doméstico do paciente. Isso pode incluir monitoramento pós-procedimento, cuidados com a higiene oral, recomendações dietéticas e esclarecimento de dúvidas.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p class="text-justify">
          O Home Care Personalizado para Harmonização Orofacial é procurado por pessoas que desejam garantir uma recuperação tranquila, resultados ideais e uma experiência de cuidado contínuo após procedimentos de estética facial. Oferece conveniência e atenção individualizada.
        </p>

        <h4 class="font-bold text-2xl mt-6">Serviços comuns:</h4>
        <p class="text-justify">
          Os serviços podem abranger orientações sobre a aplicação de compressas de gelo, uso de medicamentos prescritos, acompanhamento do inchaço e da cicatrização, além de cuidados específicos para manter e otimizar os resultados da harmonização orofacial.
        </p>

      </div>

      <nuxt-img
        src="https://baio.one/wp-content/uploads/2021/09/capa_hof_post.jpg"
        class="h-full object-cover xs:max-h-[400px] md:max-h-[1200px] mx-auto w-full"
      />
    </div>
  </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue"

</script>

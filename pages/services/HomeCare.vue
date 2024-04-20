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
          O Home Care nada mais é do que o cuidado da pele feito em casa. Aqui fazemos uma fórmula personalizada justamente para isso, para que o paciente siga o tratamento mesmo fora do consultório. A fórmula é prescrita de acordo com a necessidade de cada paciente, é diferente de comprar um produto na farmácia que contém álcool, conservantes e ativos que podem causar alergia. Existem produtos prontos bons, contudo somente a SUA fórmula é feita pensando exclusivamente em você
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p class="text-justify">
          Após tratamentos como preenchimento labial, preenchimento de mento, toxina botulínica e outros procedimentos de harmonização orofacial, um profissional de saúde, geralmente um dentista ou médico estético, pode oferecer serviços de acompanhamento personalizado no ambiente doméstico do paciente. Isso pode incluir monitoramento pós-procedimento, cuidados com a higiene oral, recomendações dietéticas e esclarecimento de dúvidas.
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

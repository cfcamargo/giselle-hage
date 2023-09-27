<template>
  <AppLayout>
    <Container class="py-20">
    <h2 class="font-bold text-3xl text-violet-950">Rinotox: Afina e Empina o Nariz</h2>
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          O Rinotox é um procedimento estético não cirúrgico que visa afinar e elevar a ponta do nariz, proporcionando uma aparência mais harmoniosa e equilibrada ao rosto. Ele é realizado por meio da injeção de substâncias preenchedoras, geralmente o ácido hialurônico.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p>
          O procedimento envolve a aplicação da substância preenchedora na ponta nasal, criando definição e elevação. Isso ajuda a remodelar o nariz, corrigir irregularidades e alcançar a estética desejada, sem a necessidade de cirurgia.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p>
          O Rinotox é procurado por aqueles que desejam melhorar a forma do nariz sem recorrer à rinoplastia cirúrgica. É uma opção para afinar e elevar a ponta nasal, corrigir imperfeições e criar uma aparência mais refinada.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
        <p>
          Após o Rinotox, é possível experimentar inchaço, vermelhidão ou sensibilidade temporários na área tratada. Recomenda-se evitar a exposição solar direta e usar protetor solar. Descanso e cuidados com a pele adequados são importantes para otimizar os resultados. É essencial seguir as orientações do profissional de saúde para garantir um tratamento eficaz e minimizar riscos.
        </p>
      </div>

      <nuxt-img
        src="https://www.fisioderme.com.br/wp-content/uploads/2023/05/nariz-1-1200x565.png"
        class="h-full object-cover"
      />
    </div>
  </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue";

</script>

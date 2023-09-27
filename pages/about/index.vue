<template>
  <AppLayout>
    <Container class="py-10 flex flex-col">
      <h3 class="text-violet-950 text-3xl font-bold">Sobre</h3>

      <div class="mt-6 grid xs:grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div class="flex flex-col gap-6">
            <p>
              Bem-vindos ao fascinante mundo da harmonização orofacial, onde a arte de realçar a beleza natural de cada expressão facial encontra seu lar. Aqui, sou a Giselle, a maestrina por trás dessa sinfonia de harmonia e estética.
            </p>

            <p>
              Minha jornada no universo da harmonização orofacial é uma história de paixão e descoberta. Imagine um quadro em branco, o rosto de cada indivíduo, pronto para ser transformado em uma obra-prima de beleza e harmonia. Cada paciente traz consigo sonhos e desejos únicos, e é minha missão ouvir atentamente esses anseios, para que juntos possamos criar uma verdadeira obra de arte personalizada.
            </p>

            <p>
              Cada procedimento é como um capítulo mágico nessa jornada. Com técnicas avançadas, dedicação incansável e uma pitada de magia, buscamos não apenas melhorar a estética facial, mas também despertar a autoconfiança de cada paciente. O resultado? Expressões radiantes e sorrisos que encantam.
            </p>

            <p>
              Convido você a desvendar os segredos da harmonização orofacial comigo. Nossa jornada nos levará a explorar as nuances do seu rosto, destacando o que há de mais belo e equilibrado. Aqui, não se trata apenas de mudar aparências, mas de revelar a sua melhor versão, respeitando sua individualidade.
            </p>

            <p>
              Seja bem-vindo(a) à minha galeria de arte facial, onde transformamos sonhos em realidade, e onde cada expressão é uma sinfonia única. Estou ansiosa para ser parte da sua jornada na busca pela harmonia e pela expressão cativante.
            </p>
          </div>
            <nuxt-img
                src="/about1.jpg"
                class="h-full object-cover"
            />
      </div>
    </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue";
</script>

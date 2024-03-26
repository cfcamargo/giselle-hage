<template>
  <AppLayout>
    <div class="w-full xs:h-[300px] md:h-[calc(100dvh_-_80px)] xs:bg-[url('/BannerEmagrecimento.png')] md:bg-[url('/emagrecimento-bg.png')] bg-cover">
        <div class="w-full h-full bg-white/30">
            <Container class="h-full flex flex-col items-start xs:justify-end md:justify-center">
              <h2 class="xs:text-3xl md:text-6xl font-bold text-primary xs:text-center md:text-start">EMAGRECIMENTO FACIAL</h2>
            </Container>
        </div>
    </div>
    <Container class="xs:py-4 md:py-20">
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p class="xs:text-justify md:text-start">
          O emagrecimento facial refere-se à redução de gordura indesejada no rosto, resultando em um contorno facial mais esculpido e definido.
        </p>


        <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
        <p class="xs:text-justify md:text-start">
          Para atingir o emagrecimento facial, é necessário adotar uma abordagem multifacetada que inclui uma dieta equilibrada, exercícios específicos para o rosto, tratamentos estéticos e procedimentos cirúrgicos, dependendo das necessidades individuais.
        </p>

        <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
        <p class="xs:text-justify md:text-start">
          O emagrecimento facial é buscado por pessoas que desejam reduzir a gordura localizada no rosto, melhorar o contorno facial e alcançar uma aparência mais magra e definida.
        </p>

        <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:</h4>
        <p class="xs:text-justify md:text-start">
          Os cuidados pós-emagrecimento facial variam dependendo das abordagens utilizadas. Após procedimentos cirúrgicos, é essencial seguir as orientações do cirurgião, descansar adequadamente e evitar atividades vigorosas. Em qualquer método, proteger a pele do sol com protetor solar é importante para manter a saúde e a juventude da pele facial. Consultar um profissional de saúde ou um cirurgião plástico é fundamental para determinar a melhor abordagem de emagrecimento facial com base nas necessidades individuais e nos objetivos estéticos.
        </p>
      </div>

      <nuxt-img
        src="https://lirp.cdn-website.com/f3009e24/dms3rep/multi/opt/Emagrecimento+Facial+em+Fortaleza+Afinamento+do+rosto-+emagrecimento+do+rosto+redondo+rosto+afinamento+da+face-640w.jpeg"
        class="h-full object-cover"
      />
    </div>
  </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue"

</script>

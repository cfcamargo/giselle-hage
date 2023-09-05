<template>
<section class="py-20">
    <Container class="flex flex-col  items-center">
        <h1 class="text-[40px] flex col justify-center items-center">Perguntas Frequentes</h1>
        <div class="flex w-full flex-col gap-2">
          <div v-for="ask in asks" :key="ask">
            <AskCard :question="ask" />
          </div>
        </div>
    </Container>
</section>
</template>

<script setup lang="ts">

const asks = [
  {
    "ask" : "Alguma coisa",
    "awsner" : 'lorem dasjhhask dasfhldsfl afhahfagsfgadsfglfhjdsfg '
  },
  {
    "ask" : "Alguma coisa",
    "awsner" : 'lorem dasjhhask dasfhldsfl afhahfagsfgadsfglfhjdsfg '
  },
  {
    "ask" : "Alguma coisa",
    "awsner" : 'lorem dasjhhask dasfhldsfl afhahfagsfgadsfglfhjdsfg '
  },
  {
    "ask" : "Alguma coisa",
    "awsner" : 'lorem dasjhhask dasfhldsfl afhahfagsfgadsfglfhjdsfg '
  },
  {
    "ask" : "Alguma coisa",
    "awsner" : 'lorem dasjhhask dasfhldsfl afhahfagsfgadsfglfhjdsfg '
  }
]

</script>
<template>
  <section class="py-20" id="services">
    <Container>
      <div class="flex items-center justify-between">
        <h4 class="text-2xl font-bold text-secondary">Alguns dos nossos <span class="text-primary">serviços</span></h4>
        <div class="flex gap-10 items-center">
          <button @click="prevService" class="flex justify-center items-center w-12 h-12 bg-primary rounded-full disabled:opacity-60 disabled:cursor-not-allowed" :disabled="index === 0">
            <MoveLeft color="white" />
          </button>

          <button @click="nextService" class="flex justify-center items-center w-12 h-12 bg-primary rounded-full disabled:opacity-60 disabled:cursor-not-allowed" :disabled="index === servicesList.length">
            <MoveRight color="white" />
          </button>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 py-10">
        <ServiceCard v-for="(service, index) in servicesList" :key="index" :title="service.title" :link="service.link" :description="service.description" />
      </div>
    </Container>
  </section>
</template>

<script setup lang="ts">
import { MoveLeft, MoveRight } from 'lucide-vue-next'
import { ref, computed } from 'vue'

interface serviceProps {
  title: string,
  link: string,
  description: string
}

const index = ref(0)

const nextService = () => {
	if (index.value < services.length - 4) {
		index.value += 1
	}
}

const prevService = () => {
	if (index.value > 0) {
		index.value -= 1
	}
}

const services:serviceProps[] = [
	{
		title: 'Botox',
		link: '/services/botox',
		description: 'O Botox rejuvenesce e revitaliza sua aparência instantaneamente, suavizando rugas e aprimorando contornos faciais sem dor ou tempo de recuperação. Descubra a beleza de um sorriso confiante e uma expressão renovada com apenas uma sessão.'
	},
	{
		title: 'Preenchimento',
		link: '/services/preenchimento',
		description: 'O preenchimento oferece um efeito imediato de rejuvenescimento, restaurando volumes e definindo contornos faciais com precisão. Perfeito para realçar a beleza natural, reduzir marcas de expressão e obter lábios mais volumosos. Descubra a sensação de uma pele firme e radiante em minutos, sem intervenções cirúrgicas.'
	},
	{
		title: 'Peeling',
		'link' : '/peeling',
		description: 'O peeling renova sua pele, promovendo luminosidade e suavidade ao reduzir manchas, linhas finas e irregularidades. Experimente a transformação para uma pele mais jovem e radiante com este tratamento não invasivo, que revela sua beleza natural através de uma renovação celular profunda.'
	},
	{
		title: 'Tratamento de manchas',
		link: '/services/tratamento-manchas',
		description: 'O tratamento de manchas é a solução definitiva para conquistar uma pele uniforme e radiante. Utilizando técnicas avançadas, ele atenua manchas e melhora a textura da pele, revelando um tom mais homogêneo e uma aparência visivelmente rejuvenescida. Desfrute da confiança de uma pele impecável com resultados duradouros.'
	},
	{
		title: 'Microagulhamento',
		link: '/services/microagulhamento',
		description : 'O microagulhamento revitaliza sua pele, estimulando a produção natural de colágeno e elastina para reduzir cicatrizes, rugas e poros dilatados. Este tratamento inovador promove a regeneração cutânea, oferecendo uma pele mais firme, lisa e rejuvenescida. Experimente a transformação e sinta a diferença de uma pele revitalizada e cheia de vida.'
	},
	{
		title: 'Emagrecimento Facial',
		link: '/services/emagrecimento-facial',
		description: 'O emagrecimento facial redefine seu contorno, harmonizando as proporções do rosto para um perfil mais fino e elegante. Através de técnicas seguras e eficazes, este tratamento proporciona uma aparência mais jovem e dinâmica, destacando sua beleza natural sem a necessidade de procedimentos invasivos. Sinta-se mais confiante com um rosto visivelmente mais esculpido e definido.'
	},
	{
		title: 'Home Care personalizado',
		link: '/services/home-care',
		description: 'O Home Care personalizado eleva sua rotina de cuidados com a pele, trazendo tratamentos de qualidade profissional para o conforto do seu lar. Com produtos selecionados especialmente para suas necessidades, você desfrutará de uma pele mais saudável, radiante e rejuvenescida dia após dia. Descubra a praticidade e eficácia de um cuidado contínuo que se adapta ao seu ritmo de vida, garantindo resultados duradouros e satisfatórios.'
	}
]

const servicesList = computed(():serviceProps[] => {
	return services.slice(index.value, index.value + 3)
})

</script>
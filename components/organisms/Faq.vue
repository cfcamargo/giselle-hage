<template>
<section class="xs:py-2 md:py-20">
    <Container class="flex flex-col gap-10 items-center">
        <h1 class="xs:text-2xl md:text-[40px] flex col gap-2 justify-center items-center font-bold">Perguntas<span class="text-primary">Frequentes</span></h1>
        <div class="flex w-full flex-col gap-3">
          	<div v-for="(ask, index) in asks" :key="index">
        		<AskCard :question="ask" />
          	</div>
        </div>
    </Container>
</section>
</template>

<script setup lang="ts">

const asks = [
	{
		"ask" : "E se eu não gostar?",
		"awsner" : 'Existe um antídoto para o ácido hialurônico, é uma enzima chamada hialuronidase. Ela degrada totalmente o preenchimento, levando o paciente de volta a condição inicial.'
	},
	{
		"ask" : "Minha boca vai ficar muito grande?",
		"awsner" : 'Logo que fazemos um preenchimento labial, normalmente há um inchaço na região. Então, sim, seus lábios podem ficar mais volumosos assim que o procedimento termina. Por isso aguardamos uma média de 15 dias para o resultado final. Além disso, é essencial uma consulta detalhada para alinhar o desejo do paciente, suas expectativas, com o que é possível entregar como resultado.'
	},
	{
		"ask" : "O que é Botox preventivo?",
		"awsner" : 'Na verdade, ele é o mesmo procedimento realizado em pessoas que já apresentam rugas. É o mesmo produto. Ele é chamado de preventivo pois é realizado em pacientes mais jovens, justamente no intuito de prevenir que as rugas marquem a pele.'
	},
	{
		"ask" : "O que é bioestimulador?",
		"awsner" : 'Bioestimulador de colágeno é uma classe de procedimentos que tratam a pele, melhorando sua qualidade e firmeza, auxiliando no tratamento de rugas. É indicado desde cedo, a partir dos 30 anos, e não quando já se tem muitas rugas, como se pensa. Existem bioestimuladores líquidos, exemplos de nomes comerciais são o Sculptra e Rennova Diamond. Também temos os fios de PDO, que podem ser lisos, espiculados ou moldados. Cada um com sua indicação específica. Além disso, temos as tecnologias, como o Ultraformer que trata desde as camadas mais profundas, compactando a camada de gordura e chegando até a pele.'
	},
	{
		"ask" : "Quando devo iniciar um protocolo para bioestimular colágeno?",
		"awsner" : 'Por volta dos 25-30 anos, as nossas células já diminuem a produção de colágeno e, em contrapartida, as enzimas que degradam o colágeno não diminuem sua atividade. Então, a melhor forma de gerenciar o envelhecimento é prevenindo.'
	},
	{
		"ask" : "Quanto tempo vai durar?",
		"awsner" : 'Nós envelhecemos todos os dias, então TODO e qualquer tratamento precisa de manutenção para manter o resultado.'
	},
	{
		"ask" : "O Procedimento dói?",
		"awsner" : 'Tudo depende do limiar de dor de cada pessoa. No geral, alguns tratamentos são feitos com anestesia por realmente darem um conforto para o paciente. Outros são extremamente toleráveis quando feitos com anestésico tópico (pomada). Tudo isso sempre será muito discutido com o paciente para que ele tenha a melhor  experiência.'
	}
]

</script>
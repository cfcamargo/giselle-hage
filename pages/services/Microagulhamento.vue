<template>
  <AppLayout>
    <div class="w-full xs:h-[300px] md:h-[calc(100dvh_-_80px)] xs:bg-[url('/MicroagulhamentoBanner.png')] md:bg-[url('/microagulhamento-bg.png')] bg-cover">
      <div class="w-full h-full bg-white/30">
        <Container class="h-full flex flex-col xs:items-center md:items-start xs:justify-end md:justify-center">
          <h2 class="xs:text-3xl md:text-6xl font-bold text-primary">MICROAGULHAMENTO</h2>
          <span class="text-gray-900 text-xl">Percutânea de Colágeno</span>
        </Container>
      </div>
    </div>
    <Container class="xs:py-4 md:py-20">
    <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex gap-2 flex-col">
        <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
        <p>
          O microagulhamento com indução percutânea de colágeno é um procedimento estético avançado que visa rejuvenescer e revitalizar a pele. Utilizando um dispositivo especializado repleto de microagulhas finas, esta técnica cria microperfurações na superfície da pele. Estas pequenas lesões estimulam a produção natural de colágeno e elastina, componentes chave para a manutenção da firmeza, elasticidade e saúde da pele. O procedimento é minimamente invasivo e projetado para tratar uma ampla gama de questões dermatológicas, melhorando significativamente a textura, a tonalidade e a aparência geral da pele.
        </p>


        <h4 class="font-bold text-2xl mt-6">Benefícios</h4>
        <p>
          O microagulhamento é eficaz em tratar e melhorar diversas condições da pele, incluindo:
        </p>
        <ul class="mt-2">
          <li> - Redução de linhas finas e rugas, promovendo uma pele mais jovem e firme.</li>
          <li> - Melhora na textura da pele, tornando-a mais lisa e uniforme.</li>
          <li> - Redução de cicatrizes de acne e outras cicatrizes superficiais.</li>
          <li> - Diminuição na aparência de poros dilatados.</li>
          <li> - Tratamento de manchas e melasma, equalizando a tonalidade da pele.</li>
          <li> - Estimulação do crescimento de novo colágeno e elastina, essenciais para a elasticidade e firmeza da pele.</li>
        </ul>

        <h4 class="font-bold text-2xl mt-6">Procedimento</h4>
        <p>
          Inicialmente, a pele é limpa e preparada para o tratamento. Em alguns casos, pode ser aplicado um anestésico tópico para garantir o conforto durante o procedimento. Utilizando o dispositivo de microagulhamento, o profissional realiza passagens uniformes sobre a área de tratamento, criando microperfurações que iniciam o processo de cicatrização natural da pele e estimulam a produção de colágeno e elastina. O número de sessões necessárias varia conforme os objetivos de tratamento e as condições da pele do paciente.
        </p>

        <p>Após o procedimento, cuidados específicos serão recomendados para suportar a cicatrização e maximizar os resultados, incluindo a aplicação de produtos calmantes e regenerativos. O microagulhamento com indução percutânea de colágeno é seguro para todos os tipos de pele e oferece uma recuperação relativamente rápida, permitindo que os pacientes retomem suas atividades cotidianas em pouco tempo.</p>

        <p>Este procedimento é ideal para pessoas buscando uma solução eficaz para melhorar a qualidade e aparência da pele sem a necessidade de procedimentos cirúrgicos. Uma consulta prévia com um especialista em harmonização orofacial é essencial para determinar a adequação do tratamento às necessidades específicas do paciente.</p>

      </div>

      <nuxt-img
        src="/services/microagulhamento.png"
        class="h-full object-cover"
      />
    </div>
  </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue"

</script>

<template>
    <AppLayout>
        <div class="w-full h-[calc(100dvh_-_80px)] bg-[url('/manchas.jpg')] bg-cover">
            <div class="w-full h-full bg-white/30">
                <Container class="h-full flex flex-col items-start justify-center">
                <h2 class="text-6xl font-bold text-primary">TRATAMENTO DE MANCHAS</h2>
                </Container>
            </div>
        </div>
        <Container class="py-20">
            <h2 class="font-bold text-3xl text-violet-950">Tratamento para Manchas na Pele:</h2>
            <div class="grid xs:grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex gap-2 flex-col">
                <h4 class="font-bold text-2xl mt-6">O que é ?</h4>
                <p>
                O tratamento para manchas na pele envolve uma variedade de abordagens terapêuticas projetadas para reduzir ou eliminar manchas indesejadas, como melasma, sardas, manchas senis e hiperpigmentação.
                </p>


                <h4 class="font-bold text-2xl mt-6">Como funciona ?</h4>
                <p>
                Existem diversos métodos para tratar manchas na pele, incluindo cremes despigmentantes, procedimentos a laser, peelings químicos e terapias específicas. Cada um desses métodos visa interromper a produção excessiva de melanina, que é a principal causa de manchas.
                </p>

                <h4 class="font-bold text-2xl mt-6">Por que fazer?</h4>
                <p>
                As manchas na pele podem ser causadas por exposição ao sol, envelhecimento, desequilíbrios hormonais ou predisposição genética. O tratamento é procurado para melhorar a aparência da pele, promover um tom de pele uniforme e aumentar a confiança.
                </p>

                <h4 class="font-bold text-2xl mt-6">Cuidados após o procedimento:?</h4>
                <p>
                Após o tratamento para manchas na pele, é crucial seguir as orientações do profissional de saúde. Isso pode incluir o uso de protetor solar diariamente, evitar a exposição solar direta e manter uma rotina de cuidados com a pele apropriada. A recuperação e os resultados podem variar de acordo com o método utilizado, mas a consistência e a paciência são essenciais para alcançar uma pele mais uniforme e saudável.
                </p>
            </div>

            <nuxt-img
                src="https://guiadafarmacia.com.br/wp-content/uploads/2020/12/manchas-no-rosto.jpg"
                class="h-full object-cover"
            />
            </div>
        </Container>
    </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from "~/layouts/AppLayout.vue"

</script>
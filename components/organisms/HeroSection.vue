<template>
    <div class="xs:hidden w-full md:grid xs:grid-cols-1 md:grid-cols-2 h-[calc(100dvh_-_80px)]" id="home">
        <div class="w-full h-fullbg-white flex justify-center items-center">
            <div class="flex flex-col gap-2">
                <p class="uppercase  tracking-[0.8rem] text-secondary">dra. giselle hage</p>
                <h2 class="font-bold text-primary text-5xl -ml-1">Harmonização Orofacial</h2>
                <h3 class="text-4xl font-extralight text-secondary">Revele sua beleza natural, <br/>conquiste a harmonia perfeita.</h3>

                <a href="#" class="mt-8 w-[400px] bg-primary hover:bg-primary/90 text-white px-4 py-4 flex justify-center items-center">Agende sua consulta</a>
            </div>
        </div>

        <div class="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-bottom relative">
            <div class="w-full h-full bg-white/30">
            </div>
            <HeroCard icon="clock" text="<span class='font-bold'>+ 10 anos</span> de experiencia" class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-0"/>
            <HeroCard icon="heart" text="Cuidando da sua <span class='font-bold'>beleza</span>" class="absolute bottom-32 -translate-x-1/2 -translate-y-1/2 right-32"/>
        </div>
    </div>

    <div class="xs:flex md:hidden">
        <div class="w-full h-[calc(100dvh_-_80px)] bg-[url('/hero-bg.jpg')] bg-cover bg-bottom relative">
            <div class="w-full h-full bg-white/30">
                <div class="flex flex-col justify-center items-center gap-2 h-full px-4">
                    <p class="uppercase tracking-[0.4rem] text-secondary">dra. giselle hage</p>
                    <h2 class="font-bold text-primary text-3xl -ml-1">Harmonização Orofacial</h2>
                    <h3 class="text-2xl font-normal text-center text-secondary">Revele sua beleza natural, <br/>conquiste a harmonia perfeita.</h3>

                    <a href="#" class="mt-8 w-full bg-primary hover:bg-primary/90 text-white px-4 py-4 flex justify-center items-center">Agende sua consulta</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>


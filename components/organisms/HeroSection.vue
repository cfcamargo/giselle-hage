<template>
    <div class="w-full grid grid-cols-2 h-[calc(100dvh_-_80px)]" id="home">
        <div class="w-full h-fullbg-white flex justify-center items-center">
            <div class="flex flex-col gap-2">
                <p class="uppercase font-light tracking-[0.8rem] text-secondary">dra. giselle hage</p>
                <h2 class="font-bold text-primary text-5xl -ml-1">Cirurgiã Dentista</h2>
                <h3 class="text-4xl font-extralight text-secondary">Revele sua beleza natural, <br/>conquiste a harmonia perfeita</h3>

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
</template>

<script setup>

</script>


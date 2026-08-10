<template>
    <div class="flex justify-end items-end  gap-5 ml-[70%] mt-[30px]">
        <a :href="landingContent.contact.instagramUrl" target="_blank" rel="noopener noreferrer">
            <IconInstagram />
        </a>
</div>
</template>

<script setup lang="ts">
import { landingContent } from '~/data/landing'
</script>

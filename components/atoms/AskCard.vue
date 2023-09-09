<template>
    <div class="flex flex-col gap-2 w-full">
      <div class="flex gap-2 w-full justify-between bg-gray-200 px-4 py-2 rounded" @click="toggleShow">
        <h4 class="font-bold text-degrade">
          {{ question.ask }}
        </h4>
        <div :class="show ? 'rotate-180' : 'rotate-0'" class="transform transition-all ease-in">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-degrade fill-current">
                <path
                    d="M3.00009 5.00002H21.0001C21.1823 5.00059 21.361 5.05085 21.5168 5.1454C21.6726 5.23994 21.7996 5.37518 21.8843 5.53657C21.9689 5.69796 22.008 5.87938 21.9972 6.0613C21.9864 6.24322 21.9262 6.41876 21.8231 6.56902L12.8231 19.569C12.4501 20.108 11.5521 20.108 11.1781 19.569L2.17809 6.56902C2.07391 6.41907 2.01282 6.24345 2.00145 6.06122C1.99008 5.879 2.02887 5.69714 2.1136 5.53541C2.19833 5.37368 2.32576 5.23826 2.48205 5.14387C2.63834 5.04948 2.81751 4.99973 3.00009 5.00002Z"
                />
            </svg>
        </div>
      </div>
      <transition enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutUp">
        <p v-if="show" class="w-full px-4 py-2 whitespace-pre-line">
          {{ question.awsner }}
        </p>
      </transition>
    </div>
</template>

<script setup lang="ts">

interface askCardProps  {
    ask: string
    awsner: string
}

const props = defineProps<{
  question : askCardProps
}>()
const { question } = props

let show = ref(false)

function toggleShow() {
  show.value = !show.value
}
</script>
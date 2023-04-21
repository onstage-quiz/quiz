<template>
    <button @click="setColor" class="w-96 h-36 bg-yellow text-black font-[couture] text-3xl uppercase">{{ answer.text }}</button>
</template>

<script setup lang="ts">
import type { answerType } from "@/utils/types";
import { ref } from "vue";

const props = defineProps<{
    answer: answerType,
}>();

const backgroundColor = ref("#EFEA50");

function setColor() {
    if(props.answer.correct) {
        return backgroundColor.value = "#00FF00"
    }

    return backgroundColor.value = "#FF0000"
}



</script>

<style scoped>
button {
    background-color: v-bind(backgroundColor)
}
</style>
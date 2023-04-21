<template>
    <button class="w-96 h-36 bg-yellow text-black font-[couture] text-3xl uppercase">{{ text }}</button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    text: string,
    buttonColor?: string
}>();

const backgroundColor = computed(() => props.buttonColor ? props.buttonColor : "#EFEA50");

</script>

<style scoped>
button {
    background-color: v-bind(backgroundColor)
}
</style>
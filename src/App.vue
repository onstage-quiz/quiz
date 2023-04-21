<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
    <img src="/img/Background.jpg" class="fixed object-cover w-full h-full -z-10 non-drag">
    <main>
        <RouterView class="z-10" />
    </main>


</template>

<style scoped>

</style>

<template>
    <div class="flex justify-center place-items-center h-screen w-screen">
        <Button text="Start quiz" @click="startQuiz" v-if="!questionStore.started"></Button>

        <div class="flex flex-col gap-6" v-if="questionStore.started && !questionStore.finished">
            <div class="w-[50rem] h-[25rem] bg-white flex place-items-center justify-end flex-col gap-4 pb-5">
                <img alt="image" :src="currentQuestion.image" class="h-auto max-h-72 object-contain w-96">
                <h1 class="text-4xl font-bold font-[couture] text-center">{{ currentQuestion.text }}</h1>

            </div>

            <div class="max-w-[50rem] flex flex-row gap-4 justify-between">
                <QuizButton class="h-24" v-for="answer in currentQuestion.answers" :key="currentQuestion.id"
                            :answer="answer" @click="nextQuestion(answer)"></QuizButton>
            </div>
        </div>

        <div v-if="questionStore.started && questionStore.finished"
             class="w-[30rem] h-28 flex justify-center place-items-center bg-yellow" @click="endQuiz">
            <h1 class="uppercase text-5xl font-bold font-[couture] text-center">0314</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import QuizButton from "@/components/QuizButton.vue";
import { useQuestionStore } from "@/stores/questionStore";
import type { answerType } from "@/utils/types";
import { onBeforeMount, ref } from "vue";

const questionStore = useQuestionStore();

const currentQuestion = ref();

onBeforeMount(async () => {
    await questionStore.init();

    currentQuestion.value = await questionStore.getQuestion();
});

function startQuiz() {
    questionStore.started = true;
}

let clicked = false;

function nextQuestion(answer: answerType) {
    if (answer.correct && !clicked) {
        clicked = true;
        setTimeout(async () => {
            currentQuestion.value = await questionStore.getQuestion();
            questionStore.correctAmount++;
            clicked = false;
        }, 2000);
    }
}

questionStore.$subscribe((mutation, state) => {
    if (state.correctAmount >= 3) {
        questionStore.finished = true;
    }
});

function endQuiz() {
    questionStore.reset();
}
</script>
<template>
    <div>
        <div class="flex justify-center place-items-center h-screen w-screen" v-if="!signedIn">
            <div class="bg-[#eeeeee] w-96 h-96 flex flex-col gap-4 justify-center place-items-center">
                <div>
                    <h1>Email</h1>
                    <input class="w-64" type="text" v-model="email">
                </div>

                <div>
                    <h1>Wachtwoord</h1>
                    <input class="w-64" type="password" v-model="password">
                </div>

                <button @click="signIn(email, password)" class="w-64 bg-white border-2 border-black">Inloggen</button>
            </div>
        </div>

        <div v-if="signedIn" class="flex justify-center place-items-center h-screen w-screen">
            <div class="bg-[#eeeeee] w-96 h-96 flex flex-col gap-4 p-4">
                <div>
                    <h1>Vraag</h1>
                    <input type="text" v-model="questionText">

                    <h1>Afbeelding (Directe URL)</h1>
                    <input type="text" v-model="questionImage">
                </div>

                <div>
                    <h1>Antwoord 1</h1>
                    <div class="flex flex-row">
                        <input type="text" v-model="answer1text">

                        <input type="checkbox" class="ml-4 w-6 h-6" v-model="answer1correct">
                    </div>
                </div>

                <div>
                    <h1>Antwoord 2</h1>
                    <div class="flex flex-row">
                        <input type="text" v-model="answer2text">

                        <input type="checkbox" class="ml-4 w-6 h-6" v-model="answer2correct">
                    </div>
                </div>

                <div>
                    <h1>Antwoord 3</h1>
                    <div class="flex flex-row">
                        <input type="text" v-model="answer3text">

                        <input type="checkbox" class="ml-4 w-6 h-6" v-model="answer3correct">
                    </div>
                </div>

                <button class="w-64 bg-white border-2 border-black" @click="addQuestion">submit question</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getFirestore, setDoc, doc, getDocs, collection } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";


const email = ref<string>("");
const password = ref<string>("");
const signedIn = ref<boolean>(false);

const questionText = ref<string>("");
const questionImage = ref<string>("");

const answer1text = ref<string>("");
const answer1correct = ref<boolean>(false);

const answer2text = ref<string>("");
const answer2correct = ref<boolean>(false);

const answer3text = ref<string>("");
const answer3correct = ref<boolean>(false);


function signIn(email: string, password: string) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            signedIn.value = true;
        })
        .catch((error) => {
            console.error(`${error.code}: ${error.message}`)
        });
}


async function addQuestion() {
    const db = getFirestore();

    const questionIds: Array<number> = [];

    const querySnapshot = await getDocs(collection(db, "questions"));
    querySnapshot.forEach((doc) => {
        questionIds.push(<number>doc.data().id);
    });

    const newQuestionId = questionIds.length;

    console.log(newQuestionId);

    const answers = [
        {
            correct: answer1correct.value,
            text: answer1text.value
        },
        {
            correct: answer2correct.value,
            text: answer2text.value
        }
    ];

    if (answer3correct.value || answer3text.value) {
        answers.push({
            correct: answer3correct.value,
            text: answer3text.value
        });
    }

    await setDoc(doc(db, "questions", `${newQuestionId}`), {
        id: newQuestionId,
        question: {
            id: newQuestionId,
            image: questionImage.value,
            text: questionText.value,
            answers: answers
        }
    });
}


</script>
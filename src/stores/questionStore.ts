import type { questionType, quizObject } from "@/utils/types";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { defineStore } from "pinia";

export const useQuestionStore = defineStore("question", {
    state: (): quizObject => {
        return {
            started: false,
            finished: false,
            correctAmount: 0,
            questions: [],
            questionsHadIds: [-1]
        };
    },
    actions: {
        reset() {
            this.started = false;
            this.finished = false;
            this.correctAmount = 0;
            this.questionsHadIds = [-1];
        },
        async init() {
            this.reset()

            const db = getFirestore();

            const questionsArray: Array<questionType> = [];

            const querySnapshot = await getDocs(collection(db, "questions"));
            querySnapshot.forEach((doc) => {
                questionsArray.push(<questionType>doc.data().question);
            });

            this.questions = questionsArray;

            return questionsArray;
        },
        async getQuestion() {
            const db = getFirestore();

            const questionsArray: Array<questionType> = [];

            const citiesRef = collection(db, "questions");

            const q = query(citiesRef, where("id", "not-in", this.questionsHadIds));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                questionsArray.push(<questionType>doc.data());
            });

            const question = questionsArray[Math.floor(Math.random() * questionsArray.length)];

            this.questionsHadIds.push(question.id);

            return question.text;
        }
    }
});


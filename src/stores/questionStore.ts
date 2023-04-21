import type { quizObject } from "@/utils/types";
import { defineStore } from "pinia";

export const useQuestionStore = defineStore("question", {
    state: (): quizObject => {
        return {
            started: false,
            questions: [
                {
                    id: 0,
                    question: "Hoeveel bezoekers had tomorrowland in 2022?",
                    image: "https://cdn.uc.assets.prezly.com/9541fada-e788-4ea0-8d46-7adb3da2ba73/-/resize/1108x/-/quality/best/-/format/auto/",
                    answers: [
                        {
                            text: "600.000",
                            correct: true
                        },
                        {
                            text: "400.000",
                            correct: false
                        },
                        {
                            text: "200.000",
                            correct: false
                        }
                    ]
                },
                {
                    id: 1,
                    question: "In welk jaar is DJ Hardwell geboren?",
                    image: "https://cdn.nos.nl/image/2022/03/28/846163/1024x576a.jpg",
                    answers: [
                        {
                            text: "1987",
                            correct: false
                        },
                        {
                            text: "1988",
                            correct: true
                        },
                        {
                            text: "1989",
                            correct: false
                        }
                    ]
                },
                {
                    id: 2,
                    question: "Hardwell heeft de soundtrack van Baron 1898 geremixt",
                    image: "https://www.efteling.com/en/-/media/images/nieuw-park/park/attractions/baron-1898/1024x576-baron-1898-1.jpg",
                    answers: [
                        {
                            text: "Waar",
                            correct: true
                        },
                        {
                            text: "Niet waar",
                            correct: false
                        }
                    ]
                }
            ],
            questionsHadIds: []
        };
    },
    actions: {
        reset() {

        },
        getQuestion() {
            const question = this.questions[Math.floor(Math.random() * this.questions.length)];

            if (this.questionsHadIds.includes(question.id)) {
                this.getQuestion();
            }

            this.questionsHadIds.push(question.id)

            return question;
        }
    }
});


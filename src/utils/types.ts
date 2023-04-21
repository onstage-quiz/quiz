export interface quizObject {
    started: boolean,
    questions: Array<questionType>,
    questionsHadIds: Array<number>
}

export interface questionType {
    id: number,
    question: string,
    image: string,
    answers: Array<answerType>
}

export interface answerType {
    text: string,
    correct: boolean
}
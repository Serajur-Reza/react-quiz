import { shuffleArray } from "./shuffle";

//question type aliases
export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
};


//enum difficulty
export enum Difficulty {
    EASY="easy",
    MEDIUM= "medium",
    Hard="hard"
}

// question and answers
export type QuestionState= Question & {answers: string[]};


//fetching data
export const fetchQuizQuestions = async (amount: number, difficulty:Difficulty): Promise<QuestionState[]> =>{
    const api= `https://opentdb.com/api.php?amount=${amount}&category=21&difficulty=${difficulty}&type=multiple`
    const data= await(await fetch(api)).json()
    console.log(data.results)
    return data.results.map((question:Question)=>({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
}
import React from 'react';
import { AnswerObject } from '../App';
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type props = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>)=> void,
    userAnswer: AnswerObject |undefined,
    questionNum: number,
    total_questions: number
}

const QuestionCard: React.FC<props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    total_questions
})=>{
    return(
        <Wrapper>
        <p>Question: {questionNum}/{total_questions}</p>

        <p dangerouslySetInnerHTML={{ __html: question }} />

        <div>
        {answers.map((answer)=>(
            <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
            >

            <button disabled={userAnswer? true :false} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </button>
            </ButtonWrapper>
        ))}
        </div>
        </Wrapper>
    )
}

export default QuestionCard
import  React, { useState }  from 'react';
import { Difficulty, fetchQuizQuestions, QuestionState } from './Components/data';
import QuestionCard from './Components/QuestionCard';
import { Wrapper } from './Components/QuestionCard.styles';

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

const QUESTIONS= 10


const App: React.FC = () =>{

  const [loading, setLoading]= useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber]= useState(0)
  const [userAnswers, setUserAnswers]= useState<AnswerObject[]>([])
  const [score, setScore]= useState(0);
  const [gameOver, setGameOver]= useState(true)

  const startTrivia= async ()=>{
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      QUESTIONS,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e:any)=>{
    if(!gameOver){
       const answer= e.currentTarget.value

       const correct = questions[number].correct_answer === answer
       if(correct){
         setScore((prev)=> prev+1)
         console.log(score)
       }

       const answerObject = {
         question: questions[number].question,
         answer,
         correct,
         correctAnswer: questions[number].correct_answer
       }

       setUserAnswers((prev)=> [...prev, answerObject])
    }
  }

  const nextQuestion = () =>{
    const nextQ= number+1

    if(nextQ === QUESTIONS){
      setGameOver(true)
    }
    else{
      setNumber(nextQ)
    }
  }

  return(
    <>
    <Wrapper>
    <h1>Quiz App</h1>
    {
      gameOver || userAnswers.length === QUESTIONS ? (
        <button onClick={startTrivia}>Start</button>
      ): null
    }

    {
      !gameOver ? <p>Score : {score}</p> :null
    }

    {loading? <p>Loading Questions...</p>: null }
    {!loading && !gameOver && (
      <QuestionCard
      question = {questions[number].question}
      answers = {questions[number].answers}
      callback = {checkAnswer}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      questionNum={number+1}
      total_questions={QUESTIONS}
      ></QuestionCard>
    )}

    {
      !gameOver && !loading && userAnswers.length === number+1 && number !== QUESTIONS -1 ? (
        <button onClick={nextQuestion}>
          Next Question
        </button>
      ): null
    }
    </Wrapper>
    </>
  )
}

export default App;
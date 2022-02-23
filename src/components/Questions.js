import Question from "./Question";
import {useEffect, useState} from "react";
import {nanoid} from "nanoid"

function Questions() {
    // state variables
    const [questions, setQuestions] = useState([])
    const [score, setScore] = useState(0)
    const [readyToCheck, setReadyToCheck] = useState(false)
    const [questionAnswers, setQuestionAnswers] = useState({
        question0: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
    })

    //loading questions
    useEffect(function() {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                data.results.map(question => {
                    const indexToInsert = getRandomIntInclusive(0, question.incorrect_answers.length)
                    switch (indexToInsert) {
                        case 0:
                            question.incorrect_answers.unshift(question.correct_answer)
                            break
                        case question.incorrect_answers.length:
                            question.incorrect_answers.push(question.correct_answer)
                            break
                        default:
                            question.incorrect_answers.splice(indexToInsert, 0, question.correct_answer)

                    }
                    question.id = nanoid()
                    return question
                })
                setQuestions(data.results)
            })
    }, [])

    useEffect(function (){
        if (Object.values(questionAnswers).every(answer => answer !== "")){
            setReadyToCheck(prevState => !prevState)
        }
    }, [questionAnswers])


    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
    }

    //event handlers
    function setFormData(event) {
        const {name, value} = event.target
        setQuestionAnswers(prevState => ({...prevState, [name]: value}))
    }

    function checkAnswers(event) {
        event.preventDefault()
        let currentScore = 0
        for (let i = 0; i < 5; i++) {
            const name = `question${i}`
            if (questionAnswers[name] === questions[i].correct_answer) {
                currentScore++
                document.getElementsByName(name).forEach(option => {
                    if (option.value === questionAnswers[name]) {
                        option.classList.add("correct_answer")
                    }
                })
            } else {
                document.getElementsByName(name).forEach(option => {
                    if (option.value === questions[i].correct_answer) {
                        option.classList.add("correct_answer")
                    } else if (option.value === questionAnswers[name]) {
                        option.classList.add("false_answer")
                    }
                })
            }

        }
        setScore(currentScore)
    }

    // rendering component
    let i = -1
    let allQuestions = questions.map(question => {
        i++
        return (
            <Question
                key={question.question.id}
                question={question.question}
                options={question.incorrect_answers}
                selectName={`question${i}`}
                selectOnChange={setFormData}
            />
        )
    })
    return (
        questions.length ?
            <>
                <form className="question-form">
                    {allQuestions}
                    {!score ?
                        readyToCheck && <button onClick={checkAnswers}>Check Answers</button>
                        :
                        <div className="score-section">
                            <span className="score-description"> You scored {score}/5 correct answers</span>
                            <button> Play Again</button>
                        </div>
                    }

                </form>
            </>
            :
            <div className="questions-load">
                Questions are loading...
            </div>
    )
}

export default Questions
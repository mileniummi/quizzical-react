import {useState} from "react"
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";

export default function App() {
    const [isDoingQuiz, setIsDoingQuiz] = useState(false)

    function StartGame(){
        setIsDoingQuiz(true)
    }
    return (
        !isDoingQuiz ?
            <main>
                <StartScreen startGame={StartGame} />
            </main>
            :
            <main>
                <Questions />
            </main>
    )
}
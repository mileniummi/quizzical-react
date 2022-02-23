function StartScreen({startGame}) {
    return (
        <div className="start-screen-container">
            <h1 className="start-screen-title"> Quizzical</h1>
            <h2 className="start-screen-description">Choose answers for 5 random questions</h2>
            <button onClick={startGame}>Start quiz</button>
        </div>
    )

}

export default StartScreen
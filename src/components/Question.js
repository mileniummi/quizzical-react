function Question({question, options, selectName, selectOnChange}) {
    const optionsJSX = options.map(option =>
        <label>
            <input type="radio" name={selectName} onClick={selectOnChange} value={option}/>
            <span dangerouslySetInnerHTML={{__html: option}}>

            </span>
        </label>)

    return (
        <div className="question">
            <h2 className="question-description" dangerouslySetInnerHTML={{__html: question}}>

            </h2>
            <p className="questions-select">
                {optionsJSX}
            </p>
        </div>
    )
}

export default Question
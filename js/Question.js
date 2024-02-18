class Question {

    id
    question
    answerOptions
    answer
    type
    inputAnswer
    hardness
    marksWorth

    constructor(questionObject){

        let {
            question, 
            answerOptions, 
            answer, 
            type, 
            hardness
        } = questionObject;

        this.id = uniqueID(1);
        this.question = question;
        this.answerOptions = answerOptions;
        this.answer = answer;
        this.type = type;
        this.hardness = hardness;

        if(questionObject.inputAnswer != null) 
        this.inputAnswer = questionObject.inputAnswer;

    }

    //TODO: refactor out this function ...
    renderQuizArea(...quizAreaElements){

        let quizArea = document.querySelector(".question-area");
        quizArea.innerHTML = "";
        quizAreaElements.forEach( element => quizArea.appendChild(element) );

    }

}
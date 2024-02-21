class Quiz {

    filename
    minimumQuizNumber = 0;
    maximumQuizNumber = 0;
    currentQuizNumber = 0;
    questions = []
    nextButton
    previousButton
    finishQuizButton
    type
    quizGradeObject

    renderQuestionNumber(questionNumber){
        
        let questionNumberElement = document.querySelector(".question-header");
        questionNumberElement.innerHTML = "";
        let questionTextElement = createLocalizedTextElement("Question");
        let numberElement = document.createElement("div");
        numberElement.textContent = questionNumber + 1;
        questionNumberElement.appendChild(questionTextElement);
        questionNumberElement.appendChild(numberElement);

    }

    constructor(questions, quizGradeObject, type){

        this.filename = quizGradeObject.fileToSave; // ... TODO: write some documentation
        this.questions = questions; // randomize(questions);
        this.maximumQuizNumber = questions.length - 1;
        this.type = type;
        this.currentQuizNumber = 0;
        this.quizGradeObject = quizGradeObject;
        
    }

    startQuiz(){
        this.renderQuestion();
        this.handleButtons();
    }

    autoSave(){
        saveQuizAsJSON(this.filename, this.questions, this.type);
    }

    endQuiz(){

        console.log("[2] filename: ", this.filename);

        clearEventListenersFor(this.nextButton)
        clearEventListenersFor(this.previousButton)
        clearEventListenersFor(this.finishQuizButton)

        handleEndQuiz({
            filename: this.filename,
            questions: this.questions,
            type: this.type,
            quizGradeObject: this.quizGradeObject
        });
    }

    setFinishQuizButton(button){
        this.finishQuizButton = button;
        this.finishQuizButton.addEventListener("click", () => {
            this.endQuiz();
        })
    }
    
    renderQuestion(){
        this.renderQuestionNumber(this.currentQuizNumber);
        this.questions[this.currentQuizNumber].render();

        console.log("current question index: ", this.currentQuizNumber);
    }

    nextQuestion(){
        ++this.currentQuizNumber;
        this.handleButtons();
        this.renderQuestion();
    }

    previousQuestion(){
        --this.currentQuizNumber;
        this.handleButtons();
        this.renderQuestion();
    }

    setPreviousButton(button){
        this.previousButton = button;
        this.previousButton.addEventListener("click", () => {
            this.previousQuestion();
        })
    }

    setNextButton(button){
        this.nextButton = button;
        this.nextButton.addEventListener("click", () => {
            this.nextQuestion();
        })
    }

    handleButtons(){

        if(this.currentQuizNumber == 0){
            this.nextButton.removeAttribute("disabled");
            this.previousButton.setAttribute("disabled", "true");
            this.finishQuizButton.parentElement.style.display = "none";
        }
        
        if(this.currentQuizNumber > 0 && this.currentQuizNumber <= this.maximumQuizNumber ){
            this.nextButton.removeAttribute("disabled");
            this.previousButton.removeAttribute("disabled");
        }
        
        if(this.currentQuizNumber == this.maximumQuizNumber ){
            this.nextButton.setAttribute("disabled","true");
            this.finishQuizButton.parentElement.style.display = "grid";
        } 

        if(this.currentQuizNumber % 3 == 0){
            this.autoSave();
        }
    }

}

class MultipleChoice extends Question {

    constructor(questionObject, marksWorth = 1){
        // randomize answer options
        super(questionObject);
        this.marksWorth = marksWorth;
    }

    render(){

        let question = document.createElement("div");
        question.className = "question";
        question.textContent = this.question;

        let answerOptionsList = document.createElement("div");
        answerOptionsList.className = "answer-options-list";

        let answerOptionMap = this.answerOptions.map( ( option, index ) => {
            
            let answerOptionContainer = document.createElement("div");

            if(this.inputAnswer == this.answerOptions[index]){
                answerOptionContainer.className = "answer-option-container active";
            }else{
                answerOptionContainer.className = "answer-option-container";
            }

            let letterOption = document.createElement("div");
            letterOption.className = "letter-option";
            letterOption.textContent = letters[index];
    
            let answerOption = document.createElement("div");
            answerOption.className = "answer-option";
            answerOption.textContent = option;

            answerOptionContainer.addEventListener("click", () => {

                disableOtherOptions();
                answerOptionContainer.className = "answer-option-container active";

                this.inputAnswer = option;

            });

            answerOptionContainer.appendChild(letterOption);
            answerOptionContainer.appendChild(answerOption);
            answerOptionsList.appendChild(answerOptionContainer);
            return answerOptionContainer;

        });

        function disableOtherOptions(){
            answerOptionMap.forEach( option => option.className = "answer-option-container")
        }

        super.renderQuizArea(question, answerOptionsList);
    }
}

class TrueAndFalse extends Question {

    constructor(questionObject, marksWorth = 1){
        super(questionObject);
        this.marksWorth = marksWorth;
    }

    render(){

        let question = document.createElement("div");
        question.className = "question";
        question.textContent = this.question;

        let answerOptions = this.answerOptions || [];

        if(this.answerOptions.length == 0){
            switch(this.answer){
                case "Yes":
                    answerOptions = ["Yes", "No"] //TODO: Match for other languages
                    break;
                case "True":
                    answerOptions = ["True", "False"]
                    break;
                case "False":
                    answerOptions = ["True", "False"]
                    break;
                case "No":
                answerOptions = ["Yes", "No"]
                break;
            }
        }

        let answerOptionsList = document.createElement("div");
        answerOptionsList.className = "tf-options-list";

        let answerOptionMap = answerOptions.map( ( option, index ) => {
            
            let answerOptionContainer = document.createElement("div");
            answerOptionContainer.className = "tf-answer-option-container";


            let answerOption = document.createElement("div");
            answerOption.textContent = option;

            if(this.inputAnswer == answerOptions[index]){
                answerOption.className = "button tf-answer-option active";
            }else{
                answerOption.className = "button tf-answer-option";
            }
    

            answerOption.addEventListener("click", () => {

                disableOtherOptions();
                answerOption.className = "button tf-answer-option active";

                this.inputAnswer = option;

            });

            answerOptionContainer.appendChild(answerOption);
            answerOptionsList.appendChild(answerOptionContainer);
            return answerOption;

        });

        function disableOtherOptions(){
            answerOptionMap.forEach( option => option.className = "button tf-answer-option")
        }

        super.renderQuizArea(question, answerOptionsList);
    }
}

class FillInTheBlank extends Question {

    constructor(questionObject, marksWorth = 1){
        super(questionObject);
        this.marksWorth = marksWorth;
    }

    render(){

        let question = document.createElement("div");
        question.className = "question";
        question.textContent = this.question;
        
 
            
            let blankTextContainer = document.createElement("div");
            blankTextContainer.className = "fitb-answer-option-container";

            // blankTextEditableField.setAttribute("contentEditable","true");


            let blankTextEditableField = document.createElement("input");
            blankTextEditableField.className = "fitb-answer-input";
            blankTextEditableField.placeholder = "Enter You Answer Here";

            if(this.inputAnswer){
                blankTextEditableField.className = "fitb-answer-input active";
                blankTextEditableField.value = this.inputAnswer;
            }
        
            blankTextEditableField.addEventListener("input", () => {

                blankTextEditableField.className = "fitb-answer-input active";
                this.inputAnswer = blankTextEditableField.value ;

            });

            blankTextContainer.appendChild(blankTextEditableField);

        super.renderQuizArea(question, blankTextContainer);
    }
}

async function handleEndQuiz(quizObject){

    openPopup('.take-quiz-loader');

    let {
        filename,
        questions,
        type,
        quizGradeObject
    } = quizObject;

    saveQuizAsJSON(filename, questions, type);

    let { result, totalMarks } = mark(questions);

    let quizBody = document.querySelector(".quiz-popup-body");
    let resultsBody = document.querySelector(".quiz-results-body");
    let footers = quizBody.parentElement.querySelectorAll(".popup-footer");

    let resultArea = document.querySelector(".quiz-result-area");
    resultArea.textContent = `${result}/${totalMarks}`;

    footers.forEach( footer => footer.style.display = "none");
    quizBody.style.display = "none";

    switch(type) {
        case "new":
            await updateNewQuizGrade(quizGradeObject, result);
            break;
        case "resume":
            await updateOldQuizGrade(quizGradeObject, result);
            break;
    }

    async function updateNewQuizGrade(quizGradeObject, marks){

        let value = marks;

        let {
            id,
            userID,	
            quizID,	
            fileToSave,
        } = quizGradeObject;

        let timeEnded = getCurrentTimeInJSONFormat();

        let status = "done";

        let params = `id=${id}&&userID=${userID}&&quizID=${quizID}`+
        `&&filename=${fileToSave}&&status=${status}&&value=${value}`+
        `&&timeEnded=${timeEnded}`;

        console.log("params to save: ", params);

        let response = await AJAXCall({
            phpFilePath: "../include/quiz/updateNewQuizGrade.php",
            rejectMessage: "Failed to update new quiz grade",
            type: "post",
            params
        });

        console.log("adding marks response: ", response);

    }

    async function updateOldQuizGrade(quizGradeObject, marks){

        let value = marks;
        let { id } = quizGradeObject;

        let timeEnded = getCurrentTimeInJSONFormat();

        console.log("finalTime: ", timeEnded);

        let params = `id=${id}&&value=${value}&&timeEnded=${timeEnded}`;

        let response = await AJAXCall({
            phpFilePath: "../include/quiz/updateOldQuizGrade.php",
            rejectMessage: "Failed to update quiz grade",
            type: "post",
            params
        });

        console.log("adding marks response: ", response);

    }
    
    setTimeout(() => {
        resultsBody.style.display = "grid";
        closePopup(".take-quiz-loader");
    },2000)

}

function mark(questions){

    let result = 0;
    let totalMarks = 0;

    questions.forEach( question => {
        if(question.answer == question.inputAnswer)
            result += question.marksWorth;
        totalMarks += question.marksWorth;
    })

    return { result, totalMarks };

}

async function startQuiz(quizGradeObject, type="new"){

    openPopup('.take-quiz-overlay');
    openPopup(".take-quiz-loader");

    let { fileToLoad, fileToSave } = quizGradeObject;

    console.log("fileToLoad: ", fileToLoad);
    console.log("fileToSave: ", fileToSave);

    let correctPath;

    switch(type){
        case "resume":
            correctPath = `../quiz/taken/${fileToLoad}`;
            break;
        case "new":
            correctPath = `../quiz/generated/${fileToLoad}`;
            break;
    }

    let quizFileResponse = await fetch(correctPath, {cache: "reload"});
    let questions = await quizFileResponse.json();

    let questionsArray = questions.map( question => {
        switch(question.type.toLowerCase()){
            case "mcq":
            case "multiple choice":
            case "multiple choice question":
                return new MultipleChoice(question);
            case "true and false":
            case "t and f":
            case "t/f":
            case "true/false":
            case "true-false":
            case "t-f":
                return new TrueAndFalse(question);
            case "fill in the blank":
                return new FillInTheBlank(question);
            default:
                throw new Error("Not Made Yet");
        }
    });

    //TODO: start by saving the filename with the id of the quizGradeObject
    // if the type is new

    let quiz;

    switch(type){
        case "resume":
            quiz = new Quiz(questionsArray, quizGradeObject, type)
            break;
        case "new":
            quiz = new Quiz(questionsArray, quizGradeObject, type)
            await addNewQuizGradeRowInDatabase(quizGradeObject);
            break;
    }

    let previousButton = document.querySelector(".previous-question");
    let nextButton = document.querySelector(".next-question");
    let finishQuizButton = document.querySelector(".finish-quiz-button");

    quiz.setNextButton(nextButton);
    quiz.setPreviousButton(previousButton);
    quiz.setFinishQuizButton(finishQuizButton);

    let quizBody = document.querySelector(".quiz-popup-body");
    let resultsBody = document.querySelector(".quiz-results-body");
    let buttonGroupFooter = document.querySelector(".button-group-footer");

    quizBody.style.display = "grid"
    buttonGroupFooter.style.display = "grid"
    resultsBody.style.display = "none"

    setTimeout(() => {    
        quiz.startQuiz();
        closePopup('.take-quiz-loader');
    }, 2000);


    // return quiz;

}

async function addNewQuizGradeRowInDatabase(quizGradeObject){

    let {
        id,
        userID,	
        quizID,	
        fileToSave,
    } = quizGradeObject;

    let timeStarted = getCurrentTimeInJSONFormat();

    let params = `id=${id}&&userID=${userID}&&quizID=${quizID}`+
    `&&filename=${fileToSave}&&timeStarted=${timeStarted}&&status=started`;

    let response = await AJAXCall({
        phpFilePath: "../include/quiz/addNewQuizGradeRow.php",
        rejectMessage: "Failed to create new quiz grade row",
        type: "post",
        params
    });

    console.log(response);

}
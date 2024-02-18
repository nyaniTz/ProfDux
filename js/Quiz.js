const letters = "abcdefghijklmnopqrstuvwxyz".split("");

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

    renderQuestionNumber(questionNumber){
        
        let questionNumberElement = document.querySelector(".question-header");
        questionNumberElement.innerHTML = "";
        let questionTextElement = createLocalizedTextElement("Question");
        let numberElement = document.createElement("div");
        numberElement.textContent = questionNumber + 1;
        questionNumberElement.appendChild(questionTextElement);
        questionNumberElement.appendChild(numberElement);

    }

    constructor(questions, type, filename = `Quiz-${uniqueID(2)}.json`){

        this.filename = filename;
        this.questions = questions; // randomize(questions);
        this.maximumQuizNumber = questions.length - 1;
        this.type = type

        console.log("[1] filename: ", filename);
        
    }

    startQuiz(){
        this.renderQuestion();
    }

    autoSave(){

        //TODO: Consider saving as sessionStorage?
        // or having a timer to save every 60 seconds
        saveQuizAsJSON(this.filename, this.questions, this.type);
    }

    endQuiz(){

        console.log("[2] filename: ", this.filename);

        handleEndQuiz({
            filename: this.filename,
            questions: this.questions,
            type: this.type
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

        this.autoSave();

        if(this.currentQuizNumber == 0){
            this.nextButton.removeAttribute("disabled");
            this.previousButton.setAttribute("disabled", "true");
        }
        
        if(this.currentQuizNumber > 0 && this.currentQuizNumber <= this.maximumQuizNumber ){
            this.nextButton.removeAttribute("disabled");
            this.previousButton.removeAttribute("disabled");
        }
        
        if(this.currentQuizNumber == this.maximumQuizNumber ){
            this.nextButton.setAttribute("disabled","true");
            this.finishQuizButton.parentElement.style.display = "grid";
        } 
    }

}

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

    renderQuizArea(...quizAreaElements){

        let quizArea = document.querySelector(".question-area");
        quizArea.innerHTML = "";
        quizAreaElements.forEach( element => quizArea.appendChild(element) );

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

        // let question = document.createElement("div");
        // question.className = "question";
        // question.textContent = this.question;

        // let answerOptionsList = document.createElement("div");
        // answerOptionsList.className = "answer-options-list";

        // let answerOptionMap = this.answerOptions.map( ( option, index ) => {
            
        //     let answerOptionContainer = document.createElement("div");

        //     if(this.inputAnswer == this.answerOptions[index]){
        //         answerOptionContainer.className = "answer-option-container active";
        //     }else{
        //         answerOptionContainer.className = "answer-option-container";
        //     }

        //     let letterOption = document.createElement("div");
        //     letterOption.className = "letter-option";
        //     letterOption.textContent = letters[index];
    
        //     let answerOption = document.createElement("div");
        //     answerOption.className = "answer-option";
        //     answerOption.textContent = option;

        //     answerOptionContainer.addEventListener("click", () => {

        //         disableOtherOptions();
        //         answerOptionContainer.className = "answer-option-container active";

        //         this.inputAnswer = option;

        //     });

        //     answerOptionContainer.appendChild(letterOption);
        //     answerOptionContainer.appendChild(answerOption);
        //     answerOptionsList.appendChild(answerOptionContainer);
        //     return answerOptionContainer;

        // });

        // function disableOtherOptions(){
        //     answerOptionMap.forEach( option => option.className = "answer-option-container")
        // }

        super.renderQuizArea(question, answerOptionsList);
    }
}

async function handleEndQuiz(quizObject){
    let {
        filename,
        questions,
        type
    } = quizObject;

    saveQuizAsJSON(filename, questions, type);
    let { result, totalMarks } = mark(questions);

    let quizBody = document.querySelector(".quiz-popup-body");
    let resultsBody = document.querySelector(".quiz-results-body");
    let footers = document.querySelectorAll(".popup-footer");

    let resultArea = document.querySelector(".quiz-result-area");
    resultArea.textContent = `${result}/${totalMarks}`;

    footers.forEach( footer => footer.style.display = "none");
    quizBody.style.display = "none";

    //TODO: save results
    //TODO: show saving animation
    // then ...
    resultsBody.style.display = "grid";

}

function mark(questions){

    let result = 0;
    let totalMarks = 0;

    questions.forEach( question => {
        if(question.answer == question.inputAnswer)
            result += question.marksWorth

        totalMarks += question.marksWorth;
    })

    return { result, totalMarks };

}

async function saveQuizAsJSON(filename, ArrayContainingObjects, type){

    let JSONString = JSON.stringify(ArrayContainingObjects);

    let correctPath;

    switch(type){
        case "student":
        case "new":
        case "resume":
            correctPath = `../quiz/taken/${filename}`;
            break;
        case "teacher":
            correctPath = `../quiz/generated/${filename}`;
            break;
    }

    console.log("[3] correctPath: ", correctPath);
    console.log("[4] jsonString: ", JSONString);

    try{
        let result = await AJAXCall({
            phpFilePath: "saveJSONData.php",
            rejectMessage: "saving json file failed",
            params: `filepath=${correctPath}&&jsonString=${JSONString}`,
            type: "post"
        });

        console.log("[5] async Result: ", result);

    }catch(error){
        //TODO: bubbleUpError()
        console.log(error);
    }

}

//TODO: Load JSONFile from files
//TODO: Parse JSONFile and Attempt to create a quiz map
//TODO: This is for resumability

async function startQuiz(filename, type="new"){

    //TODO: get quiz from correct quizFilePath

    let correctPath;

    switch(type){
        case "resume":
            correctPath = `../quiz/taken/${filename}`;
            break;
        case "new":
            correctPath = `../quiz/generated/${filename}`;
            break;
    }

    let quizFileResponse = await fetch(correctPath);
    let questions = await quizFileResponse.json();
    
    //TODO: loop through this map
    let questionsArray = questions.map( question => {
        switch(question.type){
            case "MCQ":
                return new MultipleChoice(question);
            case "True and False":
                return new TrueAndFalse(question);
        }
    });

    let quiz;

    switch(type){
        case "resume":
            quiz = new Quiz(questionsArray, type, filename)
            break;
        case "new":
            quiz = new Quiz(questionsArray, type)
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

    quiz.startQuiz();
    openPopup('.take-quiz-overlay');

}



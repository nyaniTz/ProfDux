class EditQuiz {

    filename
    minimumQuizNumber = 0;
    maximumQuizNumber = 0;
    currentQuizNumber = 0;
    questions = []
    nextButton
    previousButton
    saveButton
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

    constructor(questions, type, filename ){

        this.filename = filename;
        this.questions = questions;
        this.maximumQuizNumber = questions.length - 1;
        this.type = type

        console.log("[1] filename: ", filename);
        
    }

    startEdittingQuiz(){
        this.renderQuestion();
    }

    // autoSave(){

    //     //TODO: Consider saving as sessionStorage?
    //     // or having a timer to save every 60 seconds
    //     this.saveQuiz();
    // }

    saveQuiz(){
        saveQuizAsJSON(this.filename, this.questions, this.type);
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

    setSaveButton(button){
        this.saveButton = button;
        this.saveButton.addEventListener("click", () => {
            this.saveQuiz();
            closePopup(".edit-quiz-overlay");
        })
    }

    handleButtons(){

        // this.autoSave();

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
        } 
    }
    
}

class EditMultipleChoice extends Question {

    constructor(questionObject, marksWorth = 1){
        // randomize answer options
        super(questionObject);
        this.marksWorth = marksWorth;
    }

    render(){

        let question = document.createElement("div");
        question.setAttribute("contentEditable","true");
        question.className = "question editable";
        question.textContent = this.question;

        question.addEventListener("input", event => {
            this.question = event.target.textContent;
        })

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
            answerOption.setAttribute("contentEditable","true");
            answerOption.className = "answer-option editable";
            answerOption.textContent = option;

            answerOption.addEventListener("input", event => {
                this.answerOptions[index] = event.target.textContent;
            })

            answerOptionContainer.addEventListener("click", () => {

                disableOtherOptions();
                answerOptionContainer.className = "answer-option-container active";

            });

            //TODO: have an option to select the correct answer, or show the
            // correct answer

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

class EditTrueAndFalse extends Question {

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

async function startEditingQuiz(filename, type="teacher"){

    let correctPath = `../quiz/generated/${filename}`;

    let quizFileResponse = await fetch(correctPath, {cache: "reload"});
    let questions = await quizFileResponse.json();

    let questionsArray = questions.map( question => {
        switch(question.type.toLowerCase()){
            case "mcq":
            case "multiple choice":
            case "multiple choice question":
                return new EditMultipleChoice(question);
            case "true and false":
            case "t and f":
            case "t/f":
            case "true/false":
                return new EditTrueAndFalse(question);
            case "fill in the blank":
                // return new FillInTheBlank(question);
            default:
                throw new Error("Not Made Yet");
        }
    });

    // console.log("qa: ", questionsArray);

    let quiz = new EditQuiz(questionsArray, type, filename);

    let editQuizOverlay = document.querySelector(".edit-quiz-overlay");
    let previousButton = editQuizOverlay.querySelector(".previous-question");
    let nextButton = editQuizOverlay.querySelector(".next-question");
    let saveButton = editQuizOverlay.querySelector(".save-button");

    quiz.setNextButton(nextButton);
    quiz.setPreviousButton(previousButton);
    quiz.setSaveButton(saveButton);

    quiz.startEdittingQuiz();
    openPopup('.edit-quiz-overlay');

}
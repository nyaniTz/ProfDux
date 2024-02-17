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

    renderQuestionNumber(questionNumber){
        
        let questionNumberElement = document.querySelector(".question-header");
        questionNumberElement.innerHTML = "";
        let questionTextElement = createLocalizedTextElement("Question");
        let numberElement = document.createElement("div");
        numberElement.textContent = questionNumber + 1;
        questionNumberElement.appendChild(questionTextElement);
        questionNumberElement.appendChild(numberElement);

    }

    constructor(questions, filename = `Quiz-${uniqueID(2)}.json`){

        this.filename = filename;
        this.questions = questions; // randomize(questions);
        this.maximumQuizNumber = questions.length - 1;
        
    }

    startQuiz(){
        this.renderQuestion();
    }

    endQuiz(){
        saveQuizAsJSON(this.filename, this.questions);
        closePopup('.take-quiz-overlay');
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
    marksGotten

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


async function saveQuizAsJSON(filename, ArrayContainingObjects){

    let JSONString = JSON.stringify(ArrayContainingObjects);

    try{
        await AJAXCall({
            phpFilePath: "saveJSONData.php",
            rejectMessage: "saving json file failed",
            params: `filename=${filename}&&jsonString=${JSONString}`,
            type: "post"
        });
    }catch(error){
        console.log(error);
    }

}

let questions = [
    {
        question: "What is the capital of Turkey?", 
        answerOptions: ["Istanbul", "Washington DC", "Beijing", "London"], 
        answer: "Istanbul", 
        type: "MCQ", 
        hardness: "easy",
        inputAnswer: ""
    },
    {
        question: "What is the capital of Tanzania?", 
        answerOptions: ["Beirut", "Dar es Salaam", "Moscow", "LA"], 
        answer: "Dar es Salaam", 
        type: "MCQ", 
        hardness: "easy"
    },
    {
        question: "What is the capital of Russia?", 
        answerOptions: ["Canbera", "Monaco", "Moscow", "Norway"], 
        answer: "Moscow", 
        type: "MCQ", 
        hardness: "easy"
    }

]

//TODO: Load JSONFile from files
//TODO: Parse JSONFile and Attempt to create a quiz map
//TODO: This is for resumability

let questionsArray = questions.map( question => {
    switch(question.type){
        case "MCQ":
            return new MultipleChoice(question);
        case "True and False":
            return new TrueAndFalse(question);
    }
});

let quiz = new Quiz(questionsArray, "Quiz-1n0jomwaflsqfnj8o.json");

let previousButton = document.querySelector(".previous-question");
let nextButton = document.querySelector(".next-question");
let finishQuizButton = document.querySelector(".finish-quiz-button");

quiz.setNextButton(nextButton);
quiz.setPreviousButton(previousButton);
quiz.setFinishQuizButton(finishQuizButton);


quiz.startQuiz();
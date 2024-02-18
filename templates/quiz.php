<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <page data-id="quiz"></page>

    <?php include '../include/studentImports.php'; ?>

</head>
<body>

    <script>

        let quizButton = document.createElement("div");
        quizButton.className = "button";
        
        //TODO: fetch the correct quiz details

        let quizStatus = {
            timeStarted: "",
            timeEnded: "",
            filename: "Quiz-20qds1ryflsr5oarx.json",
            status: "started",
        }

        // New Quiz
        let quizDetails = {
            id: "f394u839f",
            filename: "Quiz-2n0jomwaflsqfnj8o.json",
            courseID: "",
            lectureID: "",
            name: "",
            dateGenerated: "",
            heirarchy: "",
            totalMarks: ""
        }

        //Results

        let result = {
            id: "",
            mark: "4",
            total: "10"
        }

        switch(quizStatus.status){
            case "not done":
                quizButton.textContent = "Start Quiz"; // TODO: Localize
                quizButton.addEventListener("click", () => {
                    startQuiz(quizDetails.filename); // New Quiz
                })
            break;
            case "started":
                quizButton.textContent = "Resume Quiz"; // TODO: Localize
                quizButton.addEventListener("click", () => {
                    startQuiz(quizStatus.filename, "resume"); // Resume Quiz
                })
            break;
            case "done":
                quizButton.textContent = "Review Results"; // TODO: Localize
                quizButton.addEventListener("click", () => {
                    viewQuizResults(result); // View Results
                });
            break;
        }

        document.body.appendChild(quizButton);

        // <div class="button" onclick="startQuiz('12345')">Start Quiz</div>

    </script>


    <div class="overlay take-quiz-overlay">
        <div class="popup quiz-popup">
            <div class="popup-header">
                <div class="close-button" onclick="closePopup('.take-quiz-overlay')">
                    <img src="../assets/icons/close.png" alt="">
                </div>
                <h1 class="pop-up-title">
                    <text>Quiz</text>
                    <div class="quiz-details">Advanced Magnets Quiz</div>
                </h1> 
            </div>
    
            <div class="popup-body quiz-popup-body">

                <div class="question-header">
                    
                </div>

                <div class="question-area">
                    
                </div>
            </div>

            <div class="popup-body quiz-results-body">
                <h1>Your Results</h1>

                <div class="quiz-result-area"></div>

                <div class="button" onclick="closePopup('.take-quiz-overlay')">Done</div>
            </div>
    
            <div class="popup-footer button-group-footer">
                <div class="button-group quiz-button-group">
                    <button class="button previous-question" disabled>Previous Question</button>
                    <button class="button next-question">Next Question</button>
                </div>
            </div>

            <div class="popup-footer submit-footer">
                <button class="button finish-quiz-button">Submit Quiz</button>
            </div>
        </div>
    </div>

    <style>
    
        .take-quiz-overlay {
            padding: 100px 20px;
        }

        .quiz-popup {
            width: 600px;
        }

        .question-area {
            display: grid;
            grid-gap: 39px;
            width: 100%;
        }
    
        .question-header{
            width: 100%;
            color: var(--accent);
            text-transform: uppercase;
            font-size: 0.8em;
            letter-spacing: 1px;
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 5px;
        }

        .question {
            width: 100%;
            color: var(--accent);
            font-weight: 500;
            font-size: 1.3em;
        }

        .quiz-popup-body {
            grid-gap: 26px;
        }

        .answer-options-list {
            display: grid;
            width: 100%;
            font-size: 16px;
            color: var(--medium-gray);
            border-color: var(--medium-gray);
            grid-gap: 20px;
        }

        .answer-options-list .active {
            color: var(--accent);
        }
        .answer-options-list .inactive .letter-option{
            border-color: var(--accent);
        }

        .answer-option-container {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-gap: 20px;
            align-items: center;
            cursor: pointer;
            transition: 0.3s all;
        }.answer-option-container:hover {
            color: var(--accent);
            opacity: 1;
            transform: scale(0.99);
            transition: 0.3s all;
        }.answer-option-container:hover .letter-option{ border-color: var(--accent);}

        .letter-option {
            display: grid;
            text-align: center;
            border: 3px solid black;
            border-color: inherit;
            border-radius: 5px;
            place-content: center;
            font-weight: 500;
            font-size: 16px;
            height: 40px;
            width: 40px;
            text-transform: uppercase;
        }

        .quiz-popup .button {
            padding: 13px 26px;
        }

        .quiz-button-group {
            width: 100%;
            place-items: end;
        }.quiz-button-group > *:first-child{ place-self: start; }

        .submit-footer{
            border-top: 1px solid var(--medium-gray);
            padding: 20px;
            display: none;
        }

        .quiz-results-body{
            display: none;
            color: var(--accent);
        }

        .quiz-result-area{
            font-size: 3em;
            font-weight: 200;
            letter-spacing: 13px;
            color: var(--accent);
        }



    </style>
    
</body>
</html>
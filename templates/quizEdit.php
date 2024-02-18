<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <page data-id="quiz"></page>

    <?php include '../include/teacherImports.php'; ?>

</head>
<body>

    <script>

        let language = "english"; //TODO: Toggle option.
        let topic = "human heart";
        let educationEnvironment = "college students";

        let multipleChoiceCount = 3;
        let fillInTheBlankCount = 3;
        let trueAndFalseCount = 0;

        let hardQuestionsCount = 2;
        let mediumQuestionsCount = 3;
        let easyQuestionsCount = 1;

        let query = 
        `create for me in json format a series of new questions 
        in the ${language} language as well as their answers 
        in the ${language} language in the topics of ${topic} 
        for ${educationEnvironment}. 
        There should be ${multipleChoiceCount} multiple choice questions
        with a minimum of 4 answer options. Do not include letters prefixed
        at the beginning of the answer options. There should be  
        ${fillInTheBlankCount} fill in the blank questions and 
        ${trueAndFalseCount} true and false questions. 
        ${hardQuestionsCount} of those questions should be hard, 
        ${mediumQuestionsCount} should be medium and 
        ${easyQuestionsCount} should be easy. 
        The json format should have the following keys, 
        "question, answerOptions, answer, type, hardness". 
        The answerOptions should only be available if the 
        question type is multiple choice.`;


        async function generateQuiz(lectureID){

            let unparsedJSONResponse = await generateGPTResponseFor(query);
            let questions = await JSON.parse(unparsedJSONResponse);
            console.log(questions);

            let filename = `Quiz-${uniqueID(2)}.json`;
            saveQuizAsJSON(filename, questions.questions, "generated");

            let quizID = uniqueID(1);
            let courseID = "lshj44zm";
            let name = "Quiz"; // ...
            let dateGenerated = "Today"; // TODO: ...
            let heirarchy = ""; // ...
            let totalMarks = ""; // ...

            let params = `id=${quizID}&&courseID=${courseID}&&lectureID=${lectureID}&&name=${name}&&dateGenerated=${dateGenerated}&&filename=${filename}`;

            let response = AJAXCall({
                phpFilePath: "../include/quiz/addNewQuiz.php",
                rejectMessage: "New Quiz Failed To Add",
                params,
                type: "post"
            });
            
        }

    </script>

    <div class="overlay generate-quiz-overlay">
        <div class="popup generate-quiz-popup">
            <div class="popup-header">
                <div class="close-button" onclick="closePopup('.generate-quiz-overlay')">
                    <img src="../assets/icons/close.png" alt="">
                </div>
                <h1 class="pop-up-title">
                    <text>Generate Quiz</text>
                </h1> 
            </div>
    
            <div class="popup-body generate-quiz-popup-body">

                <div class="popup-mini-section">
                    <h3>Topic Titles</h3>
                    <input class="form-input course-code" placeholder="Topic Titles" type="text" required>
                </div>

                <div class="popup-mini-section">
                    <h3>Language</h3>
                    <div class="button-group language-selection-quiz">
                        <div class="button active">English</div>
                        <div class="button inactive">Türkçe</div>
                    </div>
                </div>

                <div class="space-two-column-grid">
                    <div class="popup-mini-section">
                        <h3>Questions and Amounts</h3>
                        <p class="mini-message-display">Quizzes shouldn't exceed 10 questions</p>
                        <div class="form-group">
                            <!-- TODO: MCP form-input -->
                            <!-- TODO: FillBlanks form-input -->
                            <!-- TODO: TrueFalse form-input -->
                        </div>
                    </div>

                    <div class="popup-mini-section">
                        <h3>Difficulty</h3>
                        <!-- <p class="mini-message-display"></p> -->
                        <div class="form-group">
                            <!-- TODO: Hard Questions form-input -->
                            <!-- TODO: Medium form-input -->
                            <!-- TODO: Easy form-input -->
                        </div>
                    </div>
                </div>

            </div>

            <div class="popup-footer">
                <div class="button" onclick="generateQuiz('lsibo3tt')">Generate Quiz</div>
            </div>

        </div>
    </div>

    <div class="centered-container">
        <div class="button" onclick="startEditingQuiz('Quiz-evhnwmhzlsrlqwqz.json')">Edit Quiz</div>
    </div>

    <div class="overlay edit-quiz-overlay">
        <div class="popup quiz-popup">
            <div class="popup-header">
                <div class="close-button" onclick="closePopup('.edit-quiz-overlay')">
                    <img src="../assets/icons/close.png" alt="">
                </div>
                <h1 class="pop-up-title">
                    <div class="quiz-details">Quiz</div>
                </h1> 
            </div>
    
            <div class="popup-body quiz-popup-body">

                <div class="button save-button">Save</div>

                <div class="question-header">
                    
                </div>

                <div class="question-area">
                    
                </div>
            </div>
    
            <div class="popup-footer button-group-footer">
                <div class="button-group edit-quiz-button-group">
                    <button class="button previous-question" disabled>Previous Question</button>
                    <div class="grid-view-button">
                        <img src="../assets/icons/grid.png" alt="">
                    </div>
                    <button class="button next-question">Next Question</button>
                </div>
            </div>
        </div>
    </div>

    <style>

        h3 {
            font-weight: 400;
            font-size: 0.9em;
            color: var(--accent);
        }


        .edit-quiz-button-group{
            width: 100%;
            place-items: center;
            grid-template-columns: auto 1fr auto;
        }
        .edit-quiz-button-group > *:first-child { place-self: start; }
        .edit-quiz-button-group > *:last-child { place-self: end; }

        .grid-view-button {
            height: 36px;
            width: 36px;
            border-radius: 50%;
            background: transparent;
            display: grid;
            place-items: center;
            transition: 0.5s all;
            cursor: pointer;
        }.grid-view-button:hover{ background: var(--accent); }
        .grid-view-button:hover img { filter: invert(100%); }

        .grid-view-button img {
            height: 15px;
            width: 15px;
            filter: invert(17%) sepia(35%) saturate(2414%) hue-rotate(308deg) brightness(96%) contrast(96%);
        }

        .space-two-column-grid{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 35px;
        }

        .generate-quiz-popup-body{
            width: 100%;
            justify-items: start;
        }

        .popup-mini-section{
            display: grid;
            grid-gap: 10px;
            width: 100%;
        }

        .language-selection-quiz {
            justify-items: start;
            grid-template-columns: auto auto 1fr;
        }

        .button.active {
            transform: scale(1);
        }

        .button.inactive {
            color: var(--accent);
            border: 3px solid var(--accent);
            background: transparent;
            opacity: 0.5;
        }

        .mini-message-display{
            color: white;
            padding: 8px 8px;
            font-size: 0.40em;
            background: var(--pop);
            border-radius: 5px;
            justify-self: start;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .save-button{
            position: absolute;
            top: 13px;
            right: 13px;
        }

    </style>
    
</body>
</html>
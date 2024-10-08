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
            saveAssessmentAsJSON(filename, questions.questions, "generated");

            let quizID = uniqueID(1);
            let courseID = "lshj44zm";
            let name = "Quiz"; // ...
            let dateGenerated = "Today"; // TODO: ...
            let hierarchy = ""; // ...
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
                <div class="button" onclick="generateQuiz('lsibo3tt')">Generate Quiz j</div>
            </div>

        </div>
    </div>

    <div class="centered-container">
        <div class="button" onclick="startEdittingAssessment('Quiz-evhnwmhzlsrlqwqz.json')">Edit Quiz</div>
    </div>

    <?php include '../teacher/components/editQuizOverlay.php'; ?>

    <style>

    </style>
    
</body>
</html>
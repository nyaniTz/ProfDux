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
            hierarchy: "",
            totalMarks: ""
        }

        //Results

        let result = {
            id: "",
            mark: "4",
            total: "10"
        }


        // TODO: NOTE:startQuiz now has 3 parameters including a quizGradeID
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

    <?php include '../student/components/quizOverlay.php'; ?>

    <style>



    </style>
    
</body>
</html>
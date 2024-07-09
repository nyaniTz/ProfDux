<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Teacher</title>
        <page data-id="Class Stats"></page> 

        <?php include '../include/teacherImports.php'; ?>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">
                <h1 class="large-title">Grades</h1>
            </div>
        </div>

        <script>

            const id = "lth0xgwp";

            ( async () => {

                try {
                    
                    let result = await AJAXCall({
                        phpFilePath: "../include/quiz/getCourseGrades.php",
                        rejectMessage: "Getting Timetable Failed",
                        params: `id=${id}`,
                        type: "fetch"
                    });

                    // console.log(result);

                    const quizGrades = result.quizGrades[0]
                    console.log("quizGrades: ", quizGrades);

                    let objectEntries = Object.entries(quizGrades)
                    console.log(objectEntries[0][1]);

                }catch(error){
                    console.log(error)
                }

            })()
        </script>
    </body>
</html>
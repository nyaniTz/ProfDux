<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Teacher</title>
        <page data-id="Class Stats"></page> 

        <?php include '../include/teacherImports.php'; ?>

        <link rel="stylesheet" href="../css/grid-table.css?2">
        <script src="../js/StatsView.js?" defer></script>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">
                <h1 class="large-title">Grades</h1>

                <div class="grades-stats-review-container">
                    <div class="center-content">
                        <div class="extended-wrapper">
                            <div class="grid-table-section user-table">
                                <ul class="grid-header" data-title="header">
                                    <li class="fixed100">#</li>
                                    <li class="fixed100">Name</li>
                                    <li class="fixed100">Email</li>
                                    <li class="fixed100">Current</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                </ul>

                                <ul class="grid-row">
                                    <li class="itemization-badge fixed100"></li>
                                    <li class="fixed100">Munim</li>
                                    <li class="fixed100">40</li>
                                    <li class="fixed100">40</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                </ul>

                                <ul class="grid-row">
                                    <li class="itemization-badge fixed100"></li>
                                    <li class="fixed100">Munim</li>
                                    <li class="fixed100">40</li>
                                    <li class="fixed100">40</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                    <li class="fixed100">...</li>
                                </ul>

                            </div>

                            <div class="slide-to-scroll">scroll / slide → </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>

            const id = "lth0xgwp";

            //TODO: render choice options ( generic );
            //TODO: on click render class grades view for course.

            ( async () => {

                try {

                    let quizStructure = await AJAXCall({
                        phpFilePath: "../include/quiz/getQuizStructure.php",
                        rejectMessage: "Getting Structure Failed",
                        params: `id=${id}`,
                        type: "fetch"
                    });
                    
                    let result = await AJAXCall({
                        phpFilePath: "../include/quiz/getCourseGrades.php",
                        rejectMessage: "Getting Timetable Failed",
                        params: `id=${id}`,
                        type: "fetch"
                    });

                    const quizGrades = result.quizGrades
                    console.log("quizGrades: ", quizGrades);
                    console.log("structure: ", quizStructure);

                    quizStructure.forEach( structureItem => {
                        console.log(`Quiz ${structureItem.hierarchy}`);
                    });

                    let objectEntries = Object.entries(quizGrades)
                    console.log(objectEntries[0][1]);

                }catch(error){
                    console.log(error)
                }

            })()
        </script>
    </body>
</html>
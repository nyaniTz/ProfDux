<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Student</title>
        <page data-id="Classroom"></page> 

        <?php include '../include/studentImports.php'; ?>

        <link rel="stylesheet" href="../css/classroom.css">
        <script src="../js/Classroom.js" defer></script>


    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">
                
                <div class="centered-container">

                    <h1 class="medium-title">Select a course</h1>

                    <div class="course-view-container mini-container">

                    </div>

               </div>

                <div class="inner-overlay classroom-inner-overlay">
                    <div class="back-arrow" onclick="closePopup('.classroom-inner-overlay')">
                        <img class="icon" src="../assets/icons/fi/fi-rr-arrow-alt-left.svg" alt="">
                    </div>

                    <div class="classroom-outer-container">
                        <div class="classroom-header-elements-container">
                            <h1 class="classroom-course-title"></h1>
                            <h3 class="classroom-course-code"></h3>
                        </div>

                        <div class="outer-main-classroom-container"></div>
                    </div>
        
               </div>

            </div>
        </div>

        <?php include 'components/quizOverlay.php'; ?>


        <style>

            .classroom-inner-overlay {
                grid-template-rows: auto 1fr;
            }

            .classroom-header-elements-container{
                margin-bottom: 20px;
                display: grid;
                grid-gap: 10px;
            }

            .classroom-course-title{
                color: var(--accent);
            }

            .classroom-course-code{
                color: var(--dark-gray);
            }

            .course-view-container .mini-container {
                grid-template-columns: 1fr;
            }

            .course-view-container .mini-container {
                
            }
        </style>

        <script>

            window.addEventListener("load", function() {
                // TODO: Use a different function to call this one
                loadCourses("mine");
            })

        </script>
    </body>
</html>
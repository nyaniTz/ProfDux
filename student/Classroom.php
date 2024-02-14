<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Student</title>
        <page data-id="Classroom"></page> 

        <?php include '../include/studentImports.php'; ?>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">
                
                <div class="centered-container">

                    <h1>Select a course</h1>

                    <div class="course-view-container mini-container">

                    </div>

               </div>

                <div class="inner-overlay classroom-inner-overlay">
                    <div class="back-arrow" onclick="closePopup('.classroom-inner-overlay')">
                        <img class="icon" src="../assets/icons/fi/fi-rr-arrow-alt-left.svg" alt="">
                    </div>

                    <div class="classroom-outer-container">
                        <div class="classroom-course-title">Water Theory</div>
                        <div class="classroom-course-code">C005</div>

                        <!-- TODO: Refactor this element's class to outer-main-classroom-container -->
                        <div class="classroom-outline-container"></div>
                    </div>
        
               </div>

            </div>
        </div>

        <style>

            .classroom-inner-overlay {
                grid-template-rows: auto 1fr;
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
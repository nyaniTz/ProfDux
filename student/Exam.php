<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dux Student</title>
    <page data-id="Exam"></page>

    <?php include '../include/studentImports.php'; ?>
    
</head>

<body>

    <?php include 'components/header.php'; ?>

    <div class="outer-container">
        <?php include 'components/sidebar.php'; ?>
        <div class="main-container">
            <h1 class="large-title">
                Your Exams
            </h1>

            <!-- <div class="course-view-container">
                <div class="container-message blank course-view-container-loader">
                    <div class="sk-fold">
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                    </div>
                </div>
            </div> -->

            <div>
                <h2 class="large-title">
                    Upcoming Exams
                </h2>

                <div class="course-view-container" id="student-exam-container" style="margin-top:10px">
                  
                </div>
            </div>

            <?php include 'components/examModal.php' ?>
        </div>


        <style>
            .classroom-inner-overlay {
                grid-template-rows: auto 1fr;
            }

            .classroom-header-elements-container {
                margin-bottom: 20px;
                display: grid;
                grid-gap: 10px;
            }

            .classroom-course-title {
                color: var(--accent);
            }

            .classroom-course-code {
                color: var(--dark-gray);
            }

            .course-view-container .mini-container {
                grid-template-columns: 1fr;
            }

            .course-view-container .mini-container {}
        </style>

        <script>
            window.addEventListener("load", function() {
                // TODO: Use a different function to call this one
                // loadCourses("mine");
                getAllCoursesOfStudent()
            })
        </script>
</body>

</html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dux Teacher</title>
    <page data-id="Exam"></page>

    <?php include '../include/teacherImports.php'; ?>

</head>

<style>
    .full-width {
        height: 100%;
        width: 100%;

    }
</style>

<body>

    <?php include 'components/header.php'; ?>

    <div class="outer-container">
        <?php include 'components/sidebar.php'; ?>
        <div class="main-container">
            <div class="header-combo">
                <h1 class="large-title">
                    Exam
                </h1>
            </div>

            <div class="course-view-container">
                <div class="container-message blank course-view-container-loader">
                    <div class="sk-fold">
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                    </div>
                </div>
            </div>

            <div class="edit-course-container inner-overlay" style="justify-content: flex-start;flex-direction: column;">

                <div class="back-arrow" onclick="openPopup('.course-view-container'); closeEditCourseContainer()">
                    <img class="icon" src="../assets/icons/fi/fi-rr-arrow-alt-left.svg" alt="">
                </div>

                <?php include 'components/Exams.php' ?>
                <?php include 'components/examModal.php' ?>

            </div>

        </div>
    </div>

    <script>
        window.addEventListener("load", function() {
            loadCoursesForExam("id");
        })
    </script>
</body>

</html>
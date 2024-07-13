<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dux Teacher</title>
    <page data-id="Exam"></page>

    <?php include '../include/teacherImports.php'; ?>
    <script src="../js/UILoaders.js?1"></script>

</head>

<!-- <style>
    .full-width {
        height: 100%;
        width: 100%;
    }
</style> -->

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

            <div class="course-view-container" id="student-exam-container" style="margin-top:10px">
                <div class="container-message blank course-view-container-loader">
                    <div class="sk-fold">
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                        <div class="sk-fold-cube"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>

        ( async () => {
            await loadCourses("id");
        })();

    </script>
    
</body>

</html>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Student</title>
        <page data-id="Courses"></page> 

        <?php include '../include/studentImports.php'; ?>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">
                
                <h1 class="large-title">
                    Course Management
                </h1>

                <div class="course-view-container">
                    
                </div>

            </div>
        </div>

        <script>


            window.addEventListener("load", function() {
                console.log("okay");
                loadCourses("all");
            })

        </script>
    </body>
</html>
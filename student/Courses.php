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
                    Course List
                </h1>

                <div class="course-view-container">
                    
                </div>

            </div>
        </div>

        <script>

            window.addEventListener("load", function() {
                loadCourses("all");
            })

        </script>

        <div class="overlay register-to-course">
            <div class="popup">
                <div class="popup-header">
                    <div class="close-button" onclick="closePopup('.register-to-course')">
                        <img src="../assets/icons/close.png" alt="">
                    </div>
                    <h1 class="pop-up-title">
                        <p>Enroll In Course</p>
                    </h1> 
                </div>

                <div class="popup-body">

                    <h2>-- Course Title --</h2>

                    <p class="description">
                        -- Course Description --
                    </p>

                    <p class="instructor-details">
                        -- Instructor Details -- 
                    </p>
                </div>

                <div class="popup-footer">
                    <div type="submit" class="button enroll-course-button" onclick="enrollToCourse(this)">
                        <p>Enroll</p>
                    </div>
                </div>
            </div>
        </div>

    </body>
</html>
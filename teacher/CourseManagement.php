<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Teacher</title>
        <page data-id="Course Management"></page> 
        <!-- TODO: Make sure you change the data-id for every page -->

        <?php include '../include/teacherImports.php'; ?>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">

                <div class="header-combo">
                    <h1 class="large-title">
                        <text>Course Management</text>
                    </h1>

                    <div class="button" onclick="openCreateCourseOverlay()">
                        <text>Create Course</text>    
                    </div>
                </div>

                <div class="course-view-container">
                    <div>
                        <div class="large-message">
                            <text>No courses yet.</text>
                        </div>

                        <div class="button" onclick="openCreateCourseOverlay()">
                            <text>Create Course</text>    
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

        <script>

            function createCourse(){

            }

            function openCreateCourseOverlay(){
                let courseOverlay = document.querySelector(".create-course-overlay");
                courseOverlay.style.display = "grid";
            }

            function closeCreateCourseOverlay(){
                let courseOverlay = document.querySelector(".create-course-overlay");
                courseOverlay.style.display = "none";
            }

            function loadImageToCoursePopupView(event, outputElement) {

                const output = document.querySelector(outputElement);

                const overWrapper = document.querySelector(".over-wrapper");
                overWrapper.style.display = "none";

                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function() {
                    URL.revokeObjectURL(output.src) // free memory
                }
            }

        </script>

        <style>

            .header-combo {
                display: grid;
                grid-template-columns: 1fr auto;
                grid-gap: 30px;
            }

            .course-view-container {
                display: grid;
                height: 100%;
                width: 100%;
                border: 2px solid var(--accent);
                place-items: center;
                border-radius: 10px;
                background: #FFF7F9;
            }

            .large-message{
                font-size: 2em;
                font-weight: 200;
                color: var(--accent);
            }

            .large-title {
                color: var(--accent);
                font-weight: 600;
            }

            .course-view-container > div {
                display: grid;
                place-items: center;
                grid-gap: 20px;
            }

            .course-form{
                width: 100%;
                display: grid;
                grid-gap: 20px;
            }

            .course-upload-input {
                height: 100%;
                aspect-ratio: 1/1;
                border: 2px dashed var(--accent);
                border-radius: 5px;

                display: grid;
                overflow: hidden;
                position: relative;
            }
            
            .over-wrapper {
                position: absolute;
                background: var(--dark-accent);
                height: 100%;
                width: 100%;
                display: grid;
                place-items: center;
            }

            .over-wrapper img{
                height: 30px;
            }

            .course-image-view {
                height: 100%;
                width: 100%;
                display: grid;
                overflow: hidden;
                position: relative;
            }

            .course-image-view img {
                position: absolute;
                width: inherit;
                min-height: 100%;
            }



        </style>

        <div class="overlay create-course-overlay">
            <div class="popup">
                <div class="popup-header">
                    <div class="close-button" onclick="closeCreateCourseOverlay()">
                        <img src="../assets/icons/close.png" alt="">
                    </div>
                    <h1 class="pop-up-title">
                        <text>Create Course</text>
                    </h1> 
                </div>

                <div class="popup-body">
                    <form class="course-form">
                        <div class="side-by-side-grid">
                            <label for="courseImageUpload" class="course-upload-input">
                                <div class="over-wrapper">
                                    <img class="icon" src="../assets/icons/fi/fi-rr-images.svg" alt="">
                                </div>

                                <div class="course-image-view">
                                    <img class="course-image-view-element" src="" alt="">
                                </div>

                                <input id="courseImageUpload" class="upload-input" type="file" accept="image/*" onchange="loadImageToCoursePopupView(event, '.course-image-view-element')">
                            </label>

                            <div class="form-input-container">
                                <span class="form-input-label"><text>Course Code</text></span>
                                <input class="form-input course-code" placeholder="Course Code" type="text" required>
                            </div>
                        </div>

                        <div class="form-input-container">
                            <span class="form-input-label"><text>Course Name</text></span>
                            <input class="form-input course-name" placeholder="Course Name" type="text" required>
                        </div>
                    </form>
                </div>

                <div class="popup-footer">
                    <div type="submit" class="button" onclick="startUploading()">
                        <text>Create</text>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
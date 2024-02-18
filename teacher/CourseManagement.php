<!DOCTYPE html>
<html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Teacher</title>
        <page data-id="Course Management"></page> 

        <?php include '../include/teacherImports.php'; ?>

    </head>
    <body>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>
            <div class="main-container">

                <div class="header-combo">
                    <h1 class="large-title">
                        Course Management
                    </h1>

                    <div class="button" onclick="openCreateCourseOverlay()">
                        Create Course    
                    </div>
                </div>

                <div class="course-view-container">
                    
                </div>

                <div class="edit-course-container inner-overlay">

                    <div class="back-arrow" onclick="closeEditCourseContainer()">
                        <img class="icon" src="../assets/icons/fi/fi-rr-arrow-alt-left.svg" alt="">
                    </div>

                    <?php include 'components/editCourse.php' ?>
          
                </div>
                
            </div>
        </div>

        <?php include 'components/courseCreationOverlay.php' ?>

        <script>

            window.addEventListener("load", function() {
                console.log("okay");
                loadCourses("id");
            })

            let courseImageObject;

            async function createCourse(){

                let courseCode = document.querySelector(".course-code").value;
                let courseName = document.querySelector(".course-name").value;
                let id = uniqueID(1);

                let { id: creatorID } = await getGlobalDetails();

                let params = `id=${id}&&courseCode=${courseCode}&&title=${courseName}&&creatorID=${creatorID}&&image=''`;

                if(courseImageObject){

                    try {
                        let { newFileName } = await uploadFile(courseImageObject);
                        if(newFileName) params = `id=${id}&&courseCode=${courseCode}&&title=${courseName}&&creatorID=${creatorID}&&image=${newFileName}`;
                        console.log(params);
                    }catch(error){
                        console.log(error);
                    }

                }

                let result = await AJAXCall({
                    phpFilePath: "../include/course/addNewCourse.php",
                    rejectMessage: "course error",
                    params,
                    type: "post"
                });

                setTimeout(() => { 
                    closeCreateCourseOverlay();
                    loadCourses(); 
                }, 2000)
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

                courseImageObject = event.target.files[0];

                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function() {
                    URL.revokeObjectURL(output.src) // free memory
                }
            }

        </script>

        <?php include 'components/uploadCourseMaterialOverlay.php'; ?>
    </body>
</html>
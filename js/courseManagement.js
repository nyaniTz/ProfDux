let globalImageObject;
let globalPDFObject;

function loadImageToPopupView(event, outputElement) {

    // const output = document.querySelector(outputElement);

    let uploadContainer = document.querySelector(".upload-options-container");
    let uploadProgressContainer = document.querySelector(".upload-progress-container");
    uploadContainer.style.display = "none";
    uploadProgressContainer.style.display = "grid";


    let { name: imageName, type: imageType } = event.target.files[0];

    let truncatedImagedString = truncateString(imageName);
    let truncatedFilename = document.querySelector("#truncatedFilename");
    truncatedFilename.textContent = truncatedImagedString;

    setUploadImageObject(event.target.files[0]);

    // console.log("upload event: ", imageName, imageType, truncatedImagedString);

    
    
    // output.src = URL.createObjectURL(event.target.files[0]);
    // output.onload = function() {
    // URL.revokeObjectURL(output.src) // free memory
    // }
}

function loadPDFToPopupView(event, outputElement) {

    // const output = document.querySelector(outputElement);

    let uploadContainer = document.querySelector(".upload-options-container");
    let uploadProgressContainer = document.querySelector(".upload-progress-container");
    uploadContainer.style.display = "none";
    uploadProgressContainer.style.display = "grid";


    let { name: PDFName, type: fileType } = event.target.files[0];

    let truncatedString = truncateString(PDFName);
    let truncatedFilename = document.querySelector("#truncatedFilename");
    truncatedFilename.textContent = truncatedString;

    setUploadPDFObject(event.target.files[0]);

    // console.log("upload event: ", imageName, imageType, truncatedImagedString);



    // output.src = URL.createObjectURL(event.target.files[0]);
    // output.onload = function() {
    // URL.revokeObjectURL(output.src) // free memory
    // }
    }

function revertUploadChoice(){

    let uploadContainer = document.querySelector(".upload-options-container");
    let uploadProgressContainer = document.querySelector(".upload-progress-container");
    uploadContainer.style.display = "grid";
    uploadProgressContainer.style.display = "none";

}

function startUploading(){

    let uploadOverlay = document.querySelector(".upload-overlay");
    let subtopicID = uploadOverlay.getAttribute("data-id");

    uploadWithObject(globalImageObject);
    uploadWithObject(globalPDFObject);

    async function uploadWithObject(fileObject){

        console.log("fileObject", fileObject);

        if(fileObject && subtopicID){

            let {type} = fileObject;
            const id = uniqueID(1);

            try{
                const { newFileName:value } = await uploadFile(fileObject);
                if(value) await sendResourceToDatabase({id, value, type, subtopicID});
                else throw new Error("Upload Failed");
                
                setTimeout(() => {
                    // TODO: animateSuccess();
                    closeUploadOverlay();
                    // TODO: resetUploadOverlay();
                },5000)
            }
            catch(error){
                console.log(error);
            }
        }
        else return;
    }
}

async function sendResourceToDatabase(resourceObject){

    const { 
        id, 
        value, 
        type, 
        subtopicID
    } = resourceObject;

    const params = `id=${id}&&value=${value}&&type=${type}&&subtopicID=${subtopicID}`;

    return await AJAXCall({
        phpFilePath: "../include/course/addNewResource.php",
        rejectMessage: "Adding New Resource Failed",
        params,
        type: "post"
    });

}

function setUploadImageObject(imageObject) {
    globalImageObject = imageObject;
}

function setUploadPDFObject(PDFObject){
    globalPDFObject = PDFObject;
}

function openUploadOverlay(id){

    let uploadOverlay = document.querySelector(".upload-overlay");
    uploadOverlay.style.display = "grid";
    console.log("subtopic ID:", id);
    uploadOverlay.setAttribute('data-id', id);

}

function closeUploadOverlay(){
    let uploadOverlay = document.querySelector(".upload-overlay");
    uploadOverlay.style.display = "none";
}

async function loadCourses(options = "id"){

    let courseViewContainer = document.querySelector(".course-view-container");

    let noCoursesYetText = createLocalizedTextElement("No courses yet");
    let createCourseText = createLocalizedTextElement("Create Course");
    let errorText = createLocalizedTextElement("Something Went Wrong");

    let emptyView = createElement("div", "container-message");
    let largeMessage = createElement("div", "large-message");
    largeMessage.appendChild(noCoursesYetText);

    let createCourseButton = createElement("div", "button");
    createCourseButton.appendChild(createCourseText);

    emptyView.appendChild(largeMessage);
    emptyView.appendChild(createCourseButton);

    let errorView = createElement("div", "container-message");
    largeMessage.innerHTML = "";
    largeMessage.appendChild(errorText);
    errorView.appendChild(largeMessage);

    /* STUDENT VIEW */
    let studentEmptyView = createElement("div", "container-message");
    let NoCoursesYet = createLocalizedTextElement("No Courses Yet");
    let studentlargeMessage = createElement("div", "large-message");
    studentlargeMessage.appendChild(NoCoursesYet);
    studentEmptyView.appendChild(studentlargeMessage);

    let myEmptyView = createElement("div", "container-message");
    let NoSelectedCoursesYet = createLocalizedTextElement("You haven't chosen any courses yet");
    let myLargeMessage = createElement("div", "large-message");
    myLargeMessage.appendChild(NoSelectedCoursesYet);
    myEmptyView.appendChild(myLargeMessage);


    let loader = 
    `   <div class="container-message blank">
            <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        </div>`;

    courseViewContainer.innerHTML = loader;

    let { id:userID } = await getGlobalDetails();

    console.log("userID: ", userID);

    try {

        const params = `id=${userID}`;

        console.log(params);

        let phpFilePath;

        switch(options){
            case "id": 
                phpFilePath = "../include/course/getCourses.php";
            break;
            case "all":
                phpFilePath = "../include/course/getAllCourses.php";
            break;
            case "mine":
                phpFilePath = "../include/course/getMyCourses.php";
            break;
        }
        
        const result = await AJAXCall({
            phpFilePath,
            rejectMessage: "Getting Courses Failed",
            params,
            type: "fetch"
        });

        setTimeout(() => {
            console.log("result", result);

            if(result && result.length > 0) {
                console.log("so far so good.");
                loadCoursesUI(result, options, userID);
            }
            else {

                //TODO: This part might cause bugs in future versions
                courseViewContainer.innerHTML = "";

                switch(options){
                    case "id":  // Refactor this to be "teacher"
                        courseViewContainer.appendChild(emptyView);
                    break;
                    case "all": // Refactor this to be "student subscriptions"
                        courseViewContainer.appendChild(studentEmptyView);
                        ;
                    case "mine": // Refactor this to be "mine -- or -- classview"
                        courseViewContainer.appendChild(myEmptyView);
                        ;
                }
            }
        }, 2000);
    }
    catch(error){

    }

    function loadCoursesUI(coursesObject, options, userID){

        console.log("userID: ", userID);

        courseViewContainer.innerHTML = "";

        coursesObject.map( async (course) => {

            console.log("this course: ", course);

            const { id, title, image, courseCode } = course;

            let courseCard = createElement("div", "course-card");

            let courseCardImage = createElement("div", "course-card-image");
            let imageElement = document.createElement("img");

            imageElement.src = image.length > 2 ? `../uploads/${image}` : `../assets/images/courseDefault.jpg` ;
            courseCardImage.appendChild(imageElement);
            
            let cardText = createElement("div", "card-text");
            let courseCardCode = createElement("div", "course-card-code");
            let courseCardTitle = createElement("div", "course-card-title");
            
            courseCardCode.textContent = courseCode;
            courseCardTitle.textContent = title;

            cardText.appendChild(courseCardCode);
            cardText.appendChild(courseCardTitle);

            let cardOverlay = createElement("div", "card-overlay");

            courseCard.appendChild(courseCardImage);
            courseCard.appendChild(cardText);
            courseCard.appendChild(cardOverlay);

            let subscriptionResult = await getCourseSubscriptionStatus(id, userID);

            courseCard.addEventListener("click", () => {
                switch(options){
                    case "id": 
                        editCourseWith(id);
                    break;
                    case "all":
                        // TODO: Using Subscriptions, toggle different popups.
                        subscriptionEvent(subscriptionResult, {id, userID})();
                        break;
                    case "mine":
                        goToCourse(id);
                        break;
                }
            });

            // This is the subscription part for the student view.
            let subscriptionIcon = document.createElement("div");
            subscriptionIcon.className = "subscription-icon";
            let tickImageElement = document.createElement("img");
            tickImageElement.src = "../assets/icons/check.png";
            subscriptionIcon.appendChild(tickImageElement);

            try {
                if(subscriptionResult[0].status == "true"){
                    courseCard.appendChild(subscriptionIcon);
                }
            }catch(error){

            }         
            // ENDS HERE

            courseViewContainer.appendChild( courseCard );
        });

        function subscriptionEvent(subscriptionArray, {id, userID}){

            try{

                if(subscriptionArray.length > 0){
                    let status = subscriptionArray[0];
                    console.log("status: ", status);
                    if(status.status == "true") return () => showDeRegisterPopup(id, userID);
                    // else return showDeRegisterPopup;     
                } else return () => showRegisterPopup(id, userID);
                
            }
            catch(error){

            }
        
        }

        function showDeRegisterPopup(courseID, userID){
            console.log("Course has been registered, click will bring up de registration option");
        }

        function showRegisterPopup(courseID, userID){

            let enrollButton = document.querySelector(".enroll-course-button");
            enrollButton.setAttribute("data-courseID", courseID);
            enrollButton.setAttribute("data-userID", userID);

            openPopup(".register-to-course");

            console.log("Course has not been registered");
        }

    }

    async function getCourseSubscriptionStatus(id, userID){

        return await AJAXCall({
            phpFilePath: "../include/course/getSubscriptionStatus.php",
            rejectMessage: "Getting Status Failed",
            params: `id=${id}&&userID=${userID}`,
            type: "fetch"
        });

    }

    function goToCourse(id){

        console.log("curent id:", id);
        openPopup(".classroom-inner-overlay");
        renderCourseOutline(id);

    }

    function editCourseWith(id){

        let mainContainer = document.querySelector(".main-container");
        openPopup(".edit-course-container");

        let titleElement = document.querySelector("#course-title");
        titleElement.textContent = "";
    
        let courseCode = document.querySelector("#course-code");
        courseCode.textContent = "";
        
        fetchCourseWithID(id);

    }

}

async function enrollToCourse(buttonElement){

    let courseID = buttonElement.getAttribute("data-courseID");
    let userID = buttonElement.getAttribute("data-userID");

    let id = uniqueID(1);

            try {
                let result = await AJAXCall({
                    phpFilePath: "../include/course/addSubscriptionToCourse.php",
                    params: `id=${id}&&courseID=${courseID}&&userID=${userID}`,
                    rejectMessage: "Error Subscribing To Course",
                    type: "post"
                });

                console.log(result);

                //TODO: close popup
                //TODO: refresh container

            }catch(error){
                console.log(error);
            }

}

function closeEditCourseContainer(){

    let editCourseContainer = document.querySelector(".edit-course-container");
    editCourseContainer.style.display = "none";

}
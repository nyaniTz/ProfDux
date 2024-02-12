let globalImageObject;
let globalPDFObject;

loadCourses();

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

async function loadCourses(){

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

    let { id } = await getGlobalDetails();

    try {

        const params = `id=${id}`;

        console.log(params);
        
        const result = await AJAXCall({
            phpFilePath: "../include/course/getCourses.php",
            rejectMessage: "Getting Courses Failed",
            params,
            type: "fetch"
        });

        setTimeout(() => {
            if(result) {
                loadCoursesUI(result);
            }
            else {
                courseViewContainer.innerHTML = "";
                courseViewContainer.appendChild(emptyView);
            }
        }, 2000);
    }
    catch(error){
        courseViewContainer.innerHTML = "";
        courseViewContainer.appendChild(errorView);
    }

    function loadCoursesUI(coursesObject){

        courseViewContainer.innerHTML = "";

        coursesObject.map( course => {

            const { id, title, image, courseCode,  } = course;

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

            courseCard.addEventListener("click", () => {
                editCourseWith(id);
            });

            courseViewContainer.appendChild( courseCard );
        });

    }

    function editCourseWith(id){

        let mainContainer = document.querySelector(".main-container");
        let editCourseContainer = document.querySelector(".edit-course-container");
        editCourseContainer.style.display = "grid";

        let titleElement = document.querySelector("#course-title");
        titleElement.textContent = "";
    
        let courseCode = document.querySelector("#course-code");
        courseCode.textContent = "";
        
        fetchCoursesWithID(id);

    }

}

function closeEditCourseContainer(){

    let editCourseContainer = document.querySelector(".edit-course-container");
    editCourseContainer.style.display = "none";

}
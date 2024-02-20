class Classroom {

    constructor(courseObject, courseID){
        let {
            title,
            courseCode,
            lectures,
            id,
        } = courseObject

        this.title = title;
        this.courseCode = courseCode;
        this.lectures = lectures;
        this.courseObject = courseObject;
        this.id = id;
        this.courseID = courseID;
    }

    renderTitle(){
        let titleElement = findElement(".classroom-course-title");
        let textElement = document.createElement("div");
        textElement.textContent = this.title;
        titleElement.innerHTML = "";
        titleElement.appendChild(textElement);
    }

    renderCourseCode(){
        let titleElement = findElement(".classroom-course-code");
        let textElement = createLocalizedTextElement(this.courseCode);        
        titleElement.innerHTML = "";
        titleElement.appendChild(textElement);
    }

    renderCourseOutline(){

        let outerMainClassroomContainer = findElement(".outer-main-classroom-container");
        outerMainClassroomContainer.innerHTML = "";

        this.lectures.forEach( lecture => {

            let mainClassroomLectureContainer = createElement("div", "main-classroom-lecture-container");
            let mainClassroomLectureHeader = createElement("div", "main-classroom-lecture-header");
            let mainClassroomLectureInnerContainer = createElement("div", "main-classroom-lecture-inner-container");

            mainClassroomLectureHeader.textContent = lecture.title;

            lecture.subtopics.forEach( subtopic => {

                let mainClassroomSubtopicContainer = createElement("div", "main-classroom-subtopic-container");
                let mainClassroomSubtopicHeader = createElement("div", "main-classroom-subtopic-header");

                mainClassroomSubtopicHeader.textContent = subtopic.title;
                mainClassroomSubtopicContainer.appendChild(mainClassroomSubtopicHeader);

                subtopic.resources.forEach( resource => {

                    let mainClassroomSubtopicItem = this.createSubtopicItem(resource);
                    mainClassroomSubtopicContainer.appendChild(mainClassroomSubtopicItem);

                })

                mainClassroomLectureInnerContainer.appendChild(mainClassroomSubtopicContainer);

            });

            lecture.quizzes.forEach( async(quiz,index) => {

                const quizRowItemButton = document.createElement("button");
                quizRowItemButton.className = "row-item-action quiz-action";
                quizRowItemButton.textContent = "start";

                // New Quiz
                // courseID and lectureID are available here ...
                let {
                    id: quizID,
                    filename: fromTeacherQuizFilename,
                    // name,
                } = quiz;
                
                let { id: globalUserID } = globalUserDetails;
                console.log("user id: ", globalUserID);

                const quizResponse = await AJAXCall({
                    phpFilePath: "../include/quiz/getPersonalQuizGrades.php",
                    rejectMessage: "Quiz Grades Failed To Be Fetched",
                    params: `userID=${globalUserID}&&quizID=${quizID}`,
                    type: "fetch",
                }); // TODO:

                console.log("quiz response: ", quizResponse);

                if(quizResponse.length > 0){

                    let {
                        id: quizGradeID,
                        filename: studentQuizFilename,
                        status: quizStatus,
                    } = quizResponse[0];

                    const quizObjectRequired = {
                            id: quizGradeID,
                            userID: globalUserID,
                            quizID,	
                            fileToLoad: studentQuizFilename,
                            fileToSave: studentQuizFilename,
                    }
    
                    switch(quizStatus){
                        case "started":
                            quizRowItemButton.textContent = "Resume Quiz"; // TODO: Localize
                            quizRowItemButton.addEventListener("click", () => {
                                startQuiz(quizObjectRequired, "resume"); // Resume Quiz
                                quizRowItemButton.setAttribute("disabled", true);
                                quizRowItemButton.textContent = "started";
                            })
                        break;
                        case "done":
                            quizRowItemButton.textContent = "Review Results"; // TODO: Localize
                            quizRowItemButton.addEventListener("click", () => {
                                viewQuizResults(result); // View Results
                            });
                        break;
                    }
                }else{

                    const quizObjectRequired = {
                        id: uniqueID(1),
                        userID: globalUserID,	
                        quizID,	
                        fileToLoad: fromTeacherQuizFilename,
                        fileToSave: `Quiz-${uniqueID(2)}.json`,
                    }

                    console.log("quizObjectRequired: ", quizObjectRequired);


                    quizRowItemButton.textContent = "Start Quiz"; // TODO: Localize
                    quizRowItemButton.addEventListener("click", () => {
                        startQuiz(quizObjectRequired, "new"); // New Quiz
                        quizRowItemButton.setAttribute("disabled", true);
                        quizRowItemButton.textContent = "started";
                    });
                }
                
                const quizClassroomSubtopicContainer = document.createElement("div");
                quizClassroomSubtopicContainer.className = "main-classroom-subtopic-container";

                const quizSubtopicItem = document.createElement("div");
                quizSubtopicItem.className = "main-classroom-subtopic-item";

                const quizRowItemIcon = document.createElement("div");
                quizRowItemIcon.className = "row-item-icon";

                const quizRowItemIconImage = document.createElement("img");
                quizRowItemIconImage.src = "../assets/icons/quiz.png";

                quizRowItemIcon.appendChild(quizRowItemIconImage);

                const quizRowItemText = document.createElement("div");
                quizRowItemText.className = "row-item-text";
                quizRowItemText.textContent = "Quiz";

                //TODO: fetch quiz grades if quiz has been done for resumability
                // and review.

                quizSubtopicItem.appendChild(quizRowItemIcon)
                quizSubtopicItem.appendChild(quizRowItemText)
                quizSubtopicItem.appendChild(quizRowItemButton)

                quizClassroomSubtopicContainer.appendChild(quizSubtopicItem);

                mainClassroomLectureInnerContainer.appendChild(quizClassroomSubtopicContainer);

            })

            mainClassroomLectureContainer.appendChild(mainClassroomLectureHeader);
            mainClassroomLectureContainer.appendChild(mainClassroomLectureInnerContainer);
            outerMainClassroomContainer.appendChild(mainClassroomLectureContainer);

        });

    }

    createSubtopicItem(resource){

        let resourceType = extractType(resource.type);
        let { id, value } = resource;

        let mainClassroomSubtopicItem = createElement("div", "main-classroom-subtopic-item");
        mainClassroomSubtopicItem.setAttribute("id", id);

        let rowItemIcon = createElement("div", "row-item-icon")
        let rowItemText = createElement("div", "row-item-text")
        let rowItemAction = createElement("div", "row-item-action");

        let imageElement = document.createElement("img");

        switch(resourceType){
            case "image":
                imageElement.src = "../assets/icons/image.png";
                //TODO: change this textContent to a localizedTranslatableElement
                rowItemAction.textContent = "view";
                rowItemAction.addEventListener("click", () => openImageViewer(`../uploads/${value}`))
                break;
            case "pdf":
                imageElement.src = "../assets/icons/pdf.png";
                rowItemAction.textContent = "view";
                rowItemAction.addEventListener("click", () => openPDFViewer(`../uploads/${value}`))
                break;
            default:
                throw new Error("Type has not been created yet!");
                break;
        }

        //TODO: This should be changed to the title of the resource;
        rowItemText.textContent = value;

        rowItemIcon.appendChild(imageElement);
        mainClassroomSubtopicItem.appendChild(rowItemIcon)
        mainClassroomSubtopicItem.appendChild(rowItemText)
        mainClassroomSubtopicItem.appendChild(rowItemAction)

        return mainClassroomSubtopicItem;

    }

}

function extractType(type){
    
    switch(type){
        //TODO: refactor so that any image types can be accepted
        case "image/png":
        case "image/jpg":
        case "image/jpeg":    
            return "image";
        case "application/pdf":
            return "pdf";
    }
}

async function renderCourseOutline(givenID){

    let courses = await AJAXCall({
        phpFilePath: "../include/course/getCourseDetails.php",
        rejectMessage: "Getting Details Failed",
        params: `id=${givenID}`,
        type: "fetch"
    });

    console.log("courses 0 :", courses[0], givenID);

    let classroom = new Classroom(courses[0], givenID);

    classroom.renderTitle();
    classroom.renderCourseCode();
    classroom.renderCourseOutline();

}

function refreshCourseOutline(){
    let classRoomOverlay = document.querySelector(".classroom-inner-overlay");
    let id = classRoomOverlay.getAttribute("id");
    renderCourseOutline(id);
}
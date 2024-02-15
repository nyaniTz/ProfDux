class Classroom {

    constructor(courseObject){
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
        this.id = id
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
        //TODO: refactor so that any image types cna be accepted
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

    console.log(courses);

    let classroom = new Classroom(courses[0]);

    classroom.renderTitle();
    classroom.renderCourseCode();
    classroom.renderCourseOutline();

    console.log(courses);

}

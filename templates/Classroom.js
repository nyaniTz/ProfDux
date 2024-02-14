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

        let mainClassroomLectureContainer = createElement("div", "main-classroom-lecture-container");

        this.lectures.forEach( lecture => {
            
            let mainClassroomLectureHeader = createElement("div", "main-classroom-lecture-header");
            let mainClassroomLectureInnerContainer = createElement("div", "main-classroom-lecture-inner-container");

            this.lectures.subtopics.forEach( subtopic => {

                let mainClassroomSubtopicContainer = createElement("div", "main-classroom-subtopic-container");
                let mainClassroomSubtopicHeader = createElement("div", "main-classroom-subtopic-header");

                mainClassroomSubtopicHeader.textContent = subtopic.title;

                let resourceType = extractType(subtopic.type);

                let mainClassroomSubtopicItem = createSubtopicItem(resourceType);

                
            });
        });

    }

    createSubtopicItem(type){

        let mainClassroomSubtopicItem = createElement("div", "main-classroom-subtopic-item");

        let rowItemIcon = createElement("div", "row-item-icon")
        let rowItemText = createElement("div", "row-item-text")
        let rowItemAction = createElement("div", "row-item-action");


    }

}

function extractType(type){
    return 'image';
}

async function renderCourseOutline(givenID){

    let courses = await AJAXCall({
        phpFilePath: "../include/course/getCourseDetails.php",
        rejectMessage: "Getting Details Failed",
        params: `id=${givenID}`,
        type: "fetch"
    });

    let classroom = new Classroom(courses[0]);

    classroom.renderTitle();
    classroom.renderCourseCode();

    console.log(courses);

}


// classroom-outline-container
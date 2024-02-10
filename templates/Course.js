class Course {

    status =  "unchaged"
    id
    title
    courseCode
    lectures

    lectureIndex = 0
    
    lectureUpdates = {}
    subtopicUpdates = {}

    newLectures = {}
    newSubtopics = {}
    newResources = {}

    deleteLectures = {}
    deleteSubtopic = {}
    deleteResource = {}

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

    setTitle(title, _this){
        console.log(_this);
        _this.title = title;
        _this.renderTitle();
    }

    renderTitle(){
        let titleElement = document.querySelector("#course-title");
        let textElement = createLocalizedTextElement(this.title);
        titleElement.innerHTML = "";
        titleElement.appendChild(textElement);
    }

    renderCourseCode(){
        let titleElement = document.querySelector("#course-code");
        let textElement = createLocalizedTextElement(this.courseCode);        
        titleElement.innerHTML = "";
        titleElement.appendChild(textElement);
    }

    addLectureElement(){

        let lectureID = uniqueID(1);

        let courseGridContainer = document.querySelector("#course-grid-container");

        let lectureSection = document.createElement("div");
        lectureSection.className = "lecture-section";

        let itemizationElement = document.createElement("div");
        itemizationElement.className = "itemization";
        itemizationElement.textContent = `${++this.lectureIndex}.`;

        let lectureInnerContainer = document.createElement("div");
        lectureInnerContainer.className = "lecture-inner-container";

        let lectureInputElement = this.createInputElement(lectureID, "", this.newLectureTitle, "lecture");

        lectureInnerContainer.appendChild(lectureInputElement);

        // lectureInnerContainer.appendChild(subtopicsContainer);
        lectureSection.appendChild(itemizationElement);
        lectureSection.appendChild(lectureInnerContainer);
        courseGridContainer.appendChild(lectureSection);

        console.log("Done adding lecture element")
    }
    updateLectureTitle(id, title, _this){
        console.log(_this);
        _this.lectureUpdates[id] = { id, title };
        console.log("lecture Updates: ", _this.lectureUpdates);
    }

    updateSubtopicTitle([id, lectureID], title, _this){
        _this.subtopicUpdates[id] = { id, lectureID, title };
        console.log("subtopic Updates: ", _this.subtopicUpdates);
    }

    newLectureTitle(id, title, _this){
        _this.newLectures[id] = { id, title };
        console.log("new lecture: ", _this.newLectures);
    }

    deleteLectureTitle(id, title, _this){
        _this.deleteLectures[id] = { id, title };
        console.log("delete lecture: ", _this.deleteLectures);

        // The function that will bind to the deleteLectures object
        // will need to cascade by SQL to delete all subtopics
        // that are bound to this lecture

        // It will also need to erase all files and resources as well.
    }

    deleteSubtopicTitle([id, lectureID], title, _this){
        _this.deleteSubtopic[id] = { id, title };
        console.log("delete subtopic: ", _this.deleteSubtopic);
    }

    renderLectureSection(){

        let courseGridContainer = document.querySelector("#course-grid-container");

        this.lectures.forEach( (lecture, index) => {

            lecture.id
            lecture.title
            lecture.subtopics
            this.lectureIndex += 1;

            let lectureSection = document.createElement("div");
            lectureSection.className = "lecture-section";

            let itemizationElement = document.createElement("div");
            itemizationElement.className = "itemization";
            itemizationElement.textContent = `${index + 1}.`;

            let lectureInnerContainer = document.createElement("div");
            lectureInnerContainer.className = "lecture-inner-container";

            let lectureInputElement = this.createInputElement(lecture.id, lecture.title, this.updateLectureTitle, "lecture");

            lectureInnerContainer.appendChild(lectureInputElement);


            let subtopicsContainer = document.createElement("div");
            subtopicsContainer.className = "subtopics-container";

            lecture.subtopics.forEach( subtopic => {

                let attachButton = document.createElement("div");
                attachButton.className = "attachments-button";
                attachButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-paperclip-vertical.svg" alt="">`;
                attachButton.addEventListener("click", () => {});

                let subtopicInputElement = this.createInputElement([subtopic.id, lecture.id], subtopic.title, this.updateSubtopicTitle, "subtopic");
                subtopicInputElement.appendChild(attachButton);

                subtopicsContainer.appendChild(subtopicInputElement);
            })

            lectureInnerContainer.appendChild(subtopicsContainer);
            lectureSection.appendChild(itemizationElement);
            lectureSection.appendChild(lectureInnerContainer);
            courseGridContainer.appendChild(lectureSection);

        });

    }

    searchAndDeleteLecture(id){

        this.lectures.forEach( (lecture, index) => {
            if(lecture.id == id) {
                this.deleteLectureTitle(id, "", this);
                return;
            }
        })

    }

    searchAndDeleteSubtopic(id){

        let lectureIndex = null;
        let [_id, _lectureID ] = id;

        this.lectures.forEach( (lecture,index) => {
            if(lecture.id == _lectureID){
                lectureIndex = index;
                return;
            }
        })

        if(lectureIndex != null){
            this.lectures[lectureIndex].subtopics.forEach( (subtopic,index) => {
                if(subtopic.id == _id){
                    this.deleteSubtopicTitle(id, "", this);
                    return;
                }
            })
        }

    }

    createInputElement(id, title, inputChangeCallback, type){         
        let inputElementContainer = document.createElement("div");
        inputElementContainer.className = "input-element";

        let inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = title;
        inputElement.setAttribute("data-id", id);
        
        inputElement.onchange = () => {
            console.log(inputElement.value);
            inputChangeCallback(id, inputElement.value, this);
        }

        let deleteButton = document.createElement("div");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-delete.svg" alt="">`;

        deleteButton.addEventListener("click", () => {

            switch(type){
                case "lecture":
                    inputElementContainer.parentElement.parentElement.remove();
                    this.searchAndDeleteLecture(id)
                    this.lectureIndex--
                    break;
                case "subtopic":
                    inputElementContainer.remove();
                    this.searchAndDeleteSubtopic(id)
                    break;
            }

        });

        inputElementContainer.appendChild(inputElement);
        inputElementContainer.appendChild(deleteButton);

        return inputElementContainer;
    }

    renderSubtopics(lectureID){

    }

}

let myCourse = {
    id: "343",
    title: "Water Theory",
    courseCode: "C005",
    lectures: [
        {
            id: "256",
            title: "Introduction",
            subtopics: [
                { id: "64d", title: "Me as a teacher", resources: ["a", "b", "c"] },
                { id: "54d", title: "Me not as a teacher", resources: ["a", "b", "c"] },
                { id: "77k", title: "Hooray", resources: ["a", "b", "c"] },
            ]
        }
    ]
}

let course = new Course(myCourse);
course.renderTitle();
course.renderCourseCode();
course.renderLectureSection();

document.querySelector("#addNewLecture").addEventListener("click", () => {
    course.addLectureElement();
})

// TODO:  create a function that fetches all the data and
// compiles it into the object we need
class Course {

    status =  "unchaged"
    title
    courseCode
    lectures
    courseObject

    constructor(courseObject){
        let {
            title,
            courseCode,
            lectures,
        } = courseObject

        this.title = title;
        this.courseCode = courseCode;
        this.lectures = lectures;
        this.courseObject = courseObject;
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

    }

    deleteLectureElement(){

    }

    updateLectureTitle(id, title, _this){

        _this.lectures.forEach( (lecture, index) => {
            if(lecture.id == id){
                _this.lectures[index].title = title;
            }
        })

    }

    updateSubtopicTitle([id, lectureID], title, _this){

        let lectureIndex;

        console.log("id:", id, "lectureID: ", lectureID)

        _this.lectures.forEach( (lecture,index) => {
            if(lecture.id == lectureID){
                lectureIndex =  index;
            }
        })

        _this.lectures[lectureIndex].subtopics.forEach( (subtopic,index) => {
            if(subtopic.id == id){
                _this.lectures[lectureIndex].subtopics[index].title = title;
            }
        })


        console.log(_this.lectures)

    }

    

    renderLectureSection(){

        let finalHTML = "";

        let courseGridContainer = document.querySelector("#course-grid-container");

        this.lectures.forEach( (lecture, index) => {

            lecture.id
            lecture.title
            lecture.subtopics

            let lectureSection = document.createElement("div");
            lectureSection.className = "lecture-section";

            let itemizationElement = document.createElement("div");
            itemizationElement.className = "itemization";
            itemizationElement.textContent = `${index + 1}.`;

            let lectureInnerContainer = document.createElement("div");
            lectureInnerContainer.className = "lecture-inner-container";

            let lectureInputElement = this.createInputElement(lecture.id, lecture.title, this.updateLectureTitle);

            lectureInnerContainer.appendChild(lectureInputElement);


            let subtopicsContainer = document.createElement("div");
            subtopicsContainer.className = "subtopics-container";

            lecture.subtopics.forEach( subtopic => {

                let attachButton = document.createElement("div");
                attachButton.className = "attachments-button";
                attachButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-paperclip-vertical.svg" alt="">`;
                attachButton.addEventListener("click", () => {});

                let subtopicInputElement = this.createInputElement([subtopic.id, lecture.id], subtopic.title, this.updateSubtopicTitle);
                subtopicInputElement.appendChild(attachButton);

                subtopicsContainer.appendChild(subtopicInputElement);
            })

            lectureInnerContainer.appendChild(subtopicsContainer);
            lectureSection.appendChild(itemizationElement);
            lectureSection.appendChild(lectureInnerContainer);
            courseGridContainer.appendChild(lectureSection);


            
        });

    }

    createInputElement(id, title, inputChangeCallback){         
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
        deleteButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-delete.svg" alt="">`

        inputElementContainer.appendChild(inputElement);
        inputElementContainer.appendChild(deleteButton);

        return inputElementContainer;
    }

    renderSubtopics(lectureID){

    }

    displayCourseOutline(){

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

// TODO:  create a function that fetches all the data and
// compiles it into the object we need
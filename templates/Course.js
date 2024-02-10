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

        let lectureInputElement = this.createInputElement([lectureID, this.id], "", this.newLectureTitle, "lecture");

        let addSubtopicButton = document.createElement("div");
        addSubtopicButton.className = "add-subtopic-button";
        addSubtopicButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-plus.svg" alt="">`;
        
        let subtopicsContainer = document.createElement("div");
        subtopicsContainer.className = "subtopics-container";

        addSubtopicButton.addEventListener("click", () => {
            this.addSubtopicElement(lectureID, subtopicsContainer);
        });

        lectureInnerContainer.appendChild(lectureInputElement);
        lectureInnerContainer.appendChild(subtopicsContainer);
        lectureSection.appendChild(addSubtopicButton);
        lectureSection.appendChild(itemizationElement);
        lectureSection.appendChild(lectureInnerContainer);
        courseGridContainer.appendChild(lectureSection);

        console.log("Done adding lecture element")
    }

    addSubtopicElement(lectureID, parentElement){

        let subtopicID = uniqueID(1);

        let attachButton = document.createElement("div");
        attachButton.className = "attachments-button";
        attachButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-paperclip-vertical.svg" alt="">`;
        attachButton.addEventListener("click", () => {});

        let subtopicInputElement = this.createInputElement([subtopicID, lectureID], "", this.newSubtopicTitle, "subtopic");
        subtopicInputElement.appendChild(attachButton);

        parentElement.appendChild(subtopicInputElement);

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

    newLectureTitle([id, courseID], title, _this){
        _this.newLectures[id] = { id, title, courseID };
        console.log("new lecture: ", _this.newLectures);
    }

    newSubtopicTitle([id, lectureID], title, _this){
        _this.newSubtopics[id] = { id, lectureID, title };
        console.log("new subtopics: ", _this.newSubtopics);
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

            let addSubtopicButton = document.createElement("div");
            addSubtopicButton.className = "add-subtopic-button";
            addSubtopicButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-plus.svg" alt="">`;

            let subtopicsContainer = document.createElement("div");
            subtopicsContainer.className = "subtopics-container";

            addSubtopicButton.addEventListener("click", () => {
                this.addSubtopicElement(lecture.id, subtopicsContainer);
            });

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
            lectureSection.appendChild(addSubtopicButton);
            lectureSection.appendChild(itemizationElement);
            lectureSection.appendChild(lectureInnerContainer);
            courseGridContainer.appendChild(lectureSection);

        });

    }

    searchAndDeleteLecture(id){

        let deleted = false;

        this.lectures.forEach( (lecture, index) => {
            if(lecture.id == id) {
                this.deleteLectureTitle(id, "", this);
                deleted = true;
                return;
            }
        })

        if(!deleted){
            delete this.newLectures[id]
        }

    }

    searchAndDeleteSubtopic(id){

        let deleted = false;

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
                    deleted = true;
                    return;
                }
            })
        }

        if(!deleted){
            delete this.newSubtopics[id]
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

// let myCourse = {
//     id: "343",
//     title: "Water Theory",
//     courseCode: "C005",
//     lectures: [
//         {
//             id: "256",
//             title: "Introduction",
//             subtopics: [
//                 { id: "64d", title: "Me as a teacher", resources: ["a", "b", "c"] },
//                 { id: "54d", title: "Me not as a teacher", resources: ["a", "b", "c"] },
//                 { id: "77k", title: "Hooray", resources: ["a", "b", "c"] },
//             ]
//         }
//     ]
// }

async function fetchCourses(){

    let courses = await AJAXCall({
        phpFilePath: "../include/course/getCourseDetails.php",
        rejectMessage: "Getting Details Failed",
        params: "",
        type: "fetch"
    });

    console.log(courses[0]);

    let course = new Course(courses[0]);
    course.renderTitle();
    course.renderCourseCode();
    course.renderLectureSection();

    document.querySelector("#addNewLecture").addEventListener("click", () => {
        course.addLectureElement();
    })

    document.querySelector("#saveCourseDetails").addEventListener("click", async () => {
        await loopThroughObjectForAsync(course.lectureUpdates, updateLectureTitleToDatabase);
        await loopThroughObjectForAsync(course.newLectures, addLectureTitleToDatabase);
        await loopThroughObjectForAsync(course.subtopicUpdates, updateSubtopicTitleToDatabase);
        await loopThroughObjectForAsync(course.newSubtopics, addSubtopicTitleToDatabase);
    })

    async function loopThroughObjectForAsync(courseObject, asyncCallback){
        
        if(courseObject){

            let __courseObjectEntries = Object.entries(courseObject);

            __courseObjectEntries.map( async([key, details] = entry) => {
                try {
                    let result = await asyncCallback(details);
                    console.log(result);
                }
                catch(error){
                    console.log(error);
                }
            });
            
        }
    }

}

fetchCourses();

async function updateLectureTitleToDatabase(lectureOject){
    let { id, title } = lectureOject;

    let params = `lectureID=${id}&&title=${title}`;

    let courses = await AJAXCall({
        phpFilePath: "../include/course/editLectureDetails.php",
        rejectMessage: "Getting Details Failed",
        params,
        type: "post"
    });

    console.log(courses);

}

async function updateSubtopicTitleToDatabase(subtopicObject){
    let { id, title } = subtopicObject;

    let params = `id=${id}&&title=${title}`;

    let courses = await AJAXCall({
        phpFilePath: "../include/course/editSubtopicDetails.php",
        rejectMessage: "Setting Details Failed",
        params,
        type: "post"
    });

    console.log(courses);

}

async function addLectureTitleToDatabase(lectureOject){
    let { id, title, courseID } = lectureOject;

    let params = `id=${id}&&title=${title}&&courseID=${courseID}`;

    let lecture = await AJAXCall({
        phpFilePath: "../include/course/addNewLecture.php",
        rejectMessage: "Setting Details Failed",
        params,
        type: "post"
    });

    console.log(lecture);

}

async function addSubtopicTitleToDatabase(subtopicObject){
    let { id, lectureID, title } = subtopicObject;

    let params = `id=${id}&&title=${title}&&lectureID=${lectureID}`;

    let result = await AJAXCall({
        phpFilePath: "../include/course/addNewSubtopic.php",
        rejectMessage: "Adding New Subtopic Failed",
        params,
        type: "post"
    });

    console.log(result);

}



// TODO:  create a function that fetches all the data and
// compiles it into the object we need
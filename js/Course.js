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
        let titleElement = findElement("#course-title");
        let textElement = document.createElement("p");
        textElement.textContent = this.title;
        titleElement.innerHTML = "";
        titleElement.appendChild(textElement);
    }

    renderCourseCode(){
        let titleElement = findElement("#course-code");
        let textElement = createLocalizedTextElement(this.courseCode);        
        titleElement.innerHTML = "";
        titleElement.appendChild(textElement);
    }


    renderLectureSection(){

        let courseGridContainer = findElement("#course-grid-container");

        courseGridContainer.innerHTML = "";

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

            // BADGE FOR SHOWING UPLOADS
            let resourcesCount = 0;

            lecture.subtopics.forEach( subtopic => {
                resourcesCount += subtopic.resources.length;
            });

            const badgeButton = this.createBadgeButton(lecture.id, resourcesCount);
            lectureInputElement.appendChild(badgeButton);

            let addSubtopicButton = document.createElement("div");
            addSubtopicButton.className = "add-subtopic-button";
            addSubtopicButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-plus.svg" alt="">`;

            let subtopicsContainer = document.createElement("div");
            subtopicsContainer.className = "subtopics-container";

            addSubtopicButton.addEventListener("click", () => {
                this.addSubtopicElement(lecture.id, subtopicsContainer);
            });

            lecture.subtopics.forEach( subtopic => {

                const attachButton = this.createAttachButton(subtopic.id);

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

    addLectureElement(){

        let lectureID = uniqueID(1);

        let courseGridContainer = findElement("#course-grid-container");

        let lectureSection = document.createElement("div");
        lectureSection.className = "lecture-section";

        let itemizationElement = document.createElement("div");
        itemizationElement.className = "itemization";
        itemizationElement.textContent = `${++this.lectureIndex}.`;

        let lectureInnerContainer = document.createElement("div");
        lectureInnerContainer.className = "lecture-inner-container";

        let lectureInputElement = this.createInputElement([lectureID, this.id], "", this.newLectureTitle, "lecture");

        // TODO: BADGE FOR SHOWING UPLOADS
        const badgeButton = this.createBadgeButton(lectureID, 0);
        lectureInputElement.appendChild(badgeButton);

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

        let attachButton = this.createAttachButton(subtopicID);

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

    createAttachButton(id){

        let attachButton = document.createElement("div");
        attachButton.className = "attachments-button";
        attachButton.innerHTML = `<img class="icon" src="../assets/icons/fi/fi-rr-paperclip-vertical.svg" alt="">`;
        attachButton.addEventListener("click", () => {
            openUploadOverlay(id);
        });

        return attachButton;
    }

    createBadgeButton(id, count){

        let badgeButton = document.createElement("div");
        badgeButton.className = "badge";
        badgeButton.textContent = count;
        badgeButton.addEventListener("click", () => {
            // openUploadOverlay(id);
        });

        if(count) badgeButton.style.display = "grid";
        else badgeButton.style.display = "none";
        
        return badgeButton;
    }

}

//TODO: Refactor to fetchCourseWithID
async function fetchCoursesWithID(givenID){

    let courseGridContainer = findElement("#course-grid-container");

    let loader = `
    <div class="loader">
        <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
        </div>
    </div>`;

    courseGridContainer.innerHTML = loader;

    //TODO: Might be in multiple places, refactor
    // Is also in Classroom.php ...
    let courses = await AJAXCall({
        phpFilePath: "../include/course/getCourseDetails.php",
        rejectMessage: "Getting Details Failed",
        params: `id=${givenID}`,
        type: "fetch"
    });

    console.log(courses[0]);
    if(courses[0].status == "error") return;

    setTimeout(() => {
        let course = new Course(courses[0]);
        course.renderTitle();
        course.renderCourseCode();
        course.renderLectureSection();

        findElement("#addNewLecture").addEventListener("click", () => {
            course.addLectureElement();
        })

        findElement("#saveCourseDetails").addEventListener("click", async () => {
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
    }, 2000);

}

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
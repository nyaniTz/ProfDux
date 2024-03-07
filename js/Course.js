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
    deleteSubtopics = {}
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

    renderDeleteButton(){
        let deleteButton = findElement("#deleteCourseButton");
        // let textElement = createLocalizedTextElement(this.courseCode);        
        // titleElement.innerHTML = "";
        // titleElement.appendChild(textElement);
        deleteButton.addEventListener('click', () => this.deleteCourse(this.id));
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

            let floatingContainer = document.createElement("div");
            floatingContainer.className = "lecture-floating-container";

            let addSubtopicButton = document.createElement("div");
            addSubtopicButton.className = "add-subtopic-button";
            addSubtopicButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-plus.svg" alt="">`;

            floatingContainer.appendChild(addSubtopicButton);

            let generateQuizButton = document.createElement("div");
            generateQuizButton.className = "button green-button generate-quiz-button";
            generateQuizButton.textContent = "generate quiz";
            // generateQuizButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-plus.svg" alt="">`;
            generateQuizButton.addEventListener("click", () => {
                generateQuiz(lecture);
            });

            //TODO: add/show addQuiz/editQuiz button if subtopicCount is larger than 1;

            if(lecture.subtopics.length > 0 && lecture.quizzes.length == 0){
                floatingContainer.appendChild(generateQuizButton);
            }

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

            let quizContainer = document.createElement("div");
            quizContainer.className = "subtopics-container quiz-container";

            lecture.quizzes.forEach( quiz => {

                const quizRow = this.createQuizRow(quiz);

                let quizDeleteButton = document.createElement("div");
                quizDeleteButton.className = "quiz-delete-button";
                let quizDeleteIcon = document.createElement("img");
                quizDeleteIcon.src = "../assets/icons/delete.png";
                quizDeleteButton.appendChild(quizDeleteIcon);

                quizDeleteButton.addEventListener("click", () => deleteQuiz(quiz.id))

                quizContainer.className = "subtopics-container quiz-container";
                quizContainer.appendChild(quizRow);
                quizContainer.appendChild(quizDeleteButton);

            })

            lectureInnerContainer.appendChild(subtopicsContainer);
            lectureInnerContainer.appendChild(quizContainer);
            lectureSection.appendChild(floatingContainer);
            lectureSection.appendChild(itemizationElement);
            lectureSection.appendChild(lectureInnerContainer);
            courseGridContainer.appendChild(lectureSection);

        });

        if(this.lectures.length == 0){

            let myEmptyView = createElement("div", "container-message");
            let NoSelectedCoursesYet = createLocalizedTextElement("No Lectures Yet, Add a New Lecture");
            let myLargeMessage = createElement("div", "large-message");
            myLargeMessage.appendChild(NoSelectedCoursesYet);
            myEmptyView.appendChild(myLargeMessage);

            courseGridContainer.innerHTML = "";
            courseGridContainer.appendChild(myEmptyView);
        }

    }

    createQuizRow(quizObject){

        let {
            courseID,
            dateGenerated,
            filename,
            id,
            lectureID,
            name,
            totalMarks,
            hierarchy
        } = quizObject;

        let quizRowContainer = document.createElement("div");
        quizRowContainer.className = "quiz-row-container";

        let quizFilename = document.createElement("div");
        quizFilename.className = "quiz-row-name";
        quizFilename.textContent = name;

        let editButton = document.createElement("div");
        editButton.className = "button green-button quiz-edit-button";
        editButton.textContent = "edit quiz";

        editButton.addEventListener("click", () => {
            startEditingQuiz(filename);
        })

        quizRowContainer.appendChild(quizFilename);
        quizRowContainer.appendChild(editButton);
        return quizRowContainer;

    }

    addLectureElement(){

        let lectureID = uniqueID(1);

        let courseGridContainer = findElement("#course-grid-container");
        let emptyView = document.querySelector(".container-message");
        if(emptyView) courseGridContainer.innerHTML = "";

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

        let floatingContainer = document.createElement("div");
        floatingContainer.className = "lecture-floating-container";

        let addSubtopicButton = document.createElement("div");
        addSubtopicButton.className = "add-subtopic-button";
        addSubtopicButton.innerHTML = `<img src="../assets/icons/fi/fi-rr-plus.svg" alt="">`;
        
        let subtopicsContainer = document.createElement("div");
        subtopicsContainer.className = "subtopics-container";

        addSubtopicButton.addEventListener("click", () => {
            this.addSubtopicElement(lectureID, subtopicsContainer);
        });

        floatingContainer.appendChild(addSubtopicButton);

        lectureInnerContainer.appendChild(lectureInputElement);
        lectureInnerContainer.appendChild(subtopicsContainer);
        lectureSection.appendChild(floatingContainer);
        lectureSection.appendChild(itemizationElement);
        lectureSection.appendChild(lectureInnerContainer);
        courseGridContainer.appendChild(lectureSection);

        let editCourseContainer = document.querySelector(".edit-course-container");
        scrollBottom(editCourseContainer);
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
    }

    updateSubtopicTitle([id, lectureID], title, _this){
        _this.subtopicUpdates[id] = { id, lectureID, title };
    }

    newLectureTitle([id, courseID], title, _this){
        _this.newLectures[id] = { id, title, courseID };
    }

    newSubtopicTitle([id, lectureID], title, _this){
        _this.newSubtopics[id] = { id, lectureID, title };
    }

    deleteCourse(id){

        console.log('idToDelete: ', id);

        let options = {
            title: 'Are You Sure You Want To Delete This Course?',
            denyTitle: 'No',
            acceptTitle: 'Yes'
        }
        
        return showOptionsDialog(options, async () => {

            //TODO: set all of the deleteLectures, deleteSubtopics,
            // deleteResources elements;

            this.lectureUpdates = {}
            this.subtopicUpdates = {}
        
            this.newLectures = {}
            this.newSubtopics = {}
            this.newResources = {}

            let quizzesToDelete = {}
        
            this.lectures.map( lecture => { 
                this.deleteLectures[lecture.id] = { id: lecture.id, title: lecture.title }

                if(lecture.quizzes.length > 0){
                    lecture.quizzes.map( quiz => {
                        this.deleteLectures[lecture.id]["quizID"] = quiz.id;
                    })
                }

                lecture.subtopics.map( subtopic => {
                    this.deleteSubtopics[subtopic.id] = { id: subtopic.id }
                    
                    subtopic.resources.map( resource => {
                        this.deleteResource[resource.id] = { id: resource.id }
                        
                    })
                })
            })

            console.log(
                this.deleteLectures,
                this.deleteSubtopics,
                this.deleteResource,
            )


            await courseItemObjectLooper(this, "delete course");
            await deleteCourseFromDatabase(this.id);
        });
    }

    forceNewCourseDataAsNew(){

    }

    deleteLectureTitle(id, title, _this){

        let lectureIndex = null;
        
        this.lectures.forEach((lecture,index) => {
            if(lecture.id == id){
                lectureIndex = index;
                return;
            }
        })

        let quizID = "neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYou";

        if(this.lectures[lectureIndex].quizzes.length > 0){
            quizID = this.lectures[lectureIndex].quizzes[0].id;
        }

        _this.deleteLectures[id] = { id, title, quizID };

        if(lectureIndex != null){
            this.lectures[lectureIndex].subtopics.forEach((subtopic) => {
                _this.deleteSubtopics[subtopic.id] = { id: subtopic.id };
            })
        }
    

        // The function that will bind to the deleteLectures object
        // will need to cascade by SQL to delete all subtopics
        // that are bound to this lecture

        // It will also need to erase all files and resources as well.
    }

    deleteSubtopicTitle([id, lectureID], title, _this){
        _this.deleteSubtopics[id] = { id };
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
            inputChangeCallback(id, inputElement.value, this);
        }

        let deleteButton = document.createElement("div");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = `<img src="../assets/icons/delete.png" alt="">`;

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

async function generateQuiz(lectureObject){

    let loader = loadLoader("Generating Quiz");

    let lectureID = lectureObject.id;
    let lectureTitle = lectureObject.title;
    let courseID = lectureObject.courseID;
    let subtopicTitles = lectureObject.subtopics
    .map( subtopic => subtopic.title ).join(", ");


    let language = "turkish"; //TODO: Toggle option.
    let topic = subtopicTitles;
    let educationEnvironment = "college students";

    //TODO: question count is going to 9 and not the intended maximum
    let multipleChoiceCount = 10; //10
    let fillInTheBlankCount = 2; //2
    let trueAndFalseCount = 5; //5

    //TODO: figure out logic
    let hardQuestionsCount = 2;
    let mediumQuestionsCount = 2;
    let easyQuestionsCount = 1;

    let query = 
    `create for me in json format a series of new questions 
    in the ${language} language as well as their answers 
    in the ${language} language in the topics of ${topic} 
    for ${educationEnvironment}. 
    There should be ${multipleChoiceCount} choice questions
    with a minimum of 4 answers that do not include letters
    at the beginning. There should be  
    ${fillInTheBlankCount} fill in the blank questions and 
    ${trueAndFalseCount} true and false questions with their answer options. 
    ${hardQuestionsCount} of those questions should be hard, 
    ${mediumQuestionsCount} should be medium and 
    ${easyQuestionsCount} should be easy. 
    The json format should have the following keys, 
    "question, answerOptions, answer, type, hardness". 
    The answerOptions should only be available if the 
    question type is multiple choice or true and false.`;

    let unparsedJSONResponse = await generateGPTResponseFor(query);
    let questions = await JSON.parse(unparsedJSONResponse);
    console.log("questions amount: ", questions.questions.length);

    let filename = `Quiz-${uniqueID(2)}.json`;
    saveQuizAsJSON(filename, questions.questions, "generated");

    let quizID = uniqueID(1);
    let name = `Quiz on ${subtopicTitles}`; // ...
    let dateGenerated = getCurrentTimeInJSONFormat();
    let heirarchy = ""; // ...
    let totalMarks = questions.questions.length; //TODO: figure out the marks properly...

    let params = `id=${quizID}&&courseID=${courseID}&&lectureID=${lectureID}&&name=${name}`+
    `&&dateGenerated=${dateGenerated}&&filename=${filename}&&totalMarks=${totalMarks}`;

    let response = await AJAXCall({
        phpFilePath: "../include/quiz/addNewQuiz.php",
        rejectMessage: "New Quiz Failed To Add",
        params,
        type: "post"
    });

    console.log("quiz generation response: ", response);

    setTimeout(() => {
        refreshTeacherCourseOutline(); //Bugs???
        removeLoader(loader);
    }, 2000);
    
}

async function fetchCourseWithID(givenID){

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

    if(courses.length > 0) 
    if(courses[0].status == "error") return;

    setTimeout(() => {
        let course = new Course(courses[0]);
        course.renderTitle();
        course.renderCourseCode();
        course.renderDeleteButton();
        course.renderLectureSection();

        findElement("#addNewLecture").addEventListener("click", () => {
            course.addLectureElement();
        })

        findElement("#saveCourseDetails").addEventListener("click", async () => {
            courseItemObjectLooper(course);
        })

    }, 2000);

}

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

let excelLoader = loadLoader("Loading From Excel");


async function excelNewCourseItemObjectLooper(course){

    let  { 
        newLectures, 
        newSubtopics 
    } = course;

    let savingCourseLoader = loadLoader("Saving Course");

    await loopThroughObjectForAsync(newLectures, addLectureTitleToDatabase);
    await loopThroughObjectForAsync(newSubtopics, addSubtopicTitleToDatabase);

    refreshTeacherCourseOutline(); //Bugs???

    setTimeout(() => {
        console.log("course outline from excel");
        removeLoader(savingCourseLoader);
    }, 5000);

}

async function courseItemObjectLooper(course, type = ""){

    let loader = type != "delete course"? 
    loadLoader("Saving Course Outline"):
    loadLoader("Deleting Course");

    await loopThroughObjectForAsync(course.lectureUpdates, updateLectureTitleToDatabase);
    await loopThroughObjectForAsync(course.newLectures, addLectureTitleToDatabase);
    await loopThroughObjectForAsync(course.subtopicUpdates, updateSubtopicTitleToDatabase);
    await loopThroughObjectForAsync(course.newSubtopics, addSubtopicTitleToDatabase);
    await loopThroughObjectForAsync(course.deleteSubtopics, deleteSubtopicsFromDatabase);
    await loopThroughObjectForAsync(course.deleteLectures, deleteLecturesFromDatabase);

    setTimeout(async() => {
        if(type == "delete course"){
            console.log("course deleted");
            closePopup(".edit-course-container");
            removeLoader(loader);
            await loadCourses("id"); // YES
        }else {
            await refreshTeacherCourseOutline(); //Bugs???
            removeLoader(loader);
        }
    }, 5000);
}

async function deleteCourseFromDatabase(courseID){

    if(courseID.length > 2){
        let params = `id=${courseID}`;

        const response = await AJAXCall({
            phpFilePath: "../include/delete/deleteCourse.php",
            rejectMessage: "Deleting Course Failed",
            params,
            type: "post"
        });

        console.log("delete Response: ", response);
    }


}

async function deleteLecturesFromDatabase(lectureObject){

    let { id, quizID } = lectureObject;

    if(id.length > 2){
        let params = `id=${id}`;

        await AJAXCall({
            phpFilePath: "../include/delete/deleteLecture.php",
            rejectMessage: "Deleting lecture failed",
            params,
            type: "post"
        });

        if(quizID != 'neverGonnaGiveYouUpNeverGonnaLetYouDownNeverGonnaRunAroundAndDesertYou'){
            await deleteQuiz(quizID);
        }
    }


}


async function deleteSubtopicsFromDatabase(subtopicsObject){

    let { id } = subtopicsObject;

    if(id.length > 2){
        let params = `id=${id}`;

        //TODO: The file called deleteSubtopics.php also
        // deletes associated resources.

        await AJAXCall({
            phpFilePath: "../include/delete/deleteSubtopic.php",
            rejectMessage: "Deleting subtopics failed",
            params,
            type: "post"
        });
    }


}


async function updateLectureTitleToDatabase(lectureOject){

    let { id, title } = lectureOject;

    if(id.length > 2){
        let params = `lectureID=${id}&&title=${title}`;

        await AJAXCall({
            phpFilePath: "../include/course/editLectureDetails.php",
            rejectMessage: "Getting Details Failed",
            params,
            type: "post"
        });
    }

}

async function updateSubtopicTitleToDatabase(subtopicObject){

    let { id, title } = subtopicObject;

    if(id.length > 2){
        let params = `id=${id}&&title=${title}`;

        await AJAXCall({
            phpFilePath: "../include/course/editSubtopicDetails.php",
            rejectMessage: "Setting Details Failed",
            params,
            type: "post"
        });
    }

}

async function addLectureTitleToDatabase(lectureOject){

    let { id, title, courseID } = lectureOject;

    if(id.length > 2){
        let params = `id=${id}&&title=${title}&&courseID=${courseID}`;

        await AJAXCall({
            phpFilePath: "../include/course/addNewLecture.php",
            rejectMessage: "Setting Details Failed",
            params,
            type: "post"
        });
    }

}

async function addSubtopicTitleToDatabase(subtopicObject){

    let { id, lectureID, title } = subtopicObject;

    if(id.length > 2){
        let params = `id=${id}&&title=${title}&&lectureID=${lectureID}`;

        await AJAXCall({
            phpFilePath: "../include/course/addNewSubtopic.php",
            rejectMessage: "Adding New Subtopic Failed",
            params,
            type: "post"
        });
    }

}

async function deleteQuiz(id){

    let loader = loadLoader("Deleting Quiz");

    try{
        await AJAXCall({
            phpFilePath: "../include/delete/deleteQuiz.php",
            rejectMessage: "Quiz not deleted",
            type: "post",
            params: `id=${id}`
        });
    }
    catch(error){

    }

    setTimeout(() => {
        refreshTeacherCourseOutline(); //Bugs???
        removeLoader(loader);
    }, 2000);

}

function refreshTeacherCourseOutline(){
    let mainContainer = document.querySelector(".main-container");
    let id = mainContainer.getAttribute("data-id");
    editCourseWith(id);
}
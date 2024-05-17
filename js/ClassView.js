function renderClassView(element){
    const givenID = globalCache.get("givenCourseID");
    const courseData = globalCache.get("chosenCourseData");
    const classView = new ClassView(courseData, givenID);

    openPopup('.class-chat-inner-overlay');
    
    document.querySelector(".next-button").addEventListener("click", () => {
        classView.next();
    })

    classView.setQuizButton(document.querySelector(".quiz-button"));
}


class ClassView {

    setQuizButton(button){
        this.quizButton = button;
    }

    constructor(courseObject, courseID){
        
        let {
            title,
            courseCode,
            lectures,
            id,
        } = courseObject

        this.title = title;
        this.courseCode = courseCode;
        this.lectureQueue = lectures;
        this.subtopicQueue = [];
        this.resourceQueue = [];
        this.quizQueue = [];
        this.currentLecture = null;
        this.currentSubtopic = null;
        this.currentQuiz = null;
        this.hasQuiz = false;
        this.courseObject = courseObject;
        this.id = id;
        this.currentStep = "lecture";
        this.courseID = courseID;
        this.next();
    }

    next(){

        switch(this.currentStep){
            case "lecture":
                console.log("lecture");
                this.getCurrentLecture()
            break;
            case "subtopic":
                console.log("subtopic");
                this.getCurrentSubtopic()
            break;
            case "resource":
                console.log("resource");
                this.getCurrentResource()
            break;
            case "quiz":
                console.log("quiz");
                this.getCurrentQuiz()
            break;
        }
    }

    getCurrentLecture(){

        if(this.lectureQueue.length > 0){
            this.currentLecture = this.lectureQueue.shift();

            if(this.currentLecture.quizzes.length > 0){
                this.hasQuiz = true 
                this.quizQueue = this.currentLecture.quizzes
            }
            else this.hasQuiz = false; 

            this.subtopicQueue = this.currentLecture.subtopics;
            this.currentStep = "subtopic";
            this.next()
        } else {
            this.currentStep = "finished"
            // showThatThereAreNoLecturesToStudy()
            // showThatTheLecturesAreFinished()
            return;
        }

    }

    getCurrentSubtopic(){

        if(this.subtopicQueue.length > 0){
            this.currentSubtopic = this.subtopicQueue.shift();

            this.resourceQueue = this.currentSubtopic.resources;
            this.currentStep = "resource";
            this.next()

        } else {

            if (this.hasQuiz == true) this.currentStep = "quiz";
            else this.currentStep = "lecture";  
            this.next();
        }

    }

    getCurrentResource(){

        if(this.resourceQueue.length > 0)
            this.currentResource = this.resourceQueue.shift();
        else {
            this.currentStep = "subtopic";
            this.next();
        }

    }

    getCurrentQuiz(){

        if(this.quizQueue.length > 0){
            this.currentQuiz = this.quizQueue.shift();
            handleQuiz(this.currentQuiz, this.quizButton, "iterative"); // TODO: handle quiz finishing.
        } else {
            this.currentStep = "lecture";
            this.next();
        }

    }



    renderTitle(){
        // let titleElement = findElement(".classroom-course-title");
        // let textElement = document.createElement("div");

        // textElement.textContent = this.title;
        // titleElement.innerHTML = "";
        // titleElement.appendChild(textElement);
    }

    renderCourseCode(){
        // let titleElement = findElement(".classroom-course-code");
        // let textElement = createLocalizedTextElement(this.courseCode);        
        // titleElement.innerHTML = "";
        // titleElement.appendChild(textElement);
    }
}
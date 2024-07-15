async function loadCoursesGeneric(options = "id", eventListener){

    let courseViewContainer = document.querySelector(".course-view-container");
    let loader = courseViewContainer.querySelector(".course-view-container-loader");

    let noCoursesYetText = createLocalizedTextElement("No courses yet");
    let createCourseText = createLocalizedTextElement("Create Course");
    let errorText = createLocalizedTextElement("Something Went Wrong");

    let emptyView = createElement("div", "container-message");
    let largeMessage = createElement("div", "large-message");
    largeMessage.appendChild(noCoursesYetText);

    // let createCourseButton = createElement("div", "button");
    // createCourseButton.appendChild(createCourseText);
    // createCourseButton.addEventListener("click", () => openCreateCourseOverlay())

    emptyView.appendChild(largeMessage);
    // emptyView.appendChild(createCourseButton);

    let errorView = createElement("div", "container-message");
    largeMessage.innerHTML = "";
    largeMessage.appendChild(errorText);
    errorView.appendChild(largeMessage);

    /* STUDENT VIEW */
    let studentEmptyView = createElement("div", "container-message");
    let NoCoursesYet = createLocalizedTextElement("No Courses Yet");
    let studentlargeMessage = createElement("div", "large-message");
    studentlargeMessage.appendChild(NoCoursesYet);
    studentEmptyView.appendChild(studentlargeMessage);

    let myEmptyView = createElement("div", "container-message");
    let NoSelectedCoursesYet = createLocalizedTextElement("You haven't chosen any courses yet");
    let myLargeMessage = createElement("div", "large-message");
    myLargeMessage.appendChild(NoSelectedCoursesYet);
    myEmptyView.appendChild(myLargeMessage);

    return new Promise(async (resolve, reject) => {

    let { id:userID } = await getGlobalDetails();

    try {

        const params = `id=${userID}`;

        let phpFilePath;

        switch(options){
            case "id": 
                phpFilePath = "../include/course/getCourses.php";
            break;
            case "all":
                phpFilePath = "../include/course/getAllCourses.php";
            break;
            case "mine":
                phpFilePath = "../include/course/getMyCourses.php";
            break;
        }
        
        const result = await AJAXCall({
            phpFilePath,
            rejectMessage: "Getting Courses Failed",
            params,
            type: "fetch"
        });

        setTimeout(() => {

            if(result && result.length > 0) {
                loadCoursesUI(result, userID, eventListener);
                resolve();
            }
            else {

                //TODO: This part might cause bugs in future versions
                courseViewContainer.innerHTML = "";

                switch(options){
                    case "id":  // Refactor this to be "teacher"
                        courseViewContainer.appendChild(emptyView);
                    break;
                    case "all": // Refactor this to be "student subscriptions"
                        courseViewContainer.appendChild(studentEmptyView);
                        ;
                    case "mine": // Refactor this to be "mine -- or -- classview"
                        courseViewContainer.appendChild(myEmptyView);
                        ;
                }
            }
        }, 2000);
    }
    catch(error){

    }

    });

    function loadCoursesUI(coursesObject, userID, eventListener, showSubscription = false){

        courseViewContainer.innerHTML = "";

        coursesObject.map( async (course) => {

            const { id, title, image, courseCode } = course;

            let courseCard = createElement("div", "course-card");

            let courseCardImage = createElement("div", "course-card-image");
            let imageElement = document.createElement("img");

            imageElement.src = image.length > 2 ? await checkImage(`../uploads/${image}`) : `../assets/images/courseDefault.jpg`;

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

            courseCard.addEventListener("click", () => eventListener(course));
            
            if( showSubscription ){
                let subscriptionResult = await getCourseSubscriptionStatus(id, userID);

                // This is the subscription part for the student view.
                let subscriptionIcon = document.createElement("div");
                subscriptionIcon.className = "subscription-icon";
                let tickImageElement = document.createElement("img");
                tickImageElement.src = "../assets/icons/check.png";
                subscriptionIcon.appendChild(tickImageElement);
    
                try {
                    if(subscriptionResult[0].status == "true"){
                        courseCard.appendChild(subscriptionIcon);
                    }
                }catch(error){
    
                }         
            }

            courseViewContainer.appendChild( courseCard );
        });

    }

    async function getCourseSubscriptionStatus(id, userID){

        return await AJAXCall({
            phpFilePath: "../include/course/getSubscriptionStatus.php",
            rejectMessage: "Getting Status Failed",
            params: `id=${id}&&userID=${userID}`,
            type: "fetch"
        });

    }

}


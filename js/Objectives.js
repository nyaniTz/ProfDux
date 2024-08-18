class Objectives {

    currentHierarchy = 0
    currentIndex = 0

    constructor({ objectives, filename }){
        // this.id = objectivesObject.id;
        this.filename = filename;
        this.objectives = objectives;
        this.currentIndex = this.objectives.length - 1;
    }

    renderObjectives(){

        let learningObjectivesOuterContainer = document.querySelector(".outer-objective-container");
        learningObjectivesOuterContainer.innerHTML = "";

        this.objectives.forEach( (objective, index) => {
    
            let objectiveContainer = this.createObjectiveInput(objective, index);
            learningObjectivesOuterContainer.appendChild(objectiveContainer);
            this.currentHierarchy = objective.hierarchy;

        });


    }

    setAddNewObjectiveButton(button){
        clearEventListenersFor(button).addEventListener("click", () => {
            this.addObjective();
        })
    }

    setSaveLearningObjectivesButton(button){
        clearEventListenersFor(button).addEventListener("click", () => {
            this.saveObjectives();
            closePopup('.edit-learning-objectives-overlay');
        })
    }

    createObjectiveInput(objective, index){

        let objectiveContainer = document.createElement("div");
        objectiveContainer.className = "objective-container";
        
        let objectiveItemization = document.createElement("div");
        objectiveItemization.className = "objective-itemization";

        let objectiveText = document.createElement("div");
        objectiveText.className = "objective-text";
        objectiveText.setAttribute("contentEditable", "true");
        objectiveText.textContent = objective.title;
        objectiveText.addEventListener("input", () => this.updateObjective(objectiveText, this.objectives[index]))

        let objectiveDeleteButton = document.createElement("div");
        objectiveDeleteButton.className = "delete-button";
        objectiveDeleteButton.addEventListener("click", () => { 
            this.objectives.splice(index,1);
            --this.currentIndex;
            console.log(this.objectives);
            this.renderObjectives();
        })

        let objectiveDeleteButtonImage = document.createElement("img");
        objectiveDeleteButtonImage.src = "../assets/icons/delete.png";

        objectiveDeleteButton.appendChild(objectiveDeleteButtonImage)
        objectiveContainer.appendChild(objectiveItemization)
        objectiveContainer.appendChild(objectiveText)
        objectiveContainer.appendChild(objectiveDeleteButton)
        return objectiveContainer;

    }

    addObjective(){

        let learningObjectivesOuterContainer = document.querySelector(".outer-objective-container");

        let hierarchy = '' + ++this.currentHierarchy;
        let index = ++this.currentIndex;

        const objective = { hierarchy, title: ""};
        this.objectives.push(objective);

        let objectiveContainer = this.createObjectiveInput(objective, index);
        learningObjectivesOuterContainer.appendChild(objectiveContainer);

    }

    updateObjective(element, textObject){
        textObject.title = element.textContent;
        console.log("yupp", this.objectives)
    }

    saveObjectives(){

        ( async () => {

            try {
                const jsonResult = await saveLearningObjectivesAsJSON(this.filename, this.objectives);
                console.log(jsonResult);
            }
            catch(error){
                console.log(error)
            }
        })();

    }

}

async function saveLearningObjectivesAsJSON(filename, ArrayContainingObjects){

    let JSONString = JSON.stringify(ArrayContainingObjects);
    const correctPath = `../objectives/${filename}`;

    console.log("[3] correctPath: ", correctPath);
    console.log("[4] jsonString: ", JSONString);

    try{
        let result = await AJAXCall({
            phpFilePath: "../include/saveJSONData.php",
            rejectMessage: "saving json file failed",
            params: `filepath=${correctPath}&&jsonString=${JSONString}`,
            type: "post"
        });

        console.log("[5] async Result: ", result);

    }catch(error){
        //TODO: bubbleUpError()
        console.log(error);
    }

}

function saveLearningObjectivesInDatabase(courseID){

    const id = uniqueID(1);
    const filename = `Objective-${uniqueID(2)}.json`;

    return new Promise(async(resolve, reject) => {
        try{
            await AJAXCall({
                phpFilePath: "../include/course/addNewObjective.php",
                rejectMessage: "adding new objective failed",
                params: `id=${id}&&filename=${filename}&&courseID=${courseID}`,
                type: "post"
            });
    
        }catch(error){
            //TODO: bubbleUpError()
            reject();
            console.log(error);
        }
    
        resolve(filename);
    })

}

async function refreshObjectives(){

    let loader = loadLoader("Generating Objectives");

    let mainContainer = document.querySelector(".main-container");
    let id = mainContainer.getAttribute("data-id");

    console.log("id:", id);

    const courseDetails = await getTitleAndFilename(id);
    console.log(courseDetails);
    const { title, filename } = courseDetails[0];
    
    const prompt = `generate for me in json format with the structure { courseTitle: "", learningObjectives: [ "" ] }, a decent amount of learning 
    objectives for students for the given course title: ${title}
    `

    const objectivesResponse = await generateGPTResponseFor(prompt);
    const objectivesJSON = await JSON.parse(objectivesResponse);
    const objectivesList = objectivesJSON.learningObjectives;

    console.log("objectiveList: ", objectivesJSON);
    console.log("objectiveList: ", objectivesList);

    // let objectivesList = [
    //     "Understand the historical background and context of the story","Analyze the characters and their motivations"
    //     ,"Examine the themes of friendship, adventure, and self-discovery","Explore the cultural influences and representation in the film","Understand the animation techniques used in the movie","Discuss the music and its importance in setting the tone"
    // ]

    const objectives = objectivesList.map( (objective, index) => { 
        return { hierarchy: index + 1, title: objective }
    })

    type = "edit";
    details = {
        type,
        courseID: id
    }

    let addLearningObjectiveButton = findElement(".add-learning-objective-button");
    let saveLearningObjectivesButton = findElement(".save-learning-objectives-button");

    console.log("objectivesObject: ", objectives);

    let learningObjectives = new Objectives({ objectives, filename, details });
    learningObjectives.renderObjectives();
    learningObjectives.setAddNewObjectiveButton(addLearningObjectiveButton);
    learningObjectives.setSaveLearningObjectivesButton(saveLearningObjectivesButton);

    removeLoader(loader);

}

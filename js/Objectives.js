class Objectives {

    currentHierarchy = 0
    currentIndex = 0

    constructor({ objectives, filename, details }){
        // this.id = objectivesObject.id;
        this.filename = filename;
        this.objectives = objectives;
        this.details = details;
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
        button.addEventListener("click", () => {
            this.addObjective();
        })
    }

    setSaveLearningObjectivesButton(button){
        button.addEventListener("click", () => {
            this.saveObjectives();
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

        const objective = { hierarchy, title: "" };
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
                if(this.details.type == "new") await saveLearningObjectivesInDatabase(this.filename, this.details);
                console.log(result);
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

async function saveLearningObjectivesInDatabase(filename, details){

    try{

        let id = uniqueID(1);

        let result = await AJAXCall({
            phpFilePath: "../include/course/addNewObjective.php",
            rejectMessage: "adding new objective failed",
            params: `id=${id}&&filename=${filename}&&courseID=${details.courseID}`,
            type: "post"
        });

    }catch(error){
        //TODO: bubbleUpError()
        console.log(error);
    }

}
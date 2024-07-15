class Weights {

    constructor(weightsArray){
        this.weightsArray = weightsArray
    }

    renderWeights(){

        const weightsOuterContainer = document.querySelector(".weights-outer-container");
    
        this.weightsArray.forEach( course => {

            const lessonPlanContainer = document.createElement("div");
            lessonPlanContainer.className = "lesson-plan-container";

            // Fetch Lesson Image from course ID.

            const lessonLeftPane = document.createElement("div");
            lessonLeftPane.className = "lesson-left-pane";
            const lessonImageBox = document.createElement("div");
            lessonImageBox.className = "image-container-box"; //TODO: refactor to image-container-box

            const image = document.createElement("img");
            image.src = `../uploads/${course.image}`;
            lessonImageBox.appendChild(image);

            const courseDetails = document.createElement("div");
            courseDetails.className = "course-details-box";
            courseDetails.textContent = `${course.courseCode} : ${course.title}`;
            lessonImageBox.appendChild(courseDetails);

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.className = "button save-schedule-button";

            lessonLeftPane.appendChild(lessonImageBox);
            lessonLeftPane.appendChild(saveButton);

            const lessonRightPane = document.createElement("div");
            lessonRightPane.className = "lesson-right-pane one-column";

            saveButton.addEventListener("click", () => saveSchedulesFor(lessonRightPane) );

            course.weights.forEach( weight => {
                
                const lessonItemContainer = document.createElement("div");
                lessonItemContainer.className = "lesson-item-container";

                const lessonNumbering = document.createElement("div");
                lessonNumbering.className = "numbering";

                const lessonItemInnerContainer = document.createElement("div");
                lessonItemInnerContainer.className = "lesson-item-inner-container";


                const lessonTitle = document.createElement("div");
                lessonTitle.className = "lesson-title";
                lessonTitle.textContent = weight.title

                const lessonTime = document.createElement("div");
                lessonTime.className = "lesson-time";

                const weightInput = document.createElement("input");
                weightInput.setAttribute("type", "text");
                weightInput.className = "weight-input";
                weightInput.value = weight.value;

                weightInput.setAttribute("lectureID", weight.id)
                

                lessonTime.appendChild(weightInput);

                lessonItemInnerContainer.appendChild(lessonTitle)
                lessonItemInnerContainer.appendChild(lessonTime)

                lessonItemContainer.appendChild(lessonNumbering);
                lessonItemContainer.appendChild(lessonItemInnerContainer);

                lessonRightPane.appendChild(lessonItemContainer);

            });

            lessonPlanContainer.appendChild(lessonLeftPane);
            lessonPlanContainer.appendChild(lessonRightPane);

            weightsOuterContainer.appendChild(lessonPlanContainer);

            // HTML Rendering

            // <div class="lesson-item-container">
            //     <div class="numbering"></div>
            //     <div class="lesson-item-inner-container">
            //         <div class="lesson-title">Lecture 1 Intro For Medicine Students</div>
            //         <div class="lesson-time">
            //             <input type="date" class="date-input"/>
            //         </div>
            //     </div>
            // </div>
            

        });

    }
}

function saveWeightsFor(lessonParentContainer){

    let lessonElements = lessonParentContainer.querySelectorAll(".date-input");

    //TODO: showLoader();
    // const loader = loadLoader("Saving Schedules");

    lessonElements.forEach( async (lessonElement, index) => {
        
        let time = lessonElement.value;
        let isScheduleSet = lessonElement.getAttribute("isScheduleSet");
        let lectureID = lessonElement.getAttribute("lectureID");

        let JSONTime = new Date(time).toJSON();

        const id = uniqueID(1);
        let params = `id=${id}&&foreignID=${lectureID}&&timeStart=${JSONTime}`;

        let result;

        try{
            switch(isScheduleSet){
                case "true":
                    result = await updateScheduleTime(params);
                    break;
                case "false":
                    if(JSONTime) result = await newScheduleTime(params);
                    break;
            }

            // TODO: LOADER PROBLEM
            // if(index == lessonElements.length - 1)  {
            //     result.then(() => {
            //         stopLoader(loader);
            //     })
            // }
        }
        catch(error){
            console.log(error);
            //TODO: stopLoader();
            // removeLoader(loader);


        }

    });



}

async function updateScheduleTime(params){

    return new Promise( async (resolve) => {

        await AJAXCall({
            phpFilePath: "../include/schedule/updateSchedule.php",
            rejectMessage: "Updating Schedule Failed",
            params,
            type: "post"
        });

        resolve();
    })

}

async function newScheduleTime(params){
    
    return new Promise( async (resolve) => {

        await AJAXCall({
            phpFilePath: "../include/schedule/newSchedule.php",
            rejectMessage: "New Schedule Failed",
            params,
            type: "post"
        });

        resolve();
    })

}
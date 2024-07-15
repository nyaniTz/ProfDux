async function parseExcelForCourseObject(url){

    const file = await (await fetch(url)).arrayBuffer();

    const workbook = XLSX.read(file);
    const worksheetsObject = workbook.Sheets;

    let entries = Object.entries(worksheetsObject);
        
    const worksheets = entries.map( ([key, val] = entry) => {
        return val;
    });

    const lessonStructuredObjects = XLSX.utils.sheet_to_json(worksheets[0]);
    console.log(lessonStructuredObjects);

    function checkIfExistsInObject(Object, ...keyArray){
        try{
            let key = false;
            keyArray.forEach( _key => { if(Object[_key]) key = _key })
            return key
        }catch(error){ return false }
    }

    let currentPosition = null;
    let resultObjectArray = [];
    let currentObject = {};

    let lectureIndex = 0;
    let subtopicIndex = 0;

    lessonStructuredObjects.forEach( rowObject => {

        let key = checkIfExistsInObject(rowObject, "#", "###");

        const id = uniqueID(1);

        if(key){
            switch(key){
                case "#":
                    startNewTopic(id);
                    break;
                case "###":
                    addNewSubtopic(id);
            }
        }

        function startNewTopic(id){

            if(currentPosition != null) resultObjectArray.push(currentObject)

            currentObject = {};
            subtopicIndex = 0;

            let doesTitleTextExist = checkIfExistsInObject(rowObject, "##");

            currentPosition = rowObject["#"];
            currentObject.id = id;
            currentObject.hierarchy = ++lectureIndex;
            currentObject.title = doesTitleTextExist ? rowObject["##"] : "";
            currentObject.subtopics = [];
            currentObject.resources = [];
            currentObject.quizzes = [];
            resultObjectArray
        }

        function addNewSubtopic(id, index){
            currentObject.subtopics.push({
                id,
                hierarchy: ++subtopicIndex,
                title: rowObject["###"],
            })
        }

    });

    resultObjectArray.push(currentObject);

    console.log("resulting Object: ", resultObjectArray);

    let { isError, errorMessage } = checkParsedObjectAgainst(resultObjectArray);

    console.log("isError: ", isError, "errorMessage: ", errorMessage);

    if(isError == false)
        return resultObjectArray
    else throw new Error("Format Is Wrong: ", errorMessage);

};

function checkParsedObjectAgainst(givenObjectArray){

    let isError = false;
    let errorMessage = [];

    let objectModel = {
        title: "",
        subtopics: [
            { hierarchy: "", title: ""}
        ]
    }

    givenObjectArray.forEach( givenObject => {
        
        if(!givenObject.id) {
            errorMessage.push("id does not exist")
            isError = true
        }

        if(!givenObject.hierarchy) {
            errorMessage.push("hierarchy does not exist")
            isError = true
        }

        if(!givenObject.subtopics) {
            errorMessage.push("suptopics do not exist")
            isError = true
        }

        if(!givenObject.title.length > 0) {
            errorMessage.push("title does not exist")
            isError = true
        }

        if(!givenObject.quizzes) {
            errorMessage.push("quiz do not exist")
            isError = true
        }

        if(isError) return;

    })

    return { isError, errorMessage };

}
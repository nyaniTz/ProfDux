async function parseExcelForCourseObject(url){

    const file = await (await fetch(url)).arrayBuffer();

    const workbook = XLSX.read(file);
    const worksheetsObject = workbook.Sheets;
    // console.log("hello", worksheetsObject);

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

    // let result = checkIfExistsInObject(lessonStructuredObjects[0], "#", "##", "###");
    // console.log(result);

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

    return resultObjectArray;

    let objectModel = {
        hierarchy: "",
        title: "",
        subtopics: [
            { hierarchy: "", title: ""}
        ]
    }

    let lessonObjectArray = [
        objectModel, objectModel, objectModel
    ]

    // console.log(lessonObjectArray);

};
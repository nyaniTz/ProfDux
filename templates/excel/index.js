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

    lessonStructuredObjects.forEach( rowObject => {

        let key = checkIfExistsInObject(rowObject, "#", "###");

        if(key){
            switch(key){
                case "#":
                    startNewTopic();
                    break;
                case "###":
                    addNewSubtopic();
            }
        }

        function startNewTopic(){

            if(currentPosition != null) resultObjectArray.push(currentObject)

            currentObject = {};

            let doesTitleTextExist = checkIfExistsInObject(rowObject, "##");

            currentPosition = rowObject["#"];
            currentObject.hierarchy = rowObject["#"];
            currentObject.title = doesTitleTextExist ? rowObject["##"] : "";
            currentObject.subtopics = [];
            resultObjectArray
        }

        function addNewSubtopic(){
            currentObject.subtopics.push(rowObject["###"])
        }

    });

    resultObjectArray.push(currentObject);

    console.log("resulting Object: ", resultObjectArray);

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
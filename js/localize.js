function localizeTextElements(){

    let textElements = document.querySelectorAll("text");

    textElements.forEach( __text__ => {

        if(__text__.getAttribute("data-created") != "true") {

            console.log(__text__, __text__.getAttribute("data-created"));

            let text = __text__.textContent;
            let textComparisons = fetchLocalization(text);
    
            // console.log(textComparisons);
    
            textComparisons.forEach( comparison => {
                let entries = Object.entries(comparison);
    
                let data = entries.map( ([key, val] = entry) => {
                    __text__.setAttribute(`data-${key}`, val);
                });
                
            });
    
            __text__.textContent = "";
        }


    })
}

function fetchLocalization(text){

    //TODO: make a external json file
    let localization = {
        "save": [
            { "en": "Save" },
            { "tr" : "Kaydet" }
        ],
        "hello": [
            { "en": "Hello" },
            { "tr" : "Merhaba" }
        ],
        "teacher": [
            { "en": "Teacher" },
            { "tr" : "Öğretmen" }
        ],
        "no courses yet": [
            { "en": "No Course Yet" },
            { "tr" : "Kurs Yok" }
        ],
        "create course": [
            { "en": "create course" },
            { "tr" : "create kurs" }
        ],
        "something went wrong": [
            { "en": "Something Went Wrong" },
            { "tr" : "turkish translation missing" }
        ]

    }

    let escape =  [
        { "en" : text },
        { "tr" : text },
    ]

    try {
        let result = localization[text.toLowerCase()];
        if(result) return result;
        else {
            return escape;
        }
    }
    catch(error){
        return escape;
        
    }
}

function createLocalizedTextElement(text){

    let textElement = document.createElement("text");
    textElement.setAttribute("data-created", "true");

    let textComparisons = fetchLocalization(text);

    console.log(textComparisons);

    textComparisons.forEach( comparison => {
        let entries = Object.entries(comparison);

        let data = entries.map( ([key, val] = entry) => {
            textElement.setAttribute(`data-${key}`, val);
        });

        
    });

    return textElement;
}
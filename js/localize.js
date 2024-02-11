function localizeTextElements(){

    let textElements = document.querySelectorAll("text");

    textElements.forEach( __text__ => {
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
            { "tr" : "Öregtmen" }
        ],

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
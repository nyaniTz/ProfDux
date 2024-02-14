function localizeTextElements(){

    let textElements = document.querySelectorAll("text");

    textElements.forEach( __text__ => {

        if(__text__.getAttribute("data-created") != "true") {

            console.log(__text__, __text__.getAttribute("data-created"));

            let text = __text__.textContent;
            let textComparisons = fetchLocalization(text);
    
            // console.log(textComparisons);
            
            let entries = Object.entries(textComparisons);
    
            entries.map( ([key, val] = entry) => {
                __text__.setAttribute(`data-${key}`, val);
            });
                
            __text__.textContent = "";
        }


    })
}

function localizeInputPlaceholders(){

    // TODO: CSS Bug
    let inputElements = document.querySelectorAll("input");

    let currentLanguage = document.querySelector("html").getAttribute("lang");

    inputElements.forEach( __input__ => {
        if(__input__.getAttribute("data-created") != "true") {
            let inputPlaceholderText = __input__.getAttribute("placeholder");

            let textComparisons = fetchLocalization(inputPlaceholderText);

            __input__.setAttribute("placeholder", textComparisons[currentLanguage]);
        }

    })

}

function fetchLocalization(text){

    //TODO: make a external json file
    let localization = {

        "save": { "en": "Save", "tr" : "Kaydet" },
        "teacher": { "en": "Teacher", "tr" : "Öğretmen"},
        "hello": {"en" : "Hello", "tr" : "Oh Well"},

    }

    let escape =  { "en" : text, "tr" : text }

    try {
        let result = localization[text.toLowerCase()];
        if(result) return result;
        else return escape;
    }
    catch(error) { return escape; }
}

function createLocalizedTextElement(text){

    let textElement = document.createElement("text");
    textElement.setAttribute("data-created", "true");

    let textComparisons = fetchLocalization(text);

    let entries = Object.entries(textComparisons);

    entries.map( ([key, val] = entry) => {
        textElement.setAttribute(`data-${key}`, val);
    });

    return textElement;
}
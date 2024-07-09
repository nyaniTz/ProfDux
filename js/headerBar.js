let globalUserDetails;

( async () => {

    let result = await getUserDetails();
    globalUserDetails = result;
    localizeTextElements();
    setHeaderInfo(result);

})();

function setHeaderInfo(userObject){

    let { role, name, image } = userObject;
    let writtenRole = role;

    let currentPath = window.location.pathname.includes("student");

    if (currentPath){
        writtenRole = "student"
    }
    
    let usernameFields = document.querySelectorAll(".username");
    let imageFields = document.querySelectorAll(".user-image img");
    let usernameInnerContainer = createLocalizedTextElement(name);
    let roleAsTextElement = createLocalizedTextElement(writtenRole);
    

    usernameFields.forEach( username => {

        username.innerHTML = "";
        
        switch(role){
            case "teacher":
                username.appendChild(usernameInnerContainer);
                username.appendChild(roleAsTextElement);
        }
    });

    imageFields.forEach( imageField => 
        imageField.src = `../uploads/${image}`
    )

}

const currentLanguage = setCurrentLanguageToHTMLTag();
console.log("currentLanguage: ", currentLanguage);

function getCurrentLanguageFromLocalStorage(){
    return window.localStorage.getItem("lang");
}

function extrapolateLanguage(){
    let language = getCurrentLanguageFromLocalStorage();

    switch(language){
        case "en": return "english"
        case "tr": return "turkish"
        default: return "english"
    }
}

function setCurrentLanguageToLocalStorage() {

    setTimeout(() => {
        let htmlElement = document.querySelector("html");
        window.localStorage.setItem("lang", htmlElement.lang);
    }, 1000)

}

function setCurrentLanguageToHTMLTag(){

    console.log("setting from wrapper...");
    setTimeout(() => {
        let htmlElement = document.querySelector("html");
        htmlElement.lang = getCurrentLanguageFromLocalStorage();
    }, 1000)

}

document.body.addEventListener("click", setCurrentLanguageToLocalStorage);
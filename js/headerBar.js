let globalUserDetails;

function getGlobalDetails(){
    if(!globalUserDetails) logout();
    else return globalUserDetails;
}

( async () => {

    let result = await getUserDetails();
    console.log(result);
    globalUserDetails = result;
    localizeTextElements();
    setHeaderInfo(result);

})();

function setHeaderInfo(userObject){

    let { role, name, image } = userObject;

    let usernameFields = document.querySelectorAll(".username");
    let imageFields = document.querySelectorAll(".user-image img");
    let usernameInnerContainer = document.createElement("div");
    usernameInnerContainer.textContent = name;

    console.log(role);
    let roleAsTextElement = createLocalizedTextElement(role);
    
    usernameFields.forEach( username => {
        
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
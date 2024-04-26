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
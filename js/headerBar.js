let globalUserDetails;

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
    let usernameInnerContainer = createLocalizedTextElement(name);

    console.log(role);
    let roleAsTextElement = createLocalizedTextElement(role);
    

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
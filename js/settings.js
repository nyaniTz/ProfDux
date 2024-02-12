let settingsImageObject;

setCurrentSettingsView();

async function setCurrentSettingsView() {

    let { id, name, phone, institutionID, email, address } = await getGlobalDetails();

    let namePlaceholder = document.querySelector(".person-name");
    namePlaceholder.value = name;

    let phonePlaceholder = document.querySelector(".person-phone");
    phonePlaceholder.value = phone;

    let institutionIDPlaceholder = document.querySelector(".person-institutionID");
    institutionIDPlaceholder.value = institutionID;

    let emailPlaceholder = document.querySelector(".person-email");
    emailPlaceholder.value = email;

    let addressPlaceholder = document.querySelector(".person-address");
    addressPlaceholder.value = address;

}

function loadImageToSettingsView(event, outputElement){

    const output = document.querySelector(outputElement);

    settingsImageObject = event.target.files[0];

    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }

}

async function saveProfileSettings() {

    if(settingsImageObject){
        
        try {
            let { newFileName } = await uploadFile(settingsImageObject);

            let { id } = await getGlobalDetails();

            let params = `id=${id}&&image=${newFileName}`;

            console.log(params);

            let changePhoto = await AJAXCall({
                phpFilePath: "../include/changePhoto.php",
                rejectMessage: "Script Failed",
                params,
                type: "post"
            });

            console.log(changePhoto);

            let result = await getUserDetails();
            setHeaderInfo(result);
        }
        catch(error){
            console.log(error);
        }
    }
}
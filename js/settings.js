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

async function haveDetailsChanged(){

    let { id, name, phone, address } = await getGlobalDetails();

    let inputtedName = document.querySelector(".person-name").value;
    let inputtedPhone = document.querySelector(".person-phone").value;
    let inputtedAddress = document.querySelector(".person-address").value;

    if(name != inputtedName || phone != inputtedPhone || address != inputtedAddress) return { 
        _haveDetailsChanged: true, 
        details: { 
            id,
            name: inputtedName, 
            phone:inputtedPhone, 
            address: inputtedAddress
        }
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

    let { _haveDetailsChanged, details } = await haveDetailsChanged();

    console.log("debug 3: ", _haveDetailsChanged, details);

    if(_haveDetailsChanged){

        const params = createParamatersFrom(details);

        console.log(params);

        let saveProfileDetails = await AJAXCall({
            phpFilePath: "../include/saveProfileDetails.php",
            rejectMessage: "Script Failed",
            params,
            type: "post"
        });

        console.log(saveProfileDetails);

        let result = await getUserDetails();
        setHeaderInfo(result);

    }
}
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dux Teacher</title>
        <page data-id="Settings"></page> 
        
        <?php include '../include/teacherImports.php'; ?>

    </head>
    <body>

        <style>

            .edit-personal-details {
                width: 500px;
                place-self: center;
                display: grid;
                grid-gap: 20px;
                padding-top: 40px;
            }

            .personal-upload-input{ justify-self: center; cursor: pointer;}

            .personal-image-view{
                height: 200px;
                width: 200px;
                justify-items: center;
            }   

            .personal-image-view img{
                height: 240px;
                width: 400px;
                margin-left: -25%;
            }

            .setting-values {
                display: grid;
                grid-gap: 20px;
            }

            .saveProfileButton{
                margin-top: 10px;
                justify-self: end;
            }


        </style>

        <?php include 'components/header.php'; ?>

        <div class="outer-container">
            <?php include 'components/sidebar.php'; ?>

            <div class="main-container">
                <form class="edit-personal-details">
                    <label for="personalImageUpload" class="personal-upload-input">
                        <div class="personal-image-view user-image">
                            <img class="personal-image-view-element" src="" alt="">
                        </div>

                        <input id="personalImageUpload" class="upload-input" type="file" accept="image/*" onchange="loadImageToSettingsView(event, '.personal-image-view-element')">
                    </label>

                    <div class="setting-values">
                        <div class="form-input-container">
                            <span class="form-input-label">Name</span>
                            <input class="form-input person-name" placeholder="Name" type="text" disabled>
                        </div>

                        <div class="form-input-container">
                            <span class="form-input-label">Phone</span>
                            <input class="form-input person-phone" placeholder="Phone" type="text" disabled>
                        </div>

                        <div class="form-input-container">
                            <span class="form-input-label">ID</span>
                            <input class="form-input person-institutionID" placeholder="Name" type="text" disabled>
                        </div>

                        <div class="form-input-container">
                            <span class="form-input-label">Email</span>
                            <input class="form-input person-email" placeholder="Name" type="text" disabled>
                        </div>

                        <div class="form-input-container">
                            <span class="form-input-label">Address</span>
                            <input class="form-input person-address" placeholder="Name" type="text" disabled>
                        </div>
                    </div>

                    <div class="button saveProfileButton" onclick="saveProfileSettings()">
                        <text>Save</text>
                    </div>

                </form>


            </div>
        </div>

        <script>

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

</script>

    </body>
</html>
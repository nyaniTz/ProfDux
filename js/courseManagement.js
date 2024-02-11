let globalImageObject;
let globalPDFObject;

function loadImageToPopupView(event, outputElement) {

    // const output = document.querySelector(outputElement);

    let uploadContainer = document.querySelector(".upload-options-container");
    let uploadProgressContainer = document.querySelector(".upload-progress-container");
    uploadContainer.style.display = "none";
    uploadProgressContainer.style.display = "grid";


    let { name: imageName, type: imageType } = event.target.files[0];

    let truncatedImagedString = truncateString(imageName);
    let truncatedFilename = document.querySelector("#truncatedFilename");
    truncatedFilename.textContent = truncatedImagedString;

    setUploadImageObject(event.target.files[0]);

    // console.log("upload event: ", imageName, imageType, truncatedImagedString);

    
    
    // output.src = URL.createObjectURL(event.target.files[0]);
    // output.onload = function() {
    // URL.revokeObjectURL(output.src) // free memory
    // }
}

function loadPDFToPopupView(event, outputElement) {

    // const output = document.querySelector(outputElement);

    let uploadContainer = document.querySelector(".upload-options-container");
    let uploadProgressContainer = document.querySelector(".upload-progress-container");
    uploadContainer.style.display = "none";
    uploadProgressContainer.style.display = "grid";


    let { name: PDFName, type: fileType } = event.target.files[0];

    let truncatedString = truncateString(PDFName);
    let truncatedFilename = document.querySelector("#truncatedFilename");
    truncatedFilename.textContent = truncatedString;

    setUploadPDFObject(event.target.files[0]);

    // console.log("upload event: ", imageName, imageType, truncatedImagedString);



    // output.src = URL.createObjectURL(event.target.files[0]);
    // output.onload = function() {
    // URL.revokeObjectURL(output.src) // free memory
    // }
    }

function revertUploadChoice(){

    let uploadContainer = document.querySelector(".upload-options-container");
    let uploadProgressContainer = document.querySelector(".upload-progress-container");
    uploadContainer.style.display = "grid";
    uploadProgressContainer.style.display = "none";

}

function startUploading(){

    let uploadOverlay = document.querySelector(".upload-overlay");
    let subtopicID = uploadOverlay.getAttribute("data-id");

    uploadWithObject(globalImageObject);
    uploadWithObject(globalPDFObject);

    async function uploadWithObject(fileObject){

        console.log("fileObject", fileObject);

        if(fileObject && subtopicID){

            let {type} = fileObject;
            const id = uniqueID(1);

            try{
                const { newFileName:value } = await uploadFile(fileObject);
                if(value) await sendResourceToDatabase({id, value, type, subtopicID});
                else throw new Error("Upload Failed");
                
                setTimeout(() => {
                    // TODO: animateSuccess();
                    closeUploadOverlay();
                    // TODO: resetUploadOverlay();
                },5000)
            }
            catch(error){
                console.log(error);
            }
        }
        else return;
    }
}

async function sendResourceToDatabase(resourceObject){

    const { 
        id, 
        value, 
        type, 
        subtopicID
    } = resourceObject;

    const params = `id=${id}&&value=${value}&&type=${type}&&subtopicID=${subtopicID}`;

    return await AJAXCall({
        phpFilePath: "../include/course/addNewResource.php",
        rejectMessage: "Adding New Resource Failed",
        params,
        type: "post"
    });

}

function setUploadImageObject(imageObject) {
    globalImageObject = imageObject;
}

function setUploadPDFObject(PDFObject){
    globalPDFObject = PDFObject;
}

function openUploadOverlay(id){

    let uploadOverlay = document.querySelector(".upload-overlay");
    uploadOverlay.style.display = "grid";
    console.log("subtopic ID:", id);
    uploadOverlay.setAttribute('data-id', id);

}

function closeUploadOverlay(){
    let uploadOverlay = document.querySelector(".upload-overlay");
    uploadOverlay.style.display = "none";
}

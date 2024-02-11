class FileUploads {

    imageUploads = []
    videoUploads = []
    PDFUploads = []

    constructor(){

    }

    addImageToUpload(imageObject){
        this.imageUploads.push(imageObject);
    }

    addVideoToUpload(videoObject){
        this.videoUploads.push(videoObject);
    }

    addPDFToUpload(PDFObject){
        this.videoUploads.push(PDFObject);
    }

    uploadImages(){

        return new Promise((resolve, reject) => {

            let resultingFilenames;
            resultingFilenames = this.imageUploads.map( async (imageObject) => {
                try {
                    return await uploadFile(imageObject);
                }
                catch(error){
                    console.log(error);
                }
            });

            if(resultingFilenames) resolve(resultingFilenames);
            else reject("error: Something Went Wrong");

        })
    }

}

let fileUploads = new FileUploads();
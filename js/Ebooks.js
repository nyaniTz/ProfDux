class Ebooks {

    constructor(ebooksArray){
        this.ebooksArray = ebooksArray
    }

    renderEbooks(){

        const ebooksOuterContainer = document.querySelector(".ebooks-outer-container");
    
        this.ebooksArray.forEach( course => {

            const courseEbookContainer = document.createElement("div");
            courseEbookContainer.className = "course-ebook-container";

            const courseTitle = document.createElement("h2");
            courseTitle.className = "course-title";
            courseTitle.textContent = `${course.courseCode} : ${course.title}`;
            courseEbookContainer.appendChild(courseTitle);

            const ebookListContainer = document.createElement("div");
            ebookListContainer.className = "ebook-list-container";

            course.ebooks.forEach( ebook => {

                const ebookContainer = document.createElement("div");
                ebookContainer.className = "ebook-container";

                const ebookIcon = document.createElement("div");
                ebookIcon.className = "ebook-icon";

                // const ebookImageElement = document.createElement("img");
                // ebookImageElement.src = "../assets/icons/pdf.png";
                // ebookIcon.appendChild(ebookImageElement);

                let canvasElementClass = `pdf-thumbnail-${uniqueID()}`;
                let url = `../uploads/${ebook.value}`;

                const ebookCanvasElement = document.createElement("canvas");
                ebookCanvasElement.src = "../assets/icons/pdf.png";
                ebookCanvasElement.className = `pdf-thumbnail ${canvasElementClass}`;
                ebookIcon.appendChild(ebookCanvasElement);

                pdfjsLib
                .getDocument({ url, password: "" })
                .promise.then((data) => {
                    initialReportState.pdfDoc = data;
                    renderPDFShot( "."+canvasElementClass );
                })
                .catch((err) => {
                    console.log(err.message);
                });

                const ebookName = document.createElement("div");
                ebookName.className = "ebook-name";
                ebookName.textContent = ebook.title;

                ebookContainer.addEventListener("click", () => {
                    openPDFViewer(url);
                })

                ebookContainer.appendChild(ebookIcon)
                ebookContainer.appendChild(ebookName)
                ebookListContainer.appendChild(ebookContainer)

            });

            courseEbookContainer.appendChild(courseTitle);
            courseEbookContainer.appendChild(ebookListContainer);

            ebooksOuterContainer.appendChild(courseEbookContainer);

        });
    }
}
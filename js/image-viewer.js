function openImageViewer(imageURL) {

    //TODO: compartmentalize the overlays into one reusable function
    // if possible

    let body = document.querySelector("body");

    let imageViewerOverlay = document.createElement("div");
    imageViewerOverlay.className = "image-viewer-overlay";

    let closeButton = document.createElement("div");
    closeButton.className = "close-button";

    let closeButtonIcon = document.createElement("img");
    closeButtonIcon.src = "../assets/icons/close.png"; // TODO: Can this be CSS?
    closeButton.addEventListener("click", () => closeImageViewer());
    
    let imageViewer = document.createElement("div");
    imageViewer.className = "image-viewer";

    let image = document.createElement("img");
    image.src = imageURL;
    imageViewer.appendChild(image);

    closeButton.appendChild(closeButtonIcon);

    imageViewer.appendChild(closeButton);
    imageViewerOverlay.appendChild(imageViewer);

    imageViewerOverlay.style.display = "grid";
    body.appendChild(imageViewerOverlay);

  }

  function closeImageViewer() {
    
    document.querySelector('.image-viewer > img').src = "";
    let imageViewerOverlay = document.querySelector('.image-viewer-overlay')
    
    imageViewerOverlay.style.display = 'none';

    setTimeout(() => imageViewerOverlay.remove() , 1000);

  }
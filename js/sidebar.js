( function activateLink(){

    let identifierElement = document.querySelector("page");
    let identifier = identifierElement.getAttribute("data-id");

    let sidebarLinks = document.querySelectorAll(".sidebar-link");
    
    let linkToActivate;

    sidebarLinks.forEach( link => {
        if(link.getAttribute("data-id") == identifier){
            link.className = "sidebar-link active";
            return;
        }
    })
    
})()
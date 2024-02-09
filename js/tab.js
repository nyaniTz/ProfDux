let tabContentViews = document.querySelectorAll(".tab-container-view");

tabContentViews.forEach( tabContentView => {

    let tabHeader = tabContentView.querySelector(".tab-header");
    let headerTabs = tabHeader.querySelectorAll(".header-tab");
    let tabBodies = tabContentView.querySelectorAll(".tab-body");

    headerTabs.forEach( tab => {
        tab.addEventListener("click", () => {
            setTabsToInactive(headerTabs);
            tab.className = "header-tab active";
            let identifier = tab.getAttribute("data-for");
            hideAllBodies(tabBodies);
            showRespectiveBody(tabBodies, identifier);
        })
    })

    function showActiveOrFirstBody () {

        let activeTab = tabContentView.querySelector(".header-tab.active")

        if(!activeTab){
            activeTab = tabContentView.querySelectorAll(".header-tab")[0];
            activeTab.className = "header-tab active";
        }

        let identifier = activeTab.getAttribute("data-for");
            showRespectiveBody(tabBodies, identifier);

    }
    
    showActiveOrFirstBody();
    
})


function setTabsToInactive(headerTabs){
    headerTabs.forEach( tab => tab.className = "header-tab" );
}

function showRespectiveBody(tabBodies, identifier){
    tabBodies.forEach( body => {
        if(body.getAttribute("data-for") == identifier ){
            body.style.display = "grid";
            return
        }
    })
}

function hideAllBodies(tabBodies){
    tabBodies.forEach( body => body.style.display = "none" );
}


function goToTab(tabContainerCSSID, tabIdentifier) {
    // scrollTo(tabContainer)

    let tabContainer = document.querySelector(`#${tabContainerCSSID}`);
    let headerTabs = tabContainer.querySelectorAll(".header-tab");
    let tabBodies = tabContainer.querySelectorAll(".tab-body");

    headerTabs.forEach( headerTab => {
        if(headerTab.getAttribute("data-for") == tabIdentifier ){
            setTabsToInactive(headerTabs);
            headerTab.className = "header-tab active";
            hideAllBodies(tabBodies);
            showRespectiveBody(tabBodies, tabIdentifier);
            return
        }
    })

}
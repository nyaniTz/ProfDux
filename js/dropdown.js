let dropdowns = document.querySelectorAll(".dropdown");
let zIndex = 1;

dropdowns.forEach( dropdown => {

    let isDropdownOpen = false;
    let values = dropdown.querySelectorAll(".values > li");

    dropdown.addEventListener("click", () => {
        
        if(isDropdownOpen){
            dropdown.className = "dropdown";
        }
        else{
            dropdown.className = "dropdown open";
        }

        dropdown.style.zIndex = zIndex++ + 1;

        isDropdownOpen = !isDropdownOpen;
    });

    values.forEach( value => {
        value.addEventListener("click", () => {

            // let langAttr = document.querySelector("html").getAttribute("lang");

            if(dropdown.getAttribute("data-type") == "static"){
                let valueTR =  value.getAttribute(`data-tr`);
                dropdown.setAttribute("data-value-tr", valueTR);

                let valueEN =  value.getAttribute(`data-en`);
                dropdown.setAttribute("data-value-en", valueEN);

                dropdown.setAttribute("data-value", valueEN);
            }
            else{

                let valueTR =  value.getAttribute(`data-en`);
                dropdown.setAttribute("data-value-tr", valueTR);

                let valueEN =  value.getAttribute(`data-en`);
                dropdown.setAttribute("data-value-en", valueEN);

                dropdown.setAttribute("data-value", valueEN);

            }

            dropdown.setAttribute("data-empty","false");
        });
    });

});
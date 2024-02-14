function truncateString(string, limit = 30) {
    return string.substring(0, limit) + "...";
}

function logoutDialog(_options){

    let options = _options ?? {
        title: 'Are You Sure You Want To Log Out?',
        denyTitle: 'No',
        acceptTitle: 'Yes'
    }
    
    return showOptionsDialog(options, () => logout())
}

function inactivityTime(duration, callback) {
    let time;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(callback, duration)
    }
};

function runAfterInactiveSeconds(duration, callback){
    window.onload = () => inactivityTime(duration, callback)
}


function playPause() { 

    let myVideo = document.querySelector("#video1");

    if (myVideo.paused) 
      myVideo.play(); 
    else 
      myVideo.pause(); 
    
} 

function showLoader(message){

    let loader = document.createElement("div");
    loader.className = "loading-overlay user-select-none";
    let body = document.querySelector("body");

    let loaderInnerHTML = 
    `   <div class="overlay-inner-container">
            <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>

            <div class="loading-message">
                ${message}
            </div>
        </div>
    `;

    loader.innerHTML = loaderInnerHTML;
    body.appendChild(loader);

    return loader;
}

function removeLoader(loader){
    loader.style.opacity = "0"

    setTimeout(() => loader.remove(), 1000);
}

function cascadingDateChanges(){

    let dateInputs = document.querySelectorAll("#topicCardsContainer input");
    let daysToAdd = 7;

    dateInputs.forEach( (input,index) => {

        input.addEventListener('change', (event) => {
            let chosenDate = event.target.value;
            let currentDate = new Date(`${chosenDate}:00.000`);
            let currentIndex = Number(input.getAttribute('data-position'));

            dateInputs.forEach((dateInput,index) => {
                let position = Number(dateInput.getAttribute('data-position'));
                
                if(position > currentIndex){
                    let nextDate = currentDate;
                    let timezoneOffset = nextDate.getTimezoneOffset();
                    nextDate.setDate(currentDate.getDate() + daysToAdd);
                    currentDate = nextDate;

                    let [ _date, _time ] = currentDate.toJSON().split("T");      
                    let [_hours, _minutes] = _time.split(".")[0].split(":");

                    let time = `${_hours - (timezoneOffset / 60)}:${_minutes}`;
                    const finalDate = `${_date} ${time}`;
                    dateInput.value = finalDate;

                }
            });
        });

        input.setAttribute('data-position', index);
    });
}

// function showBatchSelectContainerView(){

//     let view;
//     let container = document.querySelector("#studentsListAll");
//     let batchSelectContainer = document.querySelector(".batch-select-container");
//     let studentCheckboxes = container.querySelectorAll('input[type="checkbox"]');

//     let count = 0;

//     studentCheckboxes.forEach( checkbox => {
//         if(!checkbox.checked){
//             count++;
//         }
//     });

//     let textRequest = count == 1 ? "Request" : "Requests";
//     let areIs = count == 1 ? "is" : "are";

//     if(count > 0){
//         view = `
//             <p>There ${areIs} ( <b>${count}</b> ) new ${textRequest}</p>
//             <button onclick="SelectAllCheckboxes()">Approve ${count} ${textRequest}</button>
//         `;
//     }
//     else{
//         view = `<p class="stretch-x">There are no new requests</p>`
//     }

//     batchSelectContainer.innerHTML = view;

// }

// function SelectAllCheckboxes(){

//     let container = document.querySelector("#studentsListAll");
//     let studentCheckboxes = container.querySelectorAll('input[type="checkbox"]');
    
//     studentCheckboxes.forEach( checkbox => {
//         if( !checkbox.checked ){
//             checkbox.checked = true;

//             // Create a new 'change' event
//             var event = new Event('change');

//             // Dispatch it.
//             checkbox.dispatchEvent(event);
//         }
//     });

//     showBatchSelectContainerView();

// }

function uniqueID(stregth = 2){
    const date = Date.now();
    const dateReversed = parseInt(String(date).split("").reverse().join(""));
    const base36 = number => (number).toString(36);
    if(stregth == 1) return base36(date);
    if(stregth == -1) return  base36(dateReversed);
    return base36(dateReversed) + base36(date);
}

function setUsernameDetails(user){
    document.querySelectorAll('#userName').forEach(item => {
    item.setAttribute('data-en', user.name);
    item.setAttribute('data-tr', user.name);
    })
    document.querySelectorAll('#userPhoto').forEach(item => item.src = user.photo)
}

function AJAXCall(callObject){

    let {
        phpFilePath,
        rejectMessage,
        params,
        type,
    } = callObject;

    return new Promise((resolve,reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open("POST", phpFilePath, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function(){
            if( this.status == 200 ){

                let result = type == "fetch" ? 
                JSON.parse(this.responseText) : this.responseText ;

                //TODO: Take a look one more time
                if(result.length < 1 && type != "fetch") reject(rejectMessage || "SQLError");
                else { resolve(result) }
            }
            else{
                reject("Error With PHP Script");
            }
        }

        xhr.send(params);

    });
    
}

function loadImage(event, outputElement) {
    const output = document.querySelector(outputElement);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
}

async function uploadFile(file, scriptPath = "../include/upload.php"){

    if(!file){
        return false;
    }

    return new Promise((resolve, reject) => {

        let myFormData = new FormData();
        myFormData.append("file", file);

        let http = new XMLHttpRequest();
        http.open("POST", scriptPath, true);

        http.upload.addEventListener("progress", (event) => {
            let percent = (event.loaded / event.total ) * 100;
            document.querySelector("#global-progress-bar").style.width = Math.round(percent) + "%";
        })

        http.onload = function(){
            if(this.status == 200){

                console.log("name2: ",this.responseText);

                resolve({
                    oldFileName: file.name ,
                    newFileName: this.responseText
                });
            }
            else{
               reject("error");
            }
        }

        http.send(myFormData);
    })
}

async function getUserDetails(){

    try{
        let result = await AJAXCall({
            phpFilePath: "../include/getPersonalDetails.php",
            rejectMessage: "Getting Personal Details Failed",
            params: "",
            type: "fetch"
        });
        
        if(result){
            return result[0];
        }
    }
    catch(error){
        console.log(error);
        // TODO: Logout
    }

}

function openPopup(selector){
    let popup = document.querySelector(selector);
    popup.style.display = "grid";
}

function closePopup(selector){
    let popup = document.querySelector(selector);
    popup.style.display = "none";
}

async function getGlobalDetails(){

    let result = await getUserDetails();

    if(!result.id) logout();
    else return result;
}

function createElement(type, className=""){
    let element = document.createElement("div")
    element.className = className;
    return element;
}

function findElement(selector){
    return document.querySelector(selector);
}

function findElements(...args){

    let result = { };

    args.forEach( item => { 
        result[camelCase(item)] = findElement(item); 
    })

    return result;
}

function camelCase(word){
    return word
    .replace(".","")
    .replace("#","")
    .replace(/-([a-z])/g, function(k){
        return k[1].toUpperCase();
    });
}

async function logout() {

    let result = await AJAXCall({
        phpFilePath: "../include/logout.php",
        rejectMessage: "logout error",
        params: "",
        type: ""
    });
    
    window.location.href = "../auth.php";
}
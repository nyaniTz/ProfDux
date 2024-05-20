function renderClassView(element){
    const givenID = globalCache.get("givenCourseID");
    const courseData = globalCache.get("chosenCourseData");
    const duxClassChat = new DuxClassChat(courseData, givenID);

    openPopup('.class-chat-inner-overlay');

    let duxSendButton = document.querySelector(".class-send-message-button");
    let duxInputText = document.querySelector("#final_speech");
    let duxMessagesView = document.querySelector(".dux-class-chat-container");
    let uploadPDF = document.querySelector("#duxAddPDF");

    duxClassChat.addSendButtonElement(duxSendButton);
    duxClassChat.addTextBoxInputElement(duxInputText);
    duxClassChat.addMessagesView(duxMessagesView);
    duxClassChat.setAddToDuxPDF(uploadPDF);
    duxClassChat.startChatEngine();

}

class DuxClassChat {

    messagesView

    constructor(courseObject, courseID, startMessage = "Welcome To Class."){

        this.startMessage = startMessage;
        this.PDFCorpus = [];

        let {
            title,
            courseCode,
            lectures,
            id,
        } = courseObject

        this.title = title;
        this.courseCode = courseCode;
        this.lectureQueue = lectures;
        this.subtopicQueue = [];
        this.resourceQueue = [];
        this.quizQueue = [];
        this.currentLecture = null;
        this.currentSubtopic = null;
        this.currentQuiz = null;
        this.hasQuiz = false;
        this.courseObject = courseObject;
        this.id = id;
        this.currentStep = "lecture";
        this.courseID = courseID;

        ( async() => {
            try{
                let response = await fetchOpenAIKey();
                console.log(response[0].value);
                this.apiKey = response[0].value;
            }
            catch(error){
                console.log(error);
            }
        })();

    }

    startChatEngine(){
        this.messagesView.innerHTML = "";
        this.renderDuxMessageFor(this.startMessage, null, "forced");
        this.next();
    }

    next(){

        switch(this.currentStep){
            case "lecture":
                console.log("lecture");
                this.getCurrentLecture()
            break;
            case "subtopic":
                console.log("subtopic");
                this.getCurrentSubtopic()
            break;
            case "resource":
                console.log("resource");
                this.getCurrentResource()
            break;
            case "quiz":
                console.log("quiz");
                this.getCurrentQuiz()
            break;
        }
    }

    getCurrentLecture(){

        if(this.lectureQueue.length > 0){
            this.currentLecture = this.lectureQueue.shift();

            if(this.currentLecture.quizzes.length > 0){
                this.hasQuiz = true 
                this.quizQueue = this.currentLecture.quizzes
            }
            else this.hasQuiz = false; 

            this.subtopicQueue = this.currentLecture.subtopics;
            this.currentStep = "subtopic";
            this.next()
        } else {
            this.currentStep = "finished"
            // showThatThereAreNoLecturesToStudy()
            // showThatTheLecturesAreFinished()
            return;
        }

    }

    getCurrentSubtopic(){

        if(this.subtopicQueue.length > 0){
            this.currentSubtopic = this.subtopicQueue.shift();

            this.resourceQueue = this.currentSubtopic.resources;
            this.currentStep = "resource";
            this.next()

        } else {

            if (this.hasQuiz == true) this.currentStep = "quiz";
            else this.currentStep = "lecture";  
            this.next();
        }

    }

    getCurrentResource(){

        if(this.resourceQueue.length > 0){

            this.currentResource = this.resourceQueue.shift();

            let { type, title, value } = this.currentResource;

            switch(type){
                case "application/pdf":
                    this.renderPDFMessage(value, false);
                break;
                case "image/jpg":
                case "image/png":
                    this.renderImageMessage(`../uploads/${value}`);
                break;
                case "video/mpeg":
                break;
            }
        }

        else {
            this.currentStep = "subtopic";
            this.next();
        }

    }

    getCurrentQuiz(){

        if(this.quizQueue.length > 0){
            this.currentQuiz = this.quizQueue.shift();
            handleQuiz(this.currentQuiz, this.quizButton, "iterative"); // TODO: handle quiz finishing.
        } else {
            this.currentStep = "lecture";
            this.next();
        }

    }



    renderTitle(){
        // let titleElement = findElement(".classroom-course-title");
        // let textElement = document.createElement("div");

        // textElement.textContent = this.title;
        // titleElement.innerHTML = "";
        // titleElement.appendChild(textElement);
    }

    renderCourseCode(){
        // let titleElement = findElement(".classroom-course-code");
        // let textElement = createLocalizedTextElement(this.courseCode);        
        // titleElement.innerHTML = "";
        // titleElement.appendChild(textElement);
    }

    addTextBoxInputElement(textInput){
        this.textInput = textInput;

        // this.textInput.addEventListener("keypress", (e) => {
        //     if(e.keyCode == 13) {
        //         this.initiateDuxResponse();
        //     }
        // })
    }

    addSendButtonElement(button){
        this.sendButton = button;
        this.sendButton.addEventListener("click", () => {
            this.initiateDuxResponse();
        })
    }

    addMessagesView(view){
        this.messagesView = view;
    }

    setAddToDuxPDF(button){
        button.addEventListener("change", (event) => this.openPDFSelector(event))
    }

    openPDFSelector(event){

        let file = event.target.files[0];
        let objectURL = window.URL.createObjectURL(file);
        this.renderPDFMessage(objectURL, "direct");
        // output.onload = function() { URL.revokeObjectURL(objectURL) }
    }

    renderPDFMessage(filename, type = "direct"){

        const PDFLink = type == "direct" ? filename : `../uploads/${filename}`;

        const centerMessageOuterContainer = document.createElement("li")
        centerMessageOuterContainer.className = "center";

        const PDFContainer = document.createElement("div");
        PDFContainer.className = "pdf-message";
        
        const PDFIframe = document.createElement("iframe");
        PDFIframe.className = "pdf-frame";
        PDFIframe.setAttribute("width", "100%");
        PDFIframe.setAttribute("height", "100%");
        PDFIframe.src = PDFLink;

        PDFContainer.appendChild(PDFIframe);
        centerMessageOuterContainer.appendChild(PDFContainer);

        if(type != "direct"){    
            const finishedReadingButton = document.createElement("div");
            finishedReadingButton.className = "finished-button";
            finishedReadingButton.textContent = "I Have Finished Reading";
    
            finishedReadingButton.addEventListener("click", () => {
                this.next();
                finishedReadingButton.remove();

            })

            centerMessageOuterContainer.appendChild(finishedReadingButton);
        }

        this.messagesView.append(centerMessageOuterContainer);

        this.addPDFToCorpus(filename, PDFLink);

    }

    async addPDFToCorpus(filename, url){
        const pages = await getPagesFrom(url);
        this.PDFCorpus.push(pages);
        console.log("current PDF Corpus: ", this.PDFCorpus);
    }

    async findInPDFCorpus(query){

        let results = performSearch(query, this.PDFCorpus);
        console.log("entries: ", results);

        let joinedPages = 
        results.map( result => {
            const entry = Object.entries(result)[0];

            console.log("key: ", entry[0])
            console.log("value: ", entry[1])

            return `page - ${entry[0]} : [${entry[1]}]`
        }
        ).join(",\n");

        console.log(joinedPages);
    }

    renderImageMessage(imageLink){

        const centerMessageOuterContainer = document.createElement("li")
        centerMessageOuterContainer.className = "center";

        const imageContainer = document.createElement("div");
        imageContainer.className = "image-message";
        
        const imageFrame = document.createElement("img");
        imageFrame.className = "image-frame";
        imageFrame.src = imageLink;

        imageContainer.appendChild(imageFrame);

        const finishedViewingButton = document.createElement("div");
        finishedViewingButton.className = "finished-button";
        finishedViewingButton.textContent = "I Have Finished Viewing";

        finishedViewingButton.addEventListener("click", () => {
            this.next();
            finishedViewingButton.remove();
        })

        centerMessageOuterContainer.appendChild(imageContainer);
        centerMessageOuterContainer.appendChild(finishedViewingButton);
        this.messagesView.append(centerMessageOuterContainer);

    }


    renderMyMessage(message){

        const myMessageContainer = document.createElement("li");
        myMessageContainer.className = "mine";

        // This format
        // <li class="mine">
        //     <p class="name-tag">IA</p>
        //     <p>Hello</p>
        // </li>

        const myIcon = document.createElement("div");
        myIcon.className = "name-tag";
        myIcon.textContent = "ME";

        const myMessageText = document.createElement("div");
        myMessageText.className = "message-text";
        myMessageText.innerHTML = message;

        myMessageContainer.append(myIcon);
        myMessageContainer.append(myMessageText);
        this.messagesView.append(myMessageContainer);

    }

    initiateDuxResponse(){

        let message = this.textInput.textContent;

        let results = performSearch(message,this.PDFCorpus);
        let joinedResults = joinSearchResult(results);

        const promptMessage = `From the following PDF Extract ${joinedResults}, give me a response to the input ${message} with a limit of 50 words.`;
        
        this.renderMyMessage(message);
        this.textInput.textContent = "";

        if(message.length > 0 && results.length > 0){
            this.renderDuxMessageFor(message, promptMessage);
        }else{
            this.renderDuxMessageFor(message, `Give me a response to the input ${message} with a limit of 50 words`, 'free-response')
        }

    }

    async playVoice(text, apiKey){
        const response = await generateTextToAudioFor(text, this.apiKey);
        playAudioFileFromResponse(response);
    }

    renderDuxMessageFor(message, promptMessage, type){

        console.log("hellooo");

        const loader = `
        <div class="dux-message-loader">
            <div class="sk-flow">
                <div class="sk-flow-dot"></div>
                <div class="sk-flow-dot"></div>
                <div class="sk-flow-dot"></div>
            </div>
        </div>`;

        const duxMessageContainer = document.createElement("li");
        duxMessageContainer.className = "foreign foreign-a";

        const duxIcon = document.createElement("div");
        duxIcon.className = "name-tag";
        duxIcon.textContent = "DU";

        const duxMessageText = document.createElement("div");
        duxMessageText.className = "message-text";
        duxMessageText.innerHTML = loader;

        const duxListenButton = document.createElement("div");
        duxListenButton.className = "play-button";

        const duxListenIcon = document.createElement("img");
        duxListenIcon.src = "../assets/icons/speaker.png";
        duxListenButton.append(duxListenIcon);

        const responseBadge = document.createElement("div");
        responseBadge.className = "response-badge";
        responseBadge.textContent = "from books";

        if(type == "free-response") responseBadge.textContent = "free response";

        duxMessageText.innerHTML = loader;

        duxMessageContainer.append(duxIcon);
        duxMessageContainer.append(duxMessageText);
        duxMessageContainer.append(duxListenButton);
        this.messagesView.append(duxMessageContainer);

        // fetch message;

        if(type != "forced") ( async() => {

            duxMessageContainer.appendChild(responseBadge);
            
            console.log("message sent: ", message);

            let responseMessage = await generateGPTResponseFor(message, this.apiKey);
            duxListenButton.addEventListener("click", () => this.playVoice(responseMessage))
            console.log(responseMessage);

            setTimeout(() => {
                duxMessageText.innerHTML = "";
                duxMessageText.textContent = responseMessage;
            },2000);
        })()
        else {
            duxMessageText.textContent = message;
            duxListenButton.addEventListener("click", () => this.playVoice(message))

        }

    }
}

async function generateGPTResponseFor(prompt, apiKey) {

    const endpoint = 'https://api.openai.com/v1/chat/completions';

    try {

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                    role: 'system',
                    content: 'You are a helpful assistant.'
                    },
                    {
                    role: 'user',
                    content: prompt
                    }
                ]
            })
        });

        const data = await response.json();
        console.log('HERE IS DATA FROM GPT: ', data);
        return data.choices[0].message.content;

    } catch (error) {
        console.error('Error fetching response:', error);
        return null;
    }
}

// voice

function generateTextToAudioFor(input, apiKey) {

    return new Promise( async(resolve, reject) => {

        const endpoint = 'https://api.openai.com/v1/audio/speech';

        try {

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'tts-1',
                    voice: 'onyx',
                    input: input,
                    speed: '0.95',
                    stream: true
                })
            });

            let audioCtx = new AudioContext();
            let buffer = await audioCtx.decodeAudioData(await response.arrayBuffer());
            resolve({ audioCtx, buffer });

        } catch (error) {
            reject(error);
        }

    })
}

async function playAudioFileFromResponse({ audioCtx, buffer }){

    try {

        let source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start();

    }
    catch(error){
        console.log("HMMM")
    }
}
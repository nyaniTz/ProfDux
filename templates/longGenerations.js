let multipleChoice = 5;
let fillInTheBlanks = 15;
let trueAndFalse = 19;

class BatchGenerator {

    constructor(questionType, amount, batchSize = 4){
        this.questionType = questionType
        this.amount = amount
        this.batchSize = batchSize
    }

    async start(){

        const BATCH = this.batchSize;
        const batchArray = this.batchMatch(BATCH, this.amount);
    
        let questionsDone = 0;
        let total = this.amount;
        let quizQuestions = [];
    
        const languages = ["english", "turkish"];
        const educationEnvironment = "college students";
        const types = ["multiple choice questions", "fill in the blanks", "true and false"];
        const levels = ["easy", "medium", "hard", "difficult", "extremely difficult"];
    
        for await(const batch of batchArray){
            console.log("batch count: ", batch);
    
            const generateQuestionObject = { 
                type: this.questionType,
                languages,
                subtopics: "diseases, immunity, body health",
                educationEnvironment,
                topics: "diseases, immunity, body health",
                level: getRandomElement(levels)
            };
    
            try{
                let result = await generateQuestion(generateQuestionObject, batch);
                quizQuestions = [ ...quizQuestions, ...result ];
                questionsDone += batch;
                console.log("done: ", `${questionsDone}/${total}`);
            }catch(error){
                console.log(error);
            }
        }
    
        return quizQuestions;
    }

    batchMatch(batch, amount){
        let _amount = amount;
        let batchArray = [];

        while(_amount > 0){
            if((_amount / batch) >= 1) batchArray.push(batch)
            else batchArray.push(_amount % batch)
            _amount -= batch;
        }
        
        console.log("batchArray: ", batchArray);
        return batchArray;
    }
}

function getRandomElement(arr) {
    if (arr.length === 0) {
      return undefined;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

async function generateQuestion(generateQuestionObject, amount){

    const { 
        type,
        languages,
        subtopics,
        educationEnvironment,
        level,
        topics
    } = generateQuestionObject;

    let query = 
    `create for me in valid json format using ISO encoding, ${amount} questions with the keywords 'questions' in the ${languages.map( language => `${language}`).join("and ")} as well as their answers 
    in the ${languages.map( language => `${language}`).join("and ")} with those exact key names in the topics of ${topics} 
    for ${educationEnvironment}. 

    The questions should be ${type} with its respective answer choices as well in the languages types ${languages.map( language => `${language}`).join("and ")}
    as well as the correct answer option in ${languages.map( language => `${language}`).join("and ")}.

    The questions should be ${level}.

    The json format should have the following keys, 
    "question, answerOptions, answer, type, hardness". 

    question, answerOptions and answer should all come with the ${languages.map( language => `${language}`).join("and ")}

    The answerOptions should only be available if the 
    question type is multiple choice or true and false.

    Do not add any invalid characters in the result please.`;

    let unparsedJSONResponse = await generateGPTResponseFor(query);
    let result = await JSON.parse(unparsedJSONResponse);

    try{
        if(result.questions) return result.questions
        else if(result.question) return result.question
        else if(result.questions.questions) return result.questions.questions
        else return result
    }catch(error){
        console.log(error);
    }

}

async function generateGPTResponseFor(prompt) {

    const response = ["removed-key"];
    let apiKey = response[0];

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
                ],
                response_format: {"type": "json_object"}
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error('Error fetching response:', error);
        return null;
    }
}

( async() => {

    let batchGenerators = [ 
        new BatchGenerator("multiple choice questions", multipleChoice),
        new BatchGenerator("fill-in-the-blanks", fillInTheBlanks),
        new BatchGenerator("true-and-false", trueAndFalse)
    ];

    let generatorResults = [];

    for await(const generators of batchGenerators){
        generatorResults.push(await generators.start());
    }

    console.log(generatorResults);

    // return generatorResults;

})();

// class AsyncQueue {

//     queueCount
//     asyncResults = []

//     constructor(asyncCallbacks){
//         this.asyncCallbacks = asyncCallbacks;
//         this.queueCount = asyncCallbacks.length;
//     }

//     async start(){

//         for(const callback of this.asyncCallbacks){
//             this.asyncResults.push(callback());
//         }

//     }

//     hasEnded(){

//     }

//     async returnResults(){

//     }
// }
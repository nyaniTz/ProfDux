let language = "english";
let topic = "human heart";
let educationEnvironment = "college students";

let multipleChoiceCount = 3;
let fillInTheBlankCount = 3;
let trueAndFalseCount = 0;

let hardQuestionsCount = 2;
let mediumQuestionsCount = 3;
let easyQuestionsCount = 1;

let query = 
`create for me in json format a series of new questions 
in the ${language} language as well as their answers 
in the ${language} language in the topics of ${topic} 
for ${educationEnvironment}. 
There should be ${multipleChoiceCount} multiple choice questions, 
${fillInTheBlankCount} fill in the blank questions and 
${trueAndFalseCount} true and false questions. 
${hardQuestionsCount} of those questions should be hard, 
${mediumQuestionsCount} should be medium and 
${easyQuestionsCount} should be easy. 
The json format should have the following keys, 
"question, answerOptions, answer, type, hardness". 
The answerOptions should only be available if the 
question type is multiple choice, and there should be no 
letter options in the answerOptions and a 
minimum of 4 answerOptions.`;

async function generateGPTResponseFor(prompt) {

    let apiKey = fetchOpenAIKey();

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
        console.log('HERE IS DATA FROM GPT: ', data.choices[0].message.content);
        return data.choices[0].message.content;

    } catch (error) {
        console.error('Error fetching response:', error);
        return null;
    }
}

generateGPTResponseFor(query);
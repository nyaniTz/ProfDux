// ( async () => {

//     let result = await fetchOpenAIKey();
//     OPENAI_API_KEY = result[0].apiKey;

// })();

async function fetchOpenAIKey(phpFilePath = "../include/openAIKey.php"){

    return await AJAXCall({
        phpFilePath,
        rejectMessage: "Key Not Fetched",
        params: '',
        type: "fetch"
    });

}
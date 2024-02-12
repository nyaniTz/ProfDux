async function fetchOpenAIKey(phpFilePath = "../include/openAIKey.php"){

    return await AJAXCall({
        phpFilePath,
        rejectMessage: "Key Not Fetched",
        params: '',
        type: "fetch"
    });

}
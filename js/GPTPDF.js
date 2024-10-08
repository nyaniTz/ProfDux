async function generatePDFfromGPT({courseName, lectureTitle}) {

    const response = await fetchOpenAIKey();
    let apiKey = response[0].value;
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    let finalURL;

    const prompt = `Generate a detailed lecture on the topic of "${lectureTitle}" that spans approximately 10 pages and aims for around 5,000 words. 
        Include the following sections: 

        1. Introduction: Introduce the topic with context and relevance. 
        2. Key Concepts: Provide detailed explanations of essential concepts in machine learning, using bullet points or lists where appropriate. 
        3. History: Discuss the evolution of machine learning with significant milestones, influential figures, and breakthroughs, including examples. 
        4. Challenges: Outline the major challenges in the field with in-depth analysis. 
        5. Future Trends: Explore emerging trends and technologies that will shape the future of machine learning, with predictions and potential impacts.
        6. Applications: Detail diverse applications across various domains, supported by case studies or examples.

        At the end, include:
        - A concise outcome summarizing the key takeaways.
        - Four engaging discussion questions to stimulate further thought.

        Write the content as if authored by Prof Dux, ensuring the writing is engaging, informative, and formatted well.`;


        return new Promise( async (resolve, reject) => {
            
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
                            { role: 'system', content: 'You are a helpful assistant.' },
                            { role: 'user', content: prompt }
                        ]
                    })
                });
        

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(`Error: ${errorResponse.error.message}`);
                }
        

                const data = await response.json();
                let content = data.choices[0].message.content;
        
        
                content = content.replace(/[#*--]/g, '');
        

                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF();
                
                pdf.setFontSize(24);
                pdf.text(lectureTitle, 105, 50, { align: 'center' });
                pdf.setFontSize(16);
                pdf.text(`Course Name: ${courseName}`, 105, 70, { align: 'center' });
                pdf.text('Near East University', 105, 90, { align: 'center' });
                pdf.text('Written by Prof Dux', 105, 110, { align: 'center' });
                pdf.addPage();
                const sections = content.split('\n\n').filter(section => !section.toLowerCase().includes("world"));
                const totalSections = sections.length;
                let currentHeight = 20;
                const maxPages = 10;
        

                sections.forEach((section, index) => {
                    if (pdf.internal.getNumberOfPages() > maxPages) {
                        return;
                    }
        
                    pdf.setFontSize(12); // Font size for content
                    pdf.setFont('helvetica', 'normal'); // Set font style
        
                    const textLines = pdf.splitTextToSize(section.trim(), 190);
                    textLines.forEach((line) => {
                        if (currentHeight + 10 > pdf.internal.pageSize.height - 20) {
                            pdf.addPage();
                            currentHeight = 20; 
                        }
                        pdf.text(line, 10, currentHeight);
                        currentHeight += 10; // Move down for each line
                    });
        
                    currentHeight += 10;
                    if (index < totalSections - 1) {
                        currentHeight += 10; 
                    }
                });
        
        

                const pdfOutput = pdf.output('blob');
                const pdfUrl = URL.createObjectURL(pdfOutput);

                resolve({pdfOutput, pdfUrl});
        
            } catch (error) {
                console.error('Error fetching GPT or generating PDF:', error);
                alert('Failed to generate PDF: ' + error.message);
            }
        })
}

async function uploadBlobPDF({fileObject, lectureID}){

    console.log("fileOfileObject: ",fileObject);
    console.log("lectureID: ",lectureID);

    if(fileObject && lectureID){
        let type = "application/pdf";
        const id = uniqueID(1);
        const forcedName = `${uniqueID(2)}.pdf`;

        // Creating a File from the Blob, giving it a filename
        const myFile = new File([fileObject], forcedName, {
            type, // specify the correct MIME type
            lastModified: new Date() // you can also set a custom last modified date
        });

        try{
            const { newFileName: value, oldFileName } = await uploadFile(myFile);
            if(value) await sendResourceToDatabase({id, value, type, lectureID, oldFileName});
            else throw new Error("Upload Failed");
        }
        catch(error){
            console.log(error);
        }
    }
    else return;
}
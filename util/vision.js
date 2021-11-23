const vision = require('@google-cloud/vision');

// Google Vision OCR. More reliable than Tesseract but has limited scans.

module.exports = {
    validate: async (collected) => { 
        try
        {
            const clientOptions = {apiEndpoint: 'us-vision.googleapis.com', keyFilename: './GoogleKey.json'};
            const client = new vision.ImageAnnotatorClient(clientOptions);

            let url = collected.attachments.first().proxyURL;

            const [result] = await client.textDetection(url);
            const labels = result.textAnnotations;

            // Extremely high tech security for authenticating. Lol.
            // Simply check if their ID is between 100 and 200 million, then check that the next value is DOB. 
            // This is enough to make sure they upload their ID. 

            // TODO: Save each users "ID" so we can check later.
            let id_flag = false;
            let dob_flag = false;
            labels.forEach(label =>{
                if((100000000 <= parseInt(label.description) && parseInt(label.description) < 200000000) && !isNaN(parseInt(label.description))) id_flag = true;
                if(id_flag && label.description == "DOB:") dob_flag = true;
            });

            if(dob_flag) return 1;
            else {
                console.log(labels[0].description);
                return 0;
            }

        } catch(e) {
            console.log(e);
            console.log(`${collected.commandId} - ${e}`);
        }
    }
}

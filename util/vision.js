const vision = require('@google-cloud/vision');

// Google Vision OCR. More reliable than Tesseract but has limited scans.

module.exports = {
    validate: async (collected) => { 
        try
        {
            const clientOptions = {apiEndpoint: 'eu-vision.googleapis.com', keyFilename: './GoogleKey.json'};
            const client = new vision.ImageAnnotatorClient(clientOptions);

            let url = collected.attachments.first().proxyURL;

            const [result] = await client.textDetection(url);
            const labels = result.textAnnotations;

            let id_flag = false;
            let dob_flag = false;
            labels.forEach(label =>{
                if((100000000 <= parseInt(label.description) && parseInt(label.description) < 200000000) && !isNaN(parseInt(label.description))) id_flag = true;
                if(id_flag && label.description == "DOB:") dob_flag = true;
            });

            if(dob_flag) return 1;
            else return 0;

        } catch(e) {
            console.log(e);
            console.log(`${collected.commandId} - ${e}`);
        }
    }
}

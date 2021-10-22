const tesseract = require("node-tesseract-ocr");

// Tesseract OCR

module.exports = {
    validate: async (collected) => { 
        try
        {
            const config = { lang: "eng", oem: 3, psm: 3}

            let reply;
            let url = collected.attachments.first().proxyURL;

            await tesseract
            .recognize(url, config)
            .then((text) => {
                text = text.split('\r\n').join(' ');
                text = text.split(':').join(' ');
                text = text.split('  ').join(' ');
                text = text.trim();
                reply = text + ".";
                console.log(reply);
            })
            .catch((error) => {
                console.log(error);
            });

            let id_flag = false;
            let dob_flag = false;
            reply.split(' ').forEach(element => {
                if((100000000 <= parseInt(element) && parseInt(element) < 200000000) && !isNaN(parseInt(element))) id_flag = true;
                if(id_flag && element == "DOB") dob_flag = true;
            });

            if(dob_flag) return 1;
            else return 0;

        } catch(e) {
            console.log(e);
            interaction.editReply("Something went wrong. Try again?");
            console.log(`${interaction.commandId} - ${e}`);
        }
    }
}

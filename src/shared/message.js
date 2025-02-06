
const axios = require('axios');
const FormData = require('form-data');
const whatsappModel = require("../shared/whatsappmodels");
const whatsappService = require("../services/whatsappService");



async function messageResponse(message, number) {
    let data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "recipient_type": "individual",
        "type": "text",
        "text": {
            "body": message
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://graph.facebook.com/v18.0/228753940319645/messages',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer EAAUJ1CAOiugBO129leUK94XlRlv9i5NMYqwR2wRKoj1cCaeOFLZB7l5dFYGXF48jgBdy3uIbqdeR9NcRbqSUsm9qx7piDKp2RgYeZCD3FadZBmr3SHFZCXycLmJbnApkJis7RjG7TGqwBvTc4yxVbclVNU3ufRjZAZBXDGZAnTudHwerclDbhZCTVUwBiIuX6cjqK3y1bUErsS9W0TKNzMcZD"
        },
        data: data
    };
    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));


            if (message == "Désolé, Vous avez le droit de voter une seule fois par période de 24 heures.🥺🥵") {
                let modelMenuSecond = whatsappModel.MessageComprar(number);
                whatsappService.SendMessageWhatsApp(modelMenuSecond); 
            } else if( message == "Le vote a été effectué avec succès. 🥳👍🏽👌🏻") {
                let modelMenu = whatsappModel.MessageComprar(number);
                whatsappService.SendMessageWhatsApp(modelMenu); 
                
            }else{
                let modelMenu2 = whatsappModel.MessageComprar(number);
                whatsappService.SendMessageWhatsApp(modelMenu2); 

            }

        })
        .catch((error) => {
            console.log(error);
        });
}


module.exports = {
    messageResponse,
};



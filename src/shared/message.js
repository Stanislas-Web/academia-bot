
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
        // url: 'https://graph.facebook.com/v18.0/228753940319645/messages',
        url: 'https://graph.facebook.com/v22.0/300457023143796/messages',  
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer EAALOqv96b5kBQ0fGElUZAEb4PVvacNSZAXgHhT72XIUyVysH7H63aFl2qZB7TldOjZA5RZCbxvVY1nZBoVOeZBWaFCx5ZAXdZAOmg6TTZBFFfZCKJykfXQhZAIcurc9gaWsORKk3dTuQ4Rbj59QB1dZAynv3UqtDdt3dVRdUZBYEZApID9cxpbB39TXgvo44gEThO73E9dfb5wHS18B1qPIZBlAxosSh67LmpEQysC4zo0W9YsZCPZAhz7ZA2XEwtflDjDbbDZBiYEZAM2cZCwt79glGZCOwNZCfyCtwm5fM"
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



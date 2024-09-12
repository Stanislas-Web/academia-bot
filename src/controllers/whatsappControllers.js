const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const processMessage = require("../shared/processMessage");

const Hello = (req, res) => {
    
    res.status(200).send({
            "hello":"hello world"
    });
}


const VerifyToken = (req, res) => {
    try {
        var accessToken = "stanislas";
        var token = req.query["hub.verify_token"];
        var challenge = req.query["hub.challenge"];

        console.log("Token from request:", token);
        console.log("Challenge from request:", challenge);

        if (challenge != null && token != null && token === accessToken) {
            console.log("Verification successful. Sending challenge...");
            res.send(challenge);
        } else {
            console.log("Verification failed. Sending 400 status.");
            res.status(400).send();
        }
    } catch (e) {
        console.error("Error in verification:", e);
        res.status(400).send();
    }
}


// const VerifyToken = (req, res) => {
//     try {
//         let myToken = "stanislas";
//         let mode = req.query["hub.mode"];
//         let token = req.query["hub.verify_token"];
//         let challenge = req.query["hub.challenge"];

//         if (mode && token) {
//             if (mode === "subscribe" && token === myToken ) {
//                 res.status(200).send(challenge);
//             } else {
//                 res.status(403).send();
                
//             }
            
//         }


        
//     } catch (e) {
//         console.error("Error in verification:", e);
//         res.status(400).send();
//     }
// }

const SendMessage = (req, res) => {
    try{
        let { number, message} = req.body;


        // var entry = (req.body["entry"])[0];
        // var changes = (entry["changes"])[0];
        // var value = changes["value"];
        // var messageObject = value["messages"];

        processMessage.OTP(message, number);

        // if(typeof messageObject != "undefined"){
        //     var messages = messageObject[0];
        //     var number = messages["from"];

        //     var text = GetTextUser(messages);
            
        //     if(text != ""){
        //         processMessage.Process(message, number);
        //     } 

        // }        

        res.send("EVENT_RECEIVED");
    }catch(e){
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}



const ReceivedMessage = (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"];

        if(typeof messageObject != "undefined"){
            var messages = messageObject[0];
            var number = messages["from"];

            var text = GetTextUser(messages);
            
            if(text != ""){
                processMessage.Process(text, number);
            } 

        }        

        res.send("EVENT_RECEIVED");
    }catch(e){
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

function GetTextUser(messages){
    var text = "";
    var typeMessge = messages["type"];
    if(typeMessge == "text"){
        text = (messages["text"])["body"];
    }
    else if(typeMessge == "interactive"){

        var interactiveObject = messages["interactive"];
        var typeInteractive = interactiveObject["type"];
        
        if(typeInteractive == "button_reply"){
            text = (interactiveObject["button_reply"])["title"];
        }
        else if(typeInteractive == "list_reply"){
            text = (interactiveObject["list_reply"])["title"];
        }else{
            myConsole.log("sin mensaje");
        }
    }else{
        myConsole.log("sin mensaje");
    }
    return text;
}

module.exports = {
    VerifyToken,
    ReceivedMessage,
    Hello,
    SendMessage
}

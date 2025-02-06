const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const processMessage = require("../shared/processMessage");
const { log } = require("console");

const Hello = (req, res) => {
    
    res.status(200).send({
            "hello":"hello world"
    });
}


const VerifyToken = (req, res) => {
    try {
        var accessToken = "montreux";
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

const VerifyTokenResto = (req, res) => {
    try {
        var accessToken = "resto";
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

const VerifyTokenRestoBelleKinoise = (req, res) => {
    try {
        var accessToken = "resto";
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


const VerifyTokenArtcore_matos = (req, res) => {
    try {
        var accessToken = "matos";
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


const SendMessage = (req, res) => {
    try{
        let { number, message} = req.body;

        let idNumber = "250880504771635";
        let token = "EAAUJ1CAOiugBO6JflSCRDoZCAFJLTS2mOAdrk4XlEuB0WBdzSIF9fz2RlvVJ7s9DUFg1xmDDJA6K1ARQ4Vw4I8ekehjbMqZBf4cI3dFbBZAajEVDr8BcyNJRaborjW9QeixOWqcGFN01XxYcKqt253TjwT2aUVab15u5J514RVnGIdj0gXfttE4lrD0rXR9";
        numberServer ="243828191010";   




        processMessage.OTP(message, number, idNumber, token, numberServer);
      

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
            let messages = messageObject[0];
            let number = messages["from"];
            let text = GetTextUser(messages);

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


const ReceivedMessageResto = (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"];

        if(typeof messageObject != "undefined"){
            var messages = messageObject[0];
            var number = messages["from"];
            var text = GetTextUser(messages);
            let idNumber = "285285717993177";
            const idResto = "65dc65cf2ed7f55c4108fdaf";
            let token = "EAAUJ1CAOiugBO6JflSCRDoZCAFJLTS2mOAdrk4XlEuB0WBdzSIF9fz2RlvVJ7s9DUFg1xmDDJA6K1ARQ4Vw4I8ekehjbMqZBf4cI3dFbBZAajEVDr8BcyNJRaborjW9QeixOWqcGFN01XxYcKqt253TjwT2aUVab15u5J514RVnGIdj0gXfttE4lrD0rXR9";
            numberServer ="243826016607";        
            
            if(text != ""){
                processMessage.ProcessResto(text, number, idNumber, token, numberServer, idResto);
            } 

        }        
        res.send("EVENT_RECEIVED");
    }catch(e){
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

const ReceivedMessageArtcore_matos = (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"];


        if(typeof messageObject != "undefined"){
            var messages = messageObject[0];
            var number = messages["from"];
            var text = GetTextUser(messages);
            let idNumber = "230630080143527";
            const idResto = "66195471ae1038603b63574c";
            let token = "EAALOqv96b5kBOyZBK9MAZCF7Ev63btHib6DKyOTudKXvNYFkZBDdYZA6LDE6nssXrTZCEkdLP3hZBRLky3LS4SC5ZByFOtTzXNBVac4SKZCQPIug7YksXgiyeDZAqvGkcusMzz1cDjPPKXNkoVvQ8wrEZA4veGrRIyStcKg7a0MxBD1TE1DRCW76VLJikBEb9DLa8RQYhhKtkn4GWdduA8";
            numberServer ="243823125240";                  
            
            if(text != ""){
                processMessage.ProcessResto(text, number, idNumber, token, numberServer, idResto);
            } 

        }        
        res.send("EVENT_RECEIVED");
    }catch(e){
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

const ReceivedMessageRestoBelleKinoise = (req, res) => {
    try{
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"];
        if(typeof messageObject != "undefined"){
            var messages = messageObject[0];
            var number = messages["from"];
            var text = GetTextUser(messages);
            let idNumber = "110129175453707";
            let token = "EAALGxCsyiYQBOZCjg2RmlxG499EwkH0VwVPJcJ7TxR658IUYe2BEINXZCWEZBBlotyaBuKitI09ksDbzAXvi1QuzVDp81RFucUCD6r2gYKksGfnu168k2euaxWXR5OKwdkiroI11A2vTHP4ZAfbEDUxZCev2JvNTALTe3woT97S1ZCOIe7mo4J4znJjHDkZCrmyobHEwo1a8v02aW7hZBSEZD";
            numberServer ="243899250735";        
            if(text != ""){
                processMessage.ProcessResto(text, number, idNumber, token, numberServer);
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
    else if(typeMessge == "image"){
        let idImage =  messages["image"].id;
        console.log("Image Message ID: " + idImage);
        text = "Mon image";

    }else if(typeMessge == "audio"){
        let idAudio =  messages["audio"].id;
        console.log("Audio Message ID: " + idAudio);
        text = "Mon Audio";

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
    SendMessage,
    ReceivedMessageResto,
    VerifyTokenResto, 
    VerifyTokenRestoBelleKinoise,
    ReceivedMessageRestoBelleKinoise,
    ReceivedMessageArtcore_matos,
    VerifyTokenArtcore_matos
}

const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const https = require("https");
function SendMessageWhatsAppResto(data){
    
    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/250880504771635/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAUJ1CAOiugBO129leUK94XlRlv9i5NMYqwR2wRKoj1cCaeOFLZB7l5dFYGXF48jgBdy3uIbqdeR9NcRbqSUsm9qx7piDKp2RgYeZCD3FadZBmr3SHFZCXycLmJbnApkJis7RjG7TGqwBvTc4yxVbclVNU3ufRjZAZBXDGZAnTudHwerclDbhZCTVUwBiIuX6cjqK3y1bUErsS9W0TKNzMcZD"
        }
    };
    const req = https.request(options, res => {
        res.on("data", d=> {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}


function SendMessageWhatsAppRestoWithParams(data, idNumber, token){
    
    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/"+idNumber+"/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer "+token
        }
    };
    const req = https.request(options, res => {
        res.on("data", d=> {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

module.exports = {
    SendMessageWhatsAppResto,
    SendMessageWhatsAppRestoWithParams
};
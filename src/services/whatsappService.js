const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const https = require("https");
function SendMessageWhatsApp(data){

    
    const options = {
        host: "graph.facebook.com",
        path: "/v21.0/300457023143796/messages",
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

module.exports = {
    SendMessageWhatsApp
};
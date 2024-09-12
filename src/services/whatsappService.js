const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const https = require("https");
function SendMessageWhatsApp(data){
    
    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/263937400143933/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAOKXpr3YjIBO8mZB1AbHKGP70hjodOYrAHrb6gdHXfNyFq4EnPczDSmZClgQO5iBD5ZAHNVhNjZBZBhaNkA7dxoEZCrt1oOcBEPVaSpZCJyUJyf2yvob7CCApdrCcHWd1aQRmXlSozpgx85ZAyNpC8SlC8SFHFVtvBUIzsY6yLAYj1I4495latZC2rZAJZBLchpu4N"
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
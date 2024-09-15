const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const https = require("https");
function SendMessageWhatsApp(data){
    
    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/300457023143796/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAALOqv96b5kBO2fUy23y9d2JCjRViA1tEMJC5CH7DnrmKqDTuHDrDHEgHryywppNumhoyXBDXpCcOZBfjvNlnfOyfQHXitOtQZBnChZAbTAkYrv5x7nOrmbkctCniFNVirJdiPhZBZBM9nap6ZAdgc42kCPjzcaWzoBqzm3hK1MnQXG4dTFVBfDZCtnS9MtKyv1YGoDjo3VfxpyOryCIj8ieZCPeSPAk0bmTvIjgmX3XBykZD"
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
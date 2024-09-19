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
            Authorization: "Bearer EAALOqv96b5kBO9xQMaFsCtgzdWEZAmj7MFndHcuTiVNP6GwVZCtaendZCF8UDCjuSVodbYqjvZASIROYuB5ytdV2incvQwH5ZBZCjqcC8Kr814ZARVfy1UteByAvWyZCeB7ZAqBd0G56ODQy7pM6Sa7qv5SFA4bpJD5sEv2ZBSOwZAGBfUUlyZBeRp66YOWopC2pMrR0TQnryKMmIqPcpfnbSwGqwBQSeNThT94KtiZChjsJZArTAZD"
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
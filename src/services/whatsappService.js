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
            Authorization: "Bearer EAALOqv96b5kBO9gjM6Q2Hsa1KO95FTfPfbZBZBeloVQWDQeI88Ca7jIfIRllPd4m0pZB4mI8vo0fzGlCbJBZC2yz7KuW4cUNtTJ5giQaD4RurJXLbxyGkMKdtTbvGkSjlXhTNMgBSMHZCPe8qYN38fu2ZAzOfKYrnME9v7fwdtDSkoxZCnEqACODCAR8O5ZCqIBPx0XOZAbWK0cnz3CQSuav1Tcgl8U7gFZC9iwOlVoUxc8JAZD"
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
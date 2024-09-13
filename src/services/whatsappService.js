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
            Authorization: "Bearer EAALOqv96b5kBO6PCYwY90n2atxpLEA3ZAcAaWQEESb1U3mwkD4wJCkopfR275F0ksfLjWTFyywgMeKg5FGNCFyVt67bnGdzmLjnPlzqrI9FZAh9zXwQ55LnveFD9lbZCgb4L3kOd5asg64sIqq5dQ6ZCt1vohir9jxPljaEFJqO2v3Ss0KELDN18pq8uUEweQhv1ZBddUClYr92ow7PZAM1ZBZCDypD62LGiJQoawbO4fuAZD"
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
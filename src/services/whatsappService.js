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
            Authorization: "Bearer EAALOqv96b5kBOwRJZCxML1B55DKZBatItuJ3BsJWDZCtevUgpWeOHi6pbffYGUP6QTqdrLPn9WPAMtv0U4zBnNRgZBWi4nrDno9vq2D2r9pJPHrCMeKD8389yEpQFbKWUBl2osigKPeePuJxYUFiN5kDZBue5dVNfRkkV5z0JxwvMAayzCWyZB74nhRFk22EymaQZDZD"
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
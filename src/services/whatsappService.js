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
            Authorization: "Bearer EAALOqv96b5kBO4vHDZBznV3bMaFF1MiJrk2KsfOdI7BAI1pbwCHVu1fEH1DmZBZAcc00pm4i6nP13xvzigo3mvzbSZBEd6iuPKMm5fg5LtOVX6mlMqvPqL5kXqbTqumZCPjgSFCqJP5iaB5MMmo0FCeUttElAZCLsHkpCNFbyNZAAVXuZA93NxkWrLnhmb6u4FyJ8tZCfYVRgSzFjZA8zFdAYBzt1ynZCwg4v8DLDJzo0ZBVaHUZD"
            // EAAUJ1CAOiugBO129leUK94XlRlv9i5NMYqwR2wRKoj1cCaeOFLZB7l5dFYGXF48jgBdy3uIbqdeR9NcRbqSUsm9qx7piDKp2RgYeZCD3FadZBmr3SHFZCXycLmJbnApkJis7RjG7TGqwBvTc4yxVbclVNU3ufRjZAZBXDGZAnTudHwerclDbhZCTVUwBiIuX6cjqK3y1bUErsS9W0TKNzMcZD"

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
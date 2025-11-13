// 3. Create a server that writes the current date and time in a file every time a GET request is received.

import express from "express"

const app = express();

app.get("/",(req,res)=>{
    const currentTime = new Date().toLocaleString();

    res.send(
        `
        <html>
            <head>
                <title>Server Running</title>
            </head>
            <body>
                <div>
                    <h1>Current Time when Server is running</h1>
                    <p>${currentTime}</p>
                </div>
            </body>
        </html>
        `
    )
});

app.listen(3000,()=>{
    console.log("Server Is running SuccessFully on Port 3000")
})
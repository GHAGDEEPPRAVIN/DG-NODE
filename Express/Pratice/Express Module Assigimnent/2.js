// 2. Create a server that returns JSON data when accessed from the browser.

import express from "express"

const app = express();

app.get("/",(req,res)=>{
    res.send("Express Js Server")
})

app.get("/api/data",(req,res)=>{
    res.json(
        {
            company : "IT Tech",
            role : "Full Stack Developer",
            work : "Remote"
        }
    )
})

app.listen(2000,()=>{
    console.log("Server Is running in the port on 2000")
})
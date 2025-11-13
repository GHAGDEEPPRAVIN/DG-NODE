// 1.	Create a basic HTTP server that returns “Server is Running Successfully” from Express.

import express from "express"

const app = express();


app.get("/",(req,res)=>{
    res.send("Q-1 Create an Server By Express")
})

app.listen(1000,()=>{
    console.log("Server is Running Successfully from Express !!")
})
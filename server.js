import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";


const app = express()

const PORT = process.env.PORT || 8000

// Connect MongoDB//
import mongoClient from "./config/db.js";
mongoClient();
//middlewares//
app.use(helmet());

app.use("/", (req, res) =>{
    res.json({
        message:"hello"
    })
})

app.listen(PORT,(error) =>{
    if(error){
        return console.log(error)
    }
    console.log(`Serving is running at http://localhost:${PORT}`)
}) 
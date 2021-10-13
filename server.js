import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import morgan from "morgan";



const app = express()

const PORT = process.env.PORT || 8000

// Connect MongoDB//
import mongoClient from "./config/db.js";
mongoClient();



//middlewares//
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.urlencoded());
app.use(express.json());




//load routers
import userRouter from "./routers/userRouter.js";

//use routers
app.use("/api/v1/user", userRouter)
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
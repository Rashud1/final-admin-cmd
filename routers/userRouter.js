import express from "express";
import { createUser } from "../config/models/user-model/User.model.js";
import { createAdminUserValidation } from "../middlewares/formValidation.middleware.js";

const Router = express.Router()


Router.all("/", (req, res, next)=>{
    console.log("from user router");


    next();
})

Router.post("/", createAdminUserValidation, async (req, res)=>{
    console.log(req.body)
    try {
        //TODO
        // server side validation:lease refer form validation 



        //encrypt password


        const result = await createUser(req.body)
        if(result?._id){
            //TODO
            // create unique activation linka nd email to the user


            return res.json({
                state: 'success',
                message: "New user has been created succesfully! We have send an email confirmation to your email,please check and follow instructions to activate your aceount",
            })
        }

        res.json({
            state: 'error',
            message: "Unable to create new user",
        })

    } catch (error) {
        let msg = "Error, Unable to create new user"
        console.log(error.message);
        if(error.message.includes("E11000 duplicate key error collection")){
        msg = "This email has been assigned to another user"
        }

        res.json({
            state: 'error',
            message: msg,
        })
        
    }

})

export default Router;
import express from "express";
import { createUser, verifyEmail } from "../config/models/user-model/User.model.js";
import { createAdminUserValidation, adminEmailVerificationValidation } from "../middlewares/formValidation.middleware.js";
import {hashPassword} from "../helpers/bcrypt.helper.js";
import { createUniqueEmailConfirmation, findAdminEmailVerification, deleteInfo } from "../config/models/session/Session.model.js";
import { sendEmailVerificationLink,sendEmailVerificationLinkConfirmation } from "../helpers/email.helper.js";
const Router = express.Router()


Router.all("/", (req, res, next)=>{
    next();
})

Router.post("/", createAdminUserValidation, async (req, res)=>{
   
    try {
        //TODO
        // server side validation:lease refer form validation 
        //encrypt password
        const hashPass = hashPassword(req.body.password)
        if(hashPass){
        req.body.password = hashPass
        console.log(hashPass)

        const {_id, fname, email} = await createUser(req.body)

        if(_id){
            //TODO
            //result.email is from session model async email as it expects email to be confirmed
            const {pin} = await createUniqueEmailConfirmation(email) 

           
            if(pin){
            // create unique activation linka nd email to the user 
            const forSendingEmail = {
                fname,
                email,
                pin,
            } 
            sendEmailVerificationLink(forSendingEmail)
            }
            
            return res.json({
                status: 'success',
                message: "New user has been created succesfully! We have send an email confirmation to your email,please check and follow instructions to activate your aceount",
            })
        }
    }

        res.json({
            status: 'error',
            message: "Unable to create new user",
        })

    } catch (error) {
        let msg = "Error, Unable to create new user"
        console.log(error.message);
        if(error.message.includes("E11000 duplicate key error collection")){
        msg = "This email has been assigned to another user"
        }

        res.json({
            status: 'error',
            message: msg,
        })
        
    }

})

//email verification
Router.patch("/email-verification", adminEmailVerificationValidation, async (req, res) =>{
    try {
        const result = await findAdminEmailVerification(req.body)
        if(result?._id){
            ///TO DO
            //INFROMATION IS VALID AND NOW WE CAN UPDATE THE USER
            const data = await verifyEmail(result.email)
           console.log(data, "from verify email")
            if(data?._id){
             //DELETE THE SESSION INFO KOWN AS PIN
             deleteInfo(req.body)

            //send email confirmation to user
            sendEmailVerificationLinkConfirmation({
                fname: data.fname,
                email: data.email,
            })



        return  res.json({
            status: "success",
            message: "Your email has been verified ,you may log in now",
        })
    }
}
  
         res.json({
            status: "error",
            message: "Error,Unable to verify the email, Please try again later",
        })
     
            

        
    } catch (error) {
        res.json({
            status: "error",
            message: "Error,Unable to verify the email, Please try again later",
        })
    }
}
)


export default Router;
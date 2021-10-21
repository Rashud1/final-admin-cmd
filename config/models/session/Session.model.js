import  SessionSchema  from "./Session.schema.js";
import { randomNumberGenerator  } from "../../../utils/randonGenerator.js";

//to create a unique email validation info

export const createUniqueEmailConfirmation = async email =>{

    // in this section we will create six randon digit number and base on that we will store that unique(continue)
    //number alongside with the email//
    try {
        //generate randon 6 digit number
        const pinLength = 6
        const pin = randomNumberGenerator(pinLength)
        
        if(!pin || !email){
            return false
        }

        const newEmailValidation ={
            //this pin and email are from schema of session
            pin,
            email
            
        }
        //store pin with email in session table

      
        const result = await SessionSchema(newEmailValidation).save()
        console.log(result)
        return result;
    } catch (error) {
       console.log(error)
    }
}

export const findAdminEmailVerification = async (filterObj) =>{
    try {
        const result = await SessionSchema.findOne(filterObj);//{pin, email}
        console.log(result, 'from session')
        return result;
    } catch (error) {
       console.log(error)
    }
}


export const deleteInfo = async filterObj =>{
    try {
        const result = await SessionSchema.findOneAndDelete(filterObj)
        return result
    } catch (error) {
        console.log(error)
        
    }
}

import nodemailer from "nodemailer";

// this code below is from nodemailer
const send = async infoObj =>{
    try {
        //create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
        console.log(transporter, "from email helper")
        //after completing the email helper make sure you restart the server again
         // send mail with defined transport object
  let info = await transporter.sendMail(infoObj);


  console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (error) {
        console.log(error);
    }
   
}


const emailProcessor = ({  email, subject, text, html}) =>{
  
    let info = {
        from: `"FootballShop 👻" <${process.env.EMAIL_USER}>`, // sender address
        to: email, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, 
    }
    send(info)
}
      


    export const sendEmailVerificationLink = emailObj =>{
        const {fname, pin, email} = emailObj
        const link = `http://localhost:3000/email-verification?pin=${pin}&email=${email}`
        const obj ={
            ...emailObj,
         subject: "Email onfirmation Required",
         text: `Hi ${fname}, please follow the link below to confirm your email.${link}`,
         html:`
         
        Hello there,
        <br>

        Please follow the link below to confirm your email. <br><br/>
       <a href="${link}" target="_blank">${link}</a>

        <br/><br/>
        Thank you<br/>

        Kind regards
        Div Shrestha
        --FootballLogo Private Ltd--

        
        `
        }
        emailProcessor(obj)
    }

    //send the email confirm wel come page
    export const sendEmailVerificationLinkConfirmation = emailObj =>{
        const {fname} = emailObj
     
        const obj ={
            ...emailObj,
         subject: "Email onfirmation Required",
         text: `Hi ${fname}, Your email has benn verified, You may log in nowl.`,
         html:`
         
        Hello there,
        <br/>

     Your email has beeen verified now and now you can log in 
   

        <br/><br/>
        Thank you<br/>

        Kind regards
        Div Shrestha
        --FootballLogo Private Ltd--

        
        `
        }
        emailProcessor(obj)
    }

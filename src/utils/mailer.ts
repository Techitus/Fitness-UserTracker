/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
interface emailType {
    email : string,
    emailType : "VERIFY" | "RESET",
    userId : number | string 
}
export const sendEmail = async({email,emailType,userId}:emailType)=>{

    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });
        const mailOptions = {
            from:'kamaldev@gmail.com', 
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", 
            html: "<b>Hello world?</b>", 
          }
          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse
    }catch(err:any){
 throw new Error ("Something went wrong",err.message)
    }
}
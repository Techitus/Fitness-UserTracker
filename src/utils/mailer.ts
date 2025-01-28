/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface IData {
    to: string;
    subject: string;
    text: string;
}

const sendEmail = async (data: IData) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER!,
                pass: process.env.MAIL_PASS!, 
            },
           
        });

        const mailOptions = {
            from:"Fitness Centre Team", 
            to: data.to,
            subject: data.subject,
            text: data.text,
        };

         await transporter.sendMail(mailOptions);
    } catch (err: any) {
        console.error('Email Sending Error:', err);
        throw new Error('Email sending failed: ' + err.message);
    }
};
export default sendEmail
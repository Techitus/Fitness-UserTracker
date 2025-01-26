/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from '@/database/database';
import { auth } from '@/database/schemas/auth.schema';
import { eq } from 'drizzle-orm';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

export enum mailerType {
    VERIFY = 'VERIFY',
    RESET = 'RESET',
}

interface Type {
    email: string,
    emailType: mailerType,
    userId: number | string 
}

export const sendEmail = async ({ email, emailType, userId }: Type) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        
        if (emailType === mailerType.VERIFY) {
            await database.update(auth).set({
                verifyToken: hashedToken,
                verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
            }).where(eq(auth.id, userId));
        } else if (emailType === mailerType.RESET) {
            await database.update(auth).set({
                forgetPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
            }).where(eq(auth.id, userId));
        }

        try {
            const transporter = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            });

            const mailOptions = {
                from: 'kamaldev@gmail.com', 
                to: email,
                subject: emailType === mailerType.VERIFY ? "Verify your email" : "Reset your password", 
                html: `<p>Click <a href='${process.env.DOMAIN}/verifyemail?token=${hashedToken}'>here</a> to ${emailType === mailerType.VERIFY ? "Verify your email" : 'Reset your password'}</p>`
            };

            const mailResponse = await transporter.sendMail(mailOptions);
            return mailResponse;

        } catch (err: any) {
            throw new Error("Something went wrong: " + err.message);
        }

    } catch (err: any) {
        throw new Error("Something went wrong: " + err.message);
    }
};

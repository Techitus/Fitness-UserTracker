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
    userId: string
}

export const sendEmail = async ({ email, emailType, userId }: Type) => {
    try {
        // Ensure userId is valid before hashing
        if (!userId) {
            throw new Error('userId is required');
        }

        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        
        // Prepare update data based on email type
        const updateData = emailType === mailerType.VERIFY 
            ? {
                verifyToken: hashedToken,
                verifyTokenExpiry: new Date(Date.now() + 3600000),
              }
            : {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
              };

        // Update the database
        await database
            .update(auth)
            .set(updateData)
            .where(eq(auth.id, userId));

        // Create email transporter
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAIL_USER!,
                pass: process.env.MAIL_PASS!
            },
            logger: true,
            debug: true
        });

        // Prepare verification URL
        const verificationUrl = `${process.env.DOMAIN}/${emailType === mailerType.VERIFY ? 'verifyemail' : 'resetpassword'}?token=${hashedToken}`;
        
        const mailOptions = {
            from: 'kamalondev@gmail.com',
            to: email,
            subject: emailType === mailerType.VERIFY ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${verificationUrl}">here</a> to ${emailType === mailerType.VERIFY ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${verificationUrl}
            </p>`
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (err: any) {
        console.error('Email Sending Error:', err);
        throw new Error("Email sending failed: " + err.message);
    }
};
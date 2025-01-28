/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from "@/database/database";
import { auth } from "@/database/schemas";
import generateOtp from "@/utils/generateOtp";
import sendEmail from "@/utils/mailer";
import createResponse from "@/utils/nextResponse";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const user = await database
            .select()
            .from(auth)
            .where(eq(auth.email, email))
            .limit(1);

        if (user.length === 0) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const otp = generateOtp();

await database
            .update(auth)
            .set({
                forgotPasswordToken: otp.toString(),
                forgotPasswordTokenExpiry: new Date(),
            })
            .where(eq(auth.email, email));
        try {
            await sendEmail({
                to: email,
                subject: "Verify your email for Fitness Center",
                text: `You just requested to reset your password. Your verification code is ${otp}.`,
            });

            return NextResponse.json(
                {
                    message: "Password reset OTP sent successfully",
                    success: true,
                },
                { status: 200 }
            );
        } catch (emailError) {
            console.error("Email Sending Error:", emailError);
            return NextResponse.json(
                { error: "Failed to send OTP. Please try again later." },
                { status: 500 }
            );
        }
    } catch (err:any) {
        console.error("Request Error:", err);
        return createResponse(500,err,"Something went wrong")
    }
    
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from "@/database/database";
import { auth } from "@/database/schemas";
import generateOtp from "@/utils/generateOtp";
import sendEmail from "@/utils/mailer";
import createResponse from "@/utils/nextResponse";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse,  } from "next/server";

export async function POST(req: NextRequest):Promise<NextResponse>{
    try {
        const body = await req.json();
        const { email } = body;

        if (!email) {
            return createResponse(404,"Email is required 😴")
        }

        const user = await database
            .select()
            .from(auth)
            .where(eq(auth.email, email))
            .limit(1);

        if (user.length === 0) {
            return createResponse(400, "User not found 🤔")
        }

        const adminOtp = generateOtp();

await database
            .update(auth)
            .set({
                isAdminToken: adminOtp.toString(),
               isAdminTokenExpiry: new Date(),
            })
            .where(eq(auth.email, email));
        try {
            await sendEmail({
                to: 'techitus07@gmail.com',
                subject: "Verify Admin for Fitness Center",
                text: `Someone is just requested to verify them as a admin and the verification code is ${adminOtp}.`,
            });

            return createResponse(200 ,"Admin verification OTP sent successfully 😍 ")
        } catch (err : any) {
            return createResponse(400,err, "Failed to send OTP. Please try again later.😴")
        }
    } catch (err:any) {
        return createResponse(500,err,"Something went wrong 😩")
    }
    
}

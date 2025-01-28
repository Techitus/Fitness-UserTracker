/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from "@/database/database";
import { auth } from "@/database/schemas";
import checkOtpExpiration from "@/utils/checkOtpExpiration";
import createResponse from "@/utils/nextResponse";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { forgotPasswordToken, email } = await req.json();

    if (!forgotPasswordToken || !email) {
      return createResponse(400, "Email and OTP are required");
    }

    const user = await database
      .select()
      .from(auth)
      .where(eq(auth.email, email));

    if (user.length === 0) {
      return createResponse(404, "User not found ");
    }

    const [data] = await database
      .select()
      .from(auth)
      .where(and(eq(auth.forgotPasswordToken, forgotPasswordToken), eq(auth.email, email)));

    if (!data) {
      return createResponse(400, "Invalid OTP or Email");
    }

    const otpGeneratedTime = data.forgotPasswordTokenExpiry; 
    if (!otpGeneratedTime) {
      return createResponse(400, "OTP expiration time is missing");
    }

    const otpGeneratedTimestamp = new Date(otpGeneratedTime).getTime();
    return checkOtpExpiration(otpGeneratedTimestamp.toString(), 120000);

  } catch (err: any) {
    console.error(err);
    return createResponse(500, "Something went wrong");
  }
}

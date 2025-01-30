/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from "@/database/database";
import { auth } from "@/database/schemas";
import checkOtpExpiration from "@/utils/checkOtpExpiration";
import createResponse from "@/utils/nextResponse";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { isAdminToken, email } = await req.json();
    
    if (!isAdminToken || !email) {
      return createResponse(400, "Email and OTP are required 😴");
    }

    const user = await database
      .select()
      .from(auth)
      .where(eq(auth.email, email));

    if (user.length === 0) {
      return createResponse(404, "User not found 🥴");
    }

    const [data] = await database
      .select()
      .from(auth)
      .where(and(eq(auth.isAdminToken, isAdminToken), eq(auth.email, email)));

    if (!data) {
      return createResponse(400, "Invalid OTP or Email 😩");
    }

    const otpGeneratedTime = data.isAdminTokenExpiry;
    if (!otpGeneratedTime) {
      return createResponse(400, "OTP expiration time is missing 😭");
    }

    const otpGeneratedTimestamp = new Date(otpGeneratedTime).getTime();
    const isOtpValid = await checkOtpExpiration(otpGeneratedTimestamp.toString(), 120000);

    if (isOtpValid.status === 200) {
      // Update isAdmin status to true and clear OTP data
      await database
        .update(auth)
        .set({
          isAdmin: true,
          isAdminToken: null,
          isAdminTokenExpiry: null,
          updatedAt: new Date()
        })
        .where(eq(auth.email, email));

      return createResponse(200, "Admin verification successful! 🎉");
    }

    return isOtpValid;
  } catch (err: any) {
    console.error(err);
    return createResponse(500, "Something went wrong 🙃");
  }
}
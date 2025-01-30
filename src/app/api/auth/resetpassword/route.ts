/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from "@/database/database";
import { auth } from "@/database/schemas";
import createResponse from "@/utils/nextResponse";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { newPassword, confirmPassword, email } = await request.json();

    if (!newPassword || !confirmPassword || !email) {
      return createResponse(400, "All fields are required 😒");
    }

    if (newPassword !== confirmPassword) {
      return createResponse(400, "Passwords do not match 🙄");
    }

    const [user] = await database
      .select()
      .from(auth)
      .where(eq(auth.email, email));

    if (!user) {
      return createResponse(404, "User not found 😭");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await database
      .update(auth)
      .set({ password: hashedPassword })
      .where(eq(auth.email, email));

    return createResponse(200, "Password updated successfully 😍");
  } catch (err: any) {
    console.error(err);
    return createResponse(500, "Internal Server Error 😩");
  }
}

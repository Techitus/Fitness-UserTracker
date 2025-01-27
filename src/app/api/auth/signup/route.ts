/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from "@/database/database";
import { auth } from "@/database/schemas/auth.schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { mailerType, sendEmail } from "@/utils/mailer";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Input validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await database
      .select()
      .from(auth)
      .where(eq(auth.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

   

    // Hash the password (only need to hash the main password)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const [newUser] = await database
      .insert(auth)
      .values({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        forgotPasswordToken: null,
        forgotPasswordTokenExpiry: null,
        verifyToken: null,
        verifyTokenExpiry: null
      })
      .returning();

    if (!newUser || !newUser.id) {
      throw new Error("Failed to create user");
    }

    // Send verification email
    await sendEmail({
      email,
      emailType: mailerType.VERIFY,
      userId: newUser.id
    });

    // Return success without exposing sensitive data
    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        isVerified: newUser.isVerified
      }
    });

  } catch (err: any) {
    console.error("Signup Error:", err);
    return NextResponse.json({ 
      error: err.message || "Failed to create user"
    }, { status: 500 });
  }
}

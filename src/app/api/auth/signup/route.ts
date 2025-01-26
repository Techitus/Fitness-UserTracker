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
    const { username, email, password, confirmPassword } = reqBody;

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

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user and return the id
    const [insertedUser] = await database
      .insert(auth)
      .values({
        username,
        email,
        password: hashedPassword, 
        confirmPassword,
      })
      .returning({ id: auth.id }); 

    if (!insertedUser) {
      throw new Error("Failed to insert user into the database");
    }

    // Send verification email
    await sendEmail({
      email,
      emailType: mailerType.VERIFY,
      userId: insertedUser.id,
    });

    return NextResponse.json({ message: "User registered successfully",success : true, insertedUser });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

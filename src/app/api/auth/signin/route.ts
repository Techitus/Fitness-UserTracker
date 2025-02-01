import { database } from "@/database/database";
import { auth } from "@/database/schemas";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        const [user] = await database.select().from(auth).where(eq(auth.email, email)).limit(1);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Please check your credentials..." },
                { status: 404 }
            );
        }

        // Create JWT token payload
        const tokenPayload = {
            id: user.id,
        };

        // Generate JWT token
        const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {
            expiresIn: "1h",
        });

        const response = NextResponse.json(
            { 
                message: "User logged in successfully", 
                success: true, 
                token: token, 
                email: user.email,
                isAdmin : user.isAdmin
                  
            },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Error in login:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

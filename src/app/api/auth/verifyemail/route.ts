import { database } from "@/database/database";
import { auth, AuthUser } from "@/database/schemas";
import { and, eq, gt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;
        
        const [user] = await database.select()
            .from(auth)
            .where(and(
                eq(auth.verifyToken, token),
                gt(auth.verifyTokenExpiry, new Date())
            ))
            .limit(1) as AuthUser[];

        if (!user) {
            return NextResponse.json({
                error: 'Invalid token'
            }, { status: 400 });
        }

        await database.update(auth)
            .set({
                isVerified: true,
                verifyToken: null,
                verifyTokenExpiry: null
            })
            .where(eq(auth.id, user.id));

        return NextResponse.json({ 
            message: "Email verified successfully", 
            success: true 
        });

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
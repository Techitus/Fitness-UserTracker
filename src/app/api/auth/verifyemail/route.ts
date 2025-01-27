/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from "@/database/database";
import { auth } from "@/database/schemas";
import { and, eq, gt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;

        if (!token) {
            return NextResponse.json({
                error: 'Token is required'
            }, { status: 400 });
        }

        const users = await database
            .select()
            .from(auth)
            .where(
                and(
                    eq(auth.verifyToken, token),
                    gt(auth.verifyTokenExpiry, new Date())
                )
            )
            .limit(1);

        const user = users[0];

        if (!user) {
            return NextResponse.json({
                error: 'Invalid or expired token'
            }, { status: 400 });
        }

        await database
            .update(auth)
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
    } catch (error: any) {
        console.error('Verification Error:', error);
        return NextResponse.json({ 
            error: error.message || 'Verification failed'
        }, { status: 500 });
    }
}
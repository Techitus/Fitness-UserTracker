/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from "@/database/database";
import { userDatas } from "@/database/schemas";
import createResponse from "@/utils/nextResponse";
import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
import { verifyToken } from "@/lib/middleware/verifyToken";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const { user, error, status } = verifyToken(request);
        if (error) return createResponse(status, error);

        if (!user?.isAdmin) {
            return createResponse(403, "Access denied. Admins only ❌");
        }

        const { userName, email, address, phoneNumber, admissionFee, profile, paymentDate, joinedDate } = await request.json();

        if (!userName || !paymentDate || !address || !phoneNumber || !admissionFee || !joinedDate) {
            return createResponse(400, "All fields are required 😒");
        }

        if (email) {
            const [existingUser] = await database
                .select()
                .from(userDatas)
                .where(eq(userDatas.email, email))
                .limit(1);

            if (existingUser) {
                return createResponse(409, "Email already exists ⚠️");
            }
        }

        const paymentDateObj = new Date(paymentDate);
        const joinedDateObj = new Date(joinedDate);

        const [newUser] = await database
            .insert(userDatas)
            .values({
                id: uuid(),
                userName,
                email: email || null,
                address,
                phoneNumber,
                admissionFee,
                profile: profile || null,
                joinedDate: joinedDateObj,
                paymentDate: paymentDateObj,
                updatedAt: new Date(),
                createdAt: new Date(),
            })
            .returning();

        return createResponse(201, "User created successfully ✅", newUser);
    } catch (err: any) {
        return createResponse(500, err.message || err, "Internal Server Error");
    }
}


export async function GET(request:NextRequest){
    try{
        const { user, error, status } = verifyToken(request);
        if(error) return createResponse(status, error);

        if(!user?.isAdmin){
            return createResponse(403, "Access denied. Admins only ��");
        }

        const userInfo = await database.select().from(userDatas);

        return createResponse(200, "User Data fetched successfully", userInfo);

    }catch(err){
        return createResponse(500, "Internal Server Error");
    }
}
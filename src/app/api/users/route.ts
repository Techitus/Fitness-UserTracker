/* eslint-disable @typescript-eslint/no-explicit-any */
import { database } from "@/database/database";
import { userDatas } from "@/database/schemas";
import createResponse from "@/utils/nextResponse";
import { NextRequest } from "next/server";
import { v4 as uuid } from 'uuid';
export async function POST(request: NextRequest) {
    try {
        const { userName, email, address, phoneNumber, admissionFee, profile, paymentDate, joinedDate } = await request.json();

        if (!userName || !paymentDate || !address || !phoneNumber || !admissionFee || !joinedDate) {
            return createResponse(400, "All fields are required 😒");
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
                profile : profile || null,
                joinedDate: joinedDateObj, 
                paymentDate : paymentDateObj,
                updatedAt: new Date(),
                createdAt: new Date()
            })
            .returning();                        

        return createResponse(201, "User created successfully ✅" ,newUser);
    } catch (err: any) {
        return createResponse(500, err.message || err, "Internal Server Error");
    }
}

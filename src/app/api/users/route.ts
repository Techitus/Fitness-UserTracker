/* eslint-disable @typescript-eslint/no-explicit-any */
import createResponse from "@/utils/nextResponse";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest){
    try{
        const {username,email,address,phoneNumber,admissionFee,profile,paymentDate} = request.body
        

    }catch(err:any){
        return createResponse(500,err,"Internal Server error")
    }
}
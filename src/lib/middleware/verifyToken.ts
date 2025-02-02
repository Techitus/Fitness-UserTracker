/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyToken(req: NextRequest) {
    const token = req.cookies.get("token")?.value || req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return { error: "Access denied. No token provided.", status: 401 };
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload; 
        return { user: decoded }; 
    } catch (err) {
        return { error: "Invalid token.", status: 403 };
    }
}

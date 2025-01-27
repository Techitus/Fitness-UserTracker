/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const getDataFromToken = (req: NextRequest): string => {
  try {
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      throw new Error("Token is missing from cookies");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    // Assuming your token contains an `id` property
    if (typeof decodedToken === "object" && "id" in decodedToken) {
      return decodedToken.id as string;
    }

    throw new Error("Invalid token structure");
  } catch (error: any) {
    throw new Error(error.message || "Failed to extract data from token");
  }
};

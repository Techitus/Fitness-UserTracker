import { database } from "@/database/database";
import { auth } from "@/database/schemas";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    // Fetch user from the database
    const user = await database
      .select()
      .from(auth)
      .where(eq(auth.id, userId))
      .limit(1);

    if (!user || user.length === 0) {
      // Handle case where user is not found
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User fetched successfully",
      data: user[0], // Return the user data fetched
      success: true,
    });
  } catch (error) {
    console.error("Error fetching user:", error);

    return NextResponse.json(
      { message: "An error occurred", error, success: false },
      { status: 500 }
    );
  }
}

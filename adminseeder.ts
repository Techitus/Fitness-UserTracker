import bcrypt from "bcrypt"
import { eq } from "drizzle-orm";
import { database } from "@/database/database";
import { auth } from "@/database/schemas/user.schema";

export async function seedAdmin() {
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123"; 

  try {
   
    const existingAdmin = await database
      .select()
      .from(auth)
      .where(eq(auth.email, adminEmail));

    if (existingAdmin.length > 0) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = bcrypt.hashSync(adminPassword, 8);

    await database.insert(auth).values({
      email: adminEmail,
      password: hashedPassword,
     
    });

    console.log("Admin user seeded successfully.");
  } catch (err) {
    console.error("Error seeding admin user:", err);
  }
}

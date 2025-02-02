import { sql } from "drizzle-orm";
import { pgTable, text,timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { auth } from "./auth.schema";

export const userDatas = pgTable('userdatas',{
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    userName : varchar("userName",{length : 20}).notNull(),
    email : text("email").unique(),
    address : text("address").notNull(),
    phoneNumber : varchar("phoneNumber",{length : 10}).notNull(),
    admissionFee : varchar('admissionFee').notNull(),
    profile : varchar("profile"),
    userId: uuid("userId").references(() => auth.id),
    joinedDate : timestamp('joinedDate').notNull(),
    paymentDate : timestamp('paymentDate').notNull(),
    createdAt : timestamp("createdAt").default(sql `CURRENT_TIMESTAMP`),
    updatedAt : timestamp("updatedAt").default(sql `CURRENT_TIMESTAMP`)

})

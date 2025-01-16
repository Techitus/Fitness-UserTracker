import { sql } from "drizzle-orm";
import {  pgTable,serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userDatas = pgTable('userdatas',{
    id : serial("id").primaryKey(),
    userName : varchar("userName",{length : 20}).notNull(),
    email : text("email").unique(),
    phoneNumber : varchar("phoneNumber",{length : 10}).notNull(),
    profile : varchar("profile"),
    joinedDate : timestamp('joinedDate').notNull(),
    paymentDate : timestamp('paymentDate').notNull(),
    attendace : text('attendance').notNull(),
    createdAt : timestamp("createdAt").default(sql `CURRENT_TIMESTAMP`),
    updatedAt : timestamp("updatedAt").default(sql `CURRENT_TIMESTAMP`)

})

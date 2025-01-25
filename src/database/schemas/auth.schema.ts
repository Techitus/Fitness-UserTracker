import { sql } from "drizzle-orm";
import {  pgTable,serial, text, timestamp } from "drizzle-orm/pg-core";
export const auth = pgTable('auth',{
    id : serial("id").primaryKey(),
    username : text('username').notNull(),
    email : text("email").unique().notNull(),
    password : text("password").notNull(),
    confirmPassword : text("confirmPassword").notNull(),
    createdAt : timestamp("createdAt").default(sql `CURRENT_TIMESTAMP`),
    updatedAt : timestamp("updatedAt").default(sql `CURRENT_TIMESTAMP`)
})
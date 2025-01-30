import { sql } from "drizzle-orm";
import {  boolean,numeric,pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const auth = pgTable('auth',{
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    username : text('username').notNull(),
    email : text("email").unique().notNull(),
    password : text("password").notNull(),
    isAdmin : boolean('isAdmin').default(false),
    isAdminToken : numeric('isAdminToken'),
    isAdminTokenExpiry: timestamp('isAdminTokenExpiry'),
    forgotPasswordToken : numeric('forgotPasswordToken'), 
    forgotPasswordTokenExpiry: timestamp('forgotPasswordTokenExpiry'),
    createdAt : timestamp("createdAt").default(sql `CURRENT_TIMESTAMP`),
    updatedAt : timestamp("updatedAt").default(sql `CURRENT_TIMESTAMP`)
})
export type AuthUser = typeof auth.$inferSelect;

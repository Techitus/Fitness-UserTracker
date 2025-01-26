import { sql } from "drizzle-orm";
import {  boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from 'uuid';
export const auth = pgTable('auth',{
    id: uuid('id').primaryKey().default(uuidv4()),
        username : text('username').notNull(),
    email : text("email").unique().notNull(),
    password : text("password").notNull(),
    confirmPassword : text("confirmPassword").notNull(),
    isVerified : boolean('isVerified').default(false),
    isAdmin : boolean('isAdmin').default(false),
    verifyToken : text('verifyToken'),
    verifyTokenExpiry: timestamp('verifyTokenExpiry'),
    forgotPasswordToken : text('forgotPasswordToken'), 
    forgotPasswordTokenExpiry: timestamp('forgotPasswordTokenExpiry'),
    createdAt : timestamp("createdAt").default(sql `CURRENT_TIMESTAMP`),
    updatedAt : timestamp("updatedAt").default(sql `CURRENT_TIMESTAMP`)
})
import { sql } from "drizzle-orm";
import { integer, pgTable,serial, text,boolean, timestamp, varchar } from "drizzle-orm/pg-core";

export const userDatas = pgTable('userdatas',{
    id : serial("id").primaryKey(),
    userName : varchar("userName",{length : 20}).notNull(),
    email : text("email").unique(),
    phoneNumber : varchar("phoneNumber",{length : 10}).notNull(),
    profile : varchar("profile"),
    joinedDate : timestamp('joinedDate').notNull(),
    paymentDate : timestamp('paymentDate').notNull(),
    createdAt : timestamp("createdAt").default(sql `CURRENT_TIMESTAMP`),
    updatedAt : timestamp("updatedAt").default(sql `CURRENT_TIMESTAMP`)

})
export const attendance = pgTable('attendance',{
    id : serial("id").primaryKey(),
    userId : serial("userId").references(() => userDatas.id),
    isPresent : boolean('isPresent').default(false),
    day : integer('day').notNull(),
    createdAt : timestamp("createdAt").default(sql `CURRENT_TIMESTAMP`),
    updatedAt : timestamp("updatedAt").default(sql `CURRENT_TIMESTAMP`)
})
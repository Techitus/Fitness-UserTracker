import { boolean, serial, integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { userDatas } from "./user.schema";
import { sql } from "drizzle-orm";

export const attendance = pgTable('attendance', {
    id: serial("id").primaryKey(),
    userId: integer("userId").references(() => userDatas.id),
    isPresent: boolean('isPresent').default(false),
    day: integer('day').notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

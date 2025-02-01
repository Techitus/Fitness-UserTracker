import { boolean,  integer, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";
import { userDatas } from "./user.schema";
import { sql } from "drizzle-orm";

export const attendance = pgTable('attendance', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    userId: uuid("userId").references(() => userDatas.id),
    isPresent: boolean('isPresent').default(false),
    day: integer('day').notNull(),
    createdAt: timestamp("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

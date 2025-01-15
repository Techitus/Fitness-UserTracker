import { drizzle } from 'drizzle-orm/node-postgres'
import dotenv from 'dotenv';
dotenv.config();
import postgres from 'postgres'
const connnectionString = process.env.DB_STRING as string

const connection = postgres(connnectionString)

export const database =drizzle(connection)
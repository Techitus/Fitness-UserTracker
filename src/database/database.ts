import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
const connnectionString = process.env.DB_STRING as string

export const connection = postgres(connnectionString)

export const database =drizzle(connection)
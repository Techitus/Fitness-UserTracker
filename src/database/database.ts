import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas';
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' });
const connnectionString = process.env.DB_STRING as string;

// Configure the database connection
export const connection = postgres(connnectionString, {
    max: 1,
    ssl: 'require', // Ensure SSL for Supabase
});

export const database = drizzle(connection, { schema });

const queryClient = postgres(connnectionString, { ssl: 'require' });
export const db = drizzle(queryClient, { schema });

export default connection;

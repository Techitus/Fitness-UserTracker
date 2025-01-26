/* eslint-disable @typescript-eslint/no-explicit-any */
import { connection, database } from './src/database/database';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' });
(async () => {
    try {
        console.log("Starting migration...");
        await migrate(database, {
            migrationsFolder: './drizzle',
        });
        console.log("Migration completed successfully.");
    } catch (err: any) {
        console.error("Migration failed:", err);
        console.error("Error details:", {
            message: err.message,
            code: err.code,
            stack: err.stack
        });
    } finally {
        try {
            await connection.end();
            console.log("Database connection closed.");
        } catch (closeErr) {
            console.error("Error closing connection:", closeErr);
        }
    }
})();

import { connection, database } from './src/database/database';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

(async () => {
    await migrate(database, {
        migrationsFolder: './drizzle',
    });
    await connection.end();
    console.log('Migration completed successfully.');
})().catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
});

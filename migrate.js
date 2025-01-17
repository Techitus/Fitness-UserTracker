/* eslint-disable @typescript-eslint/no-unused-expressions */
import { connection, database } from './src/database/database'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

async()=>{
  await  migrate(database,{
        migrationsFolder : './drizzle'
    })
   await connection.end()
}
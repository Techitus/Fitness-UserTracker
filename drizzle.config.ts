
import {defineConfig} from "drizzle-kit"
import dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
    schema : "./src/database/schema.ts",
    out : "./drizzle" ,//migration file ko structure
    dialect :"postgresql",
    dbCredentials : {
        url : process.env.DB_STRING as string
    }
})
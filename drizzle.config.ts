
import {defineConfig} from "drizzle-kit"
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' });
export default defineConfig({
    schema: "./src/database/schemas/index.ts",
    out : "./drizzle" ,//migration file ko structure
    dialect :"postgresql",
    dbCredentials : {
        url : process.env.DB_STRING as string
    }
})


//"db:migration" : "drizzle-kit generate --config=drizzle.config.ts" mannual migration command created in package.json

//  "db:migrate": "node -r esbuild-register ./migrate.js " this also mannually created
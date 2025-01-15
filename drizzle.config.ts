
import {defineConfig} from "drizzle-kit"

export default defineConfig({
    schema : "./src/database/schema.ts",
    out : "./drizzle" ,//migration file ko structure
    dialect :"postgresql",
    dbCredentials : {
        url : "postgresql://postgres.copnnromcahwyssobaou:@Fitness2081@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
    }
})
ALTER TABLE "auth" ADD COLUMN "isAdminToken" numeric;--> statement-breakpoint
ALTER TABLE "auth" ADD COLUMN "isAdminTokenExpiry" timestamp;
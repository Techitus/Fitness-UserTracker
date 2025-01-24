ALTER TABLE "auth" ADD COLUMN "username" text NOT NULL;--> statement-breakpoint
ALTER TABLE "auth" ADD COLUMN "confirmPassword" text NOT NULL;--> statement-breakpoint
ALTER TABLE "userdatas" ADD COLUMN "address" text NOT NULL;
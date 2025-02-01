CREATE TABLE "userdatas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userName" varchar(20) NOT NULL,
	"email" text,
	"address" text NOT NULL,
	"phoneNumber" varchar(10) NOT NULL,
	"admissionFee" varchar NOT NULL,
	"profile" varchar,
	"joinedDate" timestamp NOT NULL,
	"paymentDate" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "userdatas_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "attendance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"isPresent" boolean DEFAULT false,
	"day" integer NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "auth" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"isAdmin" boolean DEFAULT false,
	"isAdminToken" numeric,
	"isAdminTokenExpiry" timestamp,
	"forgotPasswordToken" numeric,
	"forgotPasswordTokenExpiry" timestamp,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "auth_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_userId_userdatas_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userdatas"("id") ON DELETE no action ON UPDATE no action;
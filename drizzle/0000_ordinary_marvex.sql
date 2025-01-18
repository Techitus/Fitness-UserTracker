CREATE TABLE "attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" serial NOT NULL,
	"isPresent" boolean DEFAULT false,
	"day" integer NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "userdatas" (
	"id" serial PRIMARY KEY NOT NULL,
	"userName" varchar(20) NOT NULL,
	"email" text,
	"phoneNumber" varchar(10) NOT NULL,
	"profile" varchar,
	"joinedDate" timestamp NOT NULL,
	"paymentDate" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "userdatas_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_userId_userdatas_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userdatas"("id") ON DELETE no action ON UPDATE no action;
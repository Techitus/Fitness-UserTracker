CREATE TABLE "userdatas" (
	"id" serial PRIMARY KEY NOT NULL,
	"userName" varchar(20) NOT NULL,
	"email" text,
	"phoneNumber" varchar(10) NOT NULL,
	"profile" varchar,
	"joinedDate" timestamp NOT NULL,
	"paymentDate" timestamp NOT NULL,
	"attendance" text NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "userdatas_email_unique" UNIQUE("email")
);

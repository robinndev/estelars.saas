-- CreateEnum
CREATE TYPE "PaymentState" AS ENUM ('draft', 'paid', 'canceled');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('normal', 'premium');

-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('monthly', 'yearly');

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "couple_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "start_hour" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "music" TEXT,
    "plan" "Plan" NOT NULL,
    "plan_price" DOUBLE PRECISION NOT NULL,
    "payment_state" "PaymentState" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email_address" TEXT NOT NULL,
    "purchase_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_recurring" BOOLEAN NOT NULL DEFAULT false,
    "billing_cycle" "BillingCycle",

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

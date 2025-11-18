/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Site` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Site_slug_key" ON "Site"("slug");

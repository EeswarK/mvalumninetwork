/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Space" AS ENUM ('DESIGN', 'DEVELOPMENT', 'MARKETING', 'PRODUCT', 'PROJECT_MANAGEMENT', 'STRATEGY');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "alumniId" TEXT,
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "graduationClass" INTEGER,
ADD COLUMN     "major" TEXT,
ADD COLUMN     "preferredName" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "spaces" "Space"[],
ADD COLUMN     "tagLine" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Alumni" (
    "id" TEXT NOT NULL,
    "mentor" BOOLEAN NOT NULL,
    "location" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Alumni_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alumni_userId_key" ON "Alumni"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_alumniId_fkey" FOREIGN KEY ("alumniId") REFERENCES "Alumni"("id") ON DELETE SET NULL ON UPDATE CASCADE;

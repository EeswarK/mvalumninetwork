/*
  Warnings:

  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "contactemail" TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "spaces" SET DEFAULT ARRAY[]::"Space"[];

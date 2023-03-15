/*
  Warnings:

  - You are about to drop the column `contactemail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `approved` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Approved" AS ENUM ('WAITING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "contactemail",
DROP COLUMN "profilePicture",
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "lastName" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT,
DROP COLUMN "approved",
ADD COLUMN     "approved" "Approved";

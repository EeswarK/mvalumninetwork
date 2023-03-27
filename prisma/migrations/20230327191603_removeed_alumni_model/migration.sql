/*
  Warnings:

  - You are about to drop the column `alumniId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Alumni` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_alumniId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "alumniId";

-- DropTable
DROP TABLE "Alumni";

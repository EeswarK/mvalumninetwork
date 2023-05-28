/*
  Warnings:

  - You are about to drop the column `major` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "major",
ADD COLUMN     "majors" TEXT[];

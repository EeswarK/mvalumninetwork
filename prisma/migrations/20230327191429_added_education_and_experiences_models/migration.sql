/*
  Warnings:

  - You are about to drop the column `mentor` on the `Alumni` table. All the data in the column will be lost.
  - You are about to drop the column `spaces` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tagLine` on the `User` table. All the data in the column will be lost.
  - Added the required column `openToMentoring` to the `Alumni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alumni" DROP COLUMN "mentor",
ADD COLUMN     "college" TEXT,
ADD COLUMN     "collegeGraduationClass" INTEGER,
ADD COLUMN     "openToMentoring" BOOLEAN NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "job" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "spaces",
DROP COLUMN "tagLine",
ADD COLUMN     "openToMentoring" BOOLEAN;

-- DropEnum
DROP TYPE "Space";

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "minor" TEXT,
    "graduationClass" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

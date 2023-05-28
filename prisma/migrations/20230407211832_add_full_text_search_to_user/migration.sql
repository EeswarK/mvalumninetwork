-- AlterTable
ALTER TABLE "User" ADD COLUMN     "textSearch" TSVECTOR;

-- CreateIndex
CREATE INDEX "User_textSearch_idx" ON "User"("textSearch");

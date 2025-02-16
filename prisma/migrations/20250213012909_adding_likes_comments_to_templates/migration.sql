-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "comments" TEXT[],
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

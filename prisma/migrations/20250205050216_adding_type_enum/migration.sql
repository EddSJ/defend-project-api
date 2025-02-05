/*
  Warnings:

  - Changed the type of `type` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'TEXTAREA', 'NUMBER', 'CHECKBOX');

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "type",
ADD COLUMN     "type" "QuestionType" NOT NULL;

/*
  Warnings:

  - You are about to drop the column `isEditted` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "isEditted",
ADD COLUMN     "isEdited" BOOLEAN NOT NULL DEFAULT false;

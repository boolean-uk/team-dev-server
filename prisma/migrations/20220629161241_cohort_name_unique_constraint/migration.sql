/*
  Warnings:

  - A unique constraint covering the columns `[cohortName]` on the table `Cohort` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cohortName` on table `Cohort` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cohort" ALTER COLUMN "cohortName" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cohort_cohortName_key" ON "Cohort"("cohortName");

/*
  Warnings:

  - You are about to drop the `CohortExercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Submission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_cohortExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_userId_fkey";

-- DropTable
DROP TABLE "CohortExercise";

-- DropTable
DROP TABLE "Submission";

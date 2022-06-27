/*
  Warnings:

  - Made the column `updatedAt` on table `Cohort` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `DeliveryLog` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `DeliveryLogLine` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `PostComment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cohort" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "DeliveryLog" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "DeliveryLogLine" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "PostComment" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;

/*
  Warnings:

  - Made the column `firstName` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateOfBirth` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "dateOfBirth" SET NOT NULL;

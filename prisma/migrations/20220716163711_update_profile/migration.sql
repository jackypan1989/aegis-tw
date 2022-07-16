/*
  Warnings:

  - Made the column `username` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

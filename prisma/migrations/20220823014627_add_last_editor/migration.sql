/*
  Warnings:

  - Added the required column `last_editor_id` to the `startups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "startups" ADD COLUMN     "last_editor_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "startups" ADD CONSTRAINT "startups_last_editor_id_fkey" FOREIGN KEY ("last_editor_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

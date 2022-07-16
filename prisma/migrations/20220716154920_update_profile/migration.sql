/*
  Warnings:

  - You are about to drop the column `ranking_core` on the `posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[post_id,voter_id]` on the table `votes` will be added. If there are existing duplicate values, this will fail.
  - Made the column `comment_count` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vote_count` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `view_count` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "ranking_core",
ADD COLUMN     "ranking_score" REAL NOT NULL DEFAULT 0,
ALTER COLUMN "comment_count" SET NOT NULL,
ALTER COLUMN "vote_count" SET NOT NULL,
ALTER COLUMN "view_count" SET NOT NULL;

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "votes_post_id_voter_id_key" ON "votes"("post_id", "voter_id");

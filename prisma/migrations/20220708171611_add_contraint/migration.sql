/*
  Warnings:

  - Made the column `created_at` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `post_id` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `commenter_id` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `votes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `votes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `post_id` on table `votes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `voter_id` on table `votes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_commenter_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_post_id_fkey";

-- DropForeignKey
ALTER TABLE "votes" DROP CONSTRAINT "votes_voter_id_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "post_id" SET NOT NULL,
ALTER COLUMN "commenter_id" SET NOT NULL,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "votes" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "post_id" SET NOT NULL,
ALTER COLUMN "voter_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_commenter_id_fkey" FOREIGN KEY ("commenter_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_voter_id_fkey" FOREIGN KEY ("voter_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ENGINEERING', 'DESIGNER', 'PRODUCT', 'OPERATIONS', 'SALES', 'MARKETING', 'FOUNDER', 'ANGEL_INVESTOR', 'VENTURE_CAPITAL');

-- CreateEnum
CREATE TYPE "Market" AS ENUM ('SOCIAL_MEDIA', 'MEDIA', 'HEALTH_CARE', 'GAMES', 'CRYPTO', 'LOGISTICS', 'HUMAN_RESOURCE', 'ANALYTICS', 'EDUCATION', 'SECURITY', 'FASHION', 'FITNESS', 'FOOD', 'REAL_ESTATE', 'E_COMMERCE', 'TRAVEL', 'AD_TECH', 'AI', 'DEVELOPER_TOOL', 'PRODUCTIVITY', 'WEARABLES', 'VIRTUAL_REALITY', 'COMSUMER', 'DATABASES', 'FINANCE');

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR NOT NULL,
    "avatar_url" VARCHAR,
    "website" VARCHAR,
    "email" VARCHAR NOT NULL,
    "markets" "Market"[],
    "roles" "Role"[],
    "facebook" VARCHAR,
    "github" VARCHAR,
    "linkedin" VARCHAR,
    "twitter" VARCHAR,
    "fullname" VARCHAR,
    "auto" BOOLEAN,
    "location" VARCHAR,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "poster_id" UUID NOT NULL,
    "title" VARCHAR,
    "url" VARCHAR,
    "content" VARCHAR,
    "comment_count" INTEGER NOT NULL DEFAULT 0,
    "vote_count" INTEGER NOT NULL DEFAULT 0,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "ranking_score" REAL NOT NULL DEFAULT 0,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voter_id" UUID NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "post_id" UUID NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commenter_id" UUID NOT NULL,
    "content" VARCHAR NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "post_id" UUID NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- CreateIndex
CREATE INDEX "posts_ranking_score_idx" ON "posts"("ranking_score" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "votes_post_id_voter_id_key" ON "votes"("post_id", "voter_id");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_poster_id_fkey" FOREIGN KEY ("poster_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_voter_id_fkey" FOREIGN KEY ("voter_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_commenter_id_fkey" FOREIGN KEY ("commenter_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

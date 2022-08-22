-- CreateTable
CREATE TABLE "startups" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "url" VARCHAR,
    "logo" VARCHAR,
    "description" VARCHAR,
    "markets" "Market"[],
    "founded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stage" VARCHAR,
    "team_size" INTEGER NOT NULL DEFAULT 0,
    "funding" REAL NOT NULL DEFAULT 0,
    "valuation" REAL NOT NULL DEFAULT 0,
    "revenue" REAL NOT NULL DEFAULT 0,
    "dau" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "startups_pkey" PRIMARY KEY ("id")
);

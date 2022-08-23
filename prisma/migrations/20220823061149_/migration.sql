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
    "funding" REAL NOT NULL DEFAULT 0,
    "valuation" REAL NOT NULL DEFAULT 0,
    "team_size" INTEGER NOT NULL DEFAULT 0,
    "revenue" REAL NOT NULL DEFAULT 0,
    "dau" INTEGER NOT NULL DEFAULT 0,
    "last_editor_id" UUID NOT NULL,

    CONSTRAINT "startups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "startups" ADD CONSTRAINT "startups_last_editor_id_fkey" FOREIGN KEY ("last_editor_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

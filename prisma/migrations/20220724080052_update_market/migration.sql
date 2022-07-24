/*
  Warnings:

  - The values [E_COMM] on the enum `Market` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Market_new" AS ENUM ('SOCIAL_MEDIA', 'MEDIA', 'HEALTH_CARE', 'GAMES', 'CRYPTO', 'LOGISTICS', 'HUMAN_RESOURCE', 'ANALYTICS', 'EDUCATION', 'SECURITY', 'FASHION', 'FITNESS', 'FOOD', 'REAL_ESTATE', 'E_COMMERCE', 'TRAVEL', 'AD_TECH', 'AI', 'DEVELOPER_TOOL', 'PRODUCTIVITY', 'WEARABLES', 'VIRTUAL_REALITY', 'COMSUMER', 'DATABASES', 'FINANCE');
ALTER TABLE "profiles" ALTER COLUMN "markets" TYPE "Market_new"[] USING ("markets"::text::"Market_new"[]);
ALTER TYPE "Market" RENAME TO "Market_old";
ALTER TYPE "Market_new" RENAME TO "Market";
DROP TYPE "Market_old";
COMMIT;

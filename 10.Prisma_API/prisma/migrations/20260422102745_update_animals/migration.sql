-- AlterTable
ALTER TABLE "animals" ALTER COLUMN "created_at" SET DEFAULT (now()),
ALTER COLUMN "update_at" SET DEFAULT (now());

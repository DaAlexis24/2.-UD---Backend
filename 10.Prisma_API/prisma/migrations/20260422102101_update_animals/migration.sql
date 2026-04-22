-- CreateEnum
CREATE TYPE "Lifestyle" AS ENUM ('Diurno', 'Nocturno');

-- CreateTable
CREATE TABLE "animals" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "english_name" VARCHAR(255) NOT NULL,
    "sci_name" VARCHAR(255) NOT NULL,
    "diet" TEXT,
    "lifestyle" "Lifestyle",
    "location" TEXT,
    "slogan" TEXT,
    "group_name" VARCHAR(255),
    "image" TEXT,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT (now()),
    "update_at" TIMESTAMP(0) NOT NULL DEFAULT (now()),

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

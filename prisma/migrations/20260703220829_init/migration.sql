-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('PETROL', 'DIESEL', 'HYBRID', 'ELECTRIC');

-- CreateEnum
CREATE TYPE "DriveType" AS ENUM ('TWO_WD', 'FOUR_WD', 'AWD');

-- CreateEnum
CREATE TYPE "VehicleCondition" AS ENUM ('JAPAN_IMPORT', 'LOCAL_USED', 'BRAND_NEW');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "stockNumber" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "trim" TEXT,
    "price" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "fuel" "FuelType" NOT NULL,
    "transmission" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "drive" "DriveType" NOT NULL,
    "bodyType" TEXT NOT NULL,
    "condition" "VehicleCondition" NOT NULL DEFAULT 'JAPAN_IMPORT',
    "exteriorColor" TEXT NOT NULL,
    "interiorColor" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "available" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT NOT NULL,
    "gallery" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_stockNumber_key" ON "Vehicle"("stockNumber");

-- CreateIndex
CREATE INDEX "Vehicle_make_model_idx" ON "Vehicle"("make", "model");

-- CreateIndex
CREATE INDEX "Vehicle_price_idx" ON "Vehicle"("price");

-- CreateIndex
CREATE INDEX "Vehicle_available_idx" ON "Vehicle"("available");

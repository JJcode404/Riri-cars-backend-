-- CreateEnum
CREATE TYPE "VehicleStatus" AS ENUM ('NEW', 'USED', 'CERTIFIED_PRE_OWNED');

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "status" "VehicleStatus" NOT NULL DEFAULT 'USED';

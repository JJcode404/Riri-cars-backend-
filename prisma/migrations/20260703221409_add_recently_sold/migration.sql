-- CreateTable
CREATE TABLE "RecentlySold" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "trim" TEXT,
    "bodyType" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "soldAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecentlySold_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecentlySold_soldAt_idx" ON "RecentlySold"("soldAt");

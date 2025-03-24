-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderStatusValue" TEXT NOT NULL DEFAULT 'AWAITING_PAYMENT';

-- CreateTable
CREATE TABLE "OrderStatus" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OrderStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderStatus_value_key" ON "OrderStatus"("value");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderStatusValue_fkey" FOREIGN KEY ("orderStatusValue") REFERENCES "OrderStatus"("value") ON DELETE RESTRICT ON UPDATE CASCADE;

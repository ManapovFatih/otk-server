-- CreateTable
CREATE TABLE "Characteristics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Characteristics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductOnCharacteristics" (
    "productId" INTEGER NOT NULL,
    "characteristicsId" INTEGER NOT NULL,

    CONSTRAINT "ProductOnCharacteristics_pkey" PRIMARY KEY ("productId","characteristicsId")
);

-- AddForeignKey
ALTER TABLE "ProductOnCharacteristics" ADD CONSTRAINT "ProductOnCharacteristics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOnCharacteristics" ADD CONSTRAINT "ProductOnCharacteristics_characteristicsId_fkey" FOREIGN KEY ("characteristicsId") REFERENCES "Characteristics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

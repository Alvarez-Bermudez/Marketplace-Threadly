/*
  Warnings:

  - Added the required column `stock` to the `ProductColor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductColor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "color" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    CONSTRAINT "ProductColor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductColor" ("color", "id", "productId") SELECT "color", "id", "productId" FROM "ProductColor";
DROP TABLE "ProductColor";
ALTER TABLE "new_ProductColor" RENAME TO "ProductColor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

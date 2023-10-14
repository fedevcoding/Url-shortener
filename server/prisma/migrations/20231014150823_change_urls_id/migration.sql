/*
  Warnings:

  - The primary key for the `urls` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `urls` table. All the data in the column will be lost.
  - You are about to drop the column `url_id` on the `views` table. All the data in the column will be lost.
  - Added the required column `short_url` to the `views` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "views_url_id_idx";

-- AlterTable
ALTER TABLE "urls" DROP CONSTRAINT "urls_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "urls_pkey" PRIMARY KEY ("short_url");

-- AlterTable
ALTER TABLE "views" DROP COLUMN "url_id",
ADD COLUMN     "short_url" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "views_short_url_idx" ON "views"("short_url");

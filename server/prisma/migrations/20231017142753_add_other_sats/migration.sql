-- CreateEnum
CREATE TYPE "device" AS ENUM ('pc', 'mobile');

-- AlterTable
ALTER TABLE "views" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "device" "device";

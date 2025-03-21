/*
  Warnings:

  - The `type` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserTypeEnum" AS ENUM ('CLIENT', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "verifiedEmail" SET DEFAULT false,
DROP COLUMN "type",
ADD COLUMN     "type" "UserTypeEnum" NOT NULL DEFAULT 'CLIENT';

-- DropEnum
DROP TYPE "UserType";

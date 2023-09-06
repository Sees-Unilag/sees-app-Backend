/*
  Warnings:

  - You are about to alter the column `title` on the `Notification` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `heading` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "heading" VARCHAR(255) NOT NULL,
ALTER COLUMN "title" SET DATA TYPE VARCHAR(255);

/*
  Warnings:

  - You are about to drop the column `removedBy` on the `Messages` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Messages` DROP COLUMN `removedBy`,
    DROP COLUMN `userID`,
    ADD COLUMN `removed_by` INTEGER NULL,
    ADD COLUMN `user_id` INTEGER NULL;

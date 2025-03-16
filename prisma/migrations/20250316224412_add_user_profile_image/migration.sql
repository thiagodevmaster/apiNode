/*
  Warnings:

  - Added the required column `user_id` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedTime` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurrence` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reminder` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastAccess` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preferences` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImage` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `estimatedTime` INTEGER NOT NULL,
    ADD COLUMN `recurrence` VARCHAR(191) NOT NULL,
    ADD COLUMN `reminder` DATETIME(3) NOT NULL,
    ADD COLUMN `tags` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `bio` TEXT NOT NULL,
    ADD COLUMN `lastAccess` DATETIME(3) NOT NULL,
    ADD COLUMN `preferences` JSON NOT NULL,
    ADD COLUMN `profileImage` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*
  Warnings:

  - You are about to drop the `visit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_urlId_fkey`;

-- DropTable
DROP TABLE `visit`;

-- CreateTable
CREATE TABLE `VisitHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `urlId` INTEGER NOT NULL,
    `timestamp` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VisitHistory` ADD CONSTRAINT `VisitHistory_urlId_fkey` FOREIGN KEY (`urlId`) REFERENCES `Url`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

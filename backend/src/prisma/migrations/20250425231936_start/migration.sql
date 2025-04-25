-- CreateTable
CREATE TABLE `Messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `parent_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Messages` ADD CONSTRAINT `Messages_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Messages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

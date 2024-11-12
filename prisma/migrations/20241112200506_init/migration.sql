-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `tipoUsuario` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `localizacao` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `usuarioId` INTEGER NOT NULL,
    `autoridadeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Acompanhamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataAtualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `statusAtual` VARCHAR(191) NOT NULL,
    `descricaoProgresso` VARCHAR(191) NOT NULL,
    `relatoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Autoridade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `orgao` VARCHAR(191) NOT NULL,
    `emailContato` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Autoridade_emailContato_key`(`emailContato`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mensagem` VARCHAR(191) NOT NULL,
    `dataHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MapaCalor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `coordenadasProblemas` JSON NOT NULL,
    `dataAtualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `relatoId` INTEGER NOT NULL,

    UNIQUE INDEX `MapaCalor_relatoId_key`(`relatoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Questionario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `perguntas` JSON NOT NULL,
    `opcoesResposta` JSON NOT NULL,
    `relatoId` INTEGER NOT NULL,

    UNIQUE INDEX `Questionario_relatoId_key`(`relatoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InteligenciaArtificial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `algoritmo` VARCHAR(191) NOT NULL,
    `parametros` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InteligenciaArtificialRelato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inteligenciaId` INTEGER NOT NULL,
    `relatoId` INTEGER NOT NULL,

    UNIQUE INDEX `InteligenciaArtificialRelato_inteligenciaId_relatoId_key`(`inteligenciaId`, `relatoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Relato` ADD CONSTRAINT `Relato_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relato` ADD CONSTRAINT `Relato_autoridadeId_fkey` FOREIGN KEY (`autoridadeId`) REFERENCES `Autoridade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Acompanhamento` ADD CONSTRAINT `Acompanhamento_relatoId_fkey` FOREIGN KEY (`relatoId`) REFERENCES `Relato`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MapaCalor` ADD CONSTRAINT `MapaCalor_relatoId_fkey` FOREIGN KEY (`relatoId`) REFERENCES `Relato`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Questionario` ADD CONSTRAINT `Questionario_relatoId_fkey` FOREIGN KEY (`relatoId`) REFERENCES `Relato`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InteligenciaArtificialRelato` ADD CONSTRAINT `InteligenciaArtificialRelato_inteligenciaId_fkey` FOREIGN KEY (`inteligenciaId`) REFERENCES `InteligenciaArtificial`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InteligenciaArtificialRelato` ADD CONSTRAINT `InteligenciaArtificialRelato_relatoId_fkey` FOREIGN KEY (`relatoId`) REFERENCES `Relato`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

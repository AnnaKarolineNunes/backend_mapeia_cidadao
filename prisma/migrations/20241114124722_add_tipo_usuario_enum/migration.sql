/*
  Warnings:

  - You are about to alter the column `tipoUsuario` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `tipoUsuario` ENUM('user', 'admin') NOT NULL;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Usuario {
  static async criarUsuario(data) {
    try {
      return await prisma.usuario.create({ data });
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  }

  static async obterUsuarioPorId(id) {
    try {
      return await prisma.usuario.findUnique({ where: { id } });
    } catch (error) {
      throw new Error('Erro ao obter usuário: ' + error.message);
    }
  }

  static async atualizarUsuario(id, data) {
    try {
      return await prisma.usuario.update({ where: { id }, data });
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
  }

  static async deletarUsuario(id) {
    try {
      return await prisma.usuario.delete({ where: { id } });
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    }
  }
}

module.exports = Usuario;

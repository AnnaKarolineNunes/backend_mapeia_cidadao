const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Classe responsável pela interação com o banco de dados para operações relacionadas ao modelo de Usuário.
 */
class Usuario {
  /**
   * Cria um novo usuário no banco de dados.
   * @param {Object} data - Dados do usuário a ser criado.
   * @returns {Promise<Object>} - Retorna o usuário criado.
   * @throws {Error} - Lança um erro caso não seja possível criar o usuário.
   */
  static async criarUsuario(data) {
    try {
      return await prisma.usuario.create({ data });
    } catch (error) {
      throw new Error('Erro ao criar usuário: ' + error.message);
    }
  }

  /**
   * Obtém um usuário pelo ID.
   * @param {number} id - ID do usuário a ser buscado.
   * @returns {Promise<Object>} - Retorna o usuário encontrado.
   * @throws {Error} - Lança um erro caso não seja possível obter o usuário.
   */
  static async obterUsuarioPorId(id) {
    try {
      return await prisma.usuario.findUnique({ where: { id } });
    } catch (error) {
      throw new Error('Erro ao obter usuário: ' + error.message);
    }
  }

  /**
   * Atualiza os dados de um usuário existente.
   * @param {number} id - ID do usuário a ser atualizado.
   * @param {Object} data - Dados para atualização do usuário.
   * @returns {Promise<Object>} - Retorna o usuário atualizado.
   * @throws {Error} - Lança um erro caso não seja possível atualizar o usuário.
   */
  static async atualizarUsuario(id, data) {
    try {
      return await prisma.usuario.update({ where: { id }, data });
    } catch (error) {
      throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
  }

  /**
   * Deleta um usuário pelo ID.
   * @param {number} id - ID do usuário a ser deletado.
   * @returns {Promise<Object>} - Retorna o resultado da operação de exclusão.
   * @throws {Error} - Lança um erro caso não seja possível deletar o usuário.
   */
  static async deletarUsuario(id) {
    try {
      return await prisma.usuario.delete({ where: { id } });
    } catch (error) {
      throw new Error('Erro ao deletar usuário: ' + error.message);
    }
  }
}

export default  Usuario 
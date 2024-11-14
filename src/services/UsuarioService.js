import Usuario from '../models/Usuario.js';

/**
 * Serviço responsável por gerenciar as operações relacionadas aos usuários.
 */
class UsuarioService {
  /**
   * Cria um novo usuário no banco de dados.
   * @param {Object} data - Dados do usuário a ser criado.
   * @returns {Promise<Object>} - Retorna o usuário criado.
   * @throws {Error} - Lança um erro caso não seja possível criar o usuário.
   */
  static async criarUsuario(data) {
    try {
      return await Usuario.criarUsuario(data);
    } catch (error) {
      throw new Error('Erro no serviço ao criar usuário: ' + error.message);
    }
  }

  /**
   * Obtém um usuário pelo ID.
   * @param {number} id - ID do usuário a ser buscado.
   * @returns {Promise<Object>} - Retorna o usuário encontrado.
   * @throws {Error} - Lança um erro caso o usuário não seja encontrado ou ocorra um problema na busca.
   */
  static async obterUsuarioPorId(id) {
    try {
      const usuario = await Usuario.obterUsuarioPorId(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error('Erro no serviço ao obter usuário: ' + error.message);
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
      return await Usuario.atualizarUsuario(id, data);
    } catch (error) {
      throw new Error('Erro no serviço ao atualizar usuário: ' + error.message);
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
      return await Usuario.deletarUsuario(id);
    } catch (error) {
      throw new Error('Erro no serviço ao deletar usuário: ' + error.message);
    }
  }
}
export default  UsuarioService;
// Lógica para gerenciar usuários
const Usuario = require('../models/Usuario');

class UsuarioService {
  static async criarUsuario(data) {
    try {
      return await Usuario.criarUsuario(data);
    } catch (error) {
      throw new Error('Erro no serviço ao criar usuário: ' + error.message);
    }
  }

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

  static async atualizarUsuario(id, data) {
    try {
      return await Usuario.atualizarUsuario(id, data);
    } catch (error) {
      throw new Error('Erro no serviço ao atualizar usuário: ' + error.message);
    }
  }

  static async deletarUsuario(id) {
    try {
      return await Usuario.deletarUsuario(id);
    } catch (error) {
      throw new Error('Erro no serviço ao deletar usuário: ' + error.message);
    }
  }
}

module.exports = UsuarioService;

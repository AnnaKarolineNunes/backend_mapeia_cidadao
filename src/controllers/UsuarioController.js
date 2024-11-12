const UsuarioService = require('../services/UsuarioService');

/**
 * Controlador responsável por lidar com as requisições relacionadas aos usuários.
 */
class UsuarioController {
  /**
   * Cria um novo usuário.
   * @param {Object} req - Objeto de requisição HTTP.
   * @param {Object} res - Objeto de resposta HTTP.
   */
  static async criarUsuario(req, res) {
    try {
      const data = req.body;
      const novoUsuario = await UsuarioService.criarUsuario(data);
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }

  /**
   * Obtém um usuário pelo ID.
   * @param {Object} req - Objeto de requisição HTTP.
   * @param {Object} res - Objeto de resposta HTTP.
   */
  static async obterUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.obterUsuarioPorId(parseInt(id));
      res.status(200).json(usuario);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }

  /**
   * Atualiza um usuário pelo ID.
   * @param {Object} req - Objeto de requisição HTTP.
   * @param {Object} res - Objeto de resposta HTTP.
   */
  static async atualizarUsuario(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const usuarioAtualizado = await UsuarioService.atualizarUsuario(parseInt(id), data);
      res.status(200).json(usuarioAtualizado);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }

  /**
   * Deleta um usuário pelo ID.
   * @param {Object} req - Objeto de requisição HTTP.
   * @param {Object} res - Objeto de resposta HTTP.
   */
  static async deletarUsuario(req, res) {
    try {
      const { id } = req.params;
      await UsuarioService.deletarUsuario(parseInt(id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }
}

export default UsuarioController 

// Lógica para gerenciar os usuários

const UsuarioService = require('../services/UsuarioService');

class UsuarioController {
  static async criarUsuario(req, res) {
    try {
      const data = req.body;
      const novoUsuario = await UsuarioService.criarUsuario(data);
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  }

  static async obterUsuarioPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioService.obterUsuarioPorId(parseInt(id));
      res.status(200).json(usuario);
    } catch (error) {
      res.status(404).json({ erro: error.message });
    }
  }

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

module.exports = UsuarioController;

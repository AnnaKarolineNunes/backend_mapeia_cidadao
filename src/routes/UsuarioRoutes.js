import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middlewares/authMiddleware.js'; // Importa o middleware de autenticação existente

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

// Rota para criar um novo usuário com retorno do token JWT e mensagem de sucesso
router.post('/criar', async (req, res) => {
  try {
    const { nome, email, senha, tipoUsuario } = req.body;

    // Verifica se o e-mail já está cadastrado
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Gera um hash para a senha do usuário
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Cria o usuário no banco de dados
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        tipoUsuario
      }
    });

    // Gera um token JWT para o novo usuário, válido por 1 dia
    const token = jwt.sign({ id: novoUsuario.id, tipoUsuario: novoUsuario.tipoUsuario }, JWT_SECRET, { expiresIn: '1d' });

    // Retorna o token e uma mensagem de sucesso
    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      token
    });
  } catch (err) {
    // Alteração feita: agora retornamos a mensagem de erro interna para facilitar a depuração
    res.status(500).json({ message: 'Erro no servidor, tente novamente', error: err.message });
  }
});

// Rota para login de usuários
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Busca o usuário no banco de dados pelo email
    const user = await prisma.usuario.findUnique({
      where: { email }
    });

    // Verifica se o usuário existe no banco de dados
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados
    const isMatch = await bcrypt.compare(password, user.senha);

    if (!isMatch) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    // Gera um token JWT para o usuário, válido por 1 dia
    const token = jwt.sign({ id: user.id, tipoUsuario: user.tipoUsuario }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token });
  } catch (err) {
    // Alteração feita: agora retornamos a mensagem de erro interna para facilitar a depuração
    res.status(500).json({ message: 'Erro no servidor, tente novamente', error: err.message });
  }
});

// Rota para obter um usuário pelo ID (autenticada)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) }
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    // Alteração feita: agora retornamos a mensagem de erro interna para facilitar a depuração
    res.status(500).json({ message: 'Erro no servidor, tente novamente', error: error.message });
  }
});

// Rota para atualizar um usuário pelo ID (autenticada)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        email
      }
    });

    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    // Alteração feita: agora retornamos a mensagem de erro interna para facilitar a depuração
    res.status(500).json({ message: 'Erro no servidor, tente novamente', error: error.message });
  }
});

// Rota para deletar um usuário pelo ID (autenticada)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({
      where: { id: parseInt(id) } 
    });

    // Retorna a resposta indicando que o usuário foi deletado com sucesso
    res.status(200).json({
      message: 'Usuário deletado com sucesso'
    });

    res.status(204).send();
  } catch (error) {
    // Alteração feita: agora retornamos a mensagem de erro interna para facilitar a depuração
    res.status(500).json({ message: 'Erro no servidor, tente novamente', error: error.message });
  }
});

// Rota para obter todos os usuários (apenas administradores)
router.get('/listaUsers', authMiddleware, async (req, res) => {
  try {
    // Verifica se o usuário autenticado é um administrador
    if (req.usuario.tipoUsuario !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem acessar esta rota.' });
    }

    // Obtém a lista de todos os usuários do banco de dados
    const usuarios = await prisma.usuario.findMany();

    res.status(200).json(usuarios);
  } catch (error) {
    // Alteração feita: agora retornamos a mensagem de erro interna para facilitar a depuração
    res.status(500).json({ message: 'Erro no servidor, tente novamente', error: error.message });
  }
});

export default router;

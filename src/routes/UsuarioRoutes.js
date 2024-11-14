import express from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

// Rota para criar um novo usuário
router.post('/criar', UsuarioController.criarUsuario);

// Rota para obter um usuário pelo ID
router.get('/:id', UsuarioController.obterUsuarioPorId);

// Rota para atualizar um usuário pelo ID
router.put('/:id', UsuarioController.atualizarUsuario);

// Rota para deletar um usuário pelo ID
router.delete('/:id', UsuarioController.deletarUsuario);

// Rota para login de usuários
router.post('/login', async (req, res) => {
  try {
    const userInfo = req.body;  // Obtém as informações de login a partir do corpo da requisição.

    // Busca o usuário no banco de dados pelo email.
    const user = await prisma.usuario.findUnique({
      where: { email: userInfo.email }
    });

    // Verifica se o usuário existe no banco de dados.
    if (!user) {
      return res.status(404).json({ message: 'Usuario nao encontrado' });  // Retorna um erro 404 se o usuário não for encontrado.
    }

    // Compara a senha fornecida com a senha armazenada no banco de dados.
    const isMatch = await bcrypt.compare(userInfo.password, user.senha);

    if (!isMatch) {
      return res.status(400).json({ message: 'Senha inválida' });  // Retorna um erro 400 se a senha estiver incorreta.
    }

    // Gera um token JWT para o usuário, válido por 1 dia.
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token });  // Retorna o token JWT com status 200 (sucesso).
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor, tente novamente' });  // Retorna um erro de servidor com status 500.
  }
});

export default router;

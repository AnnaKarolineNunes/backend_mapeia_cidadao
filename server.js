import express from 'express';  // Importa o framework Express para criar e gerenciar rotas e servidores.
import usuarioRoutes from './src/routes/UsuarioRoutes.js';  // Importa as rotas de usuários.
import authMiddleware from './src/middlewares/authMiddleware.js';  // Importa o middleware de autenticação para proteger as rotas privadas.
import cors from 'cors';  // Importa o middleware CORS para permitir que aplicações front-end acessem a API.
import errorHandler from './src/middlewares/errorHandler.js';  // Importa o middleware de tratamento de erros.
import logger from './src/middlewares/logger.js';  // Importa o middleware de logging para registrar as requisições.

const app = express();  // Cria uma instância do Express para gerenciar o servidor e as rotas.

// Middlewares globais
app.use(express.json());  // Configura o servidor para interpretar requisições com corpo em formato JSON.
// app.use(cors());  // Aplica o middleware CORS.
app.use(logger);  // Aplica o middleware de logging para registrar as requisições.

// Rotas públicas
app.use('/api/usuarios', usuarioRoutes);  // Define as rotas de usuários, algumas delas podem não exigir autenticação.

// Rotas privadas
app.use('/api/privado', authMiddleware, (req, res) => {
  res.status(200).send('Acesso concedido a rota privada');
});

// Middleware de tratamento de erros
app.use(errorHandler);  // Aplica o middleware de tratamento de erros.

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));  // Inicia o servidor na porta especificada e exibe uma mensagem no console.

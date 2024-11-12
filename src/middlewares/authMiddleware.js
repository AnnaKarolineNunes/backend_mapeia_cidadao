// Autenticação de usuários e autoridades
const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticação.
 * Verifica se o usuário possui um token JWT válido para acessar rotas protegidas.
 *
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {Function} next - Função para passar o controle ao próximo middleware.
 */
const authMiddleware = (req, res, next) => {
  // Obtém o token do cabeçalho Authorization, removendo a palavra 'Bearer '
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Verifica se o token foi fornecido
  if (!token) {
    // Se não houver token, retorna um erro de autenticação (401 - Unauthorized)
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  try {
    // Verifica e decodifica o token usando a chave secreta definida nas variáveis de ambiente
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Se o token for válido, armazena as informações do usuário decodificado na requisição
    req.usuario = decoded;
    
    // Passa o controle para o próximo middleware ou controlador
    next();
  } catch (error) {
    // Caso o token seja inválido, retorna um erro de autenticação (401 - Unauthorized)
    res.status(401).json({ erro: 'Token inválido.' });
  }
};

export default authMiddleware 


/**
 * Middleware de tratamento de erros.
 * Captura erros que ocorrem durante o processamento da requisição e envia uma resposta padronizada.
 *
 * @param {Object} err - Objeto de erro capturado.
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {Function} next - Função para passar o controle ao próximo middleware.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Loga o erro para fins de depuração
    res.status(err.status || 500).json({
      erro: err.message || 'Erro interno do servidor'
    });
  };
  
export default errorHandler
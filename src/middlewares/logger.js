/**
 * Middleware de registro de requisições.
 * Registra informações sobre cada requisição recebida pelo servidor para fins de monitoramento.
 *
 * @param {Object} req - Objeto de requisição HTTP.
 * @param {Object} res - Objeto de resposta HTTP.
 * @param {Function} next - Função para passar o controle ao próximo middleware.
 */
const logger = (req, res, next) => {
    const { method, url } = req;
    const timestamp = new Date().toISOString();
    // Loga o método HTTP, a URL e o timestamp da requisição recebida
    console.log(`[${timestamp}] ${method} ${url}`); 
    next();
  };
export default logger
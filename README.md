# Backend Mapeia Cidadão

Este é o backend do projeto **Mapeia Cidadão**, que visa permitir que os cidadãos relatem problemas urbanos, como questões de infraestrutura, transporte, saúde e segurança. A aplicação utiliza **Node.js** e **Express** para criar uma API REST.

## Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- NPM (Node Package Manager) instalado

## Instalação

1. Clone este repositório em sua máquina local.
2. Navegue até o diretório do projeto:
   ```sh
   cd backend_mapeia_cidadao
   ```
3. Instale as dependências do projeto:
   ```sh
   npm install
   ```

## Dependências Instaladas

- **Express**: Framework minimalista para servidor.
  ```sh
  npm install express
  ```
- **dotenv**: Gerenciar variáveis de ambiente.
  ```sh
  npm install dotenv
  ```
- **Nodemon** (desenvolvimento): Reinicia automaticamente o servidor durante o desenvolvimento.
  ```sh
  npm install --save-dev nodemon
  ```
- **Prisma Client**: Cliente para interação com banco de dados usando Prisma.
  ```sh
  npm install @prisma/client
  ```

## Scripts

- **Iniciar o servidor**:
  ```sh
  npm start
  ```
- **Iniciar o servidor em modo de desenvolvimento** (usando nodemon):
  ```sh
  npm run dev
  ```

## Configuração de Variáveis de Ambiente

Este projeto usa o **dotenv** para gerenciar variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```
PORT=3000
DATABASE_URL=<sua_url_de_conexao>
```

## Como Usar

1. Após instalar as dependências e configurar as variáveis de ambiente, você pode iniciar o servidor:
   ```sh
   npm run dev
   ```
2. O servidor será iniciado na porta definida no arquivo `.env` (por padrão `5000`).

## Ferramentas Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para construir APIs REST.
- **dotenv**: Para gerenciar variáveis de ambiente.
- **Nodemon**: Ferramenta para desenvolvimento que reinicia o servidor automaticamente.
- **Prisma**: ORM para gerenciamento de banco de dados.

## Autor


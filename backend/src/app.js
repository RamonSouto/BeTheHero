const express = require('express');
const cors = require('cors');
const {errors} = require('celebrate');
const app = express();

//Importando as rotas
const routes = require('./routes/routes');

//Para determinar que pode ou nao acessar nossa API
app.use(cors());
//Todas as requisições serão em JSON
app.use(express.json());
//Todas as requisições e respotas serao direcionado para routes
app.use(routes);
//pegando erros de Validação com celebrate
app.use(errors());

/**
 * Rotas / Recursos
 * 
 */

 /** Métodos HTTP:
  * 
  * GET: Busca uma informação no back-end
  * POST: Enviar informação no back-end
  * PUT: Alterar uma informação no back-end
  * DELETE: Deletar uma informação no back-end
  */

/** TIPOS DE PARAMETROS
 * 
 * Query Params: Parametros nomeados enviados na rota após ?  (filtros, Paginação) & junta mais intem na pesquisa
 * /users?name=ramon
 * const queryParams = request.query
 * 
 * Route Params: Paramentro utilizado para identificar recuros
 * /users/:id
 * const routeParams = request.params
 * 
 * Request Body: Corpo da requisição, utilizadoa para ciar ou alterar recursos
 * post /users {"name": "Ramon Souto", "idade": 25}
*/

/**BANCOS DE DADOS
 * 
 * SQL: MySQL, SQLite, PostgresSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
*/

/** Driver: SELECT * FROM users 
 *  Query Builder: table('users').select('*').where('') -> knex
*/



//levantando servidor na porta 3333
module.exports = app;
const { Router } = require("express")
const routes = Router()
const DevController = require("./controllers/DevController")
const SearchController = require("./controllers/SearchController")

// Métodos HTTP: GET, POST, PUT AND DELETE

// Tipos de parâmetros:
// Query Params: request.query (Filtros, Ordenação, páginação)

// Route Params: request.params (Indentificar um recurso na altearação ou na remoção)

// Body request.body (Dados para criação ou alteração de um registro)

routes.get("/devs", DevController.index)
routes.post("/devs", DevController.store)

routes.get("/search", SearchController.index)


module.exports = routes;
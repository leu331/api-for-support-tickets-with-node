import { routes } from "../routes/index.js";
import { Database } from "../database/database.js";
import { extractQueryParams } from "../utils/extractQueryParams.js";

const database = new Database() //crio ele aqui para compartilhar o meu banco de dados com todas as minhas rotas

export function routeHandler (request, response) {
    
    
    const route = routes.find((route) => {//achar a rota dentro das rotas
        return route.method === request.method && route.path.test(request.url)    
    }) 

    if(route) {
        const routeParams = request.url.match(route.path)

        const {query} = routeParams.groups
       
        request.query = query ? extractQueryParams(query) : {}

            return route.controller({request, response, database}) //se a rota existir, me retorne isso... entre chaves por conta do controller, iria dar erro sem isso. e passo o database tambem
        }

    return response.writeHead(404).end("") //se nao achar a rota no insominia, exiba essa mensagem de rota nao encontrada
}
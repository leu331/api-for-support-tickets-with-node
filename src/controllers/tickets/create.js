import {randomUUID} from "node:crypto"
export function create({request, response, database}) {//coloco entre chaves para conseguir recber e manipular independente da ordem que for devolvido
    const {equipament, description, user_name} = request.body

    const ticket = {
        id: randomUUID(),
        equipament,
        description,
        user_name,
        status: "open",
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
    }

    database.insert("tickets", ticket) //aqui eu faco o metodo saber quais sao os dados que quero

    return response.writeHead(201).end(JSON.stringify(ticket))
}
export async function jsonHandler (request, response) {
    const buffers = []

    for await (const chunk of request) { //percorre os chunks que vamos receber 
        buffers.push(chunk) 
    }

    try {
        request.body = JSON.parse(Buffer.concat(buffers).toString()) //adiciona o body, concatena os buffers, converte para string e termina convertendo para json 
    } 
    
    catch (error) {
        request.body = null
    }

    response.setHeader("Content-Type", "application/json")
}
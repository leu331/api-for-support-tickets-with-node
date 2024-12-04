export function closedStatus({ request, response, database}) {
    const {id} = request.params
    const {solution} = request.body

    console.log(solution)

    database.update("tickets", id, {status: "closed", solution})

    return response.writeHead(200).end()
}
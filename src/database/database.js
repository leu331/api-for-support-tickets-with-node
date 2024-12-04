import { log } from "node:console"
import fs from "node:fs/promises"

const DATABASE_PATH = new URL("db.json", import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(DATABASE_PATH, "utf-8").then((data) =>{
            this.#database = JSON.parse(data) //se existir, converte o dados de texto para json
        }).catch(()=>{ //se nao existir
            this.#persist()
        })
    }

    #persist(){
      fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))  //json para texto
    }

    insert (table, data){
        if (Array.isArray(this.#database[table])){//se achar a tabela dentro do array, retorna verdadeiro
            this.#database[table].push(data)
        } 

        else {
            this.#database[table] = [data]
        }

        this.#persist()

    }

    select (table){ //para o get
        let data = this.#database[table] ?? []
        return data
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex((row) => row.id === id)

        if (rowIndex > -1) {
            this.#database[table][rowIndex] = {
                ...this.#database[table][rowIndex],
                ...data
            }
        }

        this.#persist()
        //metodo para atualizar o ticket
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex((row) => row.id === id)

        if (rowIndex > -1) { 
           this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }
}
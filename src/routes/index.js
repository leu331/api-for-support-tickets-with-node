//responsável por juntar todas as requisicoes de todas as rotas
import { tickets } from "./tickets.js";
import { parseRoutePath } from "../utils/parseRoutePath.js";

export const routes = [...tickets,].map((route) => ({
    ...route,
    path: parseRoutePath(route.path),
}))
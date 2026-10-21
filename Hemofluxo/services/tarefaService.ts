import { Tarefa } from "../models/Tarefa";
import { API_URL } from "./api";

export async function listarTarefas() : Promise<Tarefa[]> {

    const response = await fetch(`${API_URL}/Tarefas`);

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
}

export async function listarTarefaPorId(id: number) : Promise<Tarefa> {

    const response = await fetch(`${API_URL}/Tarefas/${id}`);

    if (response.status === 404){
        throw new Error(`Tarefa não encontrada`);
    }

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
}
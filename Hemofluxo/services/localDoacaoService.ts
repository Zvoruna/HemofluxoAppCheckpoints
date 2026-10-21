import { API_URL } from './api';
import { LocalDoacao } from '../models/LocalDoacao';

export async function listarLocais(): Promise<LocalDoacao[]> {
  const response = await fetch(`${API_URL}/locais`);

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  const dados: LocalDoacao[] = await response.json();

  return dados;
}

export async function buscarLocalPorId(
  id: number
): Promise<LocalDoacao> {
  const response = await fetch(`${API_URL}/locais/${id}`);

  if (response.status === 404) {
    throw new Error('Local de doação não encontrado.');
  }

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  const dados: LocalDoacao = await response.json();

  return dados;
}


/*prof:
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
}*/
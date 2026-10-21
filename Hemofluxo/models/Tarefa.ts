export type StatusTarefa = 
| 'Pendente' 
| 'EmAndamento'
| 'Concluida';

export type Tarefa = {
    id: number,
    titulo: string,
    descricao: string,
    status: StatusTarefa
}
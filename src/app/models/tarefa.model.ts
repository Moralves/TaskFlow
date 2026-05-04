export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  prioridade: string;
  concluida: boolean;
  dataCriacao: Date;
  dataConclusao?: Date;
}

export const CATEGORIAS = ["Trabalho", "Pessoal", "Estudos", "Outros"];

export const PRIORIDADES = ["Alta", "Média", "Baixa"];

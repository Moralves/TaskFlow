import { Injectable } from "@angular/core";
import { PRIORIDADES, Tarefa } from "../models/tarefa.model";

export interface EstatisticasTarefas {
  total: number;
  pendentes: number;
  concluidas: number;
  porPrioridade: Record<string, number>;
}

@Injectable({
  providedIn: "root"
})
export class TarefaService {
  private tarefas: Tarefa[] = [
    {
      id: 1,
      titulo: "Estudar Angular",
      descricao: "Revisar material de Data Binding",
      categoria: "Estudos",
      prioridade: "Alta",
      concluida: false,
      dataCriacao: new Date("2024-04-20")
    },
    {
      id: 2,
      titulo: "Fazer compras",
      descricao: "Arroz, feijão, café",
      categoria: "Pessoal",
      prioridade: "Média",
      concluida: true,
      dataCriacao: new Date("2024-04-21"),
      dataConclusao: new Date("2024-04-22")
    },
    {
      id: 3,
      titulo: "Reunião com time",
      descricao: "Daily às 10h",
      categoria: "Trabalho",
      prioridade: "Alta",
      concluida: false,
      dataCriacao: new Date("2024-04-23")
    },
    {
      id: 4,
      titulo: "Ler documentação TypeScript",
      descricao: "Capítulos 5 e 6",
      categoria: "Estudos",
      prioridade: "Baixa",
      concluida: false,
      dataCriacao: new Date("2024-04-24")
    },
    {
      id: 5,
      titulo: "Ligar para dentista",
      descricao: "Agendar consulta",
      categoria: "Pessoal",
      prioridade: "Média",
      concluida: false,
      dataCriacao: new Date("2024-04-25")
    }
  ];

  private proximoId = 6;

  listarTarefas(): Tarefa[] {
    return [...this.tarefas];
  }

  obterTarefaPorId(id: number): Tarefa | undefined {
    return this.tarefas.find((tarefa) => tarefa.id === id);
  }

  criarTarefa(
    dados: Omit<Tarefa, "id" | "concluida" | "dataCriacao" | "dataConclusao">
  ): void {
    const novaTarefa: Tarefa = {
      id: this.proximoId++,
      titulo: dados.titulo.trim(),
      descricao: dados.descricao.trim(),
      categoria: dados.categoria,
      prioridade: dados.prioridade,
      concluida: false,
      dataCriacao: new Date()
    };

    this.tarefas.push(novaTarefa);
  }

  editarTarefa(id: number, dados: Partial<Tarefa>): void {
    const tarefa = this.obterTarefaPorId(id);
    if (!tarefa) {
      return;
    }

    Object.assign(tarefa, dados);

    if (dados.concluida === true) {
      tarefa.dataConclusao = new Date();
    }

    if (dados.concluida === false) {
      tarefa.dataConclusao = undefined;
    }
  }

  excluirTarefa(id: number): void {
    this.tarefas = this.tarefas.filter((tarefa) => tarefa.id !== id);
  }

  alternarConclusao(id: number): void {
    const tarefa = this.obterTarefaPorId(id);
    if (!tarefa) {
      return;
    }

    tarefa.concluida = !tarefa.concluida;
    tarefa.dataConclusao = tarefa.concluida ? new Date() : undefined;
  }

  obterEstatisticas(): EstatisticasTarefas {
    const total = this.tarefas.length;
    const concluidas = this.tarefas.filter((tarefa) => tarefa.concluida).length;
    const pendentes = total - concluidas;
    const porPrioridade = PRIORIDADES.reduce<Record<string, number>>(
      (acc, prioridade) => {
        acc[prioridade] = this.tarefas.filter(
          (tarefa) => tarefa.prioridade === prioridade
        ).length;
        return acc;
      },
      {}
    );

    return {
      total,
      pendentes,
      concluidas,
      porPrioridade
    };
  }
}

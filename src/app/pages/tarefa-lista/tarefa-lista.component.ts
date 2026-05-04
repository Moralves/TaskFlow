import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { CATEGORIAS, PRIORIDADES, Tarefa } from "../../models/tarefa.model";
import { TarefaService } from "../../services/tarefa.service";

@Component({
  selector: "app-tarefa-lista",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: "./tarefa-lista.component.html",
  styleUrl: "./tarefa-lista.component.css"
})
export class TarefaListaComponent implements OnInit {
  tarefas: Tarefa[] = [];
  categorias = CATEGORIAS;
  prioridades = PRIORIDADES;
  filtroCategoria = "Todas";
  filtroPrioridade = "Todas";
  filtroStatus = "Todas";
  busca = "";

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefas = this.tarefaService.listarTarefas();
  }

  get tarefasFiltradas(): Tarefa[] {
    const termo = this.busca.trim().toLowerCase();

    return this.tarefas.filter((tarefa) => {
      const categoriaOk =
        this.filtroCategoria === "Todas" ||
        tarefa.categoria === this.filtroCategoria;
      const prioridadeOk =
        this.filtroPrioridade === "Todas" ||
        tarefa.prioridade === this.filtroPrioridade;
      const statusOk =
        this.filtroStatus === "Todas" ||
        (this.filtroStatus === "Pendentes" && !tarefa.concluida) ||
        (this.filtroStatus === "Concluídas" && tarefa.concluida);
      const buscaOk =
        !termo ||
        tarefa.titulo.toLowerCase().includes(termo) ||
        tarefa.descricao.toLowerCase().includes(termo);

      return categoriaOk && prioridadeOk && statusOk && buscaOk;
    });
  }

  alternarConclusao(tarefa: Tarefa): void {
    this.tarefaService.alternarConclusao(tarefa.id);
    this.carregarTarefas();
  }

  excluirTarefa(tarefa: Tarefa): void {
    const confirmar = window.confirm(
      `Deseja excluir a tarefa "${tarefa.titulo}"?`
    );
    if (!confirmar) {
      return;
    }
    this.tarefaService.excluirTarefa(tarefa.id);
    this.carregarTarefas();
  }

  classePrioridade(prioridade: string): string {
    if (prioridade === "Alta") {
      return "alta";
    }
    if (prioridade === "Média") {
      return "media";
    }
    return "baixa";
  }
}

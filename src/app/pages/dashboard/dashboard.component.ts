import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { PRIORIDADES } from "../../models/tarefa.model";
import {
  EstatisticasTarefas,
  TarefaService
} from "../../services/tarefa.service";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css"
})
export class DashboardComponent implements OnInit {
  prioridades = PRIORIDADES;
  stats: EstatisticasTarefas = {
    total: 0,
    pendentes: 0,
    concluidas: 0,
    porPrioridade: {}
  };

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.atualizar();
  }

  atualizar(): void {
    this.stats = this.tarefaService.obterEstatisticas();
  }

  totalPorPrioridade(prioridade: string): number {
    return this.stats.porPrioridade[prioridade] ?? 0;
  }
}

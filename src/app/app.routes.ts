import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TarefaFormComponent } from "./pages/tarefa-form/tarefa-form.component";
import { TarefaListaComponent } from "./pages/tarefa-lista/tarefa-lista.component";

export const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "tarefas", component: TarefaListaComponent },
  { path: "tarefa/nova", component: TarefaFormComponent },
  { path: "tarefa/editar/:id", component: TarefaFormComponent },
  { path: "**", redirectTo: "" }
];

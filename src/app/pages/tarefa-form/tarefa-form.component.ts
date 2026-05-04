import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CATEGORIAS, PRIORIDADES } from "../../models/tarefa.model";
import { TarefaService } from "../../services/tarefa.service";

@Component({
  selector: "app-tarefa-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./tarefa-form.component.html",
  styleUrl: "./tarefa-form.component.css"
})
export class TarefaFormComponent implements OnInit {
  categorias = CATEGORIAS;
  prioridades = PRIORIDADES;
  modoEdicao = false;
  tarefaId: number | null = null;

  form = this.formBuilder.nonNullable.group({
    titulo: ["", [Validators.required, Validators.minLength(3)]],
    descricao: [""],
    categoria: ["", Validators.required],
    prioridade: ["", Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private tarefaService: TarefaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get("id");
    if (idParam) {
      const id = Number(idParam);
      const tarefa = this.tarefaService.obterTarefaPorId(id);
      if (!tarefa) {
        this.router.navigate(["/tarefas"]);
        return;
      }
      this.modoEdicao = true;
      this.tarefaId = id;
      this.form.patchValue({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        categoria: tarefa.categoria,
        prioridade: tarefa.prioridade
      });
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { titulo, descricao, categoria, prioridade } =
      this.form.getRawValue();
    const descricaoFinal = descricao.trim();

    if (this.modoEdicao && this.tarefaId !== null) {
      this.tarefaService.editarTarefa(this.tarefaId, {
        titulo: titulo.trim(),
        descricao: descricaoFinal,
        categoria,
        prioridade
      });
    } else {
      this.tarefaService.criarTarefa({
        titulo: titulo.trim(),
        descricao: descricaoFinal,
        categoria,
        prioridade
      });
    }

    this.router.navigate(["/tarefas"]);
  }

  cancelar(): void {
    this.router.navigate(["/tarefas"]);
  }
}

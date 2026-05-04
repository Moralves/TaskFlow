# TaskFlow

Sistema simples e funcional de controle de tarefas pessoais desenvolvido em Angular 21, com dados mantidos em memória por meio de um service.

## Tecnologias utilizadas

- Angular 21
- TypeScript
- CSS

## Requisitos

- Node.js 20.19+ (ou 22.12+)

## Funcionalidades implementadas

- Cadastro, edição, exclusão e conclusão de tarefas
- Filtros por categoria, prioridade e status
- Busca por título ou descrição
- Dashboard com métricas e navegação rápida

## Estrutura de pastas

```
taskflow/
├── src/app/
│   ├── models/
│   │   └── tarefa.model.ts
│   ├── services/
│   │   └── tarefa.service.ts
│   ├── pages/
│   │   ├── dashboard/
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.css
│   │   ├── tarefa-lista/
│   │   │   ├── tarefa-lista.component.ts
│   │   │   ├── tarefa-lista.component.html
│   │   │   └── tarefa-lista.component.css
│   │   └── tarefa-form/
│   │       ├── tarefa-form.component.ts
│   │       ├── tarefa-form.component.html
│   │       └── tarefa-form.component.css
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   └── app.routes.ts
└── README.md
```

## Como instalar

```
npm install
```

## Como rodar

```
ng serve
```

## Como acessar

http://localhost:4200

## Observações

Este projeto funciona totalmente em memória e não utiliza backend.

## Sugestão de commits para o GitHub

1. chore: iniciar projeto Angular
2. feat: criar layout e navegação
3. feat: implementar gestão de tarefas e filtros
4. docs: adicionar README

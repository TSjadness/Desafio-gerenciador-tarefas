# Gerenciador de Tarefas

Sistema de gerenciamento de tarefas desenvolvido com Next.js 15 e tRPC, para o case prático de Software Produtividade.

As respostas da parte teórica estão disponíveis em [RESPOSTAS.md](./RESPOSTAS.md).

## Tecnologias

- Next.js 15 (App Router)
- React 19
- TypeScript
- tRPC v11
- React Query
- Zod para validação
- Styled Components
- Lucide React para os ícones

## Como executar o projeto

### Pré-requisitos

- Node.js 18.18 ou superior
- npm

### Ambiente de desenvolvimento

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse: http://localhost:3000

### Ambiente de produção

```bash
npm run build
npm start
```

Não é necessário configurar banco de dados ou variáveis de ambiente.

As tarefas são armazenadas em memória. Ao reiniciar o servidor, a lista retorna às tarefas de exemplo.

## Como funciona

### Backend

O backend está localizado em `src/server` e é disponibilizado pelo route handler:

`src/app/api/trpc/[trpc]/route.ts`

- `data/tarefas.ts`: armazenamento em memória e funções de CRUD. Inicializa com 20 tarefas de exemplo para testar o scroll infinito.
- `routers/tarefa.ts`: procedures do tRPC.
- `trpc.ts`: configuração do tRPC, utilizando SuperJSON para preservar objetos Date e formatar erros do Zod.
- `caller.ts`: caller utilizado nos Server Components para executar procedures diretamente, sem requisições HTTP.

### Procedures disponíveis

| Procedure | Tipo | Descrição |
| --- | --- | --- |
| `tarefa.listar` | query | Listagem paginada por cursor (`limite`, `cursor`) |
| `tarefa.buscarPorId` | query | Busca uma tarefa pelo ID |
| `tarefa.criar` | mutation | Cria uma tarefa |
| `tarefa.atualizar` | mutation | Atualiza uma tarefa |
| `tarefa.deletar` | mutation | Remove uma tarefa |

Cada tarefa possui os seguintes campos:

- `id`: identificador único (UUID).
- `titulo`: título obrigatório.
- `descricao`: descrição opcional.
- `dataCriacao`: data de criação.

### Tratamento de erros

- `BAD_REQUEST`: quando o título está vazio ou contém apenas espaços. Retorna a mensagem "O título é obrigatório".
- `NOT_FOUND`: quando uma tarefa não existe. Retorna a mensagem "Tarefa não encontrada".

O schema do Zod, localizado em `src/schemas/tarefa.ts`, é compartilhado entre o frontend e o backend, centralizando as regras de validação.

### Frontend

O frontend utiliza Next.js com App Router e possui as seguintes rotas:

| Rota | Descrição |
| --- | --- |
| `/` | Listagem de tarefas |
| `/tarefas/nova` | Formulário de criação |
| `/tarefas/[id]/editar` | Formulário de edição |

Na listagem, a primeira página é carregada no servidor utilizando SSR e disponibilizada como `initialData` para o `useInfiniteQuery`.

As próximas páginas são carregadas conforme o usuário percorre a tela, utilizando IntersectionObserver, implementado no hook `src/hook/useInfiniteScroll.tsx`.

Na edição, a tarefa é buscada no servidor. Caso não exista, o usuário é direcionado para a página de não encontrado.

O formulário de criação e edição utiliza o mesmo componente, localizado em `src/components/form_tarefa`.

O estado do formulário é gerenciado com `useState`, e a validação é executada antes do envio. Caso o backend retorne algum erro, a mensagem é exibida no topo do formulário.

As operações de criação, edição e exclusão apresentam feedback por meio de toasts.

O provider de notificações está localizado no layout, permitindo que as mensagens permaneçam visíveis após o redirecionamento para a listagem.

## Funcionalidades

- Listagem de tarefas com SSR.
- Paginação com scroll infinito.
- Cadastro de tarefas.
- Edição de tarefas.
- Exclusão de tarefas.
- Validação compartilhada entre frontend e backend.
- Tratamento de erros.
- Notificações de sucesso e erro.
- Tipagem de ponta a ponta com tRPC.
- Reutilização de componentes.

## Estrutura do projeto

```text
src/
├── app/
├── components/
├── hook/
├── providers/
├── schemas/
├── server/
├── styles/
└── utils/
```

- `app/`: páginas e route handler do tRPC.
- `components/`: componentes organizados em pastas individuais, utilizando `index.tsx` e `styles.tsx`.
- `hook/`: hooks customizados.
- `providers/`: providers do tRPC, React Query e registry do Styled Components.
- `schemas/`: schemas do Zod e tipos das tarefas.
- `server/`: implementação do backend com tRPC.
- `styles/`: cores e estilos globais.
- `utils/`: client do tRPC e funções auxiliares.

## Observações

Como os dados são armazenados em memória, a paginação utiliza offset como cursor.

Em uma implementação com banco de dados, utilizaria um cursor baseado no ID ou na data de criação, evitando inconsistências na paginação quando uma tarefa é removida durante o scroll.

O sistema não possui autenticação, pois essa funcionalidade não faz parte do escopo do desafio.

## Autor

**Jadson Tavares Santos**

Desenvolvedor Full Stack — Brasil

- GitHub: https://github.com/TSjadness
- LinkedIn: https://www.linkedin.com/in/jadson-tavares-santos-7aba7b24b/
- Portfólio: https://jadsonts.vercel.app/
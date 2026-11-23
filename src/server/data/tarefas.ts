import { randomUUID } from "crypto";
import type { Tarefa, TarefaInput } from "@/schemas/tarefa";


const globalTarefas = globalThis as unknown as { tarefas?: Tarefa[] };

const tarefasIniciais = (): Tarefa[] => {
  const titulos = [
    "Atividades 1",
    "Atividades 2"

  ];

  const agora = Date.now();

  return titulos.map((titulo, index) => ({
    id: randomUUID(),
    titulo,
    descricao: index % 3 === 0 ? undefined : "Tarefa de exemplo para testar a listagem.",
    dataCriacao: new Date(agora - index * 1000 * 60 * 60),
  }));
};

if (!globalTarefas.tarefas) {
  globalTarefas.tarefas = tarefasIniciais();
}


// busca todas as tarefas
const getTarefas = () => globalTarefas.tarefas as Tarefa[];

export const listarTarefas = (cursor: number, limite: number) => {
  const ordenadas = [...getTarefas()].sort(
    (a, b) => b.dataCriacao.getTime() - a.dataCriacao.getTime()
  );

  const itens = ordenadas.slice(cursor, cursor + limite);
  const proximo = cursor + limite;

  return {
    itens,
    nextCursor: proximo < ordenadas.length ? proximo : undefined,
    total: ordenadas.length,
  };
};

// busca uma tarefa pelo id
export const buscarTarefa = (id: string) => {
  return getTarefas().find((tarefa) => tarefa.id === id);
};

export const criarTarefa = (dados: TarefaInput) => {
  const nova: Tarefa = {
    id: randomUUID(),
    titulo: dados.titulo,
    descricao: dados.descricao || undefined,
    dataCriacao: new Date(),
  };

  getTarefas().push(nova);
  return nova;
};


// atualiza uma tarefa pelo id
export const atualizarTarefa = (id: string, dados: TarefaInput) => {
  const tarefa = buscarTarefa(id);
  if (!tarefa) return null;

  tarefa.titulo = dados.titulo;
  tarefa.descricao = dados.descricao || undefined;

  return tarefa;
};


// deleta uma tarefa pelo id
export const deletarTarefa = (id: string) => {
  const tarefas = getTarefas();
  const index = tarefas.findIndex((tarefa) => tarefa.id === id);
  if (index === -1) return false;

  tarefas.splice(index, 1);
  return true;
};

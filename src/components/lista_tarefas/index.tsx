"use client";

import React, { useCallback, useState } from "react";
import { trpc, type RouterOutputs } from "@/utils/trpc";
import { useToast } from "../toast";
import { useInfiniteScroll } from "@/hook/useInfiniteScroll";
import { LIMITE_POR_PAGINA } from "@/utils/constants";
import CardTarefa from "../card_tarefa";
import { Contador, Lista, StatusMessage, Sentinel } from "./styles";

type PaginaTarefas = RouterOutputs["tarefa"]["listar"];

interface ListaTarefasProps {
  paginaInicial: PaginaTarefas;
}

const ListaTarefas: React.FC<ListaTarefasProps> = ({ paginaInicial }) => {
  const { showToast } = useToast();
  const utils = trpc.useUtils();
  const [deletandoId, setDeletandoId] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    trpc.tarefa.listar.useInfiniteQuery(
      { limite: LIMITE_POR_PAGINA },
      {
        getNextPageParam: (ultimaPagina) => ultimaPagina.nextCursor,
        initialData: { pages: [paginaInicial], pageParams: [null] },
      }
    );

  const deletarMutation = trpc.tarefa.deletar.useMutation({
    onMutate: ({ id }) => setDeletandoId(id),
    onSuccess: () => {
      showToast("Tarefa excluída com sucesso");
      utils.tarefa.listar.invalidate();
    },
    onError: (error) => {
      showToast(error.message || "Não foi possível excluir a tarefa", "erro");
    },
    onSettled: () => setDeletandoId(null),
  });

  const handleDelete = (id: string) => {
    if (!window.confirm("Deseja realmente excluir esta tarefa?")) return;
    deletarMutation.mutate({ id });
  };

  const carregarMais = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const sentinelRef = useInfiniteScroll({
    hasMore: !!hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: carregarMais,
  });

  const tarefas = data?.pages.flatMap((pagina) => pagina.itens) ?? [];
  const total = data?.pages[data.pages.length - 1]?.total ?? 0;

  if (tarefas.length === 0) {
    return <StatusMessage>Nenhuma tarefa cadastrada ainda.</StatusMessage>;
  }

  return (
    <>
      <Contador>
        Exibindo {tarefas.length} de {total} tarefas
      </Contador>

      <Lista>
        {tarefas.map((tarefa) => (
          <CardTarefa
            key={tarefa.id}
            tarefa={tarefa}
            deletando={deletandoId === tarefa.id}
            onDelete={handleDelete}
          />
        ))}
      </Lista>

      <Sentinel ref={sentinelRef} />

      {isFetchingNextPage && <StatusMessage>Carregando mais tarefas...</StatusMessage>}
      {isError && <StatusMessage $erro>Erro ao carregar as tarefas.</StatusMessage>}
      {!hasNextPage && tarefas.length > LIMITE_POR_PAGINA && (
        <StatusMessage>Todas as tarefas foram carregadas.</StatusMessage>
      )}
    </>
  );
};

export default ListaTarefas;

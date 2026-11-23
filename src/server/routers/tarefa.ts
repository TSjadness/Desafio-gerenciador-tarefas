import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { tarefaSchema } from "@/schemas/tarefa";
import {
  atualizarTarefa,
  buscarTarefa,
  criarTarefa,
  deletarTarefa,
  listarTarefas,
} from "../data/tarefas";

const idSchema = z.object({ id: z.string().min(1, "Id inválido") });

const tarefaNaoEncontrada = () =>
  new TRPCError({
    code: "NOT_FOUND",
    message: "Tarefa não encontrada",
  });

export const tarefaRouter = router({
  listar: publicProcedure
    .input(
      z.object({
        limite: z.number().min(1).max(50).default(10),
        cursor: z.number().min(0).nullish(),
      })
    )
    .query(({ input }) => {
      return listarTarefas(input.cursor ?? 0, input.limite);
    }),

  buscarPorId: publicProcedure.input(idSchema).query(({ input }) => {
    const tarefa = buscarTarefa(input.id);
    if (!tarefa) throw tarefaNaoEncontrada();

    return tarefa;
  }),

  criar: publicProcedure.input(tarefaSchema).mutation(({ input }) => {
    return criarTarefa(input);
  }),

  atualizar: publicProcedure
    .input(idSchema.extend({ dados: tarefaSchema }))
    .mutation(({ input }) => {
      const tarefa = atualizarTarefa(input.id, input.dados);
      if (!tarefa) throw tarefaNaoEncontrada();

      return tarefa;
    }),

  deletar: publicProcedure.input(idSchema).mutation(({ input }) => {
    const removida = deletarTarefa(input.id);
    if (!removida) throw tarefaNaoEncontrada();

    return { id: input.id };
  }),
});

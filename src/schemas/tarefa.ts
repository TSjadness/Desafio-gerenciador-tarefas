import { z } from "zod";

// Schema
export const tarefaSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(1, "O título é obrigatório")
    .max(100, "O título pode ter no máximo 100 caracteres"),
  descricao: z
    .string()
    .trim()
    .max(500, "A descrição pode ter no máximo 500 caracteres")
    .optional(),
});

export type TarefaInput = z.infer<typeof tarefaSchema>;

export type Tarefa = {
  id: string;
  titulo: string;
  descricao?: string;
  dataCriacao: Date;
};

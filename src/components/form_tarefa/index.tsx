"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/utils/trpc";
import { tarefaSchema, type Tarefa } from "@/schemas/tarefa";
import { useToast } from "../toast";
import Button from "../button";
import {
  Actions,
  CharCount,
  ErrorBox,
  ErrorText,
  Field,
  Form,
  Input,
  Label,
  TextArea,
} from "./styles";

interface FormTarefaProps {
  tarefa?: Tarefa;
}

type FormErros = {
  titulo?: string;
  descricao?: string;
};

const FormTarefa: React.FC<FormTarefaProps> = ({ tarefa }) => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const { showToast } = useToast();

  const isEdicao = !!tarefa;

  const [titulo, setTitulo] = useState(tarefa?.titulo ?? "");
  const [descricao, setDescricao] = useState(tarefa?.descricao ?? "");
  const [erros, setErros] = useState<FormErros>({});
  const [erroServidor, setErroServidor] = useState<string | null>(null);

  const onSuccess = () => {
    utils.tarefa.listar.invalidate();
    showToast(isEdicao ? "Tarefa atualizada com sucesso" : "Tarefa criada com sucesso");
    router.push("/");
    router.refresh();
  };

  const onError = (error: { message: string }) => {
    setErroServidor(error.message || "Ocorreu um erro ao salvar a tarefa");
    showToast("Não foi possível salvar a tarefa", "erro");
  };

  const criarMutation = trpc.tarefa.criar.useMutation({ onSuccess, onError });
  const atualizarMutation = trpc.tarefa.atualizar.useMutation({ onSuccess, onError });

  const salvando = criarMutation.isPending || atualizarMutation.isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErroServidor(null);

    // validacao schema
    const resultado = tarefaSchema.safeParse({
      titulo,
      descricao: descricao || undefined,
    });

    if (!resultado.success) {
      const novosErros: FormErros = {};
      resultado.error.issues.forEach((issue) => {
        const campo = issue.path[0] as keyof FormErros;
        if (!novosErros[campo]) novosErros[campo] = issue.message;
      });
      setErros(novosErros);
      return;
    }

    setErros({});

    if (isEdicao) {
      atualizarMutation.mutate({ id: tarefa.id, dados: resultado.data });
    } else {
      criarMutation.mutate(resultado.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      {erroServidor && <ErrorBox role="alert">{erroServidor}</ErrorBox>}

      <Field>
        <Label htmlFor="titulo">Título *</Label>
        <Input
          id="titulo"
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
            if (erros.titulo) setErros((prev) => ({ ...prev, titulo: undefined }));
          }}
          placeholder="Ex: Revisar relatório mensal"
          $erro={!!erros.titulo}
          maxLength={100}
          autoFocus
        />
        {erros.titulo && <ErrorText>{erros.titulo}</ErrorText>}
      </Field>

      <Field>
        <Label htmlFor="descricao">Descrição</Label>
        <TextArea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Detalhes da tarefa (opcional)"
          rows={5}
          $erro={!!erros.descricao}
          maxLength={500}
        />
        <CharCount>{descricao.length}/500</CharCount>
        {erros.descricao && <ErrorText>{erros.descricao}</ErrorText>}
      </Field>

      <Actions>
        <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={salvando}>
          Cancelar
        </Button>
        <Button type="submit" loading={salvando}>
          {isEdicao ? "Salvar alterações" : "Criar tarefa"}
        </Button>
      </Actions>
    </Form>
  );
};

export default FormTarefa;

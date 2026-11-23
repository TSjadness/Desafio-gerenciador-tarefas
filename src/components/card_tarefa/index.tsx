"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import Button from "../button";
import { formatarData } from "@/utils/formatarData";
import type { Tarefa } from "@/schemas/tarefa";
import { Actions, Card, Content, Data, Descricao, Titulo } from "./styles";

interface CardTarefaProps {
  tarefa: Tarefa;
  deletando: boolean;
  onDelete: (id: string) => void;
}

const CardTarefa: React.FC<CardTarefaProps> = ({ tarefa, deletando, onDelete }) => {
  return (
    <Card $deletando={deletando}>
      <Content>
        <Titulo>{tarefa.titulo}</Titulo>
        {tarefa.descricao && <Descricao>{tarefa.descricao}</Descricao>}
        <Data>
          <Calendar size={14} />
          {formatarData(tarefa.dataCriacao)}
        </Data>
      </Content>

      <Actions>
        <Link href={`/tarefas/${tarefa.id}/editar`}>
          <Button variant="outline" size="small" title="Editar tarefa">
            <Pencil size={14} />
            Editar
          </Button>
        </Link>

        <Button
          variant="danger"
          size="small"
          loading={deletando}
          onClick={() => onDelete(tarefa.id)}
          title="Excluir tarefa"
        >
          <Trash2 size={14} />
          Excluir
        </Button>
      </Actions>
    </Card>
  );
};

export default CardTarefa;

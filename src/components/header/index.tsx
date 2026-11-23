"use client";

import React from "react";
import Link from "next/link";
import { ListTodo, Plus } from "lucide-react";
import { Header, Inner, Logo, NovaTarefaLink } from "./styles";

const HeaderBar: React.FC = () => {
  return (
    <Header>
      <Inner>
        <Link href="/">
          <Logo>
            <ListTodo size={22} />
            Tarefas
          </Logo>
        </Link>

        <NovaTarefaLink href="/tarefas/nova">
          <Plus size={18} />
          Nova tarefa
        </NovaTarefaLink>
      </Inner>
    </Header>
  );
};

export default HeaderBar;

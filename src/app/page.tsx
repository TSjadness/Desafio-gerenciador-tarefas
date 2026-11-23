import { serverCaller } from "@/server/caller";
import ListaTarefas from "@/components/lista_tarefas";
import { LIMITE_POR_PAGINA } from "@/utils/constants";
import { Container, PageTitle } from "@/styles/global";


export const dynamic = "force-dynamic";

export default async function Home() {
  const paginaInicial = await serverCaller.tarefa.listar({ limite: LIMITE_POR_PAGINA });

  return (
    <Container>
      <PageTitle>Minhas tarefas</PageTitle>

      {/* lista de tarefas, passando a página inicial como prop */}
      <ListaTarefas paginaInicial={paginaInicial} />
    </Container>
  );
}

import { notFound } from "next/navigation";
import { TRPCError } from "@trpc/server";
import { serverCaller } from "@/server/caller";
import FormTarefa from "@/components/form_tarefa";
import { Container, PageTitle } from "@/styles/global";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditarTarefa({ params }: Props) {
  const { id } = await params;

  try {
    const tarefa = await serverCaller.tarefa.buscarPorId({ id });

    return (
      <Container>
        <PageTitle>Editar tarefa</PageTitle>
        <FormTarefa tarefa={tarefa} />
      </Container>
    );
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") {
      notFound();
    }
    throw error;
  }
}

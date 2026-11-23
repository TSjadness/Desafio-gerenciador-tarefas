import Link from "next/link";
import { Container, PageTitle, TextMuted } from "@/styles/global";

export default function NotFound() {
  return (
    <Container>
      <PageTitle>Tarefa não encontrada</PageTitle>
      <TextMuted>
        A tarefa que você tentou acessar não existe ou já foi excluída.{" "}
        <Link href="/" style={{ textDecoration: "underline" }}>
          Voltar para a listagem
        </Link>
      </TextMuted>
    </Container>
  );
}

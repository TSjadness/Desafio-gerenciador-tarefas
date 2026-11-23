import FormTarefa from "@/components/form_tarefa";
import { Container, PageTitle } from "@/styles/global";

export default function NovaTarefa() {
  return (
    <Container>
      <PageTitle>Nova tarefa</PageTitle>
      <FormTarefa />
    </Container>
  );
}

"use client";

import Button from "@/components/button";
import { Container, PageTitle, TextMuted } from "@/styles/global";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container>
      <PageTitle>Algo deu errado</PageTitle>
      <TextMuted style={{ marginBottom: "1rem" }}>
        Não foi possível carregar esta página.
      </TextMuted>
      <Button onClick={reset}>Tentar novamente</Button>
    </Container>
  );
}

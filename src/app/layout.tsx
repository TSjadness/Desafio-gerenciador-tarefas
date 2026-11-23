import type { Metadata } from "next";
import StyledRegistry from "@/providers/StyledRegistry";
import TrpcProvider from "@/providers/TrpcProvider";
import { ToastProvider } from "@/components/toast";
import HeaderBar from "@/components/header";
import { GlobalStyle } from "@/styles/global";

export const metadata: Metadata = {
  title: "Gerenciador de Tarefas",
  description: "Sistema simples de gerenciamento de tarefas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledRegistry>
          <GlobalStyle />
          <TrpcProvider>
            <ToastProvider>
              <HeaderBar />
              {children}
            </ToastProvider>
          </TrpcProvider>
        </StyledRegistry>
      </body>
    </html>
  );
}

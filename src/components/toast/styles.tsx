import styled, { keyframes } from "styled-components";
import color from "@/styles/colors";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 100;

  @media (max-width: 768px) {
    left: 1rem;
    right: 1rem;
  }
`;

interface ToastItemProps {
  $tipo: "sucesso" | "erro";
}

export const ToastItem = styled.div<ToastItemProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  min-width: 260px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-out;

  background-color: ${({ $tipo }) => ($tipo === "sucesso" ? color.greenLight : color.redLight)};
  color: ${({ $tipo }) => ($tipo === "sucesso" ? color.green : color.red)};
  border: 1px solid ${({ $tipo }) => ($tipo === "sucesso" ? color.green : color.red)};
`;

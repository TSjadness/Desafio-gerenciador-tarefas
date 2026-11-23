import styled from "styled-components";
import color from "@/styles/colors";

interface CardProps {
  $deletando?: boolean;
}

export const Card = styled.li<CardProps>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.1rem 1.25rem;
  background-color: ${color.white};
  border: 1px solid ${color.grayBorder};
  border-radius: 8px;
  list-style: none;
  transition: opacity 0.2s ease;
  opacity: ${({ $deletando }) => ($deletando ? 0.5 : 1)};

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;
`;

export const Titulo = styled.h3`
  font-size: 1.05rem;
  color: ${color.black};
  word-break: break-word;
`;

export const Descricao = styled.p`
  font-size: 0.92rem;
  color: ${color.grayDark};
  word-break: break-word;
`;

export const Data = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: ${color.grayMedium};
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

import styled from "styled-components";
import color from "@/styles/colors";

export const Lista = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Contador = styled.p`
  font-size: 0.85rem;
  color: ${color.grayMedium};
  margin-bottom: 0.75rem;
`;

interface StatusMessageProps {
  $erro?: boolean;
}

export const StatusMessage = styled.p<StatusMessageProps>`
  text-align: center;
  padding: 1.5rem 0;
  font-size: 0.95rem;
  color: ${({ $erro }) => ($erro ? color.red : color.grayMedium)};
`;

export const Sentinel = styled.div`
  height: 1px;
`;

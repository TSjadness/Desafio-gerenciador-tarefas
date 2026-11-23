import styled, { css } from "styled-components";
import color from "@/styles/colors";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background-color: ${color.white};
  border: 1px solid ${color.grayBorder};
  border-radius: 8px;
  padding: 1.5rem;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${color.grayDark};
`;

interface InputProps {
  $erro?: boolean;
}

const inputBase = css<InputProps>`
  width: 100%;
  padding: 0.7rem 0.85rem;
  font-size: 0.95rem;
  font-family: inherit;
  border-radius: 6px;
  border: 1px solid ${({ $erro }) => ($erro ? color.red : color.grayBorder)};
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ $erro }) => ($erro ? color.red : color.primary)};
  }
`;

export const Input = styled.input<InputProps>`
  ${inputBase}
`;

export const TextArea = styled.textarea<InputProps>`
  ${inputBase}
  resize: vertical;
`;

export const CharCount = styled.span`
  font-size: 0.75rem;
  color: ${color.grayMedium};
  align-self: flex-end;
`;

export const ErrorText = styled.span`
  font-size: 0.82rem;
  color: ${color.red};
`;

export const ErrorBox = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background-color: ${color.redLight};
  color: ${color.red};
  font-size: 0.9rem;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

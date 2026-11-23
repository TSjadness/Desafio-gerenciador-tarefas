import styled, { css } from "styled-components";
import color from "@/styles/colors";

interface StyledButtonProps {
  $variant: "primary" | "outline" | "danger";
  $size: "small" | "medium";
}

const variants = {
  primary: css`
    background-color: ${color.primary};
    color: ${color.white};
    border: 1px solid ${color.primary};

    &:hover:not(:disabled) {
      background-color: ${color.primaryDark};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${color.grayDark};
    border: 1px solid ${color.grayBorder};

    &:hover:not(:disabled) {
      background-color: ${color.grayLight};
    }
  `,
  danger: css`
    background-color: transparent;
    color: ${color.red};
    border: 1px solid ${color.red};

    &:hover:not(:disabled) {
      background-color: ${color.redLight};
    }
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  padding: ${({ $size }) => ($size === "small" ? "0.4rem 0.75rem" : "0.65rem 1.25rem")};
  font-size: ${({ $size }) => ($size === "small" ? "0.85rem" : "0.95rem")};

  ${({ $variant }) => variants[$variant]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

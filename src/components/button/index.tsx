"use client";

import React from "react";
import { StyledButton } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "danger";
  size?: "small" | "medium";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <StyledButton $variant={variant} $size={size} disabled={disabled || loading} {...props}>
      {loading ? "Aguarde..." : children}
    </StyledButton>
  );
};

export default Button;

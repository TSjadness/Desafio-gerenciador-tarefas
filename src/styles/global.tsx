"use client";

import styled, { createGlobalStyle } from "styled-components";
import color from "./colors";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background-color: ${color.grayLight};
    color: ${color.black};
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const Container = styled.main`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  color: ${color.black};
`;

export const TextMuted = styled.p`
  color: ${color.grayMedium};
  font-size: 0.95rem;
`;

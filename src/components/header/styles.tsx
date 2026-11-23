import styled from "styled-components";
import Link from "next/link";
import color from "@/styles/colors";

export const Header = styled.header`
  background-color: ${color.white};
  border-bottom: 1px solid ${color.grayBorder};
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const Inner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const Logo = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: ${color.primary};
`;

export const NovaTarefaLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background-color: ${color.primary};
  color: ${color.white};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${color.primaryDark};
  }
`;

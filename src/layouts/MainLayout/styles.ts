import styled from "styled-components";

export const MainLayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;

  background-color: ${({ theme }) => theme.COLORS["amber-950"]};

  min-height: 100dvh;
`;

export const Cover = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 5rem;

  padding: 2rem;

  border-radius: 8px;
  background: ${(props) => props.theme.COLORS["amber-200"]};

  height: calc(100vh - 8rem);
  max-width: 96rem;
`;

export const OutletContainer = styled.main`
  width: 100%;
  height: 100%;
`;

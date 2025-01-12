import styled from "styled-components";

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  background-color: ${({ theme }) => theme.COLORS["amber-200"]};

  height: 100dvh;
`;

export const Label = styled.span`
  color: ${({ theme }) => theme.COLORS["amber-950"]};
  font-size: 14px;
  font-weight: 700;
`;

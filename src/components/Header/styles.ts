import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SignOutButton = styled.button`
  margin: 1rem;

  color: ${({ theme }) => theme.COLORS["red-500"]};
  line-height: 0;

  cursor: pointer;
`;

export const Logo = styled.img`
  width: 200px;
`;

import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  border: 1px solid rgba(253, 230, 138, 1);
  padding: 1rem;

  border-radius: 16px;
  background-color: rgba(253, 230, 138, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);

  width: 32.5rem;

  -webkit-backdrop-filter: blur(20px);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;

  label {
    color: ${({ theme }) => theme.COLORS.white};
    font-size: 1.2rem;
  }
`;

export const FormInput = styled.input`
  padding: 0.8rem;

  border-radius: 16px;

  color: ${({ theme }) => theme.COLORS["yellow-950"]};

  background-color: rgba(253, 230, 138, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

export const FormSubmitButton = styled.button`
  position: relative;

  padding: 0.8rem;

  border-radius: 16px;

  color: ${({ theme }) => theme.COLORS.white};

  &:hover {
    cursor: pointer;
  }

  &::before {
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;

    border-radius: 16px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.COLORS["yellow-300"]},
      ${({ theme }) => theme.COLORS["yellow-600"]},
      ${({ theme }) => theme.COLORS["yellow-900"]}
    );
    opacity: 1;

    width: 100%;
    height: 100%;

    transition: opacity 0.5s linear;

    content: "";
  }

  &:hover::before {
    opacity: 0;
  }

  &::after {
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;

    border-radius: 16px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.COLORS["yellow-900"]},
      ${({ theme }) => theme.COLORS["yellow-600"]},
      ${({ theme }) => theme.COLORS["yellow-300"]}
    );
    opacity: 0;

    width: 100%;
    height: 100%;

    transition: opacity 0.5s linear;

    content: "";
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: center;

  span {
    display: flex;
    gap: 0.5rem;

    color: ${({ theme }) => theme.COLORS.white};
  }
`;

export const Link = styled(NavLink)`
  color: ${({ theme }) => theme.COLORS["yellow-200"]};

  &:hover {
    text-decoration: underline;

    text-underline-offset: 0.2rem;
  }
`;

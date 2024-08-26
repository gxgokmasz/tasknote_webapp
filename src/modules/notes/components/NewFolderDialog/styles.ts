import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const NewFolderDialogContainer = styled(Dialog.Portal)``;

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;

  background-color: rgba(0, 0, 0, 0.75);

  width: 100vw;
  height: 100vh;
`;

export const DialogContent = styled(Dialog.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 1px solid rgba(253, 230, 138, 1);
  padding: 1rem;

  border-radius: 16px;
  background-color: rgba(253, 230, 138, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  width: 32.5rem;

  -webkit-backdrop-filter: blur(10px);
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
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

export const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  line-height: 0;

  cursor: pointer;
`;

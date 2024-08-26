import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import styled from "styled-components";

export const NewNoteDialogContainer = styled(Dialog.Portal)``;

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
  display: flex;
  flex-direction: column;

  border: 1px solid rgba(253, 230, 138, 1);
  padding: 1rem;

  border-radius: 16px;
  background-color: rgba(253, 230, 138, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  width: 32.5rem;

  -webkit-backdrop-filter: blur(10px);

  & + div {
    position: absolute !important;
    z-index: 1;
    left: 50% !important;
    transform: translateX(-50%);
  }
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

export const FormSelectButton = styled(Select.Trigger)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 0.8rem;

  border-radius: 16px;

  color: ${({ theme }) => theme.COLORS["yellow-950"]};

  background-color: rgba(253, 230, 138, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  appearance: none;

  cursor: pointer;
`;

export const SelectGroup = styled(Select.Group)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SelectIcon = styled(Select.Icon)`
  display: flex;
`;

export const SelectPortal = styled(Select.Portal)``;

export const SelectContent = styled(Select.Content)`
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS["amber-200"]};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

export const SelectViewport = styled(Select.Viewport)`
  padding: 5px;
`;

export const SelectLabel = styled(Select.Label)`
  margin-bottom: 1rem;

  color: ${({ theme }) => theme.COLORS["yellow-950"]};
  font-size: 1.25rem;
`;

export const SelectItem = styled(Select.Item)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 35px 0 25px;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS["amber-500"]};

  height: 25px;

  color: ${({ theme }) => theme.COLORS["yellow-950"]};
  font-size: 1rem;

  user-select: none;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS["amber-400"]};
    transition: background-color 0.3s;
  }
`;

export const ItemText = styled(Select.ItemText)``;

export const ItemIndicator = styled(Select.ItemIndicator)`
  display: flex;
  align-items: center;

  line-height: 0;
`;

export const FormTextArea = styled.textarea`
  padding: 0.8rem;

  border-radius: 16px;

  color: ${({ theme }) => theme.COLORS["yellow-950"]};

  background-color: rgba(253, 230, 138, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  height: 16rem;

  resize: none;
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

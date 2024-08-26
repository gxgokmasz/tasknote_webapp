import * as ScrollArea from "@radix-ui/react-scroll-area";
import styled from "styled-components";

export const NotesScrollAreaContainer = styled(ScrollArea.Root)`
  position: absolute !important;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding: 1rem;
  padding-right: 3rem;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS["amber-950"]};
  box-shadow: 0 2px 10px ${({ theme }) => theme.COLORS["amber-950"]};
  overflow: hidden;

  width: 100%;
  height: 100%;
`;

export const ScrollAreaTitle = styled.div`
  display: flex;
  justify-content: space-between;

  h1 {
    color: ${({ theme }) => theme.COLORS["yellow-200"]};
    font-size: 1.5rem;
  }
`;

export const NewNoteButton = styled.button`
  color: ${({ theme }) => theme.COLORS["yellow-200"]};
  line-height: 0;

  cursor: pointer;
`;

export const ScrollAreaViewport = styled(ScrollArea.Viewport)`
  width: 100%;
  height: 100%;
`;

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const NoteItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.COLORS["amber-500"]};

  word-break: break-all;

  cursor: pointer;
`;

export const DeleteButton = styled.button`
  display: flex;

  margin-left: 1rem;

  color: ${({ theme }) => theme.COLORS["yellow-200"]};

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.COLORS["red-500"]};
  }
`;

export const Scrollbar = styled(ScrollArea.Scrollbar)`
  padding: 1rem;

  background-color: ${({ theme }) => theme.COLORS["amber-700"]};
`;

export const ScrollbarThumb = styled(ScrollArea.Thumb)`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.COLORS["amber-100"]};

  min-width: 0.5rem;
`;

import { PiFilePlus, PiTrash } from "react-icons/pi";
import { toast } from "react-toastify";

import { useToggle } from "../../../../hooks/useToggle";
import { useAuthenticationState } from "../../../authentication/hooks/useAuthenticationState";
import { useNotesState } from "../../hooks/useNotesState";
import { deleteNote } from "../../services";
import { NewNoteDialog } from "../NewNoteDialog";
import { UpdateNoteDialog } from "../UpdateNoteDialog";
import * as Styled from "./styles";

export const NotesScrollArea = () => {
  const [{ activeFolder, activeNote, notes, folders }, { executeRemoveNote, handleActivateNote }] =
    useNotesState();
  const { user } = useAuthenticationState({ onlyStates: true });

  const [isNewNoteDialogOpen, handleChangeNewNoteDialogVisibility] = useToggle(false);
  const [isUpdateNoteDialogOpen, handleChangeUpdateNoteDialogVisibility] = useToggle(false);

  const filteredFolders = folders.filter((folder) => folder.user == user?.id);
  const foldersIds = filteredFolders.map((folder) => folder.id);
  const filteredNotes = activeFolder
    ? notes.filter((note) => note.folder == activeFolder.id)
    : notes.filter((note) => foldersIds.includes(note.folder));

  const handleDeleteNote = async (noteUUID: string) => {
    toast.dismiss();

    const response = await toast.promise(deleteNote(noteUUID), {
      pending: "Carregando",
    });

    if (response.status == 204) {
      toast.success("Anotação deletada com sucesso!");
      executeRemoveNote(noteUUID);
    }
  };

  return (
    <Styled.NotesScrollAreaContainer type="always">
      <Styled.ScrollAreaTitle className="Text">
        <h1>
          Pasta atual: <span>{activeFolder ? activeFolder.name : "Tudo"}</span>
        </h1>

        <Styled.NewNoteButton
          title="Adicionar anotação"
          onClick={handleChangeNewNoteDialogVisibility}
        >
          <PiFilePlus size={24} />
        </Styled.NewNoteButton>

        {isNewNoteDialogOpen && (
          <NewNoteDialog
            isDialogOpen={isNewNoteDialogOpen}
            handleChangeDialogVisibility={handleChangeNewNoteDialogVisibility}
          />
        )}

        {isUpdateNoteDialogOpen && activeNote && (
          <UpdateNoteDialog
            isDialogOpen={isUpdateNoteDialogOpen}
            handleChangeDialogVisibility={handleChangeUpdateNoteDialogVisibility}
            note={activeNote}
          />
        )}
      </Styled.ScrollAreaTitle>

      <Styled.ScrollAreaViewport>
        <Styled.ItemsWrapper>
          {filteredNotes.map((note) => (
            <Styled.NoteItem
              key={note.id}
              onClick={() => {
                handleActivateNote(note);
                handleChangeUpdateNoteDialogVisibility();
              }}
            >
              {note.title}

              <Styled.DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNote(note.slug);
                }}
              >
                <PiTrash size={24} />
              </Styled.DeleteButton>
            </Styled.NoteItem>
          ))}
        </Styled.ItemsWrapper>
      </Styled.ScrollAreaViewport>
      <Styled.Scrollbar>
        <Styled.ScrollbarThumb />
      </Styled.Scrollbar>
    </Styled.NotesScrollAreaContainer>
  );
};

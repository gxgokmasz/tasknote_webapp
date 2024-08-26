import { PiFolderPlus, PiPen, PiTrash } from "react-icons/pi";
import { toast } from "react-toastify";

import { useToggle } from "../../../../hooks/useToggle";
import { useAuthenticationState } from "../../../authentication/hooks/useAuthenticationState";
import { useNotesState } from "../../hooks/useNotesState";
import { deleteFolder } from "../../services";
import { NewFolderDialog } from "../NewFolderDialog";
import { UpdateFolderDialog } from "../UpdateFolderDialog";
import * as Styled from "./styles";

export const FoldersScrollArea = () => {
  const [{ folders, activeFolder }, { handleActivateFolder, executeRemoveFolder }] =
    useNotesState();
  const { user } = useAuthenticationState({ onlyStates: true });

  const [isNewFolderDialogOpen, handleChangeNewFolderDialogVisibility] = useToggle(false);
  const [isUpdateFolderDialogOpen, handleChangeUpdateFolderDialogVisibility] = useToggle(false);

  const filteredFolders = folders.filter((folder) => folder.user == user?.id);

  const handleDeleteFolder = async (folderUUID: string) => {
    toast.dismiss();

    const response = await toast.promise(deleteFolder(folderUUID), {
      pending: "Carregando",
    });

    if (response.status == 204) {
      toast.success("Pasta deletada com sucesso!");
      executeRemoveFolder(folderUUID);
    }
  };

  return (
    <Styled.FoldersScrollAreaContainer type="always">
      <Styled.ScrollAreaTitle className="Text">
        <h1>Pastas</h1>

        <Styled.NewFolderButton
          title="Adicionar pasta"
          onClick={handleChangeNewFolderDialogVisibility}
        >
          <PiFolderPlus size={24} />
        </Styled.NewFolderButton>

        {isNewFolderDialogOpen && (
          <NewFolderDialog
            isDialogOpen={isNewFolderDialogOpen}
            handleChangeDialogVisibility={handleChangeNewFolderDialogVisibility}
          />
        )}

        {isUpdateFolderDialogOpen && activeFolder && (
          <UpdateFolderDialog
            isDialogOpen={isUpdateFolderDialogOpen}
            handleChangeDialogVisibility={handleChangeUpdateFolderDialogVisibility}
            folder={activeFolder}
          />
        )}
      </Styled.ScrollAreaTitle>

      <Styled.ScrollAreaViewport>
        <Styled.ItemsWrapper>
          <Styled.FolderItem
            onClick={() => handleActivateFolder(null)}
            $isActive={activeFolder == null}
            $size="medium"
          >
            Tudo
          </Styled.FolderItem>
          {filteredFolders.map((folder) => (
            <Styled.FolderItem
              key={folder.id}
              onClick={() => handleActivateFolder(folder)}
              $isActive={activeFolder ? activeFolder.id == folder.id : false}
            >
              {folder.name}

              <Styled.ButtonsContainer>
                <Styled.UpdateButton onClick={handleChangeUpdateFolderDialogVisibility}>
                  <PiPen size={24} />
                </Styled.UpdateButton>

                <Styled.DeleteButton onClick={() => handleDeleteFolder(folder.slug)}>
                  <PiTrash size={24} />
                </Styled.DeleteButton>
              </Styled.ButtonsContainer>
            </Styled.FolderItem>
          ))}
        </Styled.ItemsWrapper>
      </Styled.ScrollAreaViewport>
      <Styled.Scrollbar>
        <Styled.ScrollbarThumb />
      </Styled.Scrollbar>
    </Styled.FoldersScrollAreaContainer>
  );
};

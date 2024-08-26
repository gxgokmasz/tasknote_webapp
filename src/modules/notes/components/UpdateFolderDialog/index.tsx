import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { PiX } from "react-icons/pi";
import { toast } from "react-toastify";
import { z } from "zod";

import { useIdentifier } from "../../../../hooks/useIdentifier";
import { useAuthenticationState } from "../../../authentication/hooks/useAuthenticationState";
import { Folder } from "../../@types";
import { useNotesState } from "../../hooks/useNotesState";
import { putFolder } from "../../services";
import * as Styled from "./styles";

const updateFolderFormSchema = z.object({
  name: z.string().min(1, "O campo nome não pode estar vazio"),
});

type UpdateFolderData = z.infer<typeof updateFolderFormSchema>;

interface UpdateFolderDialogProps {
  isDialogOpen: boolean;
  handleChangeDialogVisibility: () => void;
  folder: Folder;
}

export const UpdateFolderDialog = ({
  isDialogOpen,
  handleChangeDialogVisibility,
  folder,
}: UpdateFolderDialogProps) => {
  const { handleSubmit, register, reset } = useForm<UpdateFolderData>({
    resolver: zodResolver(updateFolderFormSchema),
    defaultValues: {
      name: folder.name,
    },
  });

  const { executeUpdateFolder } = useNotesState({ onlyActions: true });
  const { user } = useAuthenticationState({ onlyStates: true });

  const [nameId] = useIdentifier(["name"]);

  const handleUpdateFolder = async (data: UpdateFolderData) => {
    const { name } = data;

    toast.dismiss();

    const response = await toast.promise(putFolder(folder.slug, name, user!.id), {
      pending: "Carregando",
    });

    if (response.data) {
      toast.success("Pasta atualizada com sucesso!");
      executeUpdateFolder(response.data);
      reset();
      handleChangeDialogVisibility();

      return;
    }

    if (response.error.data) {
      const errors = response.error.data;

      Object.values(errors).forEach((value) => {
        if (Array.isArray(value)) {
          value.forEach((error) => toast.error(error));
        } else if (typeof value == "string") {
          toast.error(value);
        }
      });

      return;
    }
  };

  return (
    <Dialog.Root open={isDialogOpen}>
      <Styled.UpdateFolderDialogContainer>
        <Styled.Overlay onClick={handleChangeDialogVisibility} />

        <Styled.DialogContent>
          <Styled.FormContainer
            onSubmit={handleSubmit(handleUpdateFolder, (errors) => {
              Object.values(errors).forEach((error) => {
                toast.error(error.message);
              });

              return;
            })}
          >
            <Styled.FormGroup>
              <Styled.CloseContainer>
                <Dialog.Close asChild>
                  <Styled.CloseButton
                    title="Fechar"
                    onClick={handleChangeDialogVisibility}
                  >
                    <PiX size={24} />
                  </Styled.CloseButton>
                </Dialog.Close>
              </Styled.CloseContainer>
            </Styled.FormGroup>

            <Styled.FormGroup>
              <label htmlFor={nameId}>Nome da pasta:</label>
              <Styled.FormInput
                type="text"
                required
                id={nameId}
                maxLength={60}
                {...register("name")}
              />
            </Styled.FormGroup>

            <Styled.FormGroup>
              <Styled.FormSubmitButton type="submit">Salvar</Styled.FormSubmitButton>
            </Styled.FormGroup>
          </Styled.FormContainer>
        </Styled.DialogContent>
      </Styled.UpdateFolderDialogContainer>
    </Dialog.Root>
  );
};

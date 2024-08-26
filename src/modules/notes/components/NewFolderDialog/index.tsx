import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { PiX } from "react-icons/pi";
import { toast } from "react-toastify";
import { z } from "zod";

import { useIdentifier } from "../../../../hooks/useIdentifier";
import { useAuthenticationState } from "../../../authentication/hooks/useAuthenticationState";
import { useNotesState } from "../../hooks/useNotesState";
import { postFolder } from "../../services";
import * as Styled from "./styles";

const newFolderFormSchema = z.object({
  name: z.string().min(1, "O campo nome não pode estar vazio"),
});

type NewFolderData = z.infer<typeof newFolderFormSchema>;

interface NewFolderDialogProps {
  isDialogOpen: boolean;
  handleChangeDialogVisibility: () => void;
}

export const NewFolderDialog = ({
  isDialogOpen,
  handleChangeDialogVisibility,
}: NewFolderDialogProps) => {
  const { handleSubmit, register, reset } = useForm<NewFolderData>({
    resolver: zodResolver(newFolderFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { executeAddFolder } = useNotesState({ onlyActions: true });
  const { user } = useAuthenticationState({ onlyStates: true });

  const [nameId] = useIdentifier(["name"]);

  const handleCreateFolder = async (data: NewFolderData) => {
    const { name } = data;

    toast.dismiss();

    const response = await toast.promise(postFolder(name, user!.id), {
      pending: "Carregando",
    });

    if (response.data) {
      toast.success("Pasta criada com sucesso!");
      executeAddFolder(response.data);
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
      <Styled.NewFolderDialogContainer>
        <Styled.Overlay onClick={handleChangeDialogVisibility} />

        <Styled.DialogContent>
          <Styled.FormContainer
            onSubmit={handleSubmit(handleCreateFolder, (errors) => {
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
              <Styled.FormSubmitButton type="submit">Criar pasta</Styled.FormSubmitButton>
            </Styled.FormGroup>
          </Styled.FormContainer>
        </Styled.DialogContent>
      </Styled.NewFolderDialogContainer>
    </Dialog.Root>
  );
};

import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import * as Select from "@radix-ui/react-select";
import { Controller, useForm } from "react-hook-form";
import { PiArrowDown, PiArrowUp, PiCheckCircleDuotone, PiX } from "react-icons/pi";
import { TbChevronDown } from "react-icons/tb";
import { toast } from "react-toastify";
import { z } from "zod";

import { useIdentifier } from "../../../../hooks/useIdentifier";
import { useAuthenticationState } from "../../../authentication/hooks/useAuthenticationState";
import { useNotesState } from "../../hooks/useNotesState";
import { postNote } from "../../services";
import * as Styled from "./styles";

const newNoteFormSchema = z.object({
  title: z.string().min(1, "O campo título não pode estar vazio"),
  folder: z.string().min(1, "Selecione uma pasta"),
  content: z.string().min(1, "O campo conteúdo não pode estar vazio"),
});

type NewNoteData = z.infer<typeof newNoteFormSchema>;

interface NewNoteDialogProps {
  isDialogOpen: boolean;
  handleChangeDialogVisibility: () => void;
}

export const NewNoteDialog = ({
  isDialogOpen,
  handleChangeDialogVisibility,
}: NewNoteDialogProps) => {
  const { handleSubmit, register, reset, control } = useForm<NewNoteData>({
    resolver: zodResolver(newNoteFormSchema),
    defaultValues: {
      title: "",
      folder: "",
      content: "",
    },
  });

  const { user } = useAuthenticationState({ onlyStates: true });
  const [{ folders }, { executeAddNote }] = useNotesState();
  const filteredFolders = folders.filter((folder) => folder.user == user?.id);

  const [titleId, folderId, contentId] = useIdentifier(["name", "folder", "content"]);

  const handleCreateNote = async (data: NewNoteData) => {
    const { title, folder, content } = data;

    toast.dismiss();

    const response = await toast.promise(postNote(title, parseInt(folder), content), {
      pending: "Carregando",
    });

    if (response.data) {
      toast.success("Anotação criada com sucesso!");
      executeAddNote(response.data);
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
      <Styled.NewNoteDialogContainer>
        <Styled.Overlay onClick={handleChangeDialogVisibility} />

        <Styled.DialogContent>
          <Styled.FormContainer
            onSubmit={handleSubmit(handleCreateNote, (errors) => {
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
              <label htmlFor={titleId}>Título da anotação:</label>
              <Styled.FormInput
                type="text"
                required
                id={titleId}
                maxLength={60}
                {...register("title")}
              />
            </Styled.FormGroup>

            <Styled.FormGroup>
              <label htmlFor={folderId}>Pasta:</label>
              <Controller
                control={control}
                name="folder"
                render={({ field }) => (
                  <Select.Root onValueChange={field.onChange}>
                    <Styled.FormSelectButton>
                      <Select.Value placeholder="Selecione uma pasta..." />
                      <Styled.SelectIcon>
                        <TbChevronDown />
                      </Styled.SelectIcon>
                    </Styled.FormSelectButton>
                    <Styled.SelectPortal>
                      <Styled.SelectContent>
                        <Select.ScrollUpButton>
                          <PiArrowUp />
                        </Select.ScrollUpButton>

                        <Styled.SelectViewport>
                          <Styled.SelectGroup>
                            <Styled.SelectLabel>Pastas</Styled.SelectLabel>
                            {filteredFolders.map((folder) => (
                              <Styled.SelectItem
                                key={folder.id}
                                value={`${folder.id}`}
                                onClick={(e) => e.isPropagationStopped()}
                              >
                                <Styled.ItemText>{folder.name}</Styled.ItemText>
                                <Styled.ItemIndicator>
                                  <PiCheckCircleDuotone size={16} />
                                </Styled.ItemIndicator>
                              </Styled.SelectItem>
                            ))}
                          </Styled.SelectGroup>
                        </Styled.SelectViewport>

                        <Select.ScrollDownButton>
                          <PiArrowDown />
                        </Select.ScrollDownButton>
                      </Styled.SelectContent>
                    </Styled.SelectPortal>
                  </Select.Root>
                )}
              />
            </Styled.FormGroup>

            <Styled.FormGroup>
              <label htmlFor={contentId}>Corpo da anotação:</label>
              <Styled.FormTextArea
                required
                id={contentId}
                {...register("content")}
              />
            </Styled.FormGroup>

            <Styled.FormGroup>
              <Styled.FormSubmitButton type="submit">Criar anotação</Styled.FormSubmitButton>
            </Styled.FormGroup>
          </Styled.FormContainer>
        </Styled.DialogContent>
      </Styled.NewNoteDialogContainer>
    </Dialog.Root>
  );
};

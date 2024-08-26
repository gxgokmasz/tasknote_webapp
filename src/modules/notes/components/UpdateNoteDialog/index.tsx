import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { PiX } from "react-icons/pi";
import { toast } from "react-toastify";
import { z } from "zod";

import { useIdentifier } from "../../../../hooks/useIdentifier";
import { Note } from "../../@types";
import { useNotesState } from "../../hooks/useNotesState";
import { putNote } from "../../services";
import * as Styled from "./styles";

const updateNoteFormSchema = z.object({
  title: z.string().min(1, "O campo título não pode estar vazio"),
  content: z.string().min(1, "O campo conteúdo não pode estar vazio"),
});

type UpdateNoteData = z.infer<typeof updateNoteFormSchema>;

interface UpdateNoteDialogProps {
  isDialogOpen: boolean;
  handleChangeDialogVisibility: () => void;
  note: Note;
}

export const UpdateNoteDialog = ({
  isDialogOpen,
  handleChangeDialogVisibility,
  note,
}: UpdateNoteDialogProps) => {
  const { handleSubmit, register, reset } = useForm<UpdateNoteData>({
    resolver: zodResolver(updateNoteFormSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });

  const { executeUpdateNote } = useNotesState({ onlyActions: true });

  const [titleId, contentId] = useIdentifier(["name", "content"]);

  const handleUpdateNote = async (data: UpdateNoteData) => {
    const { title, content } = data;

    toast.dismiss();

    const response = await toast.promise(putNote(note.slug, title, note.folder, content), {
      pending: "Carregando",
    });

    if (response.data) {
      toast.success("Anotação atualizada com sucesso!");
      executeUpdateNote(response.data);
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
      <Styled.UpdateNoteDialogContainer>
        <Styled.Overlay onClick={handleChangeDialogVisibility} />

        <Styled.DialogContent>
          <Styled.FormContainer
            onSubmit={handleSubmit(handleUpdateNote, (errors) => {
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
              <label htmlFor={contentId}>Corpo da anotação:</label>
              <Styled.FormTextArea
                required
                id={contentId}
                {...register("content")}
              />
            </Styled.FormGroup>

            <Styled.FormGroup>
              <Styled.FormSubmitButton type="submit">Salvar</Styled.FormSubmitButton>
            </Styled.FormGroup>
          </Styled.FormContainer>
        </Styled.DialogContent>
      </Styled.UpdateNoteDialogContainer>
    </Dialog.Root>
  );
};

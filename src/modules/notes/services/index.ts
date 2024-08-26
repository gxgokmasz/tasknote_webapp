import { api } from "../../../services";
import {
  CreateFolderResponse,
  CreateNoteResponse,
  DeleteFolderResponse,
  DeleteNoteResponse,
  GetFoldersResponse,
  GetNotesResponse,
  UpdateFolderResponse,
  UpdateNoteResponse,
} from "../@types";

export const getFolders = async () => {
  return await api<GetFoldersResponse>({ url: "folders/" });
};

export const getNotes = async () => {
  return await api<GetNotesResponse>({ url: "notes/" });
};

export const postFolder = async (name: string, user: number) => {
  return await api<CreateFolderResponse>({
    url: "folders/",
    method: "POST",
    data: { name, user },
  });
};

export const postNote = async (title: string, folder: number, content: string) => {
  return await api<CreateNoteResponse>({
    url: "notes/",
    method: "POST",
    data: { title, content, folder },
  });
};

export const deleteFolder = async (uuid: string) => {
  return await api<DeleteFolderResponse>({
    url: `folders/${uuid}/`,
    method: "DELETE",
  });
};

export const deleteNote = async (uuid: string) => {
  return await api<DeleteNoteResponse>({
    url: `notes/${uuid}/`,
    method: "DELETE",
  });
};

export const putFolder = async (uuid: string, name: string, user: number) => {
  return await api<UpdateFolderResponse>({
    url: `folders/${uuid}/`,
    method: "PUT",
    data: { name, user },
  });
};

export const putNote = async (uuid: string, title: string, folder: number, content: string) => {
  return await api<UpdateNoteResponse>({
    url: `notes/${uuid}/`,
    method: "PUT",
    data: { title, folder, content },
  });
};

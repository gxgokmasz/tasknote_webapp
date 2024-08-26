import { User } from "../../authentication/@types";

export interface Folder {
  id: number;
  slug: string;
  name: string;
  user: User["id"];
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: number;
  slug: string;
  title: string;
  content: string;
  folder: Folder["id"];
  created_at: string;
  updated_at: string;
}

export interface NotesState {
  folders: Folder[];
  notes: Note[];
  activeFolder: Folder | null;
  activeNote: Note | null;
}

export type StoredNotesState = Omit<NotesState, "activeFolder" | "activeNote">;

export type GetFoldersResponse = Folder[];

export type CreateFolderResponse = Folder;

export type DeleteFolderResponse = null;

export type UpdateFolderResponse = Folder;

export type GetNotesResponse = Note[];

export type CreateNoteResponse = Note;

export type DeleteNoteResponse = null;

export type UpdateNoteResponse = Note;

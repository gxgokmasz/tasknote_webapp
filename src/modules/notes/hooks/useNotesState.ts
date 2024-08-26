import { useMemo } from "react";

import { StoreHookOptions, StoreHookResponse } from "../../../@types/Hooks";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loadFromLocalStorage, saveToLocalStorage } from "../../../utils/localStorage";
import { Folder, Note, NotesState, StoredNotesState } from "../@types";
import {
  setActiveFolderAction,
  setActiveNoteAction,
  setFoldersAction,
  setNotesAction,
} from "../reducers";
import { getFolders, getNotes } from "../services";

interface NotesActions {
  handleActivateFolder: (folder: Folder | null) => void;
  handleActivateNote: (note: Note | null) => void;
  executeAddFolder: (folder: Folder) => void;
  executeAddNote: (note: Note) => void;
  executeRemoveFolder: (folderUUID: Folder["slug"]) => void;
  executeRemoveNote: (noteUUID: Note["slug"]) => void;
  executeUpdateFolder: (updatedFolder: Folder) => void;
  executeUpdateNote: (updatedNote: Note) => void;
  setNotesStateInitialData: () => Promise<void>;
}

const LOCAL_STORAGE_NOTES_DATA = import.meta.env.VITE_LOCAL_STORAGE_NOTES_DATA as string;

const useNotesActions = () => {
  const dispatch = useAppDispatch();

  const updateNotesStateLocalStorage = (folders: Folder[], notes: Note[]) => {
    saveToLocalStorage<StoredNotesState>(LOCAL_STORAGE_NOTES_DATA, { folders, notes });
  };

  const getStoredNotesState = () => {
    return loadFromLocalStorage<StoredNotesState>(LOCAL_STORAGE_NOTES_DATA);
  };

  const actions: NotesActions = useMemo(
    () => ({
      handleActivateFolder: (folder) => {
        dispatch(setActiveFolderAction(folder));
      },
      handleActivateNote: (note) => {
        dispatch(setActiveNoteAction(note));
      },
      executeAddFolder: (folder) => {
        const storedNotesState = getStoredNotesState();

        if (!storedNotesState) return;

        const newFolders = [folder, ...storedNotesState.folders];
        dispatch(setFoldersAction(newFolders));
        updateNotesStateLocalStorage(newFolders, storedNotesState.notes);
      },
      executeAddNote: (note) => {
        const storedNotesState = getStoredNotesState();

        if (!storedNotesState) return;

        const newNotes = [note, ...storedNotesState.notes];
        dispatch(setNotesAction(newNotes));
        updateNotesStateLocalStorage(storedNotesState.folders, newNotes);
      },
      executeRemoveFolder: (folderUUID) => {
        const storedNotesState = getStoredNotesState();

        if (!storedNotesState) return;

        const newFolders = storedNotesState.folders.filter((folder) => folder.slug != folderUUID);
        dispatch(setFoldersAction(newFolders));
        dispatch(setActiveFolderAction(null));
        updateNotesStateLocalStorage(newFolders, storedNotesState.notes);
      },
      executeRemoveNote: (noteUUID) => {
        const storedNotesState = getStoredNotesState();

        if (!storedNotesState) return;

        const newNotes = storedNotesState.notes.filter((note) => note.slug != noteUUID);
        dispatch(setNotesAction(newNotes));
        updateNotesStateLocalStorage(storedNotesState.folders, newNotes);
      },
      executeUpdateFolder: (updatedFolder) => {
        const storedNotesState = getStoredNotesState();

        if (!storedNotesState) return;

        const newFolders = storedNotesState.folders.map((folder) =>
          folder.slug == updatedFolder.slug ? updatedFolder : folder
        );
        dispatch(setFoldersAction(newFolders));
        updateNotesStateLocalStorage(newFolders, storedNotesState.notes);
      },
      executeUpdateNote: (updatedNote) => {
        const storedNotesState = getStoredNotesState();

        if (!storedNotesState) return;

        const newNotes = storedNotesState.notes.map((note) =>
          note.slug == updatedNote.slug ? updatedNote : note
        );
        dispatch(setNotesAction(newNotes));
        updateNotesStateLocalStorage(storedNotesState.folders, newNotes);
      },
      setNotesStateInitialData: async () => {
        const storedNotesState = getStoredNotesState();

        if (storedNotesState) {
          dispatch(setFoldersAction(storedNotesState.folders));
          dispatch(setNotesAction(storedNotesState.notes));

          return;
        }

        const [foldersResponse, notesResponse] = await Promise.all([getFolders(), getNotes()]);

        if (foldersResponse.data && notesResponse.data) {
          dispatch(setFoldersAction(foldersResponse.data));
          dispatch(setNotesAction(notesResponse.data));
          updateNotesStateLocalStorage(foldersResponse.data, notesResponse.data);
        }
      },
    }),
    [dispatch]
  );

  return actions;
};

export const useNotesState = <O extends StoreHookOptions>(options?: O) => {
  const state = useAppSelector((state) => state.notes);
  const actions = useNotesActions();

  const shouldReturnOnlyActions = options?.onlyActions ?? false;
  const shouldReturnOnlyState = options?.onlyStates ?? false;

  if (shouldReturnOnlyActions) {
    return { ...actions } as StoreHookResponse<O, NotesState, NotesActions>;
  }

  if (shouldReturnOnlyState) {
    return { ...state } as StoreHookResponse<O, NotesState, NotesActions>;
  }

  return [{ ...state }, { ...actions }] as StoreHookResponse<O, NotesState, NotesActions>;
};

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NotesState } from "../@types";

const initialState: NotesState = {
  folders: [],
  notes: [],
  activeFolder: null,
  activeNote: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotesAction: (state, action: PayloadAction<NotesState["notes"]>) => {
      state.notes = action.payload;
    },
    setFoldersAction: (state, action: PayloadAction<NotesState["folders"]>) => {
      state.folders = action.payload;
    },
    setActiveFolderAction: (state, action: PayloadAction<NotesState["activeFolder"]>) => {
      state.activeFolder = action.payload;
    },
    setActiveNoteAction: (state, action: PayloadAction<NotesState["activeNote"]>) => {
      state.activeNote = action.payload;
    },
  },
});

export const { setNotesAction, setFoldersAction, setActiveFolderAction, setActiveNoteAction } =
  notesSlice.actions;
export const notesReducer = notesSlice.reducer;

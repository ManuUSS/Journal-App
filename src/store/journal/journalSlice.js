

import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        activeNote: null
    },
    reducers: {
        savingNewNote: ( state ) => { 
            state.isSaving = true;
        },
        addNewNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.activeNote = action.payload;
        },
        setNotes: ( state, action ) => {

        },
        setSaving: ( state ) => {

        },
        updateNote: ( state, action ) => {

        },
        deleteNoteById: ( state, action ) => {

        }
    }
});


// Action creators are generated for each case reducer function
export const { 
            addNewNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote 
        } = journalSlice.actions;
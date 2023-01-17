

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
        addNewNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.savedMessage = '';
            state.notes = [];
            state.activeNote = null;
        },
        savingNewNote: ( state ) => { 
            state.isSaving = true;
        },
        setActiveNote: ( state, action ) => {
            state.activeNote = action.payload;
            state.savedMessage = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.savedMessage = '';
        },
        setPhotosToActiveNote: ( state, action ) => {
            state.activeNote.imageUrls = [ ...state.activeNote.imageUrls, ...action.payload ];  
            state.isSaving = false;
        },
        updateNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( ( note ) => {
                if( note.id === action.payload.id ) return action.payload;
                return note;
            });
            state.savedMessage = `${ action.payload.title }, actualizada correctamente`;
        },
        deleteNoteById: ( state, action ) => {

        }
    }
});


// Action creators are generated for each case reducer function
export const { 
            addNewNote, clearNotesLogout, setActiveNote, setNotes, 
            setPhotosToActiveNote, setSaving, updateNote, deleteNoteById, savingNewNote 
        } = journalSlice.actions;
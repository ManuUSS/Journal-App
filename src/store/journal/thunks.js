import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import { addNewNote, savingNewNote, setActiveNote } from './journalSlice';

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newNote = { title: '', body: '', date: new Date().getTime() };

        const newDoc = doc( collection( firebaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }
}
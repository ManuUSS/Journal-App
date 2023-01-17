import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseDB } from '../../firebase/config';
import { fileUpload, loadNotes } from '../../helpers';
import { addNewNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';

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

export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => { 
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El ID del usuario no existe'); 

        const userNotes = await loadNotes( uid );

        dispatch( setNotes( userNotes ) )

    }
}

export const startSavingNote = () => {
    return async ( dispatch, getState ) => {
        
        dispatch( setSaving() );

        const { uid } = getState().auth;
        if( !uid ) throw new Error('El ID del usuario no existe');

        const { activeNote } = getState().journal;

        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id;

        const docRef = doc( firebaseDB, `${ uid }/journal/notes/${ activeNote.id }` );
        await setDoc( docRef, noteToFirestore, { merge: true });

        dispatch( updateNote( activeNote ) );

    } 
}

export const startUploadingFiles = ( files = [] ) => {
    return async ( dispatch ) => {
        dispatch( setSaving() );
        
        const fileUploadPromises = [];

        for ( const file of files ) {
            //Crea arreglo de promesas
            fileUploadPromises.push( fileUpload( file ) );
        }

        const photosUrl = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrl ) );


    }
}

export const startDeletingNote = () => {
    return async ( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        
        const docRef = doc( firebaseDB, `${ uid }/journal/notes/${ activeNote.id }` );
        await deleteDoc( docRef  );

        dispatch( deleteNoteById( activeNote.id ) )

        console.log({ uid });
        console.log({ activeNote });
        
    }
}
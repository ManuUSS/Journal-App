import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { firebaseAuth, firebaseDB } from '../../firebase/config';

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newDoc = doc( collection( firebaseDB, `${ uid }/journal/notes` ) );
        await setDoc( newDoc, { title: '', body: '', date: new Date().getTime() } );

        
    }
}
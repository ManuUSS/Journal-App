import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {
        
        const result = await signInWithPopup( firebaseAuth, googleProvider );
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch ( error ) {
        
        const errorMessage = error.message;

        console.log( error );

        return {
            ok: false,
            errorMessage
        }

    }

}

export const commonRegisterEmailAndPassword = async ({ email, password, displayName }) => {

    try {

        const response = await createUserWithEmailAndPassword( firebaseAuth, email, password );
        const { uid, photoURL } = response;
        await updateProfile( firebaseAuth.currentUser, { displayName });
        console.log( response );
        
        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch ( error ) {

        const errorMessage = error.message;

        console.log( error );

        return {
            ok: false,
            errorMessage
        }
    }

}

export const loginEmailAndPassword = async ({ email, password }) => {


    try {
        
        const { user } = await signInWithEmailAndPassword( firebaseAuth, email, password );
        const { displayName, uid, photoURL } = user;
        return {
            ok: true,
            displayName, uid, photoURL, email
        }

    } catch ( error ) {
        
        const errorMessage = error.message;

        console.log( error );

        return {
            ok: false,
            errorMessage
        }
    }

}

export const logOutFirebase = async () => {
    return await firebaseAuth.signOut();
}
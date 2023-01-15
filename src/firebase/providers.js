import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
        
        console.log( response );
        
    } catch ( error ) {

        const errorMessage = error.message;

        console.log( error );

        return {
            ok: false,
            errorMessage
        }
    }

}
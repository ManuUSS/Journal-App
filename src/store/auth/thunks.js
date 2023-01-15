import { signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials } from "./";


export const checkingAuth = ( email, password ) => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

    }

}

export const startGoogleSignIn = ( email, password ) => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle()


    }

}

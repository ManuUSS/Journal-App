import { commonRegisterEmailAndPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./";


export const checkingAuth = ( email, password ) => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() );

    }

}

export const startGoogleSignIn = ( email, password ) => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() );
        const result = await signInWithGoogle()

        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        delete result.ok;
        dispatch( login( result ) );

    }

}

export const startCreatingUser = ({ email, password, displayName }) => {

    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
        const response = await commonRegisterEmailAndPassword({ email, password, displayName });
        console.log( response );
    }

}

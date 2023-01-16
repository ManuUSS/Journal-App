import { commonRegisterEmailAndPassword, loginEmailAndPassword, logOutFirebase, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./";


export const startGoogleSignIn = ( ) => {

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
        const { ok, uid, photoURL, errorMessage } = await commonRegisterEmailAndPassword({ email, password, displayName });
        if( !ok ) return dispatch( logout({ errorMessage }) );
        dispatch( login({ uid, photoURL, email, displayName }) );
    }

}

export const startLoginWithEmailAndPassword = ({ email, password }) => {

    return async ( dispatch ) => {

        dispatch( checkingCredentials() );
        console.log({ email, password });
        const { ok, displayName, uid, photoURL } = await loginEmailAndPassword({ email, password });
        if( !ok ) return dispatch( logout({ errorMessage: 'Correo o contraseña incorrectos.' }) );
        dispatch( login({ displayName, uid, photoURL, email }) );

    }

}

export const startLogOutFirebase = () => {
    return async ( dispatch ) => {
        await logOutFirebase();
        dispatch( logout() );
    }
}

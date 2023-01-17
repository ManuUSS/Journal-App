// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCimOI43BkUy4FXrpC3GFOLRpnjVZKRt-8",
  authDomain: "react-journalappm.firebaseapp.com",
  projectId: "react-journalappm",
  storageBucket: "react-journalappm.appspot.com",
  messagingSenderId: "478009270386",
  appId: "1:478009270386:web:24d492d5982786ab3ca2eb"
};

// Initialize Firebase
export const firebaseApp = initializeApp( firebaseConfig );
export const firebaseAuth = getAuth( firebaseApp );
export const firebaseDB = getFirestore( firebaseApp );

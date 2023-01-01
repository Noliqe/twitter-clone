
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEhxiOBipSmmEpUQYh6VupPUmyz93kY_I",
    authDomain: "gorillia-3cfad.firebaseapp.com",
    projectId: "gorillia-3cfad",
    storageBucket: "gorillia-3cfad.appspot.com",
    messagingSenderId: "434298785003",
    appId: "1:434298785003:web:bad409a5473d49b71682ae",
    measurementId: "G-VKZCXGZN2E"
};



export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return firebaseConfig;
  }
}
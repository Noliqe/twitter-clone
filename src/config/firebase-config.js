import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCEhxiOBipSmmEpUQYh6VupPUmyz93kY_I",
    authDomain: "gorillia-3cfad.firebaseapp.com",
    projectId: "gorillia-3cfad",
    storageBucket: "gorillia-3cfad.appspot.com",
    messagingSenderId: "434298785003",
    appId: "1:434298785003:web:bad409a5473d49b71682ae",
    measurementId: "G-VKZCXGZN2E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
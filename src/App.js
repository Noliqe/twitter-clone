import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from './Components/Content';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import SignUp from './Components/SignUp';
import { getFirebaseConfig } from './firebase-config.js';
import { initializeApp } from 'firebase/app';
import { getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
  serverTimestamp,
} from 'firebase/firestore';


function App() {
  const [loggedIn, setLoggedIn] = useState(false); // temp

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    checkLoggedIn();
  }, []);


  const getLoginForm = (email, password) => {
    // createUserWithEmailAndPassword(auth, email, password)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in
    signUserIn(email, password);
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  if (errorCode === 'auth/email-already-in-use') {
    console.log('auth/email-already-in-use.');
  } else {
    console.log(errorMessage);
    console.log('Error code: ', errorCode);
    console.log('Error Message: ', errorMessage);
    console.log('Error: ', error);
    }
  });
}

const signUserIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log(auth.currentuser);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      console.log('auth/wrong-password.');
    } else {
      console.log('Error code: ', errorCode);
      console.log('Error Message: ', errorMessage);
      console.log('Error: ', error);
    }
  })
}

const checkLoggedIn = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // const uid = user.uid;
      // let profilePicUrl = getProfilePicUrl();
      console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

  // Returns the signed-in user's profile Pic URL.
  const getProfilePicUrl = () => {
    // return getAuth().currentUser.photoURL || 'https://www.w3schools.com/howto/img_avatar.png';
    try {
      if (getAuth().currentUser !== null) {
        return getAuth().currentUser.photoURL || 'https://www.w3schools.com/howto/img_avatar.png';
      } else {
        return 'https://www.w3schools.com/howto/img_avatar.png';
      }
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<><Header user={auth.currentuser} profilePicture={getProfilePicUrl}/><Content/><Sidebar user={auth.currentuser} profilePicture={getProfilePicUrl}/></>} />
    <Route path="/signup" element={<SignUp createAcc={getLoginForm}/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
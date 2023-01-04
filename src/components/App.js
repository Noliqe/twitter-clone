import '../styles/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from './Content';
import Header from './Header';
import Sidebar from './Sidebar';
import SignUp from './SignUp';
import Logout from './Logout';
import Login from './Login';
import { auth } from '../config/firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import getImageStorage from './functions/getImageStorage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // A loading image URL.
let LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

onAuthStateChanged(auth, (user) => {
  if (user) {
    // const uid = user.uid;
    // ...
    if (!loggedIn) {
      console.log('user is logged in');
      return setLoggedIn(true);
    }
  } else {
    // User is signed out
    // ...
    if (loggedIn) {
      console.log('user not logged in');
      return setLoggedIn(false);
    }
  }
});

useEffect(() => {
  getImageStorage();
}, []);

  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<><Header loggedIn={loggedIn}/><Content loggedIn={loggedIn}/><Sidebar loggedIn={loggedIn}/></>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/logout" element={<Logout/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

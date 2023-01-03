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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

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

import '../styles/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from './Content';
import Header from './Header';
import Sidebar from './Sidebar';
import SignUp from './SignUp';
import Logout from './Logout';
import Login from './Login';
import { auth, storage } from '../config/firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import getProfilePicUrl from './functions/profilePicture';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState('');

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
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // set user image
				storage
        .ref(`profile-pictures/${auth.currentUser.uid}`)
        .getDownloadURL()
        .then((url) => {
          console.log("set image!");
          setData({ image: url});
        })
        .catch(() => {
          console.log("set image again!");
          setData((u) => ({ ...u, image: getProfilePicUrl() }));
        });
    }
  });
}, []);

  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<><Header loggedIn={loggedIn} data={data}/><Content loggedIn={loggedIn}/><Sidebar loggedIn={loggedIn}/></>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/logout" element={<Logout/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

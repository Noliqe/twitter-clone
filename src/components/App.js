import '../styles/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from './Content';
import Header from './Header';
import Sidebar from './Sidebar';
import SignUp from './SignUp';
import Logout from './Logout';
import Login from './Login';
import { auth, storage, db } from '../config/firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import getProfilePicUrl from './functions/profilePicture';
import { where, collection, getFirestore, query, onSnapshot } from 'firebase/firestore';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState('');


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
          setData(prev =>({...prev, image: url}));
          getAt();
        })
        .catch(() => {
          console.log("set image again!");
          setData(prev =>({...prev, image: getProfilePicUrl()}));
        });
    }
  });
}, []);

const getAt = () => {
  const recentMessagesQuery = query(collection(getFirestore(), 'users'), where("uid", "==", auth.currentUser.uid));
  // Start listening to the query.
  onSnapshot(recentMessagesQuery, function(snapshot) {
  snapshot.docChanges().forEach(function(user) {
    setData(prev =>({...prev, at: user.doc.data().at}));
  });
  });
}

  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<><Header loggedIn={loggedIn} data={data}/><Content loggedIn={loggedIn} data={data}/><Sidebar loggedIn={loggedIn}/></>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/logout" element={<Logout/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

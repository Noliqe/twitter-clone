import '../styles/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from './Content';
import Header from './Header';
import Sidebar from './Sidebar';
import '../styles/sidebar.css';
import SignUp from './SignUp';
import Logout from './Logout';
import Login from './Login';
import Profile from './Profile';
import Explore from './Explore';
import Following from './Following';
import Followers from './Followers';
import Growl from './Growl';
import DeviceContext from "./context/deviceContext";
import { auth, storage } from '../config/firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import getProfilePicUrl from './functions/profilePicture';
import { Link } from 'react-router-dom';
import { where, collection, getFirestore, query, onSnapshot } from 'firebase/firestore';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState('');
  const [width, setWidth] = useState('');
  const [appWidth, setAppWidth] = useState('');

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
    setData(prev =>({...prev, 
      userAt: user.doc.data().userAt,
      id: user.doc.id,
      name: user.doc.data().name}));
  });
  });
}

const handleFooter = () => {
  if (!loggedIn) {
    return (
      <div className='footer-login'>
      <div className='footer-login-filling'></div>
          <div className='footer-login-container'>
          <div className='footer-login-text'>
          <h3>Don't miss what's happening</h3>
          <h4>People on Gorillia are the first to know.</h4>
          </div>
      <div className='footer-buttons'>
          <Link to='/login'>
          <button className='footer-login-btn'>Log in</button>
          </Link>
          <Link to='/signup'>
          <button className='footer-signup-btn'>Sign up</button>
          </Link>
      </div>
          </div>
      </div>
    )
  }
}


useEffect(() => {
  const handleResize = () => {
    const width = window.innerWidth;
    if (width > 1000) {
      setWidth("computer");
    } else if (width > 767) {
      setWidth("tablet");
    } else {
      setWidth("mobile");
    }
  };

  handleResize();
  
  // on window resize check handleResize
  window.addEventListener("resize", handleResize);
}, []);

useEffect(() => {
  if (width === 'computer') {
    return setAppWidth('10vw');
  }
  if (width === 'tablet') {
    return setAppWidth('0vw')
  }
}, [width]);

  return (
    <div className='App' style={{paddingLeft: appWidth}}>
    <BrowserRouter>
    <DeviceContext.Provider value={{ device: width }}>
    {handleFooter()}
    <Routes>
    <Route path="/" element={<><Header loggedIn={loggedIn} data={data}/><Content loggedIn={loggedIn} data={data}/><Sidebar loggedIn={loggedIn} data={data}/></>} />
    <Route path="/explore" element={<><Header loggedIn={loggedIn} data={data}/><Explore loggedIn={loggedIn} data={data}/><Sidebar loggedIn={loggedIn} data={data}/></>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/logout" element={<Logout/>} />
    <Route path="/growl/:growlId" element={<><Header loggedIn={loggedIn} data={data}/><Growl loggedIn={loggedIn} current={data}/><Sidebar loggedIn={loggedIn} data={data}/></>} />
    <Route path="/profile/:at" element={<><Header loggedIn={loggedIn} data={data}/><Profile loggedIn={loggedIn} current={data}/><Sidebar loggedIn={loggedIn} data={data}/></>} />
    <Route path="/profile/:at/following" element={<><Header loggedIn={loggedIn} data={data}/><Following loggedIn={loggedIn} current={data}/><Sidebar loggedIn={loggedIn} data={data}/></>} />
    <Route path="/profile/:at/followers" element={<><Header loggedIn={loggedIn} data={data}/><Followers loggedIn={loggedIn} current={data}/><Sidebar loggedIn={loggedIn} data={data}/></>} />
    </Routes>
    </DeviceContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;

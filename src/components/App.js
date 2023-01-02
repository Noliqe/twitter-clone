import '../styles/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from './Content';
import Header from './Header';
import Sidebar from './Sidebar';
import SignUp from './SignUp';
import Logout from './Logout';
import checkLoggedIn from './functions/checkLoggedIn';
import Login from './Login';

function App() {

  useEffect(() => {
    checkLoggedIn();
  }, []);




  return (
    <div className='App'>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<><Header /><Content/><Sidebar/></>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/logout" element={<Logout/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

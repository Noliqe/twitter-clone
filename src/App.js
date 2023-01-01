import './App.css';
import React, { useState } from 'react';
import './Components/loginPage.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Header from './Components/Header';
// import  { Navigate } from 'react-router-dom'

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // temp

  // const handleRedirect = () => {
  //   if (!loggedIn) {
  //     return <Navigate to='/home'  />
  //   }
  //   return (
  //     <div className='notloggedin'></div>
  //   )
  // }


  return (
    <div className='App'>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element={<Home />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

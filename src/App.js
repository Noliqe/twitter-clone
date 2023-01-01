import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from './Components/Content';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
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
    <Content />
    <Sidebar />
    <Routes>
    {/* <Route path="/" element={<Home />} /> */}
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/DashBoard/DashBoard';
import Header from './components/Header/Header';
import Interview from './Pages/Interview/Interview';
import StartInterview from './Pages/Interview/StartInterview';
import Feedback from './Pages/Interview/Feedback';
import LoginPopup from './components/LoginPopUp/LoginPopup';
// import Protected from './components/Protected/Protected';
import { storeContext } from './Context/Store';

const App = () => {
  const {showLogin,setShowLogin}=useContext(storeContext)
  return (
    <>

    {showLogin?<LoginPopup/>:<></>}
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/dashboard/interview/:mockId" element={<Interview/>}/>
      <Route path="/dashboard/interview/:mockId/start" element={<StartInterview/>}/>
      <Route path="/dashboard/interview/:mockId/feedback" element={<Feedback/>}/>
    </Routes>
    </>
  );
};

export default App;
